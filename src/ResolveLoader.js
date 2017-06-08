const { ChainableOrderedMap, ChainableList } = require('./mutable');

module.exports = parent => {
  const resolveLoader = ChainableOrderedMap(parent);

  return resolveLoader
    .assoc('extensions', ChainableList(resolveLoader))
    .assoc('mainFields', ChainableList(resolveLoader))
    .assoc('modules', ChainableList(resolveLoader))
    .assoc('moduleExtensions', ChainableList(resolveLoader))
    .assoc('packageMains', ChainableList(resolveLoader));
};
