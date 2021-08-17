const hjs = require("highlight.js");

function getHighlightCode (lang, code) {
  if (lang && hjs.getLanguage(lang)) {
    return hjs.highlight(code, { language: lang }).value;
  }
  return code
}

module.exports = function highlight(node) {
  const { value, type, props, children } = node;
  if (type === "dom" && value === "pre") {
    const { lang } = props
    const code = children[0].children[0].value
    return {
      children: [
        {
          ...children[0],
          props: {
            dangerouslySetInnerHTML: { __html: getHighlightCode(lang, code) }
          },
          children: []
        }
      ]
    };
  }
};
