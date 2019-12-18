// [devServer.before 在devServer中添加中间件]
module.exports = ({
  config,
  options
}) => {
  return () => {
    if (!options.mock) return
    const createMockMiddleware = require('../lib/createMockMiddleware')
    config.devServer.before(app => {
      app.use(createMockMiddleware())
    })
  }
}
