var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: __dirname + '/public/js/app',
        publicPath: "/js/app/",
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    }
};