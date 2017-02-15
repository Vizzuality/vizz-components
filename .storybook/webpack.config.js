const path = require('path');

module.exports = function(storybookBaseConfig, configType) {

  storybookBaseConfig.module.loaders.push({
    test: /\.css$/,
    loaders: ['style', 'css'],
    include: path.resolve(__dirname, '../')
  });

  storybookBaseConfig.module.loaders.push({
    test: /\.(scss|sass)$/,
    loaders: ['style', 'css', 'sass', 'postcss'],
    include: path.resolve(__dirname, '../')
  });

  storybookBaseConfig.module.loaders.push({
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'url-loader?limit=5000',
    include: path.resolve(__dirname, '../')
  });

  return storybookBaseConfig;
};
