const { ChainableOrderedMap, ChainableList } = require('./mutable');
const Use = require('./Use');

module.exports = parent => {
  const rule = ChainableOrderedMap(parent, [
    'enforce',
    'issuer',
    'parser',
    'resourceQuery',
    'test'
  ]);
  const uses = ChainableOrderedMap(rule);

  Object.assign(uses, {
    toConfig() {
      return uses.toArray().map(value => value.toConfig());
    }
  });

  rule
    .assoc('uses', uses)
    .assoc('include', ChainableList(rule))
    .assoc('exclude', ChainableList(rule));

  return Object.assign(rule, {
    __toConfig: rule.toConfig,

    pre() {
      return rule.enforce('pre');
    },

    post() {
      return rule.enforce('post');
    },

    use(name) {
      if (!rule.uses.has(name)) {
        rule.uses.set(name, Use(rule));
      }

      return rule.uses.get(name);
    },

    toConfig() {
      const config = rule.__toConfig();

      if (config.uses) {
        config.use = config.uses;
        delete config.uses;
      }

      return config;
    }
  });
};
