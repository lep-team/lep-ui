const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const { mkDir } = require('../util');
const context = require('../util/context');
const getRoutes = require('../util/getRoutes');
const stringify = require('../util/stringify')

const entryTemplatePath = path.resolve(__dirname, '..', 'template');
const outputTemplatePath = path.resolve(__dirname, '..', '_template');

const getRoute = require('../template/route')

function generatorFiles() {
  let { cssFiles, renderElementFuntions } = context.getConfig();
  const { routes, mdImports } = getRoutes();
  const entryTemplateFile = path.resolve(entryTemplatePath, 'index.ejs');
  const outTemplateFile = path.resolve(outputTemplatePath, 'index.js');
  const templateContent = fs.readFileSync(entryTemplateFile, 'utf-8');
  const inputHtml = path.resolve(entryTemplatePath, 'index.html');
  const outHtmlFile = path.resolve(outputTemplatePath, 'index.html');
  const outputHtml = fs.readFileSync(inputHtml, 'utf-8');
  mkDir(outputTemplatePath);
  const content = ejs.render(templateContent, {
    routes,
    cssFiles,
    getRoute,
    mdImports,
    renderElementFuntions: `[${renderElementFuntions.map((fn) =>
      fn.toString()
    )}]`
  });
  fs.writeFileSync(outTemplateFile, content);

  const htmlContent = ejs.render(outputHtml);
  fs.writeFileSync(outHtmlFile, htmlContent);
}

module.exports = generatorFiles;
