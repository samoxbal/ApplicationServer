//
// Created by samoxbal on 07.04.17.
//

#include "LinearRegression.h"

double LinearRegression::getParameters(bsoncxx::document::view &data_src)
{
    shark::RealVector x_col{};
    shark::RealVector y_col{};

    for (auto& row : data_src["points"].get_array().value) {
        x_col.push_back(row[0].get_double().value);
        y_col.push_back(row[1].get_double().value);
    }

    std::vector<shark::RealVector> inputs{x_col};
    std::vector<shark::RealVector> labels{y_col};

    shark::Data<shark::RealVector> inputData = shark::createDataFromRange(inputs, x_col.size());
    shark::Data<shark::RealVector> labelData = shark::createDataFromRange(labels, y_col.size());

    shark::RegressionDataset dataset(inputData, labelData);
    shark::LinearRegression trainer;
    shark::LinearModel<> model;
    shark::SquaredLoss<> loss;

    trainer.train(model, dataset);
    shark::Data<shark::RealVector> predictions = dataset.inputs();

    return loss(dataset.labels(), predictions);
}