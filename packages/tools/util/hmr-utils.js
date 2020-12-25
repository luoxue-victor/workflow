/**
 * 基于 vite 的热更新
 */

const fs = require('fs')
const path = require('path')
const LOG = require('./log')
const { rollup } = require('rollup')
const less = require('less')

const ignore = /output|ajx_modules/
const store = {}

const watcherHmr = (watcher) => {
  watcher.on('change', (filePath) => {
    if (!ignore.test(filePath)) {
      const content = fs.readFileSync(filePath)
      const fileName = filePath.split('/').pop()

      if (content) {
        store[fileName] = {
          content: content.toString(),
          filePath,
          fileName
        }

        LOG.change(fileName)
      }
    }
  })
}

function getTypeByCtx(ctx) {
  const list = ctx.path.split('/')
  const type = list[list.length - 2]

  const types = ['style', 'script', 'mock']

  if (!types.includes(type)) {
    LOG.err(`${list.join('/')} 没有找到 type`)
  }

  return types.includes(type) ? type : ''
}

function parseFileName(fileName) {
  fileName = decodeURIComponent(fileName)
  return fileName.split('|')
}

async function getFileContentByCtx(ctx) {
  const fileName = getFileNameByCtx(ctx)
  const fileNames = parseFileName(fileName)
  const type = getTypeByCtx(ctx)

  let content = ''

  if (type !== 'style' && fileNames.length > 1) {
    LOG.err('只有 type 为 style 才可用多值 ｜')
  }

  for (let index = 0; index < fileNames.length; index++) {
    const name = fileNames[index]
    const filePath = getFilePathByFileName(name)
    if (store[name]) {
      const transformRes = await transform(store[name].content, name, type)
      content += transformRes
    } else if (filePath) {
      const fileContent = fs.readFileSync(filePath).toString()
      const transformRes = await transform(fileContent, filePath, type)
      content += transformRes
    }
  }

  return content
}

function styleUrlParse(content) {
  content = content.replace(/background-image:[ ]*url\(([\s\S]+)\);/g, ($1, $2) => {
    const name = $2.split('.')[0].replace("'", '')
    const files = findFileByFileName('src', name)
    const img = files[0]

    return $1.replace($2, `path://${img}`)
  })

  return content
}

function resolveStyleImport (code) {
  const content = code.replace(/@import[ ]+['|"]([^'|"]+)['|"]/g, ($1, $2) => {
    const files = findFileByFileName('src', $2)
    const filePath = files[0]

    return $1.replace($2, filePath)
  })

  return content
}

async function transform(content, name, type) {
  const extname = path.extname(name).replace('.', '')

  const renderMap = {
    js: jsRender,
    less: lessRender
  }

  if (type === 'style') {
    content = styleUrlParse(content)
    content = resolveStyleImport(content)
  }

  const fn = renderMap[extname]

  if (fn && typeof fn === 'function') {
    content = await fn(content)
  } else {
    console.error(typeof fn, 'typeof fn 不是函数')
  }

  return content
}

function lessRender (code, option) {
  return less.render(code, option)
    .then(function(output) {
      return output.css
    }, function(error) {
      throw error
    })
};

async function jsRender (code, option) {
  const start = 'var data = {};'
  const end = 'return data'
  const exportDefaultReplace = content.replace(/export[ ]+default/, 'data = ')
  const exportReplace = exportDefaultReplace.replace(/(export[ ]+(const|let|var)?)/g, 'data.')

  return start + exportReplace + end
};

function getFileNameByCtx(ctx) {
  return ctx.path.split('/').pop()
}

function getFilePathByFileName(fileName) {
  const files = findFileByFileName('src', fileName) || []
  const filePath = files[0] || ''

  return filePath
}

function findFileByFileName(dirs, fileName) {
  let files = []
  const dirArray = fs.readdirSync(dirs)
  for (const d of dirArray) {
    const filePath = path.resolve(dirs, d)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      files = files.concat(findFileByFileName(filePath, fileName))
    }

    if (stat.isFile() && filePath.includes(fileName)) {
      files.push(filePath)
    }
  }
  return files
}

async function resolveStyle(ctx) {
  // if (ctx.path.endsWith('.css')) {
  const content = await getFileContentByCtx(ctx)

  return content
  // }
}

Object.assign(exports, {
  watcherHmr,
  getFileNameByCtx,
  findFileByFileName,
  getFileContentByCtx,
  resolveStyle,
  getTypeByCtx
})
