const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const rootPath = process.cwd();

const config = {

  context: path.join(rootPath, 'components'),

  entry: [
    './index.js'
  ],

  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'index.js',
    library: 'vizz-components',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  resolve: {
    root: [
      rootPath
    ],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      }, {
        test: /\.(scss|sass)$/,
        loaders: ['style', 'css', 'sass', 'postcss']
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=5000'
      }
    ]
  },

  postcss() {
    return [autoprefixer];
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({})
  ]

};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'eval-source-map';
} else {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true
    },
    comments: false
  }));
}

module.exports = config;
