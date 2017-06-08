const { OrderedMap, List } = require('immutable');

const F = Function.prototype;

const serialize = value => (value && value.toConfig && value.toConfig()) ||
  (value && value.toJS && value.toJS()) ||
  value;

const isEmpty = serialized => serialized === undefined ||
  (Array.isArray(serialized) && !serialized.length) ||
  Object.prototype.toString.call(serialized) === '[object Object]' && !Object.keys(serialized).length;

const ChainableOrderedMap = (parent, setters = []) => {
  const map = OrderedMap().asMutable();

  setters.forEach(method => map[method] = value => map.set(method, value));

  return Object.assign(map, {
    __setters: setters,

    end() {
      return parent || map;
    },

    insertBefore(beforeKey, key, value) {
      const temp = OrderedMap().asMutable();

      map.forEach((v, k) => {
        if (k === beforeKey) {
          temp.set(key, value);
        }

        temp.set(k, v);
      });

      return map.clear().merge(temp);
    },

    insertAfter(afterKey, key, value) {
      const temp = OrderedMap().asMutable();

      map.forEach((v, k) => {
        temp.set(k, v);

        if (k === afterKey) {
          temp.set(key, value);
        }
      });

      return map.clear().merge(temp);
    },

    when(condition, whenTruthy = F, whenFalsy = F) {
      if (condition) {
        whenTruthy(map);
      } else {
        whenFalsy(map);
      }

      return map;
    },

    toConfig() {
      return map.reduce((reduction, value, key) => {
        const serialized = serialize(value);
        const empty = isEmpty(serialized);

        return empty ?
          reduction :
          Object.assign(reduction, { [key]: serialized });
      }, {});
    },

    assoc(name, value) {
      map.set(name, map[name] = value);
      return map;
    }
  });
};

const ChainableList = (parent) => {
  const list = List().asMutable();

  return Object.assign(list, {
    end() {
      return parent || list;
    },

    when(condition, whenTruthy = F, whenFalsy = F) {
      if (condition) {
        whenTruthy(list);
      } else {
        whenFalsy(list);
      }

      return list;
    },

    toConfig() {
      list.reduce((reduction, value) => {
        const serialized = serialize(value);
        const empty = isEmpty(serialized);

        return empty ?
          reduction :
          reduction.concat([serialized]);
      }, []);
      return list.toJS();
    }
  });
};

module.exports = {
  ChainableOrderedMap,
  ChainableList
};
