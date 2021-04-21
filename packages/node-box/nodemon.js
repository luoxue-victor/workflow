const usePort = require('use-port')

;(async () => {
  const port = await usePort(process.env.PORT || 1234)
  const Server = require('./index')

  Server({port, root: process.cwd()})
})()
