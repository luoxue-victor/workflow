const usePort = require('use-port')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('mock')
    .description('mock 数据')
    .action(async () => {
      const port = await usePort(3000)
      const app = require('express')()

      app.use(require('../lib/createMockMiddleware')(port));
      app.listen(port);
    })
}
