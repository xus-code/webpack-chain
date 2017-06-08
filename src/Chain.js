const { ChainableOrderedMap, ChainableList } = require('./mutable');
const DevServer = require('./DevServer');
const Plugins = require('./Plugins');
const Plugin = require('./Plugin');
const Resolve = require('./Resolve');
const ResolveLoader = require('./ResolveLoader');
const Module = require('./Module');
const Output = require('./Output');
const Performance = require('./Performance');
const Stats = require('./Stats');
const WatchOptions = require('./WatchOptions');

const Chain = () => {
  const chain = ChainableOrderedMap(null, [
    'amd',
    'bail',
    'cache',
    'context',
    'devtool',
    'externals',
    'loader',
    'profile',
    'recordsPath',
    'recordsInputPath',
    'recordsOutputPath',
    'target',
    'watch'
  ]);

  chain
    .assoc('entryPoints', ChainableOrderedMap(chain))
    .assoc('node', ChainableOrderedMap(chain))
    .assoc('devServer', DevServer(chain))
    .assoc('output', Output(chain))
    .assoc('performance', Performance(chain))
    .assoc('plugins', Plugins(chain))
    .assoc('module', Module(chain))
    .assoc('resolve', Resolve(chain))
    .assoc('resolveLoader', ResolveLoader(chain))
    .assoc('stats', Stats(chain))
    .assoc('watchOptions', WatchOptions(chain));

  return Object.assign(chain, {
    __toConfig: chain.toConfig,
    entry(name) {
      if (!chain.entryPoints.has(name)) {
        chain.entryPoints.set(name, ChainableList(chain));
      }

      return chain.entryPoints.get(name);
    },

    plugin(name) {
      if (!chain.plugins.has(name)) {
        chain.plugins.set(name, Plugin(chain));
      }

      return chain.plugins.get(name);
    },

    toConfig() {
      const config = chain.__toConfig();

      if (config.entryPoints) {
        config.entry = config.entryPoints;
        delete config.entryPoints;
      }

      return config;
    }
  });
};

module.exports = { Chain };
