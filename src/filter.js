/**
 * This function takes an array with a property parameter and filters the array and
 * returns it.
 *
 * Usage:
 *   <pre>let filteredList = filter(list, 'settings.step', this.exists.bind(this))</pre>
 *
 * @param {Array}	    items - this is the parameter items
 * @param {String}    property - this is the parameter property
 * @param {function}  filterFunc - filter function on controller
 *
 * @return {Array} filtered array
 * @example "filter(list, 'settings.step', this.exists.bind(this))"
 */
export function filter(items, property, filterFunc) {
  if (property === '' || property === undefined) return items;

  let properties = property.split('.');

  return items.filter(value => {
    let propValue = exists(value, properties, 0);
    if (typeof filterFunc === 'function') {
      return filterFunc(property, propValue);
    }
    return (propValue) ? true : false;
  });
}


/**
 * Checks whether the attribute exists or not. If the determined attribute is an object in takes it for further analysis (recursion).
 *
 * @private
 *
 * @param {any}   obj - an object ot be analysed
 * @param {Array} properties - properties array.
 * @param {int}   idx - current index (depth)
 *
 * @return {any}  returns the found value
 */
function exists(obj, properties, idx) {
  if (properties[idx] in obj) {
    if (idx === properties.length - 1) {
      return obj[properties[idx]];
    }
    return exists(obj[properties[idx]], properties, idx + 1);
  }
  return null;
}
