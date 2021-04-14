// [devServer.before 在devServer中添加中间件]
/**
 * @name devServer.before
 * @description 在devServer中添加中间件，mock数据
 */
module.exports = ({
  config,
  options
}) => () => {
  if (!options.mock) return
  const createMockMiddleware = require('../lib/createMockMiddleware')
  config.devServer.before((app) => {
    app.use(createMockMiddleware())
  })
}
