const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const context = require('./context');
const cwd = path.resolve(__dirname, '../', '_template');


let mdImports = []
function getMdRoute(mdPath, prefix = '', preIndex = '') {
  prefix += '/';
  const dirs = fs.readdirSync(mdPath);
  const blackArr = ['node_modules'];
  let mdArr = [];
  dirs.forEach((dir, index) => {
    const absPath = path.resolve(mdPath, dir);
    const statObj = fs.statSync(absPath);
    if (!blackArr.includes(dir)) {
      if (statObj.isDirectory()) {
        const parent = {
          path: `${prefix}${dir}`,
          children: getMdRoute(absPath, `${prefix}${dir}`, (preIndex ? (preIndex + '-' + index) : String(index)))
        };
        mdArr = [...mdArr, parent];
      } else {
        if (path.extname(absPath) === '.md') {
          const name = `md${preIndex.replace(/-/g, '')}${index}`
          const resolvePaht = `${path.relative(cwd, absPath).replace(/\\/g, '/')}`
          mdImports.push({
            name,
            path: resolvePaht
          })
          const routerPath = `${prefix}${dir}`;
          mdArr.push({
            path: routerPath.replace('.md', ''),
            componentName: name
          });
        }
      }
    }
  });

  return mdArr;
}

function getRoutes() {
  mdImports = []
  const config = context.getConfig();
  const dir = config.mdEntry;
  const statObj = fs.statSync(dir);
  if (!statObj.isDirectory()) {
    console.error(chalk.red('mdEntry must be directory'));
    process.exit(1);
  }
  const routes = getMdRoute(dir)
  return {
    routes,
    mdImports,
  };
}

module.exports = getRoutes;
