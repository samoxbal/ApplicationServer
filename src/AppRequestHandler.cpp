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
        if (!bodyRaw.isEmpty()) {
            this->messageBody = bodyRaw.extract<Poco::JSON::Object::Ptr>();
        }
        auto json_response = bsoncxx::builder::stream::document{};

        auto public_api = this->public_api;
        auto lock_api = this->lock_api;

        auto iterator_pub = public_api.find(command.toString());
        auto iterator_lock = lock_api.find(command.toString());

        if (iterator_pub == public_api.end() && iterator_lock == lock_api.end()) {
            json_response << "status" << this->failed;
            json_response << "data" << ERROR_UNKNOWN_COMMAND;
            std::ostream& responseStream = response.send();
            responseStream << bsoncxx::to_json(json_response);
        } else if (iterator_pub != public_api.end()) {
            (this->*(iterator_pub->second))(request, response);
        } else if (iterator_lock != lock_api.end()) {
            if (request.has("Authorization")) {
                auto token = request.get("Authorization");
                try {
                    JWTXX::JWT jwt(token, JWTXX::Key(JWTXX::Algorithm::HS256, this->secret));
                    this->_user = jwt.claim("_user");
                    (this->*(iterator_lock->second))(request, response);
                } catch(const JWTXX::JWT::Error& error) {
                    json_response << "status" << this->failed;
                    json_response << "data" << error.what();
                    std::ostream& responseStream = response.send();
                    responseStream << bsoncxx::to_json(json_response);
                }
            } else {
                json_response << "status" << this->failed;
                json_response << "data" << ERROR_NOT_AUTHORIZED;
                std::ostream& responseStream = response.send();
                responseStream << bsoncxx::to_json(json_response);
            }
        }
    } else {
        FileHandler multipartHandler;
        Poco::Net::HTMLForm form(request, request.stream(), multipartHandler);

        if(!multipartHandler.filename.empty()) {
            auto db = this->database;
            auto collection = db["measures"];
            auto json_response = bsoncxx::builder::stream::document{};
            auto measure = bsoncxx::builder::stream::document{};
            auto points = bsoncxx::builder::stream::array{};

            if (form.has("scan_id")) {
                measure << "_scan" << form.get("scan_id");

                for (auto& p : multipartHandler.data) {
                    points << bsoncxx::builder::stream::open_array
                           << p.first << p.second
                           << bsoncxx::builder::stream::close_array;
                }

                measure << "points" << points;
                collection.insert_one(measure.view());

                json_response << "status" << this->ok;
            } else {
                json_response << "status" << this->failed;
                json_response << "data" << ERROR_NO_SCAN_ID;
            }

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
            json_response << "data" << ERROR_EMAIL_ALREADY_USED;
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
            << "_user" << this->_user
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

    query_filter << "_user" << this->_user;

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
        response_data = ERROR_ENTER_EMAIL;
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
                response_data = ERROR_INCORRECT_PASSWORD;
            }
        } else {
            response_status = this->failed;
            response_data = ERROR_USER_NOT_EXIST;
        }
    }

    json_response << "status" << response_status;
    json_response << "data" << response_data;

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}

void AppRequestHandler::fetchVoltamogramms(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto collection = db.collection("voltamogramms");
    auto voltamogramms = bsoncxx::builder::stream::array{};
    auto json_response = bsoncxx::builder::stream::document{};
    auto query_filter = bsoncxx::builder::stream::document{};

    query_filter << "_experiment" << (messageBody->get("experiment")).toString();

    auto cursor = collection.find(query_filter.view());

    for (auto&& doc : cursor) {
        voltamogramms << doc;
    }

    json_response << "status" << this->ok;
    json_response << "data" << voltamogramms;

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}

void AppRequestHandler::createScan(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto volt_collection = db["voltamogramms"];
    auto scan_collection = db["scans"];
    auto voltamogramm = bsoncxx::builder::stream::document{};
    auto scan = bsoncxx::builder::stream::document{};
    auto json_response = bsoncxx::builder::stream::document{};
    auto voltamogramm_src = (messageBody->get("voltamogramm")).extract<Poco::JSON::Object::Ptr>();
    auto scan_src = (messageBody->get("scan")).extract<Poco::JSON::Object::Ptr>();

    voltamogramm << "_experiment" << (messageBody->get("experiment_id")).toString()
                 << "cyclic" << voltamogramm_src->getValue<bool>("cyclic")
                 << "va_cycle_datetime" << (voltamogramm_src->get("va_cycle_datetime")).toString()
                 << "description" << (voltamogramm_src->get("description")).toString()
                 << "solution" << (voltamogramm_src->get("solution")).toString()
                 << "number_of_electrodes" << voltamogramm_src->getValue<int>("number_of_electrodes")
                 << "equipment_id" << (voltamogramm_src->get("equipment_id")).toString();

    auto result_volt = volt_collection.insert_one(voltamogramm.view());
    auto voltamogramm_id = result_volt->inserted_id().get_oid().value;
    auto measure_mode = bsoncxx::builder::stream::document{};
    auto measure_mode_src = (scan_src->get("measure_mode")).extract<Poco::JSON::Object::Ptr>();

    measure_mode << "regime" << (scan_src->get("regime")).toString();

    for(auto it = measure_mode_src->begin(); it != measure_mode_src->end(); it++) {
        auto key = it->first;
        measure_mode << key << measure_mode_src->getValue<double>(key);
    }

    scan << "_voltamogramm" << voltamogramm_id.to_string()
         << "scan_datetime" << (scan_src->get("scan_datetime")).toString()
         << "start_potential" << scan_src->getValue<double>("start_potential")
         << "end_potential" << scan_src->getValue<double>("end_potential")
         << "reverse_direction" << scan_src->getValue<bool>("reverse_direction")
         << "stirring" << scan_src->getValue<bool>("stirring")
         << "rotation" << scan_src->getValue<bool>("rotation")
         << "channel_id" << (scan_src->get("channel_id")).toString()
         << "channel_label" << (scan_src->get("channel_label")).toString()
         << "temperature" << scan_src->getValue<double>("temperature")
         << "pressure" << scan_src->getValue<double>("pressure")
         << "measure_mode" << measure_mode;

    if (!(scan_src->get("stirring_speed")).isEmpty()) {
        scan << "stirring_speed" << scan_src->getValue<double>("stirring_speed");
    } else {
        scan << "stirring_speed" << bsoncxx::types::b_null{};
    }

    if (!(scan_src->get("rotation_speed")).isEmpty()) {
        scan << "rotation_speed" << scan_src->getValue<double>("rotation_speed");
    } else {
        scan << "rotation_speed" << bsoncxx::types::b_null{};
    }

    auto result_scan = scan_collection.insert_one(scan.view());
    auto scan_id = result_scan->inserted_id().get_oid().value;

    json_response << "status" << this->ok;
    json_response << "data" << scan_id.to_string();

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}

void AppRequestHandler::fetchSingleVoltamogramm(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto volt_collection = db["voltamogramms"];
    auto scan_collection = db["scans"];
    auto scans = bsoncxx::builder::stream::array{};
    auto json_response = bsoncxx::builder::stream::document{};
    auto query_filter = bsoncxx::builder::stream::document{};
    auto voltamogramm = bsoncxx::builder::stream::document{};
    auto voltamogramm_id = (messageBody->get("voltamogramm")).toString();

    query_filter << "_id" << bsoncxx::oid{voltamogramm_id};

    auto voltamogramm_src = volt_collection.find_one(query_filter.view());
    auto voltamogramm_opt = voltamogramm_src.value_or(bsoncxx::builder::stream::document{}.extract());
    auto voltamogramm_doc = voltamogramm_opt.view();

    if(!voltamogramm_doc.empty()) {
        query_filter.clear();
        query_filter << "_voltamogramm" << voltamogramm_id;

        auto scans_src = scan_collection.find(query_filter.view());

        for (auto&& doc : scans_src) {
            scans << doc;
        }

        for (auto& field : voltamogramm_doc) {
            voltamogramm << field.key() << field.get_value();
        }

        voltamogramm << "scans" << scans;

        json_response << "status" << this->ok;
        json_response << "data" << voltamogramm;

    } else {
        json_response << "status" << this->failed;
        json_response << "data" << ERROR_VOLTAMOGRAMM_NOT_EXIST;
    }

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}

void AppRequestHandler::editExperiment(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto collection = db["experiments"];
    auto filter_builder = bsoncxx::builder::stream::document{};
    auto update_builder = bsoncxx::builder::stream::document{};
    auto experiment_updated = bsoncxx::builder::stream::document{};
    auto json_response = bsoncxx::builder::stream::document{};

    filter_builder << "_id" << bsoncxx::oid{(messageBody->get("_id")).toString()};
    auto filter_view = filter_builder.view();

    update_builder
        << "_user" << this->_user
        << "name" << (messageBody->get("name")).toString()
        << "description" << (messageBody->get("description")).toString()
        << "start_date" << (messageBody->get("start_date")).toString()
        << "end_date" << (messageBody->get("end_date")).toString();

    auto result_src = collection.find_one_and_update(filter_view, update_builder.view());
    auto result_opt = result_src.value_or(bsoncxx::builder::stream::document{}.extract());
    auto result_doc = result_opt.view();

    if (!result_doc.empty()) {
        auto updated_experiment = collection.find_one(filter_view);
        auto updated_doc = updated_experiment.value().view();

        for (auto& field : updated_doc) {
            experiment_updated << field.key() << field.get_value();
        }

        json_response << "status" << this->ok;
        json_response << "data" << experiment_updated;

    } else {
        json_response << "status" << this->failed;
        json_response << "data" << ERROR_EXPERIMENT_NOT_EXIST;
    }

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}

void AppRequestHandler::computeRegression(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto messageBody = this->messageBody;
    auto measure_collection = db["measures"];
    auto regression_collection = db["regressions"];
    auto query_filter = bsoncxx::builder::stream::document{};
    auto json_response = bsoncxx::builder::stream::document{};
    auto measure_id = (messageBody->get("_id")).toString();

    query_filter << "_id" << bsoncxx::oid{measure_id};

    auto measure_src = measure_collection.find_one(query_filter.view());
    auto measure_opt = measure_src.value_or(bsoncxx::builder::stream::document{}.extract());
    auto measure_doc = measure_opt.view();

    if(!measure_doc.empty()) {
        auto regression = bsoncxx::builder::stream::document{};
        double K_matrix, B_offset, S_loss;

        LinearRegression regressor;

        std::tie(K_matrix, B_offset, S_loss) = regressor.getParameters(measure_doc);

        regression << "_measure" << measure_id
                   << "k_matrix" << K_matrix
                   << "b_offset" << B_offset
                   << "loss" << S_loss;

        auto result_regression = regression_collection.insert_one(regression.view());
        auto regression_id = result_regression->inserted_id().get_oid().value;

        json_response << "status" << this->ok;
        json_response << "regression_id" << regression_id.to_string();
        json_response << "K_matrix" << K_matrix;
        json_response << "B_offset" << B_offset;
        json_response << "S_loss" << S_loss;

    } else {
        json_response << "status" << this->failed;
    }

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(json_response);
}