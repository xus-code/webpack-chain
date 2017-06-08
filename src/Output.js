const { ChainableOrderedMap } = require('./mutable');

module.exports = (parent) => ChainableOrderedMap(parent, [
  'chunkFilename',
  'chunkLoadTimeout',
  'crossOriginLoading',
  'devtoolFallbackModuleFilenameTemplate',
  'devtoolLineToLine',
  'devtoolModuleFilenameTemplate',
  'filename',
  'hashDigest',
  'hashDigestLength',
  'hashFunction',
  'hashSalt',
  'hotUpdateChunkFilename',
  'hotUpdateFunction',
  'hotUpdateMainFilename',
  'jsonpFunction',
  'library',
  'libraryTarget',
  'path',
  'pathinfo',
  'publicPath',
  'sourceMapFilename',
  'sourcePrefix',
  'strictModuleExceptionHandling',
  'umdNamedDefine'
]);
