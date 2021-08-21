const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const context = require('./context');
const cwd = path.resolve(__dirname, '../', '_template');

function getMdRoute(mdPath, prefix = '') {
  prefix += '/';
  const dirs = fs.readdirSync(mdPath);
  const blackArr = ['node_modules'];
  let mdArr = [];
  dirs.forEach((dir) => {
    const absPath = path.resolve(mdPath, dir);
    const statObj = fs.statSync(absPath);
    if (!blackArr.includes(dir)) {
      if (statObj.isDirectory()) {
        const parent = {
          path: `${prefix}${dir}`,
          children: getMdRoute(absPath, `${prefix}${dir}`)
        };
        mdArr = [...mdArr, parent];
      } else {
        if (path.extname(absPath) === '.md') {
          const routerPath = `${prefix}${dir}`;
          mdArr.push({
            path: routerPath.replace('.md', ''),
            component: `require('./${path
              .relative(cwd, absPath)
              .replace(/\\/g, '/')}')`
          });
        }
      }
    }
  });

  return mdArr;
}

function getRoutes() {
  const config = context.getConfig();
  const dir = config.mdEntry;
  const statObj = fs.statSync(dir);
  if (!statObj.isDirectory()) {
    console.error(chalk.red('mdEntry must be directory'));
    process.exit(1);
  }
  return getMdRoute(dir);
}

module.exports = getRoutes;
