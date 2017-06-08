const { ChainableOrderedMap } = require('./mutable');
const Stats = require('./Stats');
const WatchOptions = require('./WatchOptions');

module.exports = (parent) => {
  const devServer = ChainableOrderedMap(parent, [
    'clientLogLevel',
    'compress',
    'contentBase',
    'filename',
    'headers',
    'historyApiFallback',
    'host',
    'hot',
    'hotOnly',
    'https',
    'inline',
    'lazy',
    'noInfo',
    'overlay',
    'port',
    'progress',
    'public',
    'publicPath',
    'proxy',
    'quiet',
    'setup',
    'staticOptions',
    'watchContentBase'
  ]);

  devServer
    .assoc('stats', Stats(devServer))
    .assoc('watchOptions', WatchOptions(devServer));

  return devServer;
};
