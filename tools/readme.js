#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
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
