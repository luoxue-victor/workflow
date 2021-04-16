<div align="center">

# 制定你自己的前端工作流

<img src="public/asset/logo-mini2.png" width="200">

### <strong>workflow</strong>

[![npm][npm]][github-url]
[![node][node]][node-url]
[![star][star]][github-url]
[![issue][issue]][issue-url]
[![forks][forks]][github-url]

<!-- [![downloads][downloads]][npm-url] -->
<a name="1_0"></a>

</div>

### 目录

1. <a href="#1_1">简介</a>
2. <a href="#1_2">Resources</a>
3. <a href="#1_3">@pkb/cli 脚手架</a>
4. <a href="#1_4">webpack-box</a>
5. <a href="#1_5">rollup-box</a>
6. <a href="#1_6">node-tools</a>
7. <a href="#1_7">开发&学习</a>
8. <a href="#1_8">配置</a>

### <a name="1_1">简介</a>  <a href="#1_0"><font size=10>上</font></a>


workflow 致力于打造一个工作流平台，所有的工作都可以使用一个平台来完成，诚邀大家一起来共建

- [工具教学](./learn/)
- 可插拔的插件系统
- 各种构建工具封装
- 项目集成管理
- 工具链集成
- 监控（性能监控、异常错误监控）
- 界面化管理项目

### <a name="1_2">Resources</a>  <a href="#1_0">回到顶部</a>

[webpack 学习](./learn/webpack)
[rollup 学习](./learn/rollup)
[官方插件](./packages)

-----

### <a name="1_3">@pkb/cli 脚手架</a>  <a href="#1_0">回到顶部</a>

`@pkb/cli` 为本项目的脚手架，可用来生成项目、添加插件、检查项目配置、升级更新等等，主要的功能就是对整体项目的管理。

```bash
# 全局安装
npm i -g @pkb/cli # 全局安装使用

pk create <project-name> # 创建项目 webpack|rollup
pk add <plugin> # 安装插件
pk info # 查看项目及系统配置
pk upgrade [filter] # 检查升级 npm 版本
pk cm # commit 提交
pk eslint # eslint 检查，需要安装 @pkb/plugin-eslint
pk stylelint # stylelint 检查，需要安装 @pkb/plugin-stylelint
pk gotty # 在 web 中使用终端
pk jsdoc2md # 把 js 注释生成 md
```
----
### <a name="1_4">webpack-box</a>  <a href="#1_0">回到顶部</a>

<details open=“open”>
 <summary>点击关闭/打开安装</summary><br/>

- [从零开始 webpack 学习，使用 webpack5 版本，一共 27 课时，让你从小白到大神](./learn/webpack)
- webpack-box 是一个对 webpack 进行了封装的开箱即用的项目。集成了 webpack 的各种优化，配置了 webpack 常用到的 loader 和 plugin，原则上您不需要做任何配置就可以使用。
- webpack-box 支持插件配置，您可以使用插件管理项目配置，可以多项目复用
- 您也可以当作参考手册，来这里找到任何想要的 webpack 配置
- 如果想要从头系统学习，可以切换到不同分支上，我把每课时的内容都分别切成了不同的分支，您可以在这些分支上自由尝试
- [更多...](./packages/webpack-box/README.md)


##### 安装使用

```bash
npm i @pkb/webpack-box -g # 全局安装/本地安装

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
----

</details>

### <a name="1_5">rollup-box</a>  <a href="#1_0">回到顶部</a>

- [从零开始 rollup 学习](./learn/rollup)
- 对 rollup 进行封装，大量插件，开箱即用
- [更多...](./packages/rollup-box/README.md)

##### 安装使用

```sh
npm i @pkb/rollup-box -g # 全局安装/本地安装

rollup-box build # 构建项目
rollup-box watch # 开发模式
```

------
### <a name="1_6">node-tools</a>  <a href="#1_0">回到顶部</a>

- 集成了一些 node 工具
- [更多...](./packages/tools/README.md)

-----

### <a name="1_7">开发&学习</a>  <a href="#1_0">回到顶部</a>

- [项目计划] 把 issue 整理到 project 中做好分类，并有计划的完成目标。
- [开发指南] 如果想要一起开发的可以参考这里。
- [插件市场] 目前已经完成的插件。
- [好的文章] 把我觉得好的文章整理到我的 wiki 里，也可以在项目中点击 wiki 查看。
- [好的网站] 一些比较实用的网站

[项目计划]: https://github.com/luoxue-victor/webpack-box/projects/1
[开发指南]: ./learn/webpack/课时-25.md
[插件市场]: https://www.npmjs.com/search?q=%40pkb
[好的文章]: https://github.com/luoxue-victor/webpack-box/wiki
[好的网站]: ./learn/web.md
[npm-url]: https://www.npmjs.com/package/webpack-box
[issue-url]: https://github.com/luoxue-victor/webpack-box/issues
[node]: https://img.shields.io/node/v/webpack.svg
[node-url]: https://nodejs.org
[github-url]: https://github.com/luoxue-victor/webpack-box
[downloads]: https://img.shields.io/npm/dt/@pkb/webpack-box.svg?style=flat-square
[npm]: https://img.shields.io/npm/v/webpack.svg
[issue]: https://img.shields.io/github/issues/luoxue-victor/webpack-box
[forks]: https://img.shields.io/github/forks/luoxue-victor/webpack-box
[star]: https://img.shields.io/github/stars/luoxue-victor/webpack-box

-----
