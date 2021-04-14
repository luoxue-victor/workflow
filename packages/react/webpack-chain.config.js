// [react 配置]
module.exports = ({ config }) => () => {
  const baseRule = config.module.rule('babel')
  baseRule
    .use('babel')
    .loader(require.resolve('babel-loader'))
    .tap((options) => {
      options.presets.push([
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
      ])
      return options
    })
}
