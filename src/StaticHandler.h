//
// Created by samoxbal on 02.05.17.
//

#ifndef VASCAN_STATICHANDLER_H
#define VASCAN_STATICHANDLER_H

#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>
#include <mstch/mstch.hpp>

class StaticHandler : public Poco::Net::HTTPRequestHandler {
public:
    StaticHandler();
    void handleRequest(Poco::Net::HTTPServerRequest&, Poco::Net::HTTPServerResponse&);
};


#endif //VASCAN_STATICHANDLER_H
