const path = require('path')

exports.getCwd = function () {
  return process.cwd()
}

exports.resolve = function (_path) {
  return path.resolve(process.cwd(), _path)
}
