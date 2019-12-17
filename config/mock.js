// [mock]
module.exports = ({
  config,
  options
}) => {
  return () => {
    if (!options.mock) return
    const createMockMiddleware = require('../lib/createMockMiddleware')
    config.devServer.before(app => app.use(createMockMiddleware()))
  }
}
