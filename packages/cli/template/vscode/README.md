## 调试

按 f5 打开调试

1. cmd + shift + P 输入 Hello World 输出 `Hello World from extension!` 说明插件加载成功

### 目录结构

```bash
├── index.js # 入口
├── package.json
├── .vscode # vscode 配置
|  ├── extensions.json
|  └── launch.json
├── snippets/ # snippet 在这里写
└── extensions/ # extensions 在这里写
```