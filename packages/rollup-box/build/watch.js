// https://www.rollupjs.com/guide/javascript-api#rollupwatch
const rollup = require('rollup')
const chalk = require('chalk')

module.exports = async (inputOptions, outputOptions) => {
  process.env.NODE_ENV === 'development'
  const watcher = await rollup.watch({
    ...inputOptions,
    output: [outputOptions],
    watch: {
      chokidar: true,
      include: 'src/**',
      exclude: 'node_modules/**'
    }
  })

  watcher.on('event', (event) => {
    const { code } = event

    if (code === 'ERROR') {
      console.error(event)
    }

    if (code === 'BUNDLE_START') {
      // console.log(chalk.cyan('开始编译'))
    }

    if (code === 'BUNDLE_END') {
      // console.log(chalk.cyan('编译完成'))
    }
  })
}
