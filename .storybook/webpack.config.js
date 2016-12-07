const path = require('path');

module.exports = function(storybookBaseConfig, configType) {

  storybookBaseConfig.module.loaders.push({
    test: /\.(scss|sass)$/,
    loaders: ['style', 'css', 'sass', 'postcss'],
    include: path.resolve(__dirname, '../')
  });

  return storybookBaseConfig;
};
