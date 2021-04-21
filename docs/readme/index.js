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
  str += '\n' + fs.readFileSync(path.join(__dirname, 'contributors.md')).toString()
  return str
}

const ctx = joinCtx()

fs.writeFileSync('README.md', ctx, 'utf-8')

function readMdBy(name) {
  return fs.readFileSync(path.join(readmePath, name + '.md')).toString()
}
