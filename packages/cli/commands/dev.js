const { spawn } = require('child_process')
const { watchFile } = require('fs')
const http = require('http')

exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('dev')
    .description('开发运行项目')
    .action((cmd) => {
      const options = cleanArgs(cmd)
      dev(options)
    })
}

const dev = async () => {
  const hostname = '127.0.0.1'
  const port = '5004'

  const srv = http.createServer()

  await new Promise((resolve, reject) => {
    srv.on('error', reject)
    srv.on('listening', () => resolve())
    srv.on('request', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' })
      res.write('Hello World')
      res.end()
    })

    console.log(`http://${hostname}:${port}`)

    srv.listen(port, hostname)
  })

  // watchFile(`${process.cwd()}/${CONFIG_FILE}`, (cur, prev) => {
  //   if (cur.size > 0 || prev.size > 0) {
  //     console.log(
  //       `\n> Found a change in ${CONFIG_FILE}. Restart the server to see the changes in effect.`
  //     )
  //   }
  // })
  // const free = spawn('webpack-box', ['dev', 'index'], {
  //   shell: true
  // })
  // free.stdout.on('data', function (data) {
  //   const str = data.toString().replace(/\n$/, '')

  //   console.log(str)
  // })
}
