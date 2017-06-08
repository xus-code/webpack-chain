const { ChainableOrderedMap } = require('./mutable');

module.exports = parent => {
  const plugins = ChainableOrderedMap(parent);

  return Object.assign(plugins, {
    toConfig() {
      return plugins.toArray().map(plugin => plugin.toConfig());
    }
  });
};
