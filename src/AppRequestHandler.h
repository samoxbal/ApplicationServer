//
// Created by admin on 08.03.17.
//

#ifndef VASCAN_APPREQUESTHANDLER_H
#define VASCAN_APPREQUESTHANDLER_H

#define ERROR_INCORRECT_PASSWORD "Incorrect password"
#define ERROR_USER_NOT_EXIST "User not exist"
#define ERROR_EMAIL_ALREADY_USED "This email already used"
#define ERROR_NOT_AUTHORIZED "Not authorized"
#define ERROR_UNKNOWN_COMMAND "Unknown command"
#define ERROR_ENTER_EMAIL "Please enter email and password"
#define ERROR_NO_SCAN_ID "Scan id not received"
#define ERROR_VOLTAMOGRAMM_NOT_EXIST "Voltamogramm id not exist"
#define ERROR_EXPERIMENT_NOT_EXIST "Experiment id not exist"

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
#include "ModelValidator.h"

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
    void fetchVoltamogramms(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
    void createScan(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
    void fetchSingleVoltamogramm(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
    void editExperiment(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response);
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
        {"fetchExperiments", &AppRequestHandler::fetchExperiments},
        {"fetchVoltamogramms", &AppRequestHandler::fetchVoltamogramms},
        {"createScan", &AppRequestHandler::createScan},
        {"fetchSingleVoltamogramm", &AppRequestHandler::fetchSingleVoltamogramm},
        {"editExperiment", &AppRequestHandler::editExperiment}
    };
};


#endif //VASCAN_APPREQUESTHANDLER_H
