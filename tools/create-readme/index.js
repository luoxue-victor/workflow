#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const readmePath = path.join('tools', 'create-readme')
console.log('--- 创建readme ---')
const configCtx = extraTxt('packages/webpack-box/config', function(firstRow) {
  return firstRow.replace('// ', '')
})

const docsCtx = extraTxt('docs', function(firstRow) {
  return `[${firstRow.replace('## ', '')}]`
})

const packageConfig = extraTxtFromDirWithFilename(
  'packages',
  'webpack-chain.config.js',
  function(firstRow) {
    return `${firstRow.replace('// ', '')}`
  })

function joinCtx () {
  let str = ''
  str += readMdBy('header')
  str += detailTag('所有课题', docsCtx, false)
  str += readMdBy('useAndIntsall')
  str += detailTag('所有配置', configCtx + packageConfig)
  str += boxConfig()
  str += '\n' + fs.readFileSync(path.join(__dirname, 'contributors.md')).toString()
  return str
}

const ctx = joinCtx()

fs.writeFileSync('README.md', ctx, 'utf-8')

function detailTag (title, ctx, isOpen = true) {
  return `

### ${title}

<details ${isOpen ? 'open=“open”' : ''}>
  <summary>点击关闭/打开${title}</summary> 
  <br/>
\n\n${ctx}
</details> \n\n`
}

function extraTxtFromDirWithFilename (dirname, filename, firstRowStrategy) {
  const dirs = fs.readdirSync(dirname)
  const dirPath = path.join(process.cwd(), dirname)
  let ctx = ''
  dirs.forEach(dir => {
    const fullFilenamePath = path.join(dirPath, dir, filename)
    if (fs.existsSync(fullFilenamePath)) {
      const content = fs.readFileSync(fullFilenamePath).toString()
      const firstRow = content.split('\n')[0].trim()
      const title = firstRowStrategy(firstRow)
      ctx += `- ${title}(./${dirname}/${dir}/${filename})\n`
    }
  })
  return ctx
}

function extraTxt (dirname, firstRowStrategy) {
  const files = fs.readdirSync(dirname)
  let ctx = ''
  files.forEach(file => {
    const absolutePath = path.join(process.cwd(), dirname, file)
    if (fs.statSync(absolutePath).isDirectory()) return
    const content = fs.readFileSync(absolutePath).toString()
    const firstRow = content.split('\n')[0].trim()
    const title = firstRowStrategy(firstRow)
    ctx += `- ${title}(./${dirname}/${file})\n`
  })
  return ctx
}

function boxConfig () {
  let ctx = ''
  ctx = fs.readFileSync(path.join(process.cwd(), 'box.config.js')).toString()
  return `

### 扩展配置

<details open=“open”>
  <br/>
  <summary>点击关闭/打开扩展配置</summary>
在根目录下添加 \`box.config.js\`，即可配置使用

box.config.js
  
\`\`\`js
${ctx}
\`\`\`

</details>  \n
`
}

function readMdBy(name) {
  return fs.readFileSync(path.join(readmePath, name + '.md')).toString()
}
