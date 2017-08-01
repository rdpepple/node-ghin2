var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var path = require('path');
var commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        'app': __dirname + '/app/main.aot.ts'
    },

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: 'bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader?aot=true&genDir=public/js/app'
                ]
            },        
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader?name=images/img-[hash:6].[ext]'
            }
        ],
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        })
    ]
});