const fs = require('fs')
const path = require('path')
const os = require('os')
const chalk = require('chalk')
const configPath = path.join(os.homedir(), '__cfg__.json')

console.log(os.homedir())
exports.createServer = async (port = 7000) => {
  const _port = await usePort(port)

  return new Promise((resolve) => {
    const koa = require('koa')
    const app = new koa()
    const server = require('http').createServer(app.callback())
    const io = require('socket.io')(server)

    io.on('connection', socket => {
      socket.on('disconnect', () => {
        console.log('socket disconnect')
      })

      resolve(socket)
    });

    fs.writeFileSync(configPath, JSON.stringify({ port: _port }, null, 2))

    console.log(chalk.green('[运行]', chalk.yellow('[socket]')),`http://127.0.0.1:${_port}`)

    server.listen(_port);
  })
}

exports.emit = ({ event, data }) => {
  const { port } = require(configPath)

  const io = require('socket.io-client')
  const url = `http://127.0.0.1:${port}`
  //建立websocket连接
  const socket = io(url);

  socket.emit(event, data);
}