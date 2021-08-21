const { Route } = require('react-router-dom');
const render = require('../components/renderElement');

function generatorRoute(routes, renderFunctions = []) {
  routes.map((r) => {
    if (r.children && r.children.length > 0) {
      return (
        <Route path={r.path}>
          {generatorRoute(r.children, renderFunctions)}
        </Route>
      );
    } else {
      return (
        <Route
          path={r.path}
          children={() => render(r.compnent, renderFunctions)}
        />
      );
    }
  });
}

module.exports = generatorRoute;
