import React, { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import 'antd/dist/antd.css';
import CommitModal from './components/modal/CommitModal'
import ProgressCard from './components/card/ProgressCard'
import './App.less'
import { 
  init, 
  onGetProjectList, 
  emitClientInit,
  onGitBranch,
  onGitDiff,
  onPwd,
  onGotty,
  emitAddProject,
  emitDeleteProject,
  emitToTopProject,
  emitClearList,
  emitGottyCmd
} from './lib/socket'

window.message = message
init();

function App() {
  const [branch, setBranch] = useState(undefined)
  const [pwd, setPwd] = useState(undefined)
  const [gotty, setGotty] = useState(undefined)
  const [list, setList] = useState([])
  const [diff, setDiff] = useState('')
  const inputEl = useRef(null);
  const commitModalEl = useRef(null);

  useEffect(() => {
    onGetProjectList((data = []) => {
      setList(data)
      emitClientInit(data[0]?.pwd)
    })

    onGitBranch((data) => {
      setBranch(data)
    })

    onGitDiff((data) => {
      setDiff(data)
    })

    onPwd((data) => {
      setPwd(data)
    })

    onGotty((data) => {
      setGotty(data)
    })
  }, [])

  const addList = (e) => {
    emitAddProject(e.target.value)
    e.target.value = ''
  }

  return (
    <div className="App">
      <CommitModal ref={commitModalEl} pwd={pwd}></CommitModal>
      <h1 className="title">Work Flow</h1>
      <div className="content">
        <div className="left">
          <input 
            className="project-input"
            placeholder="请输入项目地址，失焦自动填入"
            onBlur={addList}
            ref={inputEl} 
            type="text"/>
          <button className="clear-list" onClick={() => { emitClearList(pwd) }}>清空列表</button>
          <div className="project-list">
            {
              list.map(_ => (<div className="project-li" key={_?.pwd}>
                <div className="li-wrap">
                  <span className="project-name" onClick={() => { emitToTopProject(_?.pwd) }}>{ _?.pwd?.split('/').pop() }</span>
                  <button className="delete" onClick={() => { emitDeleteProject(_?.pwd) }}>删除</button>
                </div>
                <div className="line"></div>
              </div>))
            }
          </div>
        </div>
        <div className="right">
          <div className="content">
            <div className="flow">
              <div className="title">flow</div>
              <div className="progress-card-wrap">
                <ProgressCard></ProgressCard>
              </div>
            </div>
            <div className="code-diff-wrap">
              <div className="title"><span>git diff</span><button onClick={() => { commitModalEl.current.showModal() }}>提交</button></div>
              <code className="code-diff">
                { diff?.split('\n').map((line, index) => <div key={index} className={ /^\+/.test(line) ? 'green' : /^\-/.test(line) ? 'red' : '' }>{ line }</div>) }
              </code>
            </div>
          </div>
          <div className="cmd">
              <div className="title">
              <button className="extsh" onClick={() => { emitGottyCmd(pwd, ['sh']) }}>刷新</button>
                {pwd && <>
                  <span className="branch">➜</span>
                  <span className="hidden">空</span>
                  <span>{ pwd }</span>
                </>}
                <span className="hidden">空</span>
                {branch && <span className="git">git:(<span className="branch">{ branch }</span>)</span>}
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
