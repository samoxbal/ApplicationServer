//
// Created by samoxbal on 07.04.17.
//

#include "LinearRegression.h"

arma::vec LinearRegression::getParameters(bsoncxx::document::view &data_src)
{
    std::vector<double> x_col{};
    std::vector<double> y_col{};

    for (auto& row : data_src["points"].get_array().value) {
        x_col.push_back(row[0].get_double().value);
        y_col.push_back(row[1].get_double().value);
    }

    arma::mat data(arma::vec(x_col), arma::vec(y_col));
    arma::vec responses = arma::vec(y_col);

    mlpack::regression::LinearRegression lr(data, responses);

    return lr.Parameters();
}