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
    Poco::JSON::Parser parser;
    auto bodyParser = parser.parse(request.stream());
    auto reqBody = bodyParser.extract<Poco::JSON::Object::Ptr>();
    auto command = reqBody->get("command");
    auto bodyRaw = reqBody->get("body");
    this->messageBody = bodyRaw.extract<Poco::JSON::Object::Ptr>();
    auto api = this->api;

    auto iterator = api.find(command);

    response.setContentType("application/json");
    response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);

    if (iterator == api.end()) {
        auto json_response = bsoncxx::builder::stream::document{};
        json_response << "status" << this->failed;
        std::ostream& responseStream = response.send();
        responseStream << bsoncxx::to_json(json_response);
    } else {
        (this->*(iterator->second))(request, response);
    }
}

void AppRequestHandler::createUser(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response
)
{
    auto db = this->database;
    auto collection = db.collection("users");
    auto cursor = collection.find({});
    auto document = bsoncxx::builder::stream::document{};
    auto users = bsoncxx::builder::stream::array{};

    for (auto&& doc : cursor) {
        users << doc;
    }

    document << "status" << this->ok;
    document << "users" << users;

    std::ostream& responseStream = response.send();
    responseStream << bsoncxx::to_json(document);
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