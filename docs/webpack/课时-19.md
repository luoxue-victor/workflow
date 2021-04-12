## 课时 19：添加 webpack 配置检查命令

webpack-chain 的配置有一个很大的缺陷就是，你不能很直观的看出到底有哪些配置，除非你对所有配置都非常了解。所以这里我做了一个检查配置的命令

```bash
webpack-box inspect > output.json # 导出所有配置到 output.json
webpack-box inspect --rules # 查看所有 loader 列表
webpack-box inspect --rule babel # 查看指定 loader 配置
webpack-box inspect --plugins # 查看所有插件列表
webpack-box inspect --plugin mini-css-extract # 查看指定插件配置
```
