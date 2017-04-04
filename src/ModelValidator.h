//
// Created by samoxbal on 04.04.17.
//

#ifndef VASCAN_MODELVALIDATOR_H
#define VASCAN_MODELVALIDATOR_H

#include <Poco/JSON/Object.h>

class ModelValidator {
public:
    bool valid;
    void validateVoltamogramm(Poco::JSON::Object::Ptr& voltamogramm);
};


#endif //VASCAN_MODELVALIDATOR_H
