### 安装

<details open=“open”>
 <summary>点击关闭/打开安装</summary><br/>

#### 1. 全局脚手架安装及使用

脚手架主要针对所有项目的管理，甚至可以针对任何非本工程的项目使用

```bash
# 全局安装
npm i -g @pkb/cli # 全局安装使用

pk create <project-name> # 创建项目（待完善）
pk add <plugin> # 安装插件
pk info # 查看项目及系统配置
```

#### 2. webpack-box 配置安装及开发

`webpack-box` 针对某个项目使用，可以在本地 `npm script` 内使用，也可以全局使用

```bash
npm i @pkb/webpack-box -D # 本地安装
npm i @pkb/webpack-box -g # 全局安装
```

</details>

### 使用

<details open=“open”>
 <summary>点击关闭/打开使用</summary><br/>

```bash
# --- 项目构建 ---
webpack-box dev   # 开发环境
webpack-box build # 生产环境
webpack-box dll   # 编译差分包
webpack-box dev index   # 指定页面编译（多页面）
webpack-box build index # 指定页面编译（多页面）
webpack-box build index --report # 开启打包分析
webpack-box build:ssr  # 编译ssr
webpack-box ssr:server # 在 server 端运行
# --- 切换 webpack 版本 ---
webpack-box upgrade 5 # 可以切换到 webpack5/4
# --- 检查配置 ---
webpack-box inspect > output.json # 导出所有配置到 output.json
webpack-box inspect --rules # 查看所有 loader 列表
webpack-box inspect --rule babel # 查看指定 loader 配置
webpack-box inspect --plugins # 查看所有插件列表
webpack-box inspect --plugin mini-css-extract # 查看指定插件配置
# --- graphql ---
webpack-box server:gql # graphql-server
# --- 插件命令及安装 ---
# npm i -D @pkb/plugin-eslint
webpack-box eslint # 自动修复 eslint 错误
# npm i -D @pkb/plugin-tslint
webpack-box tslint # 自动修复 tslint 错误
# npm i -D @pkb/plugin-stylelint
webpack-box stylelint # 自动修复 stylelint 错误
```

在 package.json 中使用

```bash
{
  "scripts": {
    "dev": "webpack-box dev",
    "build": "webpack-box build",
    ...
  }
}
```

</details>
