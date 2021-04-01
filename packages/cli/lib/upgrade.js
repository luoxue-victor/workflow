// https://www.npmjs.com/package/npm-check-updates
const ncu = require('npm-check-updates')

module.exports = async ({ filter }) => {
  const upgraded = await ncu.run({
    jsonUpgraded: true,
    filter: filter || '@pkb/*',
    upgrade: true,
    silent: true
  })

  const keys = Object.keys(upgraded)
  if (keys.length) {
    console.log(`检查出${keys.length}项, 可以执行 npm i 更新依赖`)
    console.log(upgraded)
  } else {
    console.log('已经是最新版本，没有可更新的依赖')
  }
}
