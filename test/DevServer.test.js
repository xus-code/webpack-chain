import test from 'ava';
import DevServer from '../src/DevServer';

test('is Chainable', t => {
  const parent = { parent: true };
  const devServer = DevServer(parent);

  t.is(devServer.end(), parent);
});

test('shorthand methods', t => {
  const devServer = DevServer();
  const obj = {};

  devServer.__setters.map(method => {
    obj[method] = 'alpha';
    t.is(devServer[method]('alpha'), devServer);
  });

  t.deepEqual(devServer.toConfig(), obj);
});
