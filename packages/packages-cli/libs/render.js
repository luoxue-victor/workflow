const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const resolve = require('resolve')
const isBinary = require('isbinaryfile')

const isString = val => typeof val === 'string'

exports.render = async function render (source, additionalData = {}, ejsOptions = {}) {
  const baseDir = extractCallDir()
  if (isString(source)) {
    source = path.resolve(baseDir, source)
    const data = additionalData
    const globby = require('globby')
    const _files = await globby(['**/*'], { cwd: source })
    for (const rawPath of _files) {
      const targetPath = rawPath.split('/').map(filename => {
        if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
          return `.${filename.slice(1)}`
        }
        if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
          return `${filename.slice(1)}`
        }
        return filename
      }).join('/')
      const sourcePath = path.resolve(source, rawPath)
      const content = renderFile(sourcePath, data, ejsOptions)
      if (Buffer.isBuffer(content) || /[^\s]/.test(content)) {
        fs.writeFileSync(path.join(process.cwd(), targetPath), content)
      }
    }
  } else if (isObject(source)) {
    const data = additionalData
    for (const targetPath in source) {
      const sourcePath = path.resolve(baseDir, source[targetPath])
      const content = renderFile(sourcePath, data, ejsOptions)
      if (Buffer.isBuffer(content) || content.trim()) {
        files[targetPath] = content
      }
    }
  }
}

function extractCallDir () {
  const obj = {}
  Error.captureStackTrace(obj)
  const callSite = obj.stack.split('\n')[3]
  const fileName = callSite.match(/\s\((.*):\d+:\d+\)$/)[1]
  return path.dirname(fileName)
}

const replaceBlockRE = /<%# REPLACE %>([^]*?)<%# END_REPLACE %>/g

function renderFile (name, data, ejsOptions) {
  let isBinaryFileSync = isBinary.sync
  if (typeof isBinaryFileSync !== 'function') isBinaryFileSync = isBinary.isBinaryFileSync
  if (isBinaryFileSync(name)) {
    return fs.readFileSync(name) // return buffer
  }
  const template = fs.readFileSync(name, 'utf-8')

  const yaml = require('yaml-front-matter')
  const parsed = yaml.loadFront(template)
  const content = parsed.__content
  let finalTemplate = content.trim() + '\n'
  if (parsed.extend) {
    const extendPath = path.isAbsolute(parsed.extend)
      ? parsed.extend
      : resolve.sync(parsed.extend, { basedir: path.dirname(name) })
    finalTemplate = fs.readFileSync(extendPath, 'utf-8')
    if (parsed.replace) {
      if (Array.isArray(parsed.replace)) {
        const replaceMatch = content.match(replaceBlockRE)
        if (replaceMatch) {
          const replaces = replaceMatch.map(m => {
            return m.replace(replaceBlockRE, '$1').trim()
          })
          parsed.replace.forEach((r, i) => {
            finalTemplate = finalTemplate.replace(r, replaces[i])
          })
        }
      } else {
        finalTemplate = finalTemplate.replace(parsed.replace, content.trim())
      }
    }
    if (parsed.when) {
      finalTemplate = (
        `<%_ if (${parsed.when}) { _%>` +
          finalTemplate +
        '<%_ } _%>'
      )
    }
  }

  return ejs.render(finalTemplate, data, ejsOptions)
}
