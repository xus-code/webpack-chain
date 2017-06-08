import test from 'ava';
const { ChainableList } = require('../src/mutable');

test('chainable', t => {
  const parent = { parent: true };
  const list = ChainableList(parent);

  t.is(list.end(), parent);
});

test('when true', t => {
  const list = ChainableList();
  const right = instance => {
    t.is(instance, list);
    instance.push('alpha');
  };
  const left = instance => {
    instance.push('beta');
  };

  t.is(list.when(true, right, left), list);
  t.true(list.contains('alpha'));
  t.false(list.contains('beta'));
});

test('when false', t => {
  const set = ChainableList();
  const right = instance => {
    instance.push('alpha');
  };
  const left = instance => {
    t.is(instance, set);
    instance.push('beta');
  };

  t.is(set.when(false, right, left), set);
  t.false(set.contains('alpha'));
  t.true(set.contains('beta'));
});
