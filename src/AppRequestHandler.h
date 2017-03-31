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
#include <Poco/Net/HTMLForm.h>
#include "Poco/Timestamp.h"
#include "Poco/DateTimeFormatter.h"
#include "Poco/DateTimeFormat.h"
#include "Poco/MD5Engine.h"
#include <mongocxx/client.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/builder/stream/array.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/types.hpp>
#include <jwtxx/jwt.h>
#include "FileHandler.h"

class AppRequestHandler : public Poco::Net::HTTPRequestHandler {
public:
    typedef void(AppRequestHandler::*function)(Poco::Net::HTTPServerRequest&, Poco::Net::HTTPServerResponse&);
    std::string ok = "ok";
    std::string failed = "failed";
    mongocxx::database database;
    Poco::JSON::Object::Ptr messageBody;
    AppRequestHandler(mongocxx::database& db);
    void handleRequest(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
    void createUser(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
    void createExperiment(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
    void fetchExperiments(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
    void createToken(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
    std::string createHash(std::string& password_str);

private:
    std::string secret = "secret";
    std::string _user;
    std::map<std::string, function> public_api = {
        {"createUser", &AppRequestHandler::createUser},
        {"createToken", &AppRequestHandler::createToken}
    };
    std::map<std::string, function> lock_api = {
        {"createExperiment", &AppRequestHandler::createExperiment},
        {"fetchExperiments", &AppRequestHandler::fetchExperiments}
    };
};


#endif //VASCAN_APPREQUESTHANDLER_H