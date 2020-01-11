import React from 'react'
import ReactDom from 'react-dom'
import * as Sentry from '@sentry/browser'
import { App } from './demo'

/**
 * 注册链接https://sentry.io/welcome/
 * 生成一个DSN串。 DSN是链接我们要上报的项目和sentry服务端的钥匙。
 * */
const dsn = ''
dsn && Sentry.init({
  dsn
})

ReactDom.render(<App/>, document.getElementById('app'))
