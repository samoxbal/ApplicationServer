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
    auto api = this->api;

    auto iterator = api.find(command);

    response.setContentType("application/json");
    response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);

    if (iterator == api.end()) {
        auto document = bsoncxx::builder::stream::document{};
        document << "status" << this->failed;
        std::ostream& responseStream = response.send();
        responseStream << bsoncxx::to_json(document);
    } else {
        (this->*(iterator->second))(request, response);
    }
}

void AppRequestHandler::createUser(
        Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
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