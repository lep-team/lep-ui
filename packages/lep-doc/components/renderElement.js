const React = require("react");

let renderElementFns = [];

function renderElement(node, key) {
  const { type, value, children, props } = node;
  for (let i = 0; i < renderElementFns.length; i++) {
    const fn = renderElementFns[i];
    const element = fn(node, key)
    if (element !== undefined) {
      return element
    }
  }
  if (type === "dom") {
    let Child = null;
    if (children && children.length > 0) {
      Child = renderElements(children);
    }
    return React.createElement(value, { key, ...props }, Child);
  } else {
    return value;
  }
}

function renderElements(children) {
  return children.map((child, index) => {
    return renderElement(child, index);
  });
}

function render(sequlize, renderElementFuntions) {
  sequlize = sequlize.default;
  if (
    renderElementFuntions &&
    Array.isArray(renderElementFuntions) &&
    renderElementFuntions.length > 0
  ) {
    renderElementFns = renderElementFuntions
  }
  return renderElements(sequlize);
}

module.exports = render;
