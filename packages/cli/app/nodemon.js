const usePort = require('use-port')
const path = require('path')

;(async () => {
  const port = await usePort(1400)

  const Server = require('@pkb/node-box/build/server')

  Server({port, root: path.join(__dirname, '..')})
})()
