// [多线程配置]
module.exports = ({ config, options }) => {
  const baseRule = config.module.rule('js').test(/.js|.tsx?$/)
  return () => {
    const useThreads = options.useThreads
    if (useThreads) {
      const threadLoaderConfig = baseRule
        .use('thread-loader')
        .loader('thread-loader')
      threadLoaderConfig.options({ workers: 3 })
    }
  }
}
