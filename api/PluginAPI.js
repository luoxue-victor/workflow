const hash = require('hash-sum')
const path = require('path')

exports.genCacheConfig = function (id, partialIdentifier, configFiles = []) {
  const fs = require('fs')
  const cacheDirectory = this.resolve(`node_modules/.cache/${id}`)
  // replace \r\n to \n generate consistent hash
  // const fmtFunc = conf => {
  //   if (typeof conf === 'function') {
  //     return conf.toString().replace(/\r\n?/g, '\n')
  //   }
  //   return conf
  // }

  const variables = {
    partialIdentifier,
    'cli-service': require('../package.json').version,
    'cache-loader': require('cache-loader/package.json').version,
    env: process.env.NODE_ENV,
    test: !!process.env.VUE_CLI_TEST,
    config: [
      // fmtFunc(this.service.projectOptions.chainWebpack),
      // fmtFunc(this.service.projectOptions.configureWebpack)
    ]
  }
  console.log(configFiles)

  if (!Array.isArray(configFiles)) {
    configFiles = [configFiles]
  }
  configFiles = configFiles.concat([
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml'
  ])

  const readConfig = file => {
    const absolutePath = this.resolve(file)
    if (!fs.existsSync(absolutePath)) {
      return
    }

    if (absolutePath.endsWith('.js')) {
      // should evaluate config scripts to reflect environment variable changes
      try {
        return JSON.stringify(require(absolutePath))
      } catch (e) {
        return fs.readFileSync(absolutePath, 'utf-8')
      }
    } else {
      return fs.readFileSync(absolutePath, 'utf-8')
    }
  }

  for (const file of configFiles) {
    const content = readConfig(file)
    if (content) {
      variables.configFiles = content.replace(/\r\n?/g, '\n')
      break
    }
  }

  const cacheIdentifier = hash(variables)
  return { cacheDirectory, cacheIdentifier }
}

exports.getCwd = function () {
  return process.cwd()
}

exports.resolve = function (_path) {
  return path.resolve(process.cwd(), _path)
}
