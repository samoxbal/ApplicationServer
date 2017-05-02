//
// Created by samoxbal on 07.04.17.
//

#ifndef VASCAN_LINEARREGRESSION_H
#define VASCAN_LINEARREGRESSION_H

#include <shark/Data/Dataset.h>
#include <shark/Algorithms/Trainers/LinearRegression.h>
#include <shark/ObjectiveFunctions/Loss/SquaredLoss.h>
#include <bsoncxx/document/view.hpp>
#include <bsoncxx/types.hpp>

class LinearRegression {
public:
    double getParameters(bsoncxx::document::view& data_src);
};


#endif //VASCAN_LINEARREGRESSION_H
