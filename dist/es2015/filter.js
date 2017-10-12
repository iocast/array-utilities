export function filter(items, property, filterFunc) {
  if (property === "" || property === undefined) return items;

  let properties = property.split(".");

  return items.filter(value => {
    let propValue = exists(value, properties, 0);
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