
const { LOG } = require('./log')

/**
 * @method trycatch 捕获错误异常，不会阻断程序正常运行
 * @param {Function}  fn      被捕获的函数
 * @param {String}    errType 错误类型
 * @param {String|Function}  msg
 *   - 如果是函数则是失败的回调
 *   - 如果是 0 的话就不打日志，如果 msg 是假值会打印 error
 */
exports.trycatch = function (fn, errType, msg) {
  try {
    fn()
  } catch (error) {
    if (typeof msg === 'function') {
      msg()
    } else {
      msg !== 0 && LOG(errType, msg || error)
    }
  }
}
