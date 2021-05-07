## node-box

基于 koa 封装轻量级的 node 应用，开箱即用

### 安装

```sh
npm i @pkb/node-box -g # 全局安装/本地安装

node-box build # 构建项目
node-box watch # 开发模式
```

### 目录

```bash
-- app 
  -- controller
  -- router
-- public # 静态资源
```

#### controller 示例

controller/home.js

```js
'use strict';

class HomeController {
  async one({ ctx, next }) {

    ctx.body = {
      content: 'one',
    };
  }

  async two({ ctx, next }) {

    ctx.body = {
      content: 'two',
    };
  }
}

module.exports = HomeController;
```

#### router 示例

router/home.js

```js
'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/one', controller.home.one);
  router.get('/two', controller.home.two);
  router.get('/');
};
```
