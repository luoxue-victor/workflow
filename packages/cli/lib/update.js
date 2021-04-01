const execSync = require('child_process').execSync

module.exports = (...args) => {
  const free = execSync('ncu -u')
  console.log(free.toString())

  const npmiRes = execSync('npm i')
  console.log(npmiRes.toString())
}
