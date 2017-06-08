import test from 'ava';
import Resolve from '../src/Resolve';

test('is Chainable', t => {
  const parent = { parent: true };
  const resolve = Resolve(parent);

  t.is(resolve.end(), parent);
});

test('shorthand methods', t => {
  const resolve = Resolve();
  const obj = {};

  resolve.__setters.map(method => {
    obj[method] = 'alpha';
    t.is(resolve[method]('alpha'), resolve);
  });

  t.deepEqual(resolve.toConfig(), obj);
});

test('sets methods', t => {
  const resolve = Resolve();
  const instance = resolve
    .modules.push('src').end()
    .extensions.push('.js').end();

  t.is(instance, resolve);
});

test('toConfig empty', t => {
  const resolve = Resolve();

  t.deepEqual(resolve.toConfig(), {});
});

test('toConfig with values', t => {
  const resolve = Resolve();

  resolve
    .modules.push('src').end()
    .extensions.push('.js').end()
    .alias.set('React', 'src/react');

  t.deepEqual(resolve.toConfig(), {
    modules: ['src'],
    extensions: ['.js'],
    alias: { React: 'src/react' }
  });
});
