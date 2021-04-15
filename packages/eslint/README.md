## @pkb/plugin-eslint 插件

配合 webpack-box 使用，用来检查并修复 eslint

### 安装

```bash
npm i -D @pkb/plugin-eslint
```

### 配置

在根目录下 `webpack-box.config.js` 开启 eslint

```js
module.exports = function(config) {
  return {
    eslint: {
      lintOnSave: true, // 开启运行时检测
      extensions: ["js", "jsx", "vue"] // 默认 ['js', 'jsx']
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
    "lint": "webpack-box eslint"
  }
}
```
