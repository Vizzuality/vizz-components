const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

  context: path.join(__dirname, 'components'),

  entry: [
    './index.js'
  ],

  output: {
    filename: 'components.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({})
  ]

};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'eval-source-map';
}

module.exports = config;
