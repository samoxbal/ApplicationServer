//
// Created by samoxbal on 04.04.17.
//

#include "ModelValidator.h"

void ModelValidator::validateVoltamogramm(Poco::JSON::Object::Ptr &voltamogramm)
{
    if ((voltamogramm->get("cyclic")).isEmpty()) {
        this->valid = false;
    }
}