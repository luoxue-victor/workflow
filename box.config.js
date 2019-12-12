const path = require('path')
function resolve (dir) {
  return path.join(process.cwd(), dir)
}

module.exports = function (config) {
  /**
   * @param {object} dll 开启差分包
   * @param {object} pages 多页面配置 通过 box run/build index 来使用
   * @param {function} chainWebpack
   * @param {string} entry 入口
   * @param {string} output 出口
   *
   * @param {string} publicPath
   * @param {string} port 端口
   * @param {object} eslint eslint 配置
   * @param {object} stylelint stylelint 配置
   * @param {object} eslint eslint 配置
   * @param {object} alias 配置别名
   */
  return {
    entry: 'src/main.js',
    output: 'dist',
    publicPath: '/common/',
    port: 8888,
    alias: {
      '@': resolve('src'),
      '@src': resolve('src')
    },
    eslint: {
      lintOnSave: true, // 开启运行时检测
      extensions: ['js', 'jsx', 'vue'] // 默认 ['js', 'jsx']
    },
    tslint: {
      lintOnSave: true, // 开启运行时检测
      useThreads: true
    },
    stylelint: {
      lintOnSave: true // 开启运行时检测
      // extensions: ['vue', 'htm', 'html', 'css', 'sss', 'less', 'scss']
    },
    // dll: {
    //   venders: ['react']
    // },
    pages: {
      index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html'
      },
      index2: {
        entry: 'src/main.js',
        template: 'public/index2.html',
        filename: 'index2.html'
      }
    },
    chainWebpack(config) {
    }
  }
}
