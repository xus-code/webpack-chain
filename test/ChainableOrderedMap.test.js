import test from 'ava';
const { ChainableOrderedMap } = require('../src/mutable');

test('chainable', t => {
  const parent = { parent: true };
  const map = ChainableOrderedMap(parent);

  t.is(map.end(), parent);
});

test('insertBefore', t => {
  const map = ChainableOrderedMap()
    .set('alpha', 1)
    .set('gamma', 3);

  const instance = map.insertBefore('gamma', 'beta', 2);

  t.is(instance, map);
  t.deepEqual(map.entrySeq().toArray(), [['alpha', 1], ['beta', 2], ['gamma', 3]]);
  t.deepEqual(map.toConfig(), { alpha: 1, beta: 2, gamma: 3 });
});

test('insertAfter', t => {
  const map = ChainableOrderedMap()
    .set('alpha', 1)
    .set('gamma', 3);

  const instance = map.insertAfter('alpha', 'beta', 2);

  t.is(instance, map);
  t.deepEqual(map.entrySeq().toArray(), [['alpha', 1], ['beta', 2], ['gamma', 3]]);
  t.deepEqual(map.toConfig(), { alpha: 1, beta: 2, gamma: 3 });
});

test('shorthand methods', t => {
  const setters = ['alpha', 'beta', 'gamma'];
  const map = ChainableOrderedMap(null, setters);
  const obj = {};

  setters.map(method => {
    obj[method] = 'hello';
    t.is(map[method]('hello'), map);
  });

  t.deepEqual(map.toConfig(), obj);
});

test('when true', t => {
  const map = ChainableOrderedMap();
  const right = instance => {
    t.is(instance, map);
    instance.set('alpha', 'a');
  };
  const left = instance => {
    instance.set('beta', 'b');
  };

  t.is(map.when(true, right, left), map);
  t.true(map.has('alpha'));
  t.false(map.has('beta'));
});

test('when false', t => {
  const map = ChainableOrderedMap();
  const right = instance => {
    instance.set('alpha', 'a');
  };
  const left = instance => {
    t.is(instance, map);
    instance.set('beta', 'b');
  };

  t.is(map.when(false, right, left), map);
  t.false(map.has('alpha'));
  t.true(map.has('beta'));
});
