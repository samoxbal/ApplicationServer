//
// Created by samoxbal on 07.04.17.
//

#include "LinearRegression.h"

std::tuple<double, double, double> LinearRegression::getParameters(bsoncxx::document::view &data_src)
{
    std::vector<double> x_col{};
    std::vector<double> y_col{};

    for (auto& row : data_src["points"].get_array().value) {
        x_col.push_back(row[0].get_double().value);
        y_col.push_back(row[1].get_double().value);
    }

    std::size_t x_size = x_col.size();
    std::size_t y_size = y_col.size();

    std::vector<shark::RealVector> inputs(x_size, shark::RealVector(1));
    std::vector<shark::RealVector> labels(y_size, shark::RealVector(1));

    for (std::size_t i = 0; i < x_size; i++) {
        inputs[i](0) = x_col[i];
        labels[i](0) = y_col[i];
    }

    shark::Data<shark::RealVector> inputData = shark::createDataFromRange(inputs);
    shark::Data<shark::RealVector> labelData = shark::createDataFromRange(labels);

    shark::RegressionDataset dataset(inputData, labelData);
    shark::LinearRegression trainer;
    shark::LinearModel<> model;
    shark::SquaredLoss<> loss;

    trainer.train(model, dataset);
    shark::Data<shark::RealVector> predictions = dataset.inputs();

    double K_matrix = model.matrix()(0,0);
    double B_offset = model.offset()(0);
    double S_loss = loss(dataset.labels(), predictions);

    return std::tuple{K_matrix, B_offset, S_loss};
}