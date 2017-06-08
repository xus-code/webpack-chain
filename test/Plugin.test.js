import test from 'ava';
import Plugin from '../src/Plugin';

class StringifyPlugin {
  constructor(...args) {
    this.values = args;
  }

  apply() {
    return JSON.stringify(this.values);
  }
}

test('is Chainable', t => {
  const parent = { parent: true };
  const plugin = Plugin(parent);

  t.is(plugin.end(), parent);
});

test('use', t => {
  const plugin = Plugin();
  const instance = plugin
    .use(StringifyPlugin)
    .args
      .merge(['alpha', 'beta'])
      .end();

  t.is(instance, plugin);
  t.is(plugin.get('plugin'), StringifyPlugin);
  t.deepEqual(plugin.args.toArray(), ['alpha', 'beta']);
});

test('init', t => {
  const plugin = Plugin();

  plugin.use(StringifyPlugin);

  const instance = plugin.init((Plugin, args) => {
    t.deepEqual(args, []);
    return Plugin('gamma', 'delta');
  });

  t.is(instance, plugin);
});

test('toConfig', t => {
  const plugin = Plugin();

  plugin.use(StringifyPlugin);

  const initialized = plugin.toConfig();

  t.true(initialized instanceof StringifyPlugin);
  t.deepEqual(initialized.values, []);
});
