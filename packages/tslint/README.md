## @pkb/plugin-tslint 插件

配合 webpack-box 使用，用来检查并修复 tslint

### 安装

```bash
npm i -D @pkb/plugin-tslint
```

### 配置

在根目录下 `box.config.js` 开启 tslint

```js
module.exports = function(config) {
  return {
    tslint: {
      lintOnSave: true, // 开启运行时检测
      useThreads: true
    }
  };
};
```

### 使用

在 package.json 中配置 lint 脚本，执行 `npm run lint`

`package.json`

```json
{
  "scripts": {
    "lint": "webpack-box tslint"
  }
}
```
