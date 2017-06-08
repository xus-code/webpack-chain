# webpack-chain

Use a chaining API to generate and simplify the modification of Webpack 2 configurations.

This README corresponds to v4 of webpack-chain.

[v3 docs](#) |
[v2 docs](https://github.com/mozilla-neutrino/webpack-chain/tree/v2) |
[v1 docs](https://github.com/mozilla-neutrino/webpack-chain/tree/v1.4.3)

## Introduction

Webpack's core configuration is based on creating and modifying a
potentially unwieldy JavaScript object. While this is OK for configurations
on individual projects, trying to share these objects across projects and
make subsequent modifications gets messy, as you need to have a deep
understanding of the underlying object structure to make those changes.

`webpack-chain` attempts to improve this process by providing a chainable or
fluent API for creating and modifying Webpack configurations. Key portions
of the API can be referenced by user-specified names, which helps to
standardize how to modify a configuration across projects.

Chains are backed using Immutable.js collections, but **are mutable by default**. This
allows you to accumulate stateful configuration changes against a Chain reference
without constantly overwriting and tracking a variable. See the documentation below
for details on switching the configuration to an immutable collection.

## Contributing

`webpack-chain` follows the same contributing guide as [Neutrino](https://neutrino.js.org/contributing).

We welcome any contributor. Just fork and clone, make changes, and send a pull request.

## Installation

`webpack-chain` requires Node.js v6.9 and higher.
`webpack-chain` only creates configuration objects designed for use in Webpack 2.

You may install this package using either Yarn or npm (choose one):

**Yarn**

```bash
yarn add --dev webpack-chain
```

**npm**

```bash
npm install --save-dev webpack-chain
```

## Getting Started

Once you have `webpack-chain` installed, you can start creating a
Webpack configuration. For this guide, our example base configuration will
be `webpack.config.js` in the root of our project directory.

```js
// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const { Chain } = require('webpack-chain');

// Create a new Chain configuration
const config = Chain();

// Make configuration changes using the chain API.
// Every API call tracks a change to the stored configuration.

// Interact with entry points
config
  .entry('index')
    .add('src/index.js')
    .end()
  // Modify output settings
  .output
    .path('dist')
    .filename('[name].bundle.js');

// Create named rules which can be modified later
config.module
  .rule('lint')
    .test(/\.js$/)
    .pre()
    .include
      .add('src')
      .end()
    // Even create named uses (loaders) for later modification
    .use('eslint')
      .loader('eslint-loader')
      .options({
        rules: {
          semi: 'off'
        }
      });

config.module
  .rule('compile')
    .test(/\.js$/)
    .include
      .add('src')
      .add('test')
      .end()
    .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          ['babel-preset-es2015', { modules: false }]
        ]
      });

// Create named plugins, too!
config
  .plugin('clean')
    .use(CleanPlugin)
    .args
      .add('dist')
      .add({ root: '/dir' });

// Export the completed configuration object to be consumed by Webpack
module.exports = config.toConfig();
```

Having shared configurations is also simple. Just export the configuration
and call `.toConfig()` prior to passing to Webpack.

```js
// webpack.core.js
const { Chain } = require('webpack-chain');
const config = Chain();

// Make configuration shared across targets
// ...

module.exports = config;

// webpack.dev.js
const config = require('./webpack.core');

// Dev-specific configuration
// ...
module.exports = config.toConfig();

// webpack.prod.js
const config = require('./webpack.core');

// Production-specific configuration
// ...
module.exports = config.toConfig();
```
