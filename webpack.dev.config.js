const webpack = require('webpack');
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 4001;
const ROOT = './app/src';

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',

    `webpack-dev-server/client?http://localhost:${PORT}`,
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    resolve(ROOT, 'indexDev')
    // the entry point of our app
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new HtmlWebpackPlugin({
      template: `${ROOT}/index.html`
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    }]
  },
  devServer: {
    hot: true,
    inline: true,
    port: PORT,
    historyApiFallback: true,
    contentBase: ROOT
  }
};

process.noDeprecation = true;