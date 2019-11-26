module.exports = ({ config, resolve }) => {
  const baseRule = config.module.rule('js').test(/.js|.tsx?$/);
  const normalRule = baseRule.oneOf('normal');
  return () => {
    normalRule
      .use('options-chain')
      .loader(resolve('options-chain-loader'))
  }
}