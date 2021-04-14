// 引入模块
import Koa from 'koa'
import KoaStatic from 'koa-static'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const path = require('path')
const chalk = require('chalk')

const PORT = 4000
require('./mongodb/index')

const GraphqlRouter = require('./router')

const app = new Koa()
const router = new Router()

// 使用 bodyParser 和 KoaStatic 中间件
app.use(bodyParser())
app.use(KoaStatic(path.join(__dirname, '/public')))

router.use('', GraphqlRouter.routes())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT)
console.log()
console.log(chalk.cyan(`> serve at: http://127.0.0.1:${PORT}/`))
console.log(chalk.cyan(`> graph at: http://127.0.0.1:${PORT}/graphiql`))
console.log()
