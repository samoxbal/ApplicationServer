//
// Created by admin on 07.03.17.
//

#include "AppRequestHandlerFactory.h"
#include "AppRequestHandler.h"
#include "StaticHandler.h"

AppRequestHandlerFactory::AppRequestHandlerFactory(mongocxx::database& db) {
    this->database = db;
}

Poco::Net::HTTPRequestHandler* AppRequestHandlerFactory::createRequestHandler(
        const Poco::Net::HTTPServerRequest &request)
{
    if (request.getURI() == "/api" && request.getMethod() == "POST") {
        return new AppRequestHandler(this->database);
    } else if (request.getMethod() == "GET") {
        return new StaticHandler();
    }
    return nullptr;
}
