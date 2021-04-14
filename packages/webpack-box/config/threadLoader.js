// [多线程配置]
/**
 * @name thread
 * @description 多线程配置
 */
module.exports = ({ config, options }) => {
  const baseRule = config.module.rule('thread').test(/.js|.tsx?$/)
  return () => {
    const { useThreads } = options
    if (useThreads) {
      const threadLoaderConfig = baseRule
        .use('thread-loader')
        .loader('thread-loader')
      threadLoaderConfig.options({ workers: 3 })
    }
  }
}
