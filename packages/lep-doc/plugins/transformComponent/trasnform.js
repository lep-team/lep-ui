const { transformSync } = require('@babel/core');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const type = require('@babel/types');
const getBabelConfig = require('../../util/getBabelConfig');
function transform(source) {
  const options = {
    ast: true,
    filename: this.resourcePath,
    ...getBabelConfig()
  };
  let { ast } = transformSync(source, options);
  let returnStatement;
  traverse(ast, {
    CallExpression: {
      exit(path) {
        if (
          path.node.callee &&
          path.node.callee.object &&
          path.node.callee.object.loc &&
          path.node.callee.object.loc.identifierName === 'ReactDOM' &&
          path.node.callee.property &&
          path.node.callee.property.name === 'render'
        ) {
          returnStatement = type.returnStatement(path.node.arguments[0]);
          path.remove();
        }
      }
    }
  });
  if (returnStatement) {
    ast.program.body.push(returnStatement);
  }
  return generator(ast).code;
}

function transformReactComponent(node) {
  const { value, type, props, children } = node;
  if (type === 'dom' && value === 'pre') {
    const { lang } = props;
    if (lang === 'js') {
      const code = children[0].children[0].value;
      return {
        type: 'dom',
        value: 'section',
        props: {},
        children: [
          {
            type: 'dom',
            value: 'section',
            props: {},
            children: [
              {
                type: 'function',
                value: new Function(transform.call(this, code))
              }
            ]
          },
          node
        ]
      };
    }
  }
}

module.exports = transformReactComponent;
