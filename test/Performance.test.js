import test from 'ava';
import Performance from '../src/Performance';

test('is Chainable', t => {
  const parent = { parent: true };
  const performance = Performance(parent);

  t.is(performance.end(), parent);
});

test('shorthand methods', t => {
  const performance = Performance();
  const obj = {};

  performance.__setters.map(method => {
    obj[method] = 'alpha';
    t.is(performance[method]('alpha'), performance);
  });

  t.deepEqual(performance.toConfig(), obj);
});
