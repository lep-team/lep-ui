const chalk = require('chalk')
const { checkNodeVersion } = require('../util')
const context = require('../util/context')

function runCli(order, customConfig = {}) {
  checkNodeVersion()
  try {
    const cmd = require(`./${order}`)
    context.initialized(customConfig);
    cmd()
  } catch (error) {
    console.log(error)
    console.error(chalk.red(`unknow order: ${order}`));
    process.exit(1);
  }
}


module.exports = {
  runCli
}