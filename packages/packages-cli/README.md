# 工程配置工具

将 vue-cli4 进行了封装，可以独立出 vue 项目使用

## 使用

### 安装

```bash
npm i @jijiang/packages-box -g
```

### 命令

```bash
box add <plugin> # 添加插件
```

完全兼容 vue-cli 的插件，您可以使用 

```bash
box add vue-cli-plugin-commitlint
# box 安装 vue 插件
vue add vue-cli-plugin-commitlint
```

### 插件规则

```js
const ruleReg = /^(@vue\/|vue-|box-|@[\w-]+(\.)?[\w-]+\/vue-)(cli-)?plugin-/
```

完全兼容 vue 插件，您可以使用 box add vue-cli-plugin-commitlint 来实现代码提交检查


## 生成逻辑

```js
|-- generator
|    |-- template
|-- index.js
```

template 内可以使用 ejs 模板

## 运行逻辑

index.js

```js
module.exports = () => {}
```

## 询问逻辑

prompts.js

```js
module.exports = [
  {
    type: 'confirm',
    name: 'replace',
    message: '是否添加 commitlint 插件?',
    default: true
  }
]
```
