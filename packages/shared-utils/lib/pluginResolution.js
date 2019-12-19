const vuePluginRE = /^(@vue\/|vue-|@[\w-]+(\.)?[\w-]+\/vue-)(cli-)?plugin-/
const scopeRE = /^@[\w-]+(\.)?[\w-]+\//
const vueOfficialRE = /^@vue\//

const pbPluginRE = /^(@pkb\/|pb-|@[\w-]+(\.)?[\w-]+\/pb-)(cli-)?plugin-/
const pbOfficialRE = /^@pkb\//

const officialPlugins = [
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

exports.isPlugin = id => vuePluginRE.test(id) || pbPluginRE.test(id)

exports.isOfficialPlugin = id => exports.isPlugin(id) && pbOfficialRE.test(id)

exports.toShortPluginId = id => id.replace(vuePluginRE, '')

exports.resolvePluginId = id => {
  // 完整的 id
  if (vuePluginRE.test(id) || pbPluginRE.test(id)) {
    return id
  }
  // 这块会换成 pb
  if (officialPlugins.includes(id)) {
    return `@pkb/cli-plugin-${id}`
  }
  // scoped short
  // e.g. @pkb/foo, @pkb/foo
  if (id.charAt(0) === '@') {
    const scopeMatch = id.match(scopeRE)
    if (scopeMatch) {
      const scope = scopeMatch[0]
      const shortId = id.replace(scopeRE, '')
      let ii = ''
      if (/^(@pkb)/.test(id)) {
        ii = `${scope}${
          (scope === '@pkb/' ? '' : 'pb-')
        }cli-plugin-${shortId}`
      } else {
        ii = id
      }
      return ii
    }
  }
  // default short
  // e.g. foo
  console.log('-----------------', id)
  return `vue-cli-plugin-${id}`
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
