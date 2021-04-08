const ReactDOM = require('react-dom')

const SSR = require('../packages/react/template')

if (typeof document === 'undefined') {
  console.log('在服务端渲染.')
  module.exports = SSR
} else {
  console.log('在客户端渲染.')
  const renderMethod = !module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(SSR, document.getElementById('app'))
}
