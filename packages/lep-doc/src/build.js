const webpack = require('webpack');

const getWebpackConfig = require('../util/getWebpackConfig');

const generatorFiles = require('./generator');

const { setNodeEnv } = require('../util');
const chalk = require('chalk');

function build() {
  setNodeEnv('production');
  generatorFiles();
  const webpackConfig = getWebpackConfig();
  const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) {
      return console.error(chalk.red(err));
    }
    if (stats.hasErrors()) {
      return console.error(
        stats.toString({
          colors: true
        })
      );
    }
  });
}

module.exports = build;
