const getBabelConfig = require('./build/config/babel.config').default;

module.exports = (api) => getBabelConfig(api);
