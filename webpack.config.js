'use strict';
const webpack = require('webpack');
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = './app/src';
const DIST = 'app/dist';

module.exports = {
  entry: {
    app: ROOT + '/index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, DIST),
    publicPath: '/'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // 터미널 창에 출력되는 게 보기 귀찮아서 추가.
        unused: true // tree shaking
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // 아래 부분이 핵심
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: './app/src/index.html',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    }]
  }
};

process.noDeprecation = true;