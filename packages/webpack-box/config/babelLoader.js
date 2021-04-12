// [babel-loader 配置]
/**
 * @name babel-loader
 * @description babel-loader 配置
 */
module.exports = ({ config }) => {
  const presets = [
    ['@babel/typescript'],
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
    ]
  ]
  const babelConf = {
    env: {
      test: {
        plugins: ['@babel/plugin-transform-modules-commonjs']
      }
    },
    presets,
    plugins: [
      'transform-class-properties',
      '@babel/proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      ['import', { libraryName: 'antd', style: true }]
    ]
  }

  const baseRule = config.module.rule('babel').test(/.[jt]sx?$/)
  return () => {
    baseRule
      .use('babel')
      .loader(require.resolve('babel-loader'))
      .options(babelConf)
      .after('process-env')
  }
}
