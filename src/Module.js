const { ChainableOrderedMap, ChainableList } = require('./mutable');
const rule = require('./Rule');

module.exports = parent => {
  const module = ChainableOrderedMap(parent);
  const rules = ChainableOrderedMap(module);

  module
    .assoc('rules', rules)
    .assoc('noParse', ChainableList(module));

  Object.assign(rules, {
    toConfig() {
      return rules.toArray().map(rule => rule.toConfig());
    }
  });

  return Object.assign(module, {
    rule(name) {
      if (!module.rules.has(name)) {
        module.rules.set(name, rule(module));
      }

      return module.rules.get(name);
    }
  });
};
