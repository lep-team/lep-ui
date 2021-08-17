const chalk = require("chalk");
const context = require("../../util/context");

function createNode(options = {}) {
  const { type = "", value, props = {}, children = [] } = options;
  return {
    type,
    value,
    props,
    children,
  };
}

function transform(node, options = {}) {
  const { isThead = false } = options;
  const { type, depth, value, lang, ordered, title, url, alt, align } = node;
  const ele = createNode();
  ele.type = "dom";
  switch (type) {
    case "root":
      ele.value = "article";
      break;
    case "heading":
      ele.value = `h${depth}`;
      break;
    case "paragraph":
      ele.value = "p";
      break;
    case "text":
      ele.type = "text";
      ele.value = value;
      break;
    case "code":
      ele.value = "pre";
      ele.props = {
        lang,
      };
      const children = [
        createNode({
          type: "dom",
          value: "code",
          children: [
            createNode({
              type: "text",
              value
            }),
          ],
        }),
      ];
      ele.children = children;
      break;
    case "list":
      ele.value = ordered ? "ol" : "ul";
      break;
    case "listItem":
      ele.value = "li";
      break;
    case "break":
      ele.value = "br";
    case "thematicBreak":
      ele.value = "hr";
      break;
    case "linkReference":
      ele.value = "span";
      break;
    case "image":
      ele.value = "img";
      ele.props = {
        title,
        src: url,
        alt,
      };
      break;
    case "link":
      ele.value = "a";
      ele.props = {
        title,
        href: url,
      };
      break;
    case "emphasis":
      ele.value = "em";
      break;
    case "inlineCode":
      ele.value = "code";
      ele.children = [createNode({ type: 'text', value })];
      break;
    case "table":
      ele.value = "table";
      ele.props = {
        align,
      };
      break;
    case "tableCell":
      ele.value = isThead ? "th" : "td";
      break;
    case "tableRow":
      ele.value = "tr";
      break;
    default:
      ele.value = type;
      break;
  }

  return ele;
}

function onion(plugins, node, isFirst = false) {
  if (!plugins || !Array.isArray(plugins) || plugins.length <= 0) {
    return node;
  }
  return plugins.reduce((data, next, i) => {
    try {
      if (typeof next !== 'function') {
        throw Error('plugin must export function')
      }
    } catch (error) {
      console.error(chalk.red(error.message))
      process.exit(1)
    }
    const nextData = next(data)
    if (typeof nextData !== 'object' || nextData === null) {
      return data
    }
    const keys = Object.keys(createNode())
    const newData = {}
    keys.forEach(key => {
      const value = nextData[key]
      newData[key] = value ? value : data[key]
    })
    if (newData.children && newData.children.length > 0) {
      newData.children = newData.children.map(child => onion(isFirst ? plugins.slice(i+1) : plugins, child))
    }
    return newData
  }, node)
}

module.exports = function sequlizeNodes(nodes, options = {}) {
  const { plugins } = context.getConfig();
  const children = [];
  nodes.forEach((node) => {
    const ele = onion(plugins, transform(node, options), true);
    if (
      Array.isArray(ele.children) &&
      node.children &&
      node.children.length > 0
    ) {
      if (ele.type ==='dom' && ele.value === "table") {
        const [thead, ...tbody] = node.children;
        ele.children = [
          createNode({
            type: "dom",
            value: 'thead',
            props: {},
            children: sequlizeNodes([thead], { isThead: true }),
          }),
          createNode({
            type: "dom",
            value: 'tbody',
            props: {},
            children: tbody ? sequlizeNodes(tbody) : [],
          }),
        ];
      } else {
        ele.children = sequlizeNodes(node.children, options);
      }
    }
    children.push(ele);
  });
  return children;
};
