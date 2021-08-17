const path = require("path");
const chalk = require("chalk");
const merge = require("merge");
const cwd = process.cwd();

const defaultConfig = {
  mdEntry: cwd,
  output: path.resolve(cwd, "dist"),
  plugins: [],
  cssFiles: [],
  renderElementFuntions: [],
  configFiles: []
};

let config = defaultConfig;

function initialized(customConfig) {
  if (typeof customConfig !== "object" || customConfig === null) {
    console.error(chalk.red("config must be object"));
    process.exit(1);
  }
  config = merge(true, defaultConfig, customConfig);
  const { configFiles } = config
  if (configFiles && configFiles.length > 0) {
    try {
      configFiles.forEach(c => {
        const configObj = c || {}
        mergeConfigFile(configObj)
      })
    } catch (error) {
      console.error(`cant not find configFile path: ${c}`);
      process.exit(1);
    }
  }
}

function mergeConfigFile (configFileObj = {}) {
  const { plugins, cssFiles, renderElementFuntions } = configFileObj
  const { plugins: configPlugins, cssFiles: configCssFiles, renderElementFuntions: configRenderElementFunctions  } = config
  config = merge(true, config, configFileObj);
  config.plugins = mergeArray(plugins, configPlugins)
  config.cssFiles = mergeArray(cssFiles, configCssFiles)
  config.renderElementFuntions = mergeArray(renderElementFuntions, configRenderElementFunctions)
}

function mergeArray (arr, baseArr) {
  let mergeArr = [ ...baseArr ]
  if (arr && Array.isArray(arr)) {
    mergeArr = [ ...mergeArr, ...arr ]
  }
  return mergeArr
}


module.exports = {
  getConfig: function() {
    return config;
  },
  initialized,
};
