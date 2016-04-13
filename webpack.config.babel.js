'use strict';

import webpack from 'webpack';
import path from 'path';

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
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }

};

export default config;
