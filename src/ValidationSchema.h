//
// Created by samoxbal on 06.04.17.
//

#ifndef VASCAN_VALIDATIONSCHEMA_H
#define VASCAN_VALIDATIONSCHEMA_H

#include <bsoncxx/builder/stream/document.hpp>
#include <mongocxx/client.hpp>


class ValidationSchema {
public:
    mongocxx::options::create_collection createExperimentSchema();
    mongocxx::options::create_collection createVoltamogrammSchema();
    mongocxx::options::create_collection createScanSchema();
    mongocxx::options::create_collection createMeasureSchema();
};


#endif //VASCAN_VALIDATIONSCHEMA_H
