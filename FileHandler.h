//
// Created by samoxbal on 27.03.17.
//

#ifndef VASCAN_FILEHANDLER_H
#define VASCAN_FILEHANDLER_H

#include <Poco/Net/PartHandler.h>
#include <Poco/Net/MessageHeader.h>

class FileHandler : public Poco::Net::PartHandler {
public:
    std::string filename;
    void handlePart(const Poco::Net::MessageHeader& header, std::istream& stream);
};

#endif //VASCAN_FILEHANDLER_H
