'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {

  entry: [
    './index.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'components.min.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  }

};

module.exports = config;
