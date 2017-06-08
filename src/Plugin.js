const { ChainableOrderedMap, ChainableList } = require('./mutable');

module.exports = parent => {
  const plugin = ChainableOrderedMap(parent, ['init'])
    .init((Plugin, args) => new Plugin(...args));

  plugin.assoc('args', ChainableList(plugin));

  return Object.assign(plugin, {
    use(Plugin) {
      return plugin.set('plugin', Plugin);
    },

    toConfig() {
      return plugin.get('init')(plugin.get('plugin'), plugin.get('args').toConfig());
    }
  });
};
