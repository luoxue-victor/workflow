// gotty -w sh

const fs = require('fs')
const path = require('path')
const globby = require('globby')

let files = []

const registerCommand = ({ program, utils, exec, LOG }) => {
  program
    .command('doctor [srcPath]')
    .description('检查代码')
    .action((srcPath) => {
      doctor({ srcPath, utils, exec, LOG })
    })
}

const doctor = async (params = {}) => {
  const { srcPath, utils } = params
  const resolvePath = srcPath || '.'

  files = await globby([resolvePath, '!node_modules', '!dist'])

  return [
    await checkFile(params)
    // await checkImgSize(params)
  ].every(_ => _)
}

async function checkImgSize ({ LOG }) {
  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    const basename = path.basename(file)
    const ext = path.extname(basename)

    if (!'.png|.webp|.jpg|.jpeg'.split('|').includes(ext)) {
      continue
    }
  }
}

// 检查文本
async function checkFile ({ LOG }) {
  const reg = /<<<<<<<[\s\S]*\n=======[\s\S]*\n>>>>>>>/

  for (let index = 0; index < files.length; index++) {
    const pagePath = files[index]
    const p = path.join(process.cwd(), pagePath)
    const str = fs.readFileSync(p).toString()

    if (str.match(reg)) {
      LOG.err(' 代码有冲突，在: ' + p)
      console.log(str.match(reg)[0])
      return false
    }
  }

  LOG.success(' 文件检查通过')

  return true
}

Object.assign(exports, {
  registerCommand,
  doctor
})
