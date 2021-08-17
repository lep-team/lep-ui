const React = require('react')

function render(node, key) {
  const { type, value } = node
  if (type === 'function') {
    const child = value();
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { key })
    }
    return null
  }
}

module.exports = render;
