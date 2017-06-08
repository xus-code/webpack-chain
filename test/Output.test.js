import test from 'ava';
import Output from '../src/Output';

test('is Chainable', t => {
  const parent = { parent: true };
  const output = Output(parent);

  t.is(output.end(), parent);
});

test('shorthand methods', t => {
  const output = Output();
  const obj = {};

  output.__setters.map(method => {
    obj[method] = 'alpha';
    t.is(output[method]('alpha'), output);
  });

  t.deepEqual(output.toConfig(), obj);
});
