<div align="center">

<img src="public/asset/logo-mini2.png" width="120">

### <strong>workflow</strong>

[![npm][npm]][github-url]
[![node][node]][node-url]
[![star][star]][github-url]
[![issue][issue]][issue-url]
[![forks][forks]][github-url]

<!-- [![downloads][downloads]][npm-url] -->
<a name="1_0"></a>

</div>

### 简介

- workflow 致力于打造一个工作流平台，将工作中的最佳实践集中在一起，提供解决各种在工作中开发遇到的问题。
- 另外也会把一些学习的课程，以后会一直更新 --> [learn-webpack]、 [learn-rollup]

### 原则

- 在任何事情上应该把复杂的东西变得更简单，而不是较为简单

### [脚手架]

`@pkb/cli` 可用来生成项目、添加插件、检查项目配置、升级更新等等，对整体项目管理。

```bash
# 全局安装
npm i -g @pkb/cli # 全局安装使用

pk create <project-name> # 创建项目 webpack|rollup|vite|lerna|node|vscode插件
pk add <plugin> # 安装插件
pk info # 查看项目及系统配置
pk upgrade [filter] # 检查升级 npm 版本
pk cm # commit 提交
pk eslint # eslint 检查，需要安装 @pkb/plugin-eslint
pk stylelint # stylelint 检查，需要安装 @pkb/plugin-stylelint
pk gotty # 在 web 中使用终端
pk jsdoc2md # 把 js 注释生成 md
pk lerna # 多包管理 发布
pk changelog # 生成 changelog
pk josn2ts # json 转成 ts
pk mock # 开启 mock，支持 mockjs
pk tinypng # 压缩图片，批量压缩
pk tree [path] # 将目录生成 tree 结构
pk find [fileName] [str] # 搜索文件及文件内容
pk qrcode [content] # 在终端输出二维码
```
### 创建项目及模板

命令 `pk create [rojectName]` 选项

- [webpack]: 集成了大量webpack插件，使用 webpackChain 配置，开箱即用
- [rollup]: 对 rollup 进行封装，开箱即用
- [vite]: 基于 vite 构建的脚手架，支持 vite 所有配置
- [node]: 基于 koa 构建的 node 框架
- [lerna]: 一键创建 lerna 模板
- [mocks]: mocks 模板，首次执行 pk mock 会自动添加在项目中
- [vscode]: 创建 vscode 插件模版

[脚手架]: ./packages/cli/README.md
[webpack]: ./packages/webpack-box/README.md
[rollup]: ./packages/rollup-box/README.md
[vite]: ./packages/vite-box/README.md
[node]: ./packages/node-box/README.md
[lerna]: ./packages/cli/template/lerna/
[mocks]: ./packages/cli/template/mocks/
[vscode]: ./packages/cli/template/vscode/
### 工具

- [node 工具](./packages/shared-utils/README.md)
- [npm-packages](https://github.com/luoxue-victor/npm-packages)

### 学习&共建

- [learn-webpack] 跟项目一起学习 webpack 
- [learn-rollup] 跟项目一起学习 rollup 
- [项目计划] 把 issue 整理到 project 中做好分类，并有计划的完成目标。
- [开发指南] 如果想要一起开发的可以参考这里。
- [插件市场] 目前已经完成的插件。
- [好的网站] 一些比较实用的网站

[learn-webpack]:./learn/webpack 
[learn-rollup]: ./learn/rollup
[项目计划]: https://github.com/luoxue-victor/webpack-box/projects/1
[开发指南]: ./learn/webpack/课时-25.md
[插件市场]: https://www.npmjs.com/search?q=%40pkb
[好的网站]: ./learn/nice-web.md
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

### 贡献者名单

<a href="https://github.com/luoxue-victor/">

![](https://avatars0.githubusercontent.com/u/25242102?s=40&v=4)
</a><a href="https://github.com/liuys1107">
![](https://avatars2.githubusercontent.com/u/25242149?s=40&v=4)
</a>


### tips

第一次发布带有命名空间的包需要使用

npm publish --access=public