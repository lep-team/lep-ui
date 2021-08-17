const path = require('path')
const hjsPluginPath = require('./plugin-highlight')
module.exports = {
  plugins: [ hjsPluginPath ],
  cssFiles: [ 'highlight.js/styles/default.css' ]
}