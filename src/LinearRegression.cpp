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

    arma::mat data(x_col.size(), 2);

    for (int i = 0; i < x_col.size(); ++i) {
        data(i, 0) = x_col[i];
        data(i, 1) = y_col[i];
    }

    auto lr = mlpack::regression::LinearRegression(data, arma::vec(y_col));

    return lr.Parameters();
}