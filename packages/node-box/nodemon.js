const usePort = require('use-port')

;(async () => {
  const port = await usePort(process.env.PORT || 1234)
  const Server = require('./index')
  const root = process.env.SERVER_ROOT || process.cwd()

  Server({port, root})
})()
