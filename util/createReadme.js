#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const readmePath = path.join('util', 'readme')

let configCtx = '',
  docsCtx = ''

configCtx = extraTxt('config', function(firstRow) {
  return firstRow.replace('// ', '')
})

docsCtx = extraTxt('docs', function(firstRow) {
  return `[${firstRow.replace('## ', '')}]`
})

function joinCtx () {
  let str = ''
  str += readMdBy('header')
  str += detailTag('所有课题', docsCtx)
  str += readMdBy('useAndIntsall')
  str += detailTag('所有配置', configCtx)
  str += boxConfig()
  return str
}

const ctx = joinCtx()

fs.writeFileSync('README.md', ctx, 'utf-8')

function detailTag (title, ctx) {
  return `
### ${title}
<details open=“open”>
  <summary>点击关闭/打开${title}</summary> \n\n${ctx}
</details>`
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
    <summary>点击关闭/打开扩展配置</summary>
  
  在根目录下添加 \`box.config.js\`，即可配置使用
  
  box.config.js
  
  \`\`\`js
${ctx}
  \`\`\`
  
  </details>  
  `
}

function readMdBy(name) {
  return fs.readFileSync(path.join(readmePath, name + '.md')).toString()
}
