//
// Created by admin on 07.03.17.
//

#include "AppRequestHandlerFactory.h"
#include "AppRequestHandler.h"

Poco::Net::HTTPRequestHandler* AppRequestHandlerFactory::createRequestHandler(
        const Poco::Net::HTTPServerRequest &request)
{
    if (request.getURI() == "/api" && request.getMethod() == "POST") {
        return new AppRequestHandler();
    }
    return nullptr;
}
