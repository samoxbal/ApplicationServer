//
// Created by samoxbal on 07.04.17.
//

#ifndef VASCAN_LINEARREGRESSION_H
#define VASCAN_LINEARREGRESSION_H

#include <mlpack/methods/linear_regression/linear_regression.hpp>
#include <bsoncxx/document/view.hpp>
#include <bsoncxx/types.hpp>

class LinearRegression {
public:
    arma::vec getParameters(bsoncxx::document::view& data_src);
};


#endif //VASCAN_LINEARREGRESSION_H
