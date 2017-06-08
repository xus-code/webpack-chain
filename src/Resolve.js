const { ChainableOrderedMap, ChainableList } = require('./mutable');
const plugin = require('./Plugin');
const plugins = require('./Plugins');

module.exports = parent => {
  const resolve = ChainableOrderedMap(parent, [
    'enforceExtension',
    'enforceModuleExtension',
    'unsafeCache',
    'symlinks',
    'cachePredicate'
  ]);

  resolve
    .assoc('alias', ChainableOrderedMap(resolve))
    .assoc('aliasFields', ChainableList(resolve))
    .assoc('descriptionFiles', ChainableList(resolve))
    .assoc('extensions', ChainableList(resolve))
    .assoc('mainFields', ChainableList(resolve))
    .assoc('mainFiles', ChainableList(resolve))
    .assoc('modules', ChainableList(resolve))
    .assoc('plugins', plugins(resolve));

  return Object.assign(resolve, {
    plugin(name) {
      if (!resolve.plugins.has(name)) {
        resolve.plugins.set(name, plugin(resolve));
      }

      return resolve.plugins.get(name);
    }
  });
};
