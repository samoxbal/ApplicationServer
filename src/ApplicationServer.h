//
// Created by admin on 03.03.17.
//

#ifndef VASCAN_APPLICATIONSERVER_H
#define VASCAN_APPLICATIONSERVER_H

#include <Poco/Util/ServerApplication.h>
#include <mongocxx/instance.hpp>
#include <mongocxx/client.hpp>

class ApplicationServer : public Poco::Util::ServerApplication {
protected:
    int main(const std::vector<std::string>& args);
};

#endif //VASCAN_APPLICATIONSERVER_H
