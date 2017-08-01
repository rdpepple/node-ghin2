var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        publicPath: "/js/app/",
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader?name=images/img-[hash:6].[ext]'
            }
        ]
    },
});