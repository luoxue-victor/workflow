const vuePluginRE = /^(@vue\/|vue-|@[\w-]+(\.)?[\w-]+\/vue-)(cli-)?plugin-/
const scopeRE = /^@[\w-]+(\.)?[\w-]+\//
const vueOfficialRE = /^@vue\//

const pkPluginRE = exports.pkPluginRE = /^(@pkb\/|pk-|@[\w-]+(\.)?[\w-]+\/pk-)(cli-)?plugin-/
const pbOfficialRE = /^@pkb\//
const path = require('path')
const vueOfficialPlugins = [
  'babel',
  'e2e-cypress',
  'e2e-nightwatch',
  'eslint',
  'pwa',
  'router',
  'typescript',
  'unit-jest',
  'unit-mocha',
  'vuex'
]

const pkbOfficialPlugins = []

exports.isPlugin = id => vuePluginRE.test(id) || pkPluginRE.test(id)

exports.isOfficialPlugin = id => exports.isPlugin(id) && pbOfficialRE.test(id)

exports.toShortPluginId = id => id.replace(vuePluginRE, '')

exports.getAllPluginIdOfPackageJson = () => {
  const pkgJsonPath = path.join(process.cwd(), 'package.json')
  const deps = {}
  const plugins = []
  const pkg = require(pkgJsonPath)
  Object.assign(deps, pkg.devDependencies || {}, pkg.dependencies || {})
  Object.keys(deps).forEach(dep => {
    pkPluginRE.test(dep) && plugins.push(dep)
  })
  return plugins
}

exports.resolvePluginId = id => {
  if (vuePluginRE.test(id) || pkPluginRE.test(id)) {
    return id
  }
  if (vueOfficialPlugins.includes(id)) {
    return `@vue/cli-plugin-${id}`
  }
  if (pkbOfficialPlugins.includes(id)) {
    return `@pkb/cli-plugin-${id}`
  }
  // e.g. @pkb/foo, @pkb/foo
  if (id.charAt(0) === '@') {
    const scopeMatch = id.match(scopeRE)
    if (scopeMatch) {
      const scope = scopeMatch[0]
      const shortId = id.replace(scopeRE, '')
      let ii = ''
      if (/^(@pkb)/.test(id)) {
        ii = `${scope}${
          (scope === '@pkb/' ? '' : 'pk-')
        }cli-plugin-${shortId}`
      } else {
        ii = id
      }
      return ii
    }
  }
  // e.g. foo
  const { spawnSync } = require('child_process')
  const status = spawnSync('npm', ['view', `pk-cli-plugin-${id}`]).status
  return `${status === 0 ? 'pk' : 'vue'}-cli-plugin-${id}`
}

exports.matchesPluginId = (input, full) => {
  const short = full.replace(vuePluginRE, '')
  return (
    // input is full
    full === input ||
    // input is short without scope
    short === input ||
    // input is short with scope
    short === input.replace(scopeRE, '')
  )
}

exports.getPluginLink = id => {
  if (vueOfficialRE.test(id)) {
    return `https://github.com/luoxue-victor/webpack-box/tree/master/packages/cli-plugin-${
      exports.toShortPluginId(id)
    }`
  }
  let pkg = {}
  try {
    pkg = require(`${id}/package.json`)
  } catch (e) {}
  return (
    pkg.homepage ||
    (pkg.repository && pkg.repository.url) ||
    `https://www.npmjs.com/package/${id.replace('/', '%2F')}`
  )
}
