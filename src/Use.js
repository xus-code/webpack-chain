const { ChainableOrderedMap } = require('./mutable');

module.exports = parent => {
  const use = ChainableOrderedMap(parent, ['loader', 'options']);

  return Object.assign(use, {
    tap(f) {
      return use.options(f(use.get('options')));
    }
  });
};
