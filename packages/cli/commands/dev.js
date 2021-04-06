const spawn = require('child_process').spawn

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

const dev = () => {
  const free = spawn('webpack-box', ['dev', 'index'])
  free.stdout.on('data', function (data) {
    const str = data.toString().replace(/\n$/, '')

    console.log(str)
  })
}
