const fs = require('fs');

function setNodeEnv(env) {
  process.env.NODE_ENV = env;
}

function getNodeEnv() {
  return process.env.NODE_ENV || 'development';
}

function mkDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  return true;
}

function checkNodeVersion() {
  const SUPPORT_VERSION = 12;
  const version = process.version.substring(1);
  const versionNum = version.split('.')[0];
  if (versionNum < SUPPORT_VERSION) {
    throw Error('node version must be v12+');
  }
}

module.exports = {
  getNodeEnv,
  setNodeEnv,
  mkDir,
  checkNodeVersion
};
