const fs = require('fs')
const { join } = require('path')
const useGotty = require('../util/useGotty')
const chalk = require('chalk')
const path = require('path')
const os = require('os')

const { getCurBranchPromise, getPwdPromise, getDiffPromise } = require('../util/index')
const configPath = join(__dirname, '..', 'src', '_config.js')
const projectListPath = path.join(os.homedir(), '__list__.json')

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

  let list = require(projectListPath)

  const updateList = (socket) => {
    socket.emit('get project list', list)
    fs.writeFileSync(projectListPath, JSON.stringify(list, null, 2))
  }

  try {
    const port = await createServer(20000, async (socket) => {
      socket.emit('get project list', list)
      
      socket.on('to top project', (name) => {
        console.log('置顶', name)
        const item = list.filter(_ => _.pwd === name)
        const restList = list.filter(_ => _.pwd !== name)
        list = [...item, ...restList]

        updateList(socket)
      })

      socket.on('clear project list', () => {
        console.log('清空')
        list = []
        updateList(socket)
      })

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

        updateList(socket)
      })

      socket.on('delete project list', (name) => {
        console.log('删除', name)
        if (!name) {
          return
        }

        list = list.filter(_ => _.pwd !== name)

        updateList(socket)
      })
      
      // 浏览器初始化项目
      socket.on('client init', async(context) => {
        try {
          const branch = await getCurBranchPromise(context)
          socket.emit('git branch', branch)
        } catch (error) {
          socket.emit('git branch', null)
        }

        try {
          const diff = await getDiffPromise(context)

          console.log(diff)
          socket.emit('git diff', diff)
        } catch (error) {

          console.log(error)
          socket.emit('git diff', null)
        }

        try {
          const pwd = await getPwdPromise(context)
          socket.emit('pwd', pwd)
        } catch (error) {
          socket.emit('pwd', null)
        }

        try {
          const http = await useGotty(context || process.cwd(), ['sh'], 30000)
          socket.emit('gotty', http)
        } catch (error) {
          socket.emit('gotty', null)
        }
      })
    })

    fs.writeFileSync(configPath, `export default ${JSON.stringify({
      socketUrl: `http://localhost:${port}`
    }, null, 2)}`)

  } catch (error) {
    console.log(error)
  }
}

const client = () => {
  const { createServer, getPlugins } = require('@pkb/vite-box')
  const plugins = getPlugins();
  createServer({ plugins, root: join(__dirname, '..') })
}