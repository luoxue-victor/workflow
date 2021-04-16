const { build } = require('vite')
const path = require('path')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('build')
    .description('构建项目')
    .action(async (options = {}) => {
      await build({
        // mode: options.mode,
        // configFile: options.config,
        // logLevel: options.logLevel,
        clearScreen: true,
        base: './',
        root: './',
        build: {
          target: 'es2015',
          minify: 'terser',
          manifest: false,
          sourcemap: false,
          outDir: 'dist',
          rollupOptions: {},
        }
      })
    })
}
