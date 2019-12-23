const semver = require('semver')
const chalk = require('chalk')

module.exports = function resolveDeps (generatorId, to, from, sources) {
  const res = Object.assign({}, to)
  for (const name in from) {
    const r1 = to[name]
    const r2 = from[name]
    const isValidURI = r2.match(/^(?:file|git|git\+ssh|git\+http|git\+https|git\+file|https?):/) != null
    const isValidGitHub = r2.match(/^[^/]+\/[^/]+/) != null
    if (r1 === r2) continue
    if (!isValidGitHub && !isValidURI && !semver.validRange(r2)) {
      console.log(chalk.yellow(
        `依赖项的版本范围无效 "${name}": ` +
        `- ${r2} 通过 generator 注入"${generatorId}"`
      ))
      continue
    }

    if (!r1) {
      res[name] = r2
    } else {
      const r1semver = extractSemver(r1)
      const r2semver = extractSemver(r2)
      const r = tryGetNewerRange(r1semver, r2semver)
      const didGetNewer = !!r
      res[name] = didGetNewer ? injectSemver(r2, r) : r1
      if (res[name] === r2) {
      }
      if (!semver.validRange(r1semver) || !semver.validRange(r2semver) || !semver.intersects(r1semver, r2semver)) {
        console.log(chalk.yellow(
          `项目依赖项的版本冲突 "${name}": ` +
          `使用${didGetNewer ? '新' : ''}版本 (${res[name]}), 但是可能会引起错误.`
        ))
      }
    }
  }
  return res
}

const leadRE = /^(~|\^|>=?)/
const rangeToVersion = r => r.replace(leadRE, '').replace(/x/g, '0')
const extractSemver = r => r.replace(/^.+#semver:/, '')
const injectSemver = (r, v) => semver.validRange(r) ? v : r.replace(/#semver:.+$/, `#semver:${v}`)

function tryGetNewerRange (r1, r2) {
  const v1 = rangeToVersion(r1)
  const v2 = rangeToVersion(r2)
  if (semver.valid(v1) && semver.valid(v2)) {
    return semver.gt(v1, v2) ? r1 : r2
  }
}
