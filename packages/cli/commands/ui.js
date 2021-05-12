const fs = require('fs')
const { join } = require('path')
const useGotty = require('../util/useGotty')
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const execa = require('execa')

const { getCurBranchPromise, getPwdPromise, getDiffPromise } = require('../util/index')
const configPath = join(__dirname, '..', 'src', '_config.js')
const projectListPath = path.join(os.homedir(), '__list__.json')

// 项目列表
let list = require(projectListPath)

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('ui')
    .description('cli ui，界面话')
    .action(async () => {
      await socket()
      client()
    })
}

async function socket() {
  const { createServer } = require('../../node-box/socket')

  if (!fs.existsSync(projectListPath)) {
    fs.writeFileSync(projectListPath, JSON.stringify([], null, 2))
  }

  try {
    const port = await createServer(20000, async (socket) => {
      // 初始化项目列表
      socket.emit('get project list', list)
      
      // 更新项目列表
      const callback = (socket) => {
        socket.emit('get project list', list)
        fs.writeFileSync(projectListPath, JSON.stringify(list, null, 2))
      }

      // 监听事件
      toTopProject(socket, callback)
      clearProjectList(socket, callback)
      addProjectList(socket, callback)
      deleteProjectList(socket, callback)
      onGottyCmd(socket, callback)
      onGitCommit(socket)
    })

    // 将socket链接动态传给端上
    fs.writeFileSync(configPath, `export default ${JSON.stringify({
      socketUrl: `http://localhost:${port}`
    }, null, 2)}`)
  } catch (error) {
    console.log(error)
  }
}

// ========================= listen =====================================
const onGottyCmd = (socket) => {
  socket.on('gotty cmd', async (context, cmd) => {
    console.log('onGottyCmd', context, cmd)
    socketUseGotty(socket, context, cmd)
  })
}

const onGitCommit = async (socket) => {
  socket.on('git commit', async (context, commit) => {
    console.log('commit', commit)

    await execa('git', ['add', '.'], {
      cwd: context
    })
    
    const { stdout } = await execa('git', ['commit', '-m', commit], {
      cwd: context
    })

    console.log(stdout.toString())
  })
}

const onClientInit = (socket) => {
  socket.on('client init', async (context) => {
    socketCurBranch(socket, context)
    socketGitDiff(socket, context)
    socketGetPwd(socket, context)
    socketUseGotty(socket, context)
  })
}

const toTopProject = (socket, cb) => {
  socket.on('to top project', (name) => {
    console.log('置顶', name)
    const item = list.filter(_ => _.pwd === name)
    const restList = list.filter(_ => _.pwd !== name)
    list = [...item, ...restList]
  
    cb(socket)
  })
}

const clearProjectList = (socket, cb) => {
  socket.on('clear project list', () => {
    console.log('清空')
    list = []
    cb(socket)
  })
}

const deleteProjectList = (socket, cb) => {
  socket.on('delete project list', (name) => {
    console.log('删除', name)
    if (!name) {
      return
    }

    list = list.filter(_ => _.pwd !== name)

    cb(socket)
  })
  
  // 浏览器初始化项目
  onClientInit(socket)
}

const addProjectList = (socket, cb) => {
  socket.on('add project list', (name) => {
    console.log('添加', name)
    
    if (!name || !fs.existsSync(name)) {
      console.log(name, '不存在')
      return
    }

    const item = list.filter(_ => _.pwd === name)

    if (item && item[0] && item[0].pwd) {
      console.log(name, '已经存在')
      return
    }

    list.push({
      pwd: name
    })

    cb(socket)
  })
}

// ====================== util ==============================
const client = () => {
  const { createServer, getPlugins } = require('@pkb/vite-box')
  const plugins = getPlugins();
  createServer({ plugins, root: join(__dirname, '..') })
}

const socketCurBranch = async (socket, context) => {
  try {
    const branch = await getCurBranchPromise(context)
    socket.emit('git branch', branch)
  } catch (error) {
    socket.emit('git branch', null)
  }
}

const socketGitDiff = async (socket, context) => {
  clearInterval(global.gitDiffTimer)
  global.gitDiffTimer = setInterval(async () => {
    try {
      const diff = await getDiffPromise(context)
      socket.emit('git diff', diff)
    } catch (error) {
      console.log(error)
      socket.emit('git diff', null)
    }
  }, 2000)
}

const socketGetPwd = async (socket, context) => {
  try {
    const pwd = await getPwdPromise(context)
    socket.emit('pwd', pwd)
  } catch (error) {
    socket.emit('pwd', null)
  }
}

const socketUseGotty = async (socket, context, cmd = ['sh']) => {
  try {
    const http = await useGotty(context || process.cwd(), cmd, 30000)
    socket.emit('gotty', http)
  } catch (error) {
    socket.emit('gotty', null)
  }
}