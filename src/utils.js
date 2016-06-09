module.exports = {
  parseObject,
  stringify,
}

/**
 * Parses an object if it is valid.
 * @param {string} value - The string to check
 * @return {mixed} Returns the object if valid, or false if not
 */
function parseObject (value) {
  if (typeof value === 'object') {
    return value
  }

  try {
    return JSON.parse(value)
  } catch (e) {
    return false
  }
}

/**
 * Turns a value into a string. Uses JSON.stringify
 * if the value is an object.
 * @param {any} value - The value to stringify
 * @return {string} The stringified value
 */
function stringify (value) {
  if (parseObject(value)) {
    return JSON.stringify(value)
  }

  return String(value)
}
