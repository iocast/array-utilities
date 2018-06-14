
export function sort(array, property, direction) {
  let properties = property.split(".");
  return array.sort((val1, val2) => {
    let a = val1;
    let b = val2;

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