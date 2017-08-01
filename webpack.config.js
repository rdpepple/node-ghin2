var webpack = require('webpack');

module.exports = (env = {}) => {
    const isProduction = env.production;
    if (isProduction) {
        exportObj = {
            entry: {
                'app': __dirname + '/app/main.aot.ts'
            },

            output: {
                path: __dirname + '/public/js/app',
                filename: 'bundle.js',
                publicPath: '/js/app/',
                chunkFilename: '[id].[hash].chunk.js'
            },

            resolve: {
                extensions: ['.js', '.ts']
            },

            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loaders: [
                            'awesome-typescript-loader',
                            'angular2-template-loader',
                            'angular2-router-loader?aot=true&genDir=public/js/app'
                        ]
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.css$/,
                        loader: 'raw-loader'
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        loader: "file-loader?name=/images/img-[hash:6].[ext]"
                    }
                ]
            },

            plugins: [
                new webpack.ContextReplacementPlugin(
                    // The (\\|\/) piece accounts for path separators in *nix and Windows
                    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                    './src' // location of your src
                ),
                new webpack.NoErrorsPlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: false
                })
            ]
        };
  } else {
        exportObj = {
            devtool: 'cheap-module-eval-source-map',
            
            entry: {
                'app': __dirname + '/app/main.ts'
            },

            output: {
                path: __dirname + '/public/js/app',
                publicPath: "/js/app/",
                filename: 'bundle.js',
                chunkFilename: '[id].chunk.js'
            },

            resolve: {
                extensions: ['.js', '.ts']
            },

            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loaders: [
                            'awesome-typescript-loader',
                            'angular2-template-loader',
                            'angular2-router-loader'
                        ]
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.css$/,
                        loader: 'raw-loader'
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        loader: "file-loader?name=/images/img-[hash:6].[ext]"
                    }
                ]
            },

            plugins: [
                new webpack.ContextReplacementPlugin(
                    // The (\\|\/) piece accounts for path separators in *nix and Windows
                    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                    './src' // location of your src
                )
            ]
        };
  }
  return exportObj;
}