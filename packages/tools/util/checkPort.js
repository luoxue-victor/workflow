const net = require('net')

async function portInUse(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port)
    server.on('listening', function () {
      server.close()
      resolve(port)
    })
    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') {
        port++
        reject(err)
      }
    })
  })
}

function tryUsePort (port, _portAvailableCallback) {
  portInUse(port).then((port) => {
    _portAvailableCallback(port)
  }).catch(() => {
    console.log(port + '被占用')
    port += 10
    tryUsePort(port, _portAvailableCallback)
  })
}

exports.tryUsePort = tryUsePort
