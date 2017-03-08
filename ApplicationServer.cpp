//
// Created by admin on 03.03.17.
//

#include "ApplicationServer.h"
#include "AppRequestHandlerFactory.h"
#include <Poco/Net/ServerSocket.h>
#include <Poco/Net/HTTPServer.h>

int ApplicationServer::main(const std::vector<std::string> &args) {
    Poco::Net::ServerSocket socket(3000);
    Poco::Net::HTTPServerParams* params = new Poco::Net::HTTPServerParams();
    params->setMaxQueued(100);
    params->setKeepAlive(true);
    params->setMaxThreads(16);
    Poco::Net::HTTPServer server(new AppRequestHandlerFactory(), socket, params);
    server.start();
    waitForTerminationRequest();
    server.stop();
    return EXIT_OK;
}
