'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {

  context: path.join(__dirname, 'demo'),

  entry: [
    'webpack/hot/dev-server',
    './index.html',
    './app.jsx',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {test: /\.html$/, loader: 'file?name=[name].[ext]'},
      {test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  }

};

module.exports = config;
