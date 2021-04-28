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

workflow 致力于打造一个工作流平台，所有的工作都可以使用一个平台来完成，诚邀大家一起来共建

### 脚手架

`@pkb/cli` 可用来生成项目、添加插件、检查项目配置、升级更新等等，主要的功能就是对整体项目的管理。

```bash
# 全局安装
npm i -g @pkb/cli # 全局安装使用

pk create <project-name> # 创建项目 webpack|rollup|vite|lerna|node
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
```
### 插件

- [脚手架] 通过脚手架管理项目，辅助开发
- [webpack-box] 集成了大量webpack插件，使用 webpackChain 配置，开箱即用
- [rollup-box] 对 rollup 进行封装，开箱即用
- [vite-box] 基于 vite 构建的脚手架，支持 vite 所有配置
- [node-box] 基于 koa 构建的 node 框架

[脚手架]: ./packages/cli/README.md
[webpack-box]: ./packages/webpack-box/README.md
[rollup-box]: ./packages/rollup-box/README.md
[vite-box]: ./packages/vite-box/README.md
[node-box]: ./packages/node-box/README.md
### 工具

- [node 工具](./packages/shared-utils/README.md)
- [npm-packages](https://github.com/luoxue-victor/npm-packages)

### 学习&共建

- [webpack 学习](./learn/webpack)
- [rollup 学习](./learn/rollup)
- [项目计划] 把 issue 整理到 project 中做好分类，并有计划的完成目标。
- [开发指南] 如果想要一起开发的可以参考这里。
- [插件市场] 目前已经完成的插件。
- [好的网站] 一些比较实用的网站

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
