module.exports = function stringifyJS (value) {
  let stringify = require('javascript-stringify')

  if (typeof stringify !== 'function') {
    stringify = stringify.stringify
  }

  return stringify(value, (val, indent, stringify) => {
    if (val && val.__expression) {
      return val.__expression
    }
    return stringify(val)
  }, 2)
}
