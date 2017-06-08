const { ChainableOrderedMap } = require('./mutable');

module.exports = (parent) => ChainableOrderedMap(parent, [
  'hints',
  'maxEntrypointSize',
  'maxAssetSize',
  'assetFilter'
]);
