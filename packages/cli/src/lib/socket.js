import io from 'socket.io-client/dist/socket.io.js'
import config from '../_config';

export const init = () => {
  if (window.__socket__) return window.__socket__
  return window.__socket__ = io(config.socketUrl), window.__socket__
}

export const onGetProjectList = (cb) => {
  __socket__.on('get project list', (data = []) => {
    if (!data) {
      return
    }
    cb && cb(data)
  })
}

// ======================== on ===========================
// 获取当前项目分支
export const onGitBranch = (cb) => {
  __socket__.on('git branch', cb)
}

// 设置diff
export const onGitDiff = (cb) => {
  __socket__.on('git diff', cb)
}

// 获取当前项目路径
export const onPwd = (cb) => {
  __socket__.on('pwd', cb)
}

// 开启 web 终端
export const onGotty = (cb) => {
  __socket__.on('gotty', cb)
}

// ======================== emit ===========================
export const emitClientInit = (context) => {
  __socket__.emit('client init', context)
}

export const emitAddProject = (context) => {
  __socket__.emit('add project list', context)
}

export const emitDeleteProject = (context) => {
  __socket__.emit('delete project list', context)
}

export const emitToTopProject = (context) => {
  __socket__.emit('to top project', context)
}

export const emitClearList = (context) => {
  __socket__.emit('clear project list', context)
}

export const emitGottyCmd = (context, cmd = ['sh']) => {
  __socket__.emit('gotty cmd', context, cmd)
}

export const emitCommit = (context, content) => {
  __socket__.emit('git commit', context, `\"${content}\"`)
}