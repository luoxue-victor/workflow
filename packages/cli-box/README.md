# cli-box

提供一套脚手架方案

### 安装

```bash
npm i @pkb/cli-box
```

### 使用

在 bin/index.js
```js
#!/usr/bin/env node

const bin = require('@pkb/cli-box')

cli({
  root: path.join(__dirname, '..')
})
```

### 目录结构

```bash
cli
  -- commands # 所有命令行文件夹
```

