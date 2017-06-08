import test from 'ava';
import ResolveLoader from '../src/ResolveLoader';

test('is Chainable', t => {
  const parent = { parent: true };
  const resolveLoader = ResolveLoader(parent);

  t.is(resolveLoader.end(), parent);
});

test('sets methods', t => {
  const resolveLoader = ResolveLoader();
  const instance = resolveLoader.modules.push('src').end();

  t.is(instance, resolveLoader);
});

test('toConfig empty', t => {
  const resolveLoader = ResolveLoader();

  t.deepEqual(resolveLoader.toConfig(), {});
});

test('toConfig with values', t => {
  const resolveLoader = ResolveLoader();

  resolveLoader
    .modules.push('src').end()
    .set('moduleExtensions', ['-loader']);

  t.deepEqual(resolveLoader.toConfig(), {
    modules: ['src'],
    moduleExtensions: ['-loader']
  });
});
