## @pkb/plugin-stylelint 插件

配合 webpack-box 使用，用来检查并修复 stylelint

### 安装

```bash
npm i -D @pkb/plugin-stylelint
```

### 配置

在根目录下 `webpack-box.config.js` 开启 stylelint

```js
module.exports = function(config) {
  return {
    stylelint: {
      lintOnSave: true // 开启运行时检测
      extensions: ['vue', 'htm', 'html', 'css', 'sss', 'less', 'scss']
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
    "lint": "webpack-box stylelint"
  }
}
```
