### 安装

<details open=“open”>
 <summary>点击关闭/打开安装</summary><br/>

```bash
npm i -g webpack-box # 全局安装使用
npm link # 建立软连接，可以使用 webpack-box 命令
```

</details>

### 使用

<details open=“open”>
 <summary>点击关闭/打开使用</summary><br/>

```bash
webpack-box dev   # 开发环境
webpack-box build # 生产环境
webpack-box dll   # 编译差分包
webpack-box dev index   # 指定页面编译（多页面）
webpack-box build index # 指定页面编译（多页面）
webpack-box build index --report # 开启打包分析
webpack-box build:ssr  # 编译ssr
webpack-box ssr:server # 在 server 端运行
webpack-box lint eslint # 自动修复 eslint 错误
webpack-box lint tslint # 自动修复 tslint 错误
webpack-box lint stylelint # 自动修复 stylelint 错误
webpack-box upgrade 5 # 可以切换到 webpack5/4
```

在 package.json 中使用

```json
{
  "scripts": {
    "dev": "webpack-box dev",
    "build": "webpack-box build",
    "dll": "webpack-box dll",
    "build:ssr": "webpack-box build:ssr",
    "ssr:server": "webpack-box ssr:server"
  }
}
```

</details>
