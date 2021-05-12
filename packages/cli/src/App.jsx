import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client/dist/socket.io.js'
import './App.less'
import config from './_config';

const socket = io(config.socketUrl)

function App() {
  const [branch, setBranch] = useState(undefined)
  const [pwd, setPwd] = useState(undefined)
  const [gotty, setGotty] = useState(undefined)
  const [list, setList] = useState([])
  const [diff, setDiff] = useState('')

  const inputEl = useRef(null);


  useEffect(() => {
    // 获取项目列表
    socket.on('get project list', (data = []) => {
      if (!data) {
        return
      }

      setList(data)
      // 初始化项目
      socket.emit('client init', data[0]?.pwd)
    })

    // 获取当前项目分支
    socket.on('git branch', (data) => {
      setBranch(data)
    })

    // 设置diff
    socket.on('git diff', (data) => {
      setDiff(data)
    })

    // 获取当前项目路径
    socket.on('pwd', (data) => {
      setPwd(data)
    })

    // 开启 web 终端
    socket.on('gotty', (data) => {
      console.log('client gotty', data)
      setGotty(data)
    })
  }, [])

  const onBlur = (e) => {
    socket.emit('add project list', e.target.value)
    e.target.value = ''
  }

  const projectDelete = (pwd) => {
    socket.emit('delete project list', pwd)
  }

  const run = (pwd) => {
    socket.emit('to top project', pwd)
  }

  const clearList = () => {
    socket.emit('clear project list')
  }

  const gitCommit = () => {
    socket.emit('gotty cmd', pwd, ['pk', 'cm'])
  }

  const gottyRefresh = () => {
    socket.emit('gotty cmd', pwd, ['sh'])
  }

  return (
    <div className="App">
      <h1 className="title">Work Flow</h1>
      <div className="content">
        <div className="left">
          <input 
            className="project-input"
            placeholder="请输入项目地址，失焦自动填入"
            onBlur={(e) => {onBlur(e)}}
            ref={inputEl} 
            type="text"/>
          <button className="clear-list" onClick={() => { clearList() }}>清空列表</button>
          <div className="project-list">
            {
              list.map(_ => (<div className="project-li" key={_?.pwd}>
                <div className="li-wrap">
                  <span className="project-name" onClick={() => { run(_?.pwd) }}>{ _?.pwd?.split('/').pop() }</span>
                  <button className="delete" onClick={() => { projectDelete(_?.pwd) }}>删除</button>
                </div>
                <div className="line"></div>
              </div>))
            }
          </div>
        </div>
        <div className="right">
          <div className="content">
            <div className="tools">
              hahahah
            </div>
            <div className="code-diff-wrap">
              <div className="title"><span>git diff</span><button onClick={gitCommit}>提交</button></div>
              <code className="code-diff">
                { diff.split('\n').map(line => <div className={ /^\+/.test(line) ? 'green' : /^\-/.test(line) ? 'red' : '' }>{ line }</div>) }
              </code>
            </div>
          </div>
          <div className="cmd">
              <div className="title">
              <button className="extsh" onClick={gottyRefresh}>刷新</button>
              {
                branch && <>
                  <span className="branch">➜</span>
                  <span className="hidden">空</span>
                  <span>{ pwd }</span>
                  <span className="hidden">空</span>
                  <span className="git">git:(<span className="branch">{ branch }</span>)</span>
                </>
              }
            </div>
            {
              gotty && <iframe src={gotty}></iframe>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
