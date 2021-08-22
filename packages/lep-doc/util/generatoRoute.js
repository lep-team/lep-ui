const React = require('react')
const { Route } = require('react-router-dom');
const render = require('../components/renderElement');

function generatorRoute(routes, renderFunctions = []) {
  return routes.map((r, index) => {
    if (r.children && r.children.length > 0) {
      return (
        <Route path={r.path} key={index}>
          {generatorRoute(r.children, renderFunctions)}
        </Route>
      );
    }
    if (r.component) {
      return (
        <Route
          key={index}
          path={r.path}
          children={() => render(r.component, renderFunctions)}
        />
      );
    }
    return null
  });
}

module.exports = generatorRoute;
