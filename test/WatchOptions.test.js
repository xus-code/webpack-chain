import test from 'ava';
import WatchOptions from '../src/WatchOptions';

test('is Chainable', t => {
  const parent = { parent: true };
  const watchOptions = WatchOptions(parent);

  t.is(watchOptions.end(), parent);
});

test('shorthand methods', t => {
  const watchOptions = WatchOptions();
  const obj = {};

  watchOptions.__setters.map(method => {
    obj[method] = 'alpha';
    t.is(watchOptions[method]('alpha'), watchOptions);
  });

  t.deepEqual(watchOptions.toConfig(), obj);
});
