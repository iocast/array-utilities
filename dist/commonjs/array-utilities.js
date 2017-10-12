"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;
exports.sort = sort;
function filter(items, property, filterFunc) {
  if (property === "" || property === undefined) return items;

  var properties = property.split(".");

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

function sort(array, property, direction) {
  var properties = property.split(".");
  return array.sort(function (val1, val2) {
    var a = val1;
    var b = val2;

    if (direction.toLowerCase() !== 'asc' && direction.toLowerCase() !== 'ascending') {
      a = val2;
      b = val1;
    }
    return getValue(a, properties, 0) > getValue(b, properties, 0);
  });
}

function getValue(obj, properties, idx) {
  if (properties[idx] in obj) {
    if (idx === properties.length - 1) {
      return obj[properties[idx]];
    }
    return getValue(obj[properties[idx]], properties, idx + 1);
  }
  return undefined;
}