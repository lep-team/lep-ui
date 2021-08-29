const gfm = require('remark-gfm');
const sequlizeNodes = require('./transform');
const remark = require('remark');
const stringify = require('../../util/stringify');

module.exports = function (source) {
  const mdParseContent = remark().use(gfm).parse(source);
  const nodes = sequlizeNodes.call(this, [mdParseContent]);
  return `export default ${stringify(nodes)}`;
};
