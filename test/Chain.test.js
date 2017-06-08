import test from 'ava';
import { Chain } from '../src/Chain';
import { validate } from 'webpack';

class StringifyPlugin {
  constructor(...args) {
    this.values = args;
  }

  apply() {
    return JSON.stringify(this.values);
  }
}

test('node', t => {
  const config = Chain();
  const instance = config.node
    .set('__dirname', 'mock')
    .set('__filename', 'mock')
    .end();

  t.is(instance, config);
  t.deepEqual(config.node.toConfig(), { __dirname: 'mock', __filename: 'mock' });
});

test('entry', t => {
  const config = Chain();

  config.entry('index')
    .push('babel-polyfill')
    .push('src/index.js');

  t.true(config.entryPoints.has('index'));
  t.deepEqual(config.entryPoints.get('index').toArray(), ['babel-polyfill', 'src/index.js']);
});

test('plugin empty', t => {
  const config = Chain();
  const instance = config.plugin('stringify').use(StringifyPlugin).end();

  t.is(instance, config);
  t.true(config.plugins.has('stringify'));
  t.deepEqual(config.plugins.get('stringify').args.toConfig(), []);
});

test('plugin with args', t => {
  const config = Chain();

  config.plugin('stringify')
    .use(StringifyPlugin)
    .args
      .push('alpha')
      .push('beta');

  t.true(config.plugins.has('stringify'));
  t.deepEqual(config.plugins.get('stringify').args.toConfig(), ['alpha', 'beta']);
});

test('toConfig empty', t => {
  const config = Chain();

  t.deepEqual(config.toConfig(), {});
});

test('toConfig with values', t => {
  const config = Chain();

  config
    .output
      .path('build')
      .end()
    .node
      .set('__dirname', 'mock')
      .end()
    .target('node')
    .plugin('stringify')
      .use(StringifyPlugin)
      .end()
    .module
      .rule('compile')
        .include
          .push('alpha')
          .push('beta')
          .end()
        .exclude
          .push('alpha')
          .push('beta')
          .end()
        .post()
        .pre()
        .test(/\.js$/)
        .use('babel')
          .loader('babel-loader')
          .options({ presets: ['alpha'] });

  t.deepEqual(config.toConfig(), {
    node: {
      __dirname: 'mock'
    },
    output: {
      path: 'build'
    },
    target: 'node',
    plugins: [new StringifyPlugin()],
    module: {
      rules: [{
        include: ['alpha', 'beta'],
        exclude: ['alpha', 'beta'],
        enforce: 'pre',
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['alpha'] }
        }]
      }]
    }
  });
});

test('validate empty', t => {
  const config = Chain();
  const errors = validate(config.toConfig());

  t.is(errors.length, 1);
});

test('validate with entry', t => {
  const config = Chain();

  config.entry('index').push('src/index.js');

  const errors = validate(config.toConfig());

  t.is(errors.length, 0);
});

test('validate with values', t => {
  const config = Chain();

  config
    .entry('index')
      .push('babel-polyfill')
      .push('src/index.js')
      .end()
    .output
      .path('/build')
      .end()
    .node
      .set('__dirname', 'mock')
      .end()
    .target('node')
    .plugin('stringify')
      .use(StringifyPlugin)
      .end()
    .module
      .rule('compile')
        .include
          .push('alpha')
          .push('beta')
          .end()
        .exclude
          .push('alpha')
          .push('beta')
          .end()
        .post()
        .pre()
        .test(/\.js$/)
        .use('babel')
          .loader('babel-loader')
          .options({ presets: ['alpha'] });

  const errors = validate(config.toConfig());

  t.is(errors.length, 0);
});
