## 调试

按 f5 打开调试

1. cmd + shift + P 输入 Hello World 输出 `Hello World from extension!` 说明插件加载成功

### 目录结构

```bash
├── README.md
├── package.json
├── .vscode # 配置
|  ├── extensions.json
|  └── launch.json
├── build/index.js # 构建
└── src
   ├── main.js # 入口
   ├── extensions # 插件
   |  ├── helloWorld.js
   |  └── packageJsonJumpToNodeModules.js
   ├── themes/colortheme-color-theme.json # 主题
   ├── snippets/console.code-snippets # 代码片段
   └── utils/index.js # 工具
```

### contributes

```bash
- commands # 脚本命令
- snippets # 代码片段
- themes # 主题
- keybindings # 快捷键设置
```

### 开发

```bash
npm run build # 自动构建
```