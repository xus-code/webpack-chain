import test from 'ava';
import Stats from '../src/Stats';

test('is Chainable', t => {
  const parent = { parent: true };
  const stats = Stats(parent);

  t.is(stats.end(), parent);
});

test('shorthand methods', t => {
  const stats = Stats();
  const obj = {};

  stats.__setters.map(method => {
    obj[method] = 'alpha';
    t.is(stats[method]('alpha'), stats);
  });

  t.deepEqual(stats.toConfig(), obj);
});
