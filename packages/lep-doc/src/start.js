const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const portfinder = require('portfinder')

const getWebpackConfig = require("../util/getWebpackConfig");

const generatorFiles = require('./generator')

const {
  setNodeEnv,
} = require("../util");
const chalk = require("chalk");

async function start() {
  try {
    setNodeEnv("development");
    generatorFiles()
    const webpackConfig = getWebpackConfig();
    const port = await portfinder.getPortPromise()
    const options = {
      hot: true,
      host: '0.0.0.0',
      port,
      historyApiFallback: true
    };
    const compiler = webpack(webpackConfig);
    const server = new webpackDevServer(compiler, options);

    server.listen(port, '0.0.0.0', (err) => {
      if (err) {
        return console.error(chalk.red(err))
      }
      console.log('----------------------------------')
      console.log(chalk.green(`doc server run in http://localhost:${port}`));
      console.log('----------------------------------')
    });
  } catch (error) {
    console.error(chalk.red(error))
  }
}

module.exports = start;
