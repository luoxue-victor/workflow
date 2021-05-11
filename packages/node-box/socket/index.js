const fs = require('fs')
const path = require('path')
const os = require('os')
const chalk = require('chalk')
const usePort = require('use-port')
const configPath = path.join(os.homedir(), '__cfg__.json')

exports.createServer = async (port = 7000, callback) => {
  const _port = await usePort(port)

  const koa = require('koa')
  const app = new koa()
  const server = require('http').createServer(app.callback())
  const io = require('socket.io')(server)
  const url = `http://127.0.0.1:${_port}`

  io.on('connection', socket => {
    callback && callback(socket, url)
  });

  fs.writeFileSync(configPath, JSON.stringify({ port: _port }, null, 2))

  server.listen(_port);
  console.log(chalk.green('[运行]', chalk.yellow('[socket]')), url)

  return _port
}

exports.emit = (event, data) => {
  const { port } = require(configPath)

  const io = require('socket.io-client')
  const url = `http://127.0.0.1:${port}`
  const socket = io(url);

  socket.emit(event, data);
}