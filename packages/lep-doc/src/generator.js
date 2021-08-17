const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

const {
  mkDir
} = require("../util");
const context = require('../util/context')
const getRoutes = require('../util/getRoutes')

const entryTemplatePath = path.resolve(__dirname, "..", "template");
const outputTemplatePath = path.resolve(__dirname, "..", "_template");

function generatorFiles() {
  let { cssFiles, renderElementFuntions } = context.getConfig()
  const routes = getRoutes();
  const entryTemplateFile = path.resolve(entryTemplatePath, "index.ejs");
  const outTemplateFile = path.resolve(outputTemplatePath, "index.js");
  const templateContent = fs.readFileSync(entryTemplateFile, "utf-8");
  mkDir(outputTemplatePath);
  const content = ejs.render(templateContent, {
    routes,
    cssFiles,
    renderElementFuntions: `[${renderElementFuntions.map(fn => fn.toString() )}]`
  });
  fs.writeFileSync(outTemplateFile, content);
}

module.exports = generatorFiles