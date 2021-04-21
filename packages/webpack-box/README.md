# webpack-box

1. webpack-box 是一个对 webpack 进行了封装的开箱即用的项目。集成了 webpack 的各种优化，配置了 webpack 常用到的 loader 和 plugin，原则上您不需要做任何配置就可以使用。
2. webpack-box 支持插件配置，您可以使用插件管理项目配置，可以多项目复用
3. 您也可以当作参考手册，来这里找到任何想要的 webpack 配置
4. 如果想要从头系统学习，可以切换到不同分支上，我把每课时的内容都分别切成了不同的分支，您可以在这些分支上自由尝试
5. [学习webpack](../../learn/webpack)
### 安装

<details open=“open”>
 <summary>点击关闭/打开安装</summary><br/>

#### webpack-box 配置安装及开发

`webpack-box` 针对某个项目使用，可以在本地 `npm script` 内使用，也可以全局使用

```bash
npm i @pkb/webpack-box -D # 本地安装
npm i @pkb/webpack-box -g # 全局安装
```

</details>

### 使用

<details open=“open”>
 <summary>点击关闭/打开使用</summary><br/>

```bash
# --- 项目构建 ---
webpack-box dev   # 开发环境
webpack-box build # 生产环境
webpack-box dll   # 编译差分包
webpack-box dev index   # 指定页面编译（多页面）
webpack-box build index # 指定页面编译（多页面）
webpack-box build index --report # 开启打包分析
webpack-box build:ssr  # 编译ssr
webpack-box ssr:server # 在 server 端运行
# --- 切换 webpack 版本 ---
webpack-box upgrade 5 # 可以切换到 webpack5/4
# --- 检查配置 ---
webpack-box inspect > output.json # 导出所有配置到 output.json
webpack-box inspect --rules # 查看所有 loader 列表
webpack-box inspect --rule babel # 查看指定 loader 配置
webpack-box inspect --plugins # 查看所有插件列表
webpack-box inspect --plugin mini-css-extract # 查看指定插件配置
# --- graphql ---
webpack-box server:gql # graphql-server
# --- 插件命令及安装 ---
# npm i -D @pkb/plugin-eslint
webpack-box eslint # 自动修复 eslint 错误
# npm i -D @pkb/plugin-tslint
webpack-box tslint # 自动修复 tslint 错误
# npm i -D @pkb/plugin-stylelint
webpack-box stylelint # 自动修复 stylelint 错误
```

在 package.json 中使用

```bash
{
  "scripts": {
    "dev": "webpack-box dev",
    "build": "webpack-box build",
    ...
  }
}
```

</details>

### 支持的配置

- [BundleAnalyzerPlugin](./config/BundleAnalyzerPlugin.js) 打包分析
- [CompressionWebpackPlugin](./config/CompressionWebpackPlugin.js) 严格区分大小写
- [dll-plugin](./config/DllPlugin.js) 查分包配置
- [EnvironmentPlugin](./config/EnvironmentPlugin.js) 定义通用变量
- [fork-ts-checker](./config/ForkTsChecker.js) 检查ts类型
- [friendly-errors-webpack-plugin](./config/FriendlyErrorsWebpackPlugin.js) 友好错误提示
- [html-webpack-plugin](./config/HtmlWebpackPlugin.js) 生成html
- [mini-css-extract-plugin](./config/MiniCssExtractPlugin.js) 提取样式
- [PreloadWebpackPlugin](./config/PreloadWebpackPlugin.js) preload 预加载
- [progress-bar-webpack-plugin](./config/ProgressBarPlugin.js) 构建时添加进度条配置
- [alias](./config/alias.js) 别名配置
- [assets](./config/assets.js) 加载资源 images、svg、media、fonts
- [babel-loader](./config/babelLoader.js) babel-loader 配置
- [base](./config/base.js) 基础配置
- [CaseSensitivePaths](./config/caseSensitivePaths.js) 严格区分大小写
- [dashboard](./config/dashboard.js) 增加仪表盘配置
- [devServer.before](./config/devServerBefore.js) 在devServer中添加中间件，mock数据
- [webpack-manifest-plugin](./config/manifest.js) 提取 manifest
- [optimization](./config/optimization.js) 优化配置
- [style](./config/style.js) 样式表配置，包括 less\sass\stylus\postcss
- [global style](./config/styleResourcesLoader.js) 全局样式变量
- [thread](./config/threadLoader.js) 多线程配置
- [tslint](./config/tslintPlugin.js) ts 检查配置

