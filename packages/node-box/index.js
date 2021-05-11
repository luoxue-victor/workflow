const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const app = new Koa();
const router = new Router();
const { emit } = require('./socket')

module.exports = ({port = 30037, root = process.cwd()} = {}) => {
  const config = {}

  // 注册中间件
  const middlewaresPath = path.join(__dirname, 'middleware')
  const middlewares = fs.readdirSync(middlewaresPath)
  middlewares.forEach(name => {
    const middleware = require(path.join(middlewaresPath, name))
    middleware(app, config)
  })

  onerror(app)

  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))

  app.use(json())
  app.use(require('koa-static')(root + '/public'))

  app.use(views(root + '/views', {
    extension: 'pug'
  }))

  const [routers, controllers] = ['router', 'controller'].map(dir => {
    const dirPath = path.join(root, 'app', dir)
    const filesPath = fs.readdirSync(dirPath)

    return filesPath.map(filePath => {
      const extname = path.extname(filePath)
      const basename = path.basename(filePath)
      const name = basename.replace(extname, '')

      return {
        name,
        content: require(path.join(dirPath, filePath))
      }
    })
  })

  const controller = {}

  controllers.forEach(c => {
    controller[c.name] = c.content
  })

  routers.forEach(route => {
    route.content({router, controller})
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(port);
  const url = `http://127.0.0.1:${port}/`

  console.log(chalk.green('[运行]'), chalk.yellow('[server]'), url)
}
