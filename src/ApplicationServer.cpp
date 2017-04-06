//
// Created by admin on 03.03.17.
//

#include <iostream>
#include "ApplicationServer.h"
#include "AppRequestHandlerFactory.h"
#include <Poco/Net/ServerSocket.h>
#include <Poco/Net/HTTPServer.h>

int ApplicationServer::main(const std::vector<std::string> &args) {
    try {
        mongocxx::instance inst{};
        mongocxx::client connection{mongocxx::uri{}};
        ValidationSchema validationSchema;

        auto db = connection["vascan"];

        if(!db.has_collection("experiments")) {
            db.create_collection("experiments", validationSchema.createExperimentSchema());
        }

        if(!db.has_collection("voltamogramms")) {
            db.create_collection("voltamogramms", validationSchema.createVoltamogrammSchema());
        }

        Poco::Net::ServerSocket socket(3000);
        Poco::Net::HTTPServerParams* params = new Poco::Net::HTTPServerParams();

        params->setMaxQueued(100);
        params->setKeepAlive(true);
        params->setMaxThreads(16);

        Poco::Net::HTTPServer server(new AppRequestHandlerFactory(db), socket, params);
        server.start();
        waitForTerminationRequest();
        server.stop();
        return EXIT_OK;
    } catch (std::exception& error) {
        std::cout << "server start failed: " << error.what() << "\n";
        return EXIT_FAILURE;
    }
}
