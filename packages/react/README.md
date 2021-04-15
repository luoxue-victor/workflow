## @pkb/plugin-react 插件

配合 webpack-box 使用，用来配置 react

### 安装

```bash
npm i -D @pkb/plugin-react
```

### 配置

在根目录下 `webpack-box.config.js` 开启 react

```js
module.exports = function(config) {
  return {
    env: {
      REACT: "react" // 配置 react
    }
  };
};
```
