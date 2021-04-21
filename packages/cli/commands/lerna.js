const { spawn, execSync } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('lerna')
    .description('lerna 发布')
    .action(() => {
      const packagesPath = path.join(process.cwd(), 'packages')
      const packages = fs.readdirSync(packagesPath)

      packages.forEach(pkg => {
        const node_modules = path.join(packagesPath, pkg, 'node_modules')
        const package_lock = path.join(packagesPath, pkg, 'package-lock.json')

        if (fs.existsSync(node_modules)) {
          console.log(`删除 ${node_modules}`)
          fs.removeSync(node_modules)
        }

        if (fs.existsSync(package_lock)) {
          console.log(`删除 ${package_lock}`)
          fs.removeSync(package_lock)
        }
      })

      try {
        execSync('git add . && git commit -m "lerna publish"')
      } catch (error) {
        //
      }

      spawn('lerna', ['publish'], {
        stdio: 'inherit'
      })
    })
}
