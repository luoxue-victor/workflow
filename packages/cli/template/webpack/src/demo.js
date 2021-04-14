import React from 'react'
import './index.scss'

export const App = () => (
  <div className="react-box">
    <h1>React Demo</h1>
    <img className="react-logo" src={require('./assets/my-pub.jpeg').default} alt="" />
  </div>
)
