#!/usr/bin/env node
const {
  injectCommand,
  getAllCommands,
  commandComplete
} = require('../api/CommandAPI')
const PluginAPI = require('../api/PluginAPI')
console.log('-------- global webpack-box --------')
// 注册命令行
getAllCommands().forEach(cwd => {
  cwd({ injectCommand, api: PluginAPI })
})
// 命令行注册完成
commandComplete()
