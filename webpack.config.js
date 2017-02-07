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
    library: ['VizzComponents'],
    path: path.join(rootPath, 'dist'),
    filename: 'index.js'
  },

  externals: {
    'react': 'React'
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
        loader: 'style!css!'
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
