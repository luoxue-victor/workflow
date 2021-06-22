console.log('build')
const fs = require('fs')
const path = require('path')
const srcPath = 'src'
const distPath = 'dist'
const deepReaddirSync = require('deep-readdir-sync')
const pkgPath = path.join(process.cwd(), 'package.json')
const pkg = require(pkgPath)

setSnippets()

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

// 设置代码片段
function setSnippets () {
  const snippetsSource = deepReaddirSync(srcPath, new RegExp(`${srcPath}\/snippets`))
  const snippets = snippetsSource.map(s => {
    return {
      language: '',
      path: s.replace(`${srcPath}\/snippets`, './src/snippets')
    }
  })
  pkg.contributes.snippets = snippets
}