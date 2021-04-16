#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const readmePath = path.join('docs', 'readme')
const packagesDirPath = path.join('packages')
const packagePaths =  fs.readdirSync(packagesDirPath)
const exec = require('child_process').execSync;

// 执行 packages 内生成readme
packagePaths.forEach(_ => {
  const pkgReadmePath = path.join(packagesDirPath, _, 'readme', 'index.js')
  if (fs.existsSync(pkgReadmePath)) {
    exec(`node ${pkgReadmePath}`)
  }
})

function joinCtx () {
  let str = ''
  str += readMdBy('header')
  str += boxConfig()
  str += '\n' + fs.readFileSync(path.join(__dirname, 'contributors.md')).toString()
  return str
}

const ctx = joinCtx()

fs.writeFileSync('README.md', ctx, 'utf-8')

function boxConfig () {
  let ctx = ''
  ctx = fs.readFileSync(path.join(process.cwd(), 'webpack-box.config.js')).toString()
  return `

### ### <a name="1_8">配置</a>

<details open=“open”>
  <br/>
  <summary>点击关闭/打开扩展配置</summary>
在根目录下添加 \`webpack-box.config.js\`，即可配置使用

webpack-box.config.js

\`\`\`js
${ctx}
\`\`\`

</details>  \n
`
}

function readMdBy(name) {
  return fs.readFileSync(path.join(readmePath, name + '.md')).toString()
}
