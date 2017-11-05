const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body',
})

new FaviconsWebpackPlugin({
  logo: 'static/logo.svg',
  inject: true,
  title: 'material',
  persistentCache: true,
  icons: {
    favicons: true,
    appleIcon: true,
    appleStartup: true,
    firefox: true,
    android: true,
  },
})

module.exports = {
  devtool: 'eval',
  entry: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot-loader/webpack', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.jsx$/, loaders: ['react-hot-loader/webpack', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              alias: {
                '../fonts/bootstrap': 'bootstrap-sass/assets/fonts/bootstrap',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve('./node_modules/bootstrap-sass/assets/stylesheets')],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['absolute/path/a', 'absolute/path/b'],
            }, // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=img/[path][name].[ext]&context=./app/images',
      },
    ],
  },
}
