//
// Created by samoxbal on 02.05.17.
//

#include "StaticHandler.h"

StaticHandler::StaticHandler() {}

void StaticHandler::handleRequest(
        Poco::Net::HTTPServerRequest &request,
        Poco::Net::HTTPServerResponse &response)
{
    std::string view{"<!DOCTYPE html>\n"
                             "<html lang=\"ru\">\n"
                             "    <head>\n"
                             "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n"
                             "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
                             "        <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/bundle.css\" />\n"
                             "        <link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css\" />\n"
                             "        <title>Vascan система обработки данных</title>\n"
                             "    </head>\n"
                             "    <body>\n"
                             "        <div id=\"root\"></div>\n"
                             "        <script src=\"/static/bundle.js\"></script>\n"
                             "    </body>\n"
                             "</html>"};

    mstch::map context{};

    std::ostream& responseStream = response.send();
    responseStream << mstch::render(view, context);
}