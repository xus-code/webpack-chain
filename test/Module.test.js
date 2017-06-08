import test from 'ava';
import Module from '../src/Module';

test('is Chainable', t => {
  const parent = { parent: true };
  const module = Module(parent);

  t.is(module.end(), parent);
});

test('is ChainedMap', t => {
  const module = Module();

  module.set('a', 'alpha');

  t.is(module.get('a'), 'alpha');
});

test('rule', t => {
  const module = Module();
  const instance = module.rule('compile').end();

  t.is(instance, module);
  t.true(module.rules.has('compile'));
});

test('toConfig empty', t => {
  const module = Module();

  t.deepEqual(module.toConfig(), {});
});

test('toConfig with values', t => {
  const module = Module();

  module.rule('compile').test(/\.js$/);
  module.noParse.push(/.min.js/);

  t.deepEqual(module.toConfig(), { rules: [{ test: /\.js$/ }], noParse: [/.min.js/]});
});

test('noParse', t => {
  const module = Module();
  const instance = module.noParse.push(/.min.js/).end();

  t.is(instance, module);
  t.deepEqual(module.noParse.toArray(), [/.min.js/]);
});

