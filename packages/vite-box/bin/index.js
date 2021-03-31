#!/usr/bin/env node

const { createServer } = require('vite')

;(async () => {
  const server = await createServer({
    configFile: false,
    root: __dirname,
    server: {
      port: 1337
    }
  })
  await server.listen()
})()
