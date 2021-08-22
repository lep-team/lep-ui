const gfm = require("remark-gfm");
const sequlizeNodes = require("./transform");
const remark = require("remark");
const stringify = require('../../util/stringify')

module.exports = (source) => {
  const mdParseContent = remark().use(gfm).parse(source);
  const nodes = sequlizeNodes([mdParseContent]);
  return `export default ${stringify(nodes)}`;
};
