import test from 'ava';
import Use from '../src/Use';

test('is Chainable', t => {
  const parent = { parent: true };
  const use = Use(parent);

  t.is(use.end(), parent);
});

test('shorthand methods', t => {
  const use = Use();
  const obj = {};

  use.__setters.map(method => {
    obj[method] = 'alpha';
    t.is(use[method]('alpha'), use);
  });

  t.deepEqual(use.toConfig(), obj);
});

test('tap', t => {
  const use = Use();

  use
    .loader('babel-loader')
    .options({ presets: ['alpha'] });

  use.tap(options => {
    t.deepEqual(options, { presets: ['alpha'] });
    return { presets: ['beta'] };
  });

  t.deepEqual(use.get('options'), { presets: ['beta'] });
});
