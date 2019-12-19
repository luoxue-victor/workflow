
const merge = require('deepmerge')
const mergeDeps = require('./mergeDeps')
const isFunction = val => typeof val === 'function'
const isObject = val => val && typeof val === 'object'
const mergeArrayWithDedupe = (a, b) => Array.from(new Set([...a, ...b]))
exports.extendPackage = function extendPackage (pkg, fields) {
  const toMerge = isFunction(fields) ? fields(pkg) : fields
  for (const key in toMerge) {
    const value = toMerge[key]
    const existing = pkg[key]
    if (isObject(value) && (key === 'dependencies' || key === 'devDependencies')) {
      pkg[key] = mergeDeps(
        null,
        existing || {},
        value
      )
    } else if (!(key in pkg)) {
      pkg[key] = value
    } else if (Array.isArray(value) && Array.isArray(existing)) {
      pkg[key] = mergeArrayWithDedupe(existing, value)
    } else if (isObject(value) && isObject(existing)) {
      pkg[key] = merge(existing, value, { arrayMerge: mergeArrayWithDedupe })
    } else {
      pkg[key] = value
    }
  }
}
