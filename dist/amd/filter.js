define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.filter = filter;

  function filter(items, property, filterFunc) {
    if (property === '' || property === undefined) return items;
    var properties = property.split('.');
    return items.filter(function (value) {
      var propValue = exists(value, properties, 0);

      if (typeof filterFunc === 'function') {
        return filterFunc(property, propValue);
      }

      return propValue ? true : false;
    });
  }

  function exists(obj, properties, idx) {
    if (properties[idx] in obj) {
      if (idx === properties.length - 1) {
        return obj[properties[idx]];
      }

      return exists(obj[properties[idx]], properties, idx + 1);
    }

    return null;
  }
});