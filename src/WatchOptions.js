const { ChainableOrderedMap } = require('./mutable');

module.exports = parent => ChainableOrderedMap(parent, [
  'aggregateTimeout',
  'ignored',
  'poll'
]);
