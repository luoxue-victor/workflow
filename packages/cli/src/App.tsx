import React, { useState, useEffect } from 'react'
import './App.css'
// import Iframe from './components/iframe/index.jsx'
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'
// import { WebLinksAddon } from 'xterm-addon-web-links';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const term = new Terminal()
    // 将term挂砸到dom节点上
    term.open(document.getElementById('root'))
    term.fit();
  }, [])
  return (
    <div className="App">
      {/* <Iframe></Iframe> */}
    </div>
  )
}

export default App
