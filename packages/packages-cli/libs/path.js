const path = require('path')
/**
 * @param {String} p 相对于根目录
 */
const resolve = p => path.join(process.cwd(), p)

exports.resolve = resolve
