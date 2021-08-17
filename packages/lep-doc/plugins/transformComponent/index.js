const transformReactComponent = require('./trasnform')
const transformReactComponentRender = require('./render')

module.exports = {
  plugins: [ transformReactComponent ],
  renderElementFuntions: [ transformReactComponentRender ]
}