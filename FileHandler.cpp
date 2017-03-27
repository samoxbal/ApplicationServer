//
// Created by samoxbal on 27.03.17.
//

#include "FileHandler.h"

void FileHandler::handlePart(const Poco::Net::MessageHeader &header, std::istream &stream)
{
    if(header.has("Content-Disposition")) {
        Poco::Net::NameValueCollection params;
        std::string disposition;
        Poco::Net::MessageHeader::splitParameters(header["Content-Disposition"], disposition, params);
        filename = params.get("filename");
    }
}