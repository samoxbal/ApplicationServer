//
// Created by admin on 07.03.17.
//

#ifndef VASCAN_APPREQUESTHANDLERFACTORY_H
#define VASCAN_APPREQUESTHANDLERFACTORY_H

#include <Poco/Net/HTTPRequestHandlerFactory.h>

class AppRequestHandlerFactory : public Poco::Net::HTTPRequestHandlerFactory {
public:
    AppRequestHandlerFactory();
    Poco::Net::HTTPRequestHandler* createRequestHandler(const Poco::Net::HTTPServerRequest& request);
};


#endif //VASCAN_APPREQUESTHANDLERFACTORY_H
