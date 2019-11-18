# learn_webpack

## 打包 src 下的 index.js index.css 到 dist/bundle.js

### 配置

package.json

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack", // 开发环境
    "build": "cross-env NODE_ENV=production webpack" // 生产环境
  },
  "dependencies": {
    "cross-env": "^6.0.3",
    "css-loader": "^3.2.0",
    "rimraf": "^3.0.0",
    "webpack": "^4.41.2"
  },
  "devDependencies": {
    "webpack-cli": "^3.3.10"
  }
}
```

webpack.config.js

```js
const path = require('path');
const rimraf = require('rimraf');

// 删除 dist 目录
rimraf.sync('dist');

// webpack 配置
module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

src/index.js

```js
const css = require('css-loader!./index.css');
const a = 100;
console.log(a, css);
```

src/index.css

```css
body {
  width: 100%;
  height: 100vh;
  background-color: orange;
}
```

使用 webpack-chain 修改配置

```js
const path = require('path');
const rimraf = require('rimraf');
const Config = require('webpack-chain');
const config = new Config();
const resolve = (src) => {
  return path.join(process.cwd(), src)
}

// 删除 dist 目录
rimraf.sync('dist')

config
  // 入口
  .entry('src/index') 
    .add(resolve('src/index.js'))
    .end()
  // 模式
  // .mode(process.env.NODE_ENV) 等价下面
  .set('mode', process.env.NODE_ENV)
  // 出口
  .output
    .path(resolve('dist'))
    .filename('[name].bundle.js');

config.module
  .rule('css')
  .test(/\.css$/)
    .use('css')
    .loader('css-loader')
      
module.exports = config.toConfig();
```