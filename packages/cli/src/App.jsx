import React, { useState } from 'react'
import './App.less'

function App() {
  const [hasGit, setHasGit] = useState(false)

  return (
    <div className="App">
      <h1 className="title">Work Flow</h1>
      <div className="content">
        <div className="left"></div>
        <div className="right">
          <div className="cmd">
            {
               <div className="title">
                <branch>➜</branch>
                <hidden>占</hidden>
                <path>/Users/luoxue/Desktop/open/workflow</path>
                <hidden>占</hidden>
                <git>git:(<branch>master</branch>)</git>
              </div>
            }
            <iframe frameborder="0" src="http://127.0.0.1:6671/" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
