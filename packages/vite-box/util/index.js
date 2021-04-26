const fs = require('fs-extra')
const path = require('path')
const deepExtend = require('deep-extend')
const defaultConfig = {
  configFile: false,
  root: process.cwd(),
  clearScreen: true,
  base: './',
  root: './',
  server: {
    port: 7777
  },
  plugins: [],
  build: {
    target: 'es2015',
    minify: 'terser',
    manifest: false,
    sourcemap: false,
    outDir: 'dist',
    rollupOptions: {},
  }
}

exports.getConfig = function () {
  const viteBoxConfigPath = path.join(process.cwd(), 'vite-box.config.js')
  const config = fs.existsSync(viteBoxConfigPath) ? require(viteBoxConfigPath) : {}

  return deepExtend(defaultConfig, config)
}
