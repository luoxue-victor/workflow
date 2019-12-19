#!/usr/bin/env node
const { getAllCwds } = require('../api/CwdAPI')

const {
  injectCommand,
  commandComplete
} = require('../api/CommandAPI')
const PluginAPI = require('../api/PluginAPI')

// 注册命令行
getAllCwds().forEach(cwd => {
  cwd({ injectCommand, api: PluginAPI })
})
// 命令行注册完成
commandComplete()
