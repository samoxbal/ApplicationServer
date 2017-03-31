//
// Created by admin on 08.03.17.
//

#include "AppRequestHandler.h"

AppRequestHandler::AppRequestHandler(mongocxx::database& db) {
    this->database = db;
}

void AppRequestHandler::handleRequest(
        Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
{
    response.setContentType("application/json");
    response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);

    if (request.getContentType() == "application/json") {
        Poco::JSON::Parser parser;
        auto bodyParser = parser.parse(request.stream());
        auto reqBody = bodyParser.extract<Poco::JSON::Object::Ptr>();
        auto command = reqBody->get("command");
        auto bodyRaw = reqBody->get("body");
        this->messageBody = bodyRaw.extract<Poco::JSON::Object::Ptr>();
        auto api = this->api;

        auto iterator = api.find(command);

        if (iterator == api.end()) {
            auto json_response = bsoncxx::builder::stream::document{};
            json_response << "status" << this->failed;
            std::ostream& responseStream = response.send();
            responseStream << bsoncxx::to_json(json_response);
        } else {
            (this->*(iterator->second))(request, response);
        }
    } else {
        FileHandler multipartHandler;
        Poco::Net::HTMLForm form(request, request.stream(), multipartHandler);

        if(!multipartHandler.filename.empty()) {
            auto json_response = bsoncxx::builder::stream::document{};
            auto points = bsoncxx::builder::stream::array{};
            json_response << "status" << this->ok;
            json_response << "filename" << multipartHandler.filename;
            if (form.has("scan_id")) {
                json_response << "scan_id" << form.get("scan_id");
            }
            for (auto& p : multipartHandler.data) {
                points << bsoncxx::builder::stream::open_array
                       << p.first << p.second
                       << bsoncxx::builder::stream::close_array;
            }
            json_response << "points" << points;
            std::ostream& responseStream = response.send();
            responseStream << bsoncxx::to_json(json_response);
        }
    }
}

std::string AppRequestHandler::createHash(std::string& password_str)
{
    Poco::MD5Engine md5;
    md5.update(password_str);
    return Poco::DigestEngine::digestToHex(md5.digest());
}

void AppRequestHandler::createUser(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto collection = db.collection("users");
    auto user = bsoncxx::builder::stream::document{};
    auto json_response = bsoncxx::builder::stream::document{};
    auto email_str = (messageBody->get("email")).toString();
    auto password_str = (messageBody->get("password")).toString();

    if (email_str.empty() || password_str.empty()) {
        json_response << "status" << this->failed;
        json_response << "data" << std::string{"Please enter email and password"};
    } else if (!email_str.empty() && !password_str.empty()) {
        auto query_filter = bsoncxx::builder::stream::document{};
        query_filter << "email" << email_str;

        auto cursor = collection.find(query_filter.view());

        if (cursor.begin() == cursor.end()) {
            Poco::Timestamp now;

            user << "email" << email_str
                 << "username" << (messageBody->get("username")).toString()
                 << "password" << AppRequestHandler::createHash(password_str)
                 << "date_register" << Poco::DateTimeFormatter::format(now, Poco::DateTimeFormat::ISO8601_FORMAT);

            auto result = collection.insert_one(user.view());
            auto inserted_id = result->inserted_id().get_oid().value;

            json_response << "status" << this->ok;
            json_response << "data" << inserted_id.to_string();
        } else {
            json_response << "status" << this->failed;
            json_response << "data" << std::string{"This email already used"};
        }
    }

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}

void AppRequestHandler::createExperiment(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto collection = db.collection("experiments");
    auto experiment = bsoncxx::builder::stream::document{};
    auto json_response = bsoncxx::builder::stream::document{};

    experiment
            << "_user" << (messageBody->get("_user")).toString()
            << "name" << (messageBody->get("name")).toString()
            << "description" << (messageBody->get("description")).toString()
            << "start_date" << (messageBody->get("start_date")).toString()
            << "end_date" << (messageBody->get("end_date")).toString();

    auto result = collection.insert_one(experiment.view());
    auto inserted_id = result->inserted_id().get_oid().value;

    json_response << "status" << this->ok;
    json_response << "data" << inserted_id.to_string();

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}

void AppRequestHandler::fetchExperiments(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto collection = db.collection("experiments");
    auto experiments = bsoncxx::builder::stream::array{};
    auto json_response = bsoncxx::builder::stream::document{};
    auto query_filter = bsoncxx::builder::stream::document{};

    query_filter << "_user" << (messageBody->get("_user")).toString();

    auto cursor = collection.find(query_filter.view());

    for (auto&& doc : cursor) {
        experiments << doc;
    }

    json_response << "status" << this->ok;
    json_response << "data" << experiments;

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}

void AppRequestHandler::createToken(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto collection = db.collection("users");
    auto json_response = bsoncxx::builder::stream::document{};
    auto query_filter = bsoncxx::builder::stream::document{};
    auto email_str = (messageBody->get("email")).toString();
    auto password_str = (messageBody->get("password")).toString();
    std::string response_status, response_data;

    if (email_str.empty() || password_str.empty()) {
        response_status = this->failed;
        response_data = std::string{"Please enter email and password"};
    } else if (!email_str.empty() && !password_str.empty()) {
        query_filter << "email" << email_str;

        auto user_raw = collection.find_one(query_filter.view());
        auto user_opt = user_raw.value_or(bsoncxx::builder::stream::document{}.extract());
        auto user_doc = user_opt.view();

        if (!user_doc.empty()) {
            auto password = user_doc["password"].get_utf8().value.to_string();
            auto oid = user_doc["_id"].get_oid().value.to_string();

            if (password == AppRequestHandler::createHash(password_str)) {
                JWTXX::JWT jwt(JWTXX::Algorithm::HS256, {{"email", email_str}, {"_user", oid}});
                auto token = jwt.token(this->secret);

                response_status = this->ok;
                response_data = token;
            } else {
                response_status = this->failed;
                response_data = "Incorrect password";
            }
        } else {
            response_status = this->failed;
            response_data = "User not exist";
        }
    }

    json_response << "status" << response_status;
    json_response << "data" << response_data;

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}