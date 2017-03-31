//
// Created by admin on 07.03.17.
//

#ifndef VASCAN_APPREQUESTHANDLERFACTORY_H
#define VASCAN_APPREQUESTHANDLERFACTORY_H

#include <Poco/Net/HTTPRequestHandlerFactory.h>
#include <mongocxx/database.hpp>

class AppRequestHandlerFactory : public Poco::Net::HTTPRequestHandlerFactory {
public:
    mongocxx::database database;
    AppRequestHandlerFactory(mongocxx::database& database);
    Poco::Net::HTTPRequestHandler* createRequestHandler(const Poco::Net::HTTPServerRequest& request);
};


#endif //VASCAN_APPREQUESTHANDLERFACTORY_H
