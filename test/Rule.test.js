import test from 'ava';
import Rule from '../src/Rule';

test('is Chainable', t => {
  const parent = { parent: true };
  const rule = Rule(parent);

  t.is(rule.end(), parent);
});

test('shorthand methods', t => {
  const rule = Rule();
  const obj = {};

  rule.__setters.map(method => {
    obj[method] = 'alpha';
    t.is(rule[method]('alpha'), rule);
  });

  t.deepEqual(rule.toConfig(), obj);
});

test('use', t => {
  const rule = Rule();
  const instance = rule.use('babel').end();

  t.is(instance, rule);
  t.true(rule.uses.has('babel'));
});

test('pre', t => {
  const rule = Rule();
  const instance = rule.pre();

  t.is(instance, rule);
  t.deepEqual(rule.get('enforce'), 'pre');
});

test('post', t => {
  const rule = Rule();
  const instance = rule.post();

  t.is(instance, rule);
  t.deepEqual(rule.get('enforce'), 'post');
});

test('sets methods', t => {
  const rule = Rule();
  const instance = rule
    .include.push('alpha').push('beta').end()
    .exclude.push('alpha').push('beta').end();

  t.is(instance, rule);
  t.deepEqual(rule.include.toArray(), ['alpha', 'beta']);
  t.deepEqual(rule.exclude.toArray(), ['alpha', 'beta']);
});

test('toConfig empty', t => {
  const rule = Rule();

  t.deepEqual(rule.toConfig(), {});
});

test('toConfig with values', t => {
  const rule = Rule();

  rule
    .include
      .push('alpha')
      .push('beta')
      .end()
    .exclude
      .push('alpha')
      .push('beta')
      .end()
    .post()
    .pre()
    .test(/\.js$/)
    .use('babel')
      .loader('babel-loader')
      .options({ presets: ['alpha'] });

  t.deepEqual(rule.toConfig(), {
    test: /\.js$/,
    enforce: 'pre',
    include: ['alpha', 'beta'],
    exclude: ['alpha', 'beta'],
    use: [{
      loader: 'babel-loader',
      options: {
        presets: ['alpha']
      }
    }]
  });
});
