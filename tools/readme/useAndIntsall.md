### 安装

<details open=“open”>
 <summary>点击关闭/打开安装</summary><br/>

```bash
# 全局安装
npm i -g webpack-box # 全局安装使用

# 本地调试
git clone https://github.com/luoxue-victor/webpack-box.git
cd packages/webpack-box
npm link # 建立软连接，可以使用 webpack-box 命令
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
# --- 执行lint修复功能 ---
webpack-box lint eslint # 自动修复 eslint 错误
webpack-box lint tslint # 自动修复 tslint 错误
webpack-box lint stylelint # 自动修复 stylelint 错误
# 切换 webpack 版本
webpack-box upgrade 5 # 可以切换到 webpack5/4
# --- 检查配置 ---
webpack-box inspect > output.json # 导出所有配置到 output.json
webpack-box inspect --rules # 查看所有 loader 列表
webpack-box inspect --rule babel # 查看指定 loader 配置
webpack-box inspect --plugins # 查看所有插件列表
webpack-box inspect --plugin mini-css-extract # 查看指定插件配置
# --- graphql ---
webpack-box server:gql # graphql-server
# --- cli 插件 ---
webpack-box info # 查看项目及系统配置
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
