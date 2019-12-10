// [babel-loader 配置]
module.exports = ({ config, resolve, tsx }) => {
  const babelConf = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            chrome: 59,
            edge: 13,
            firefox: 50,
            safari: 8
          }
        }
      ],
      [
        '@babel/preset-typescript',
        {
          allExtensions: true
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-typescript',
      'transform-class-properties',
      '@babel/proposal-object-rest-spread'
    ]
  }

  if (tsx) {
    babelConf.presets[1].pop()
    babelConf.presets.push('@babel/preset-react')
    babelConf.plugins.shift()
  }

  const baseRule = config.module.rule('js').test(/.[jt]sx?$/)
  return () => {
    baseRule
      .use('babel')
      .loader(require.resolve('babel-loader'))
      .options(babelConf)
  }
}
