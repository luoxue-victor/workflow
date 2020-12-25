## node 工具

### 提交 commit

命令行

```sh
tls cm
```

效果，通过上下方向键选择

```
[成功] 文件检查通过

? 请选择一种 type (Use arrow keys)
❯ 1. feat: 新增feature 
  2. fix: 修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG 
  3. docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等 
  4. style: 仅仅修改了空格、格式缩进、变量名等等，不改变代码逻辑 
  5. refactor: 代码重构，没有加新功能或者修复bug 
  6. perf: 优化相关，比如提升性能、体验 
  7. test: 测试用例，包括单元测试、集成测试等 
  8. chore: 改变构建流程、或者增加依赖库、工具等 
  9. revert: 回滚到上一个版本 
  10. merge: 代码合并 
  11. sync: 同步主线或分支的Bug 
```

### open app

命令行打开指定 app

比如打开 item2

```sh
tls open iTerm
```

如果不知道 app 名字，可以去 Applications 文件夹查找

### 工具方法

[工具方法](./util/utils.js)