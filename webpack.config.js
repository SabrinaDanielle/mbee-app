var path = require('path');
var webpack = require('webpack');
    
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader', exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            } ,

            {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {}  
                }
              ]
            },

            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            },
            {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192
                  }
                }
              ]
            },
            {
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: "style-loader"
                },
                {
                  loader: "css-loader",
                  options: {
                    alias: {
                      "../fonts/bootstrap": "bootstrap-sass/assets/fonts/bootstrap"
                    }
                  }
                },
                {
                  loader: "sass-loader",
                  options: {
                    includePaths: [
                      path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
                    ]
                  }
                }
              ]
            }
             
        ]
    },

    
    
    stats: {
        colors: true
    },
    devtool: 'source-map'
};