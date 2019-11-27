const fs = require('fs-extra')
const globby = require('globby')

class CopyDirWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const opt = this.options
    compiler.plugin('done', (stats) => {
      if (process.env.NODE_ENV === 'production') {
        (async ()=>{
          const toFilesPath = await globby([`${opt.to}/**`, '!.git/**'])
          toFilesPath.forEach(filePath => fs.removeSync(filePath))
          const fromFilesPath = await globby([`${opt.from}/**`])
          fromFilesPath.forEach(fromPath => {
            const cachePath = fromPath
            fromPath = fromPath.replace('dist', opt.to)
            const dirpaths = fromPath.substring(0, fromPath.lastIndexOf('/'))
            fs.mkdirpSync(dirpaths)
            fs.copySync(cachePath, fromPath)
          })
          console.log(`  完成copy ${opt.from} to ${opt.to}`)
        })()
      }
    });
  }
}

module.exports = CopyDirWebpackPlugin