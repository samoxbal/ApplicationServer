//
// Created by samoxbal on 06.04.17.
//

#include "ValidationSchema.h"

mongocxx::options::create_collection ValidationSchema::createExperimentSchema()
{
    using bsoncxx::builder::stream::open_document;
    using bsoncxx::builder::stream::close_document;

    mongocxx::options::create_collection options;
    mongocxx::validation_criteria validation;

    validation.level(mongocxx::validation_criteria::validation_level::k_strict);
    validation.action(mongocxx::validation_criteria::validation_action::k_error);

    auto rule = bsoncxx::builder::stream::document{};

    rule << "_user" << open_document
         << "$exists" << true
         << "$type" << "string"
         << "$ne" << ""
         << close_document;

    rule << "name" << open_document
         << "$exists" << true
         << "$type" << "string"
         << "$ne" << ""
         << close_document;

    rule << "description" << open_document
         << "$exists" << true
         << "$type" << "string"
         << "$ne" << ""
         << close_document;

    rule << "start_date" << open_document
         << "$exists" << true
         << "$type" << "string"
         << "$ne" << ""
         << close_document;

    rule << "end_date" << open_document
         << "$exists" << true
         << "$type" << "string"
         << "$ne" << ""
         << close_document;

    validation.rule(rule.extract());
    options.validation_criteria(validation);

    return options;
}

mongocxx::options::create_collection ValidationSchema::createVoltamogrammSchema()
{
    using bsoncxx::builder::stream::open_document;
    using bsoncxx::builder::stream::close_document;

    mongocxx::options::create_collection options;
    mongocxx::validation_criteria validation;

    validation.level(mongocxx::validation_criteria::validation_level::k_strict);
    validation.action(mongocxx::validation_criteria::validation_action::k_error);

    auto rule = bsoncxx::builder::stream::document{};

    rule << "_experiment" << open_document
         << "$exists" << true
         << "$type" << "string"
         << "$ne" << ""
         << close_document;

    rule << "cyclic" << open_document
         << "$exists" << true
         << "$type" << "bool"
         << close_document;

    rule << "va_cycle_datetime" << open_document
         << "$exists" << true
         << "$type" << "string"
         << close_document;

    rule << "description" << open_document
         << "$exists" << true
         << "$type" << "string"
         << close_document;

    rule << "solution" << open_document
         << "$exists" << true
         << "$type" << "string"
         << close_document;

    rule << "number_of_electrodes" << open_document
         << "$exists" << true
         << "$type" << "int"
         << close_document;

    rule << "equipment_id" << open_document
         << "$exists" << true
         << "$type" << "string"
         << close_document;

    validation.rule(rule.extract());
    options.validation_criteria(validation);

    return options;
}