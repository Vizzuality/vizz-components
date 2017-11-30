const path = require('path');

module.exports = {
  showCode: true,
  showUsage: true,
  skipComponentsWithoutExample: true,
  webpackConfig: {
    devtool: 'source-map',
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
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules'
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      alias: {
        mocks: path.resolve(__dirname, './mocks'),
        helpers: path.resolve(__dirname, './src/helpers')
      }
    }
  }
};
