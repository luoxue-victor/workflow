// [babel-loader 配置]
module.exports = ({ config, resolve, tsx }) => {
  const babelConf = {
    env: {
      test: {
        plugins: ['@babel/plugin-transform-modules-commonjs']
      }
    },
    presets: [
      ['@babel/typescript'],
      [
        '@babel/preset-react',
        {
          corejs: '3',
          useBuiltIns: 'usage',
          loose: true,
          modules: false,
          targets: {
            chrome: 59,
            edge: 13,
            firefox: 50,
            safari: 8
          }
        }
      ]
    ],
    plugins: [
      'transform-class-properties',
      '@babel/proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (tsx) {
    babelConf.presets[1].pop()
    babelConf.presets.push('@babel/preset-react')
    babelConf.plugins.shift()
  }

  const baseRule = config.module.rule('babel').test(/.[jt]sx?$/)
  return () => {
    baseRule
      .use('babel')
      .loader(require.resolve('babel-loader'))
      .options(babelConf)
  }
}
