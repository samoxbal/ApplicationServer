//
// Created by admin on 08.03.17.
//

#include "AppRequestHandler.h"

void AppRequestHandler::handleRequest(
        Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
{
    Poco::JSON::Parser parser;
    auto bodyParser = parser.parse(request.stream());
    auto reqBody = bodyParser.extract<Poco::JSON::Object::Ptr>();
    auto command = reqBody->get("command");

    Poco::JSON::Object::Ptr result = new Poco::JSON::Object;
    result->set("status", "ok");
    result->set("data", command);

    response.setContentType("application/json");
    response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);
    std::ostream& responseStream = response.send();
    result->stringify(responseStream);
}