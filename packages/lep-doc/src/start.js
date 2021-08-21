const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const portfinder = require('portfinder');

const getWebpackConfig = require('../util/getWebpackConfig');

const generatorFiles = require('./generator');

const { setNodeEnv } = require('../util');
const chalk = require('chalk');

async function start() {
  try {
    setNodeEnv('development');
    generatorFiles();
    const webpackConfig = getWebpackConfig();
    const port = await portfinder.getPortPromise();
    const options = {
      hot: true,
      host: '0.0.0.0',
      port,
      historyApiFallback: true
    };
    const compiler = webpack(webpackConfig);
    const server = new webpackDevServer(options, compiler);

    server.start(port, '0.0.0.0', (err) => {
      if (err) {
        return console.error(chalk.red(err));
      }
    });
  } catch (error) {
    console.error(chalk.red(error));
  }
}

module.exports = start;
