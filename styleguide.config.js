// const path = require('path');

module.exports = {
  showCode: true,
  showUsage: true,
  skipComponentsWithoutExample: true,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader?modules!sass-loader'
        }
      ]
    }
  }
};
