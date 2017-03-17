//
// Created by admin on 08.03.17.
//

#ifndef VASCAN_APPREQUESTHANDLER_H
#define VASCAN_APPREQUESTHANDLER_H

#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>
#include <Poco/JSON/Parser.h>
#include <Poco/JSON/Object.h>
#include <mongocxx/client.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/builder/stream/array.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/types.hpp>

class AppRequestHandler : public Poco::Net::HTTPRequestHandler {
public:
    mongocxx::database database;
    AppRequestHandler(mongocxx::database& db);
    void handleRequest(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
};


#endif //VASCAN_APPREQUESTHANDLER_H
