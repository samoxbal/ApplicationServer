const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
    devtool: isProduction ? 'source-map' : 'eval',
    entry: !isProduction ? [
      'webpack-dev-server/client?http://localhost:3002',
      'webpack/hot/only-dev-server',
      './frontend/js/index'
    ] : [
        './frontend/js/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: isProduction ? ['babel-loader'] : ['react-hot-loader', 'babel-loader'],
                include: [path.join(__dirname, 'frontend/js')]
            },
            {   test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        },
                        { loader: 'postcss-loader' }
                    ]
                }),
                include: path.join(__dirname, 'frontend/assets/css')
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                include: path.join(__dirname, 'frontend/assets/fonts')
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                    limit: '100000'
                },
                include: path.join(__dirname, 'frontend/assets/fonts')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    limit: '100000'
                },
                include: path.join(__dirname, 'frontend/assets/images')
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: 3002,
        publicPath: '/static/',
        hot: true,
        historyApiFallback: true,
        inline: true,
        proxy: {
          "*": "http://localhost:3000"
        }
    }
};
