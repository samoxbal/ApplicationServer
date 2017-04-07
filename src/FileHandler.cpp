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
        std::string content, line, x_str, y_str;
        filename = params.get("filename");
        Poco::StreamCopier::copyToString(stream, content);
        std::istringstream data_stream(content);
        while(std::getline(data_stream, line, '\n') >> x_str >> y_str) {
            data.push_back({ std::stod(x_str), std::stod(y_str) });
        }
    }
}