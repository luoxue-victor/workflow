# @pkb/cli

`@pkb/cli` 可用来生成项目、添加插件、检查项目配置、升级更新等等，主要的功能就是对整体项目的管理。

```bash
# 全局安装
npm i -g @pkb/cli # 全局安装使用

pk create <project-name> # 创建项目 webpack|rollup|vite|lerna|node
pk add <plugin> # 安装插件
pk info # 查看项目及系统配置
pk upgrade [filter] # 检查升级 npm 版本 并安装
pk cm # commit 提交
pk eslint # eslint 检查，需要安装 @pkb/plugin-eslint
pk stylelint # stylelint 检查，需要安装 @pkb/plugin-stylelint
pk gotty # 在 web 中使用终端
pk jsdoc2md # 把 js 注释生成 md
pk lerna # 多包管理 发布
pk changelog # 生成 changelog
pk mock # 开启 mock，支持 mockjs
pk deps #
```
### mock

模拟接口，支持 mockjs

```js
module.exports = {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },
  // GET 可省略
  '/api/users/1': { id: 2 },
  '/api/users/2': (req, res) => {
    res.json({
      success: true
    })
  },
  '/api/users/3' (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
  '/api/users/4': {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-30': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1
    }]
  }
}

// GET http://localhost:3000/api/users
// GET http://localhost:3000/api/users/1
// GET http://localhost:3000/api/users/2
// GET http://localhost:3000/api/users/3
// GET http://localhost:3000/api/users/4
```
