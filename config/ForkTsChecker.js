const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')

module.exports = ({ config, resolve }) => {
  const chalk = require('chalk')

  return () => {
    try {
      require(resolve('tsconfig.json'))
      config.plugin('ts-fork')
        .use(ForkTsCheckerWebpackPlugin, [{
          // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
          async: false
        }])
    } catch (error) {
      console.log(chalk.yellow('您项目中未配置 tsconfig.json，可能会影响您的静态检查报错～'))
    }
    // 将TypeScript类型检查错误以弹框提示
    // 如果fork-ts-checker-webpack-plugin的async为false时可以不用
    // 否则建议使用，以方便发现错误
    config.plugin('ts-notifier')
      .use(ForkTsCheckerNotifierWebpackPlugin, [{
        title: 'TypeScript',
        excludeWarnings: true,
        skipSuccessful: true
      }])
  }
}
