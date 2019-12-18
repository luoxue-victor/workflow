exports.getPromptModules = () => {
  return [
    // 'babel',
    // 'typescript',
    // 'pwa',
    // 'router',
    // 'vuex',
    // 'cssPreprocessors',
    // 'linter',
    // 'unit',
    // 'e2e'
    'commitlint',
    'mini-pack'
  ].map(file => require(`../promptModules/${file}`))
}
