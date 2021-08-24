const ejs = require('ejs');
const routeTemplate = `
<Switch>
  <% routes.forEach(function(r, index) { %>
      <% if (r.children && r.children.length > 0) { %>
        <Route path="<%- r.path %>" key="<%= index %>">
          <%- getRoute({ 'routes': r.children, 'getRoute': getRoute }) %>
        </Route>
      <% } %>
      <% if (r.componentName) { %>
        <Route
          key="<%= index %>"
          path="<%- r.path %>"
          exact
          component={() => render(<%= r.componentName %>, renderFunctions)}
        />
      <% }  %>
    <% }) %>
</Switch>
  `;

const getRoute = (data) => {
  return ejs.render(routeTemplate, data);
};

module.exports = getRoute;
