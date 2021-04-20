const path = require('path')
const fs = require('fs-extra')
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const chalk = require('chalk')
const app = new Koa();
const router = new Router();

module.exports = ({port = 30037, root = process.cwd()} = {}) => {

  app.use(
    cors({
      origin: function (ctx) {
        return '*'
      },
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
    })
  );

  onerror(app)

  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))

  app.use(json())
  app.use(logger())
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

  controllers.forEach(Controller => {
    controller[Controller.name] = new Controller.content()
  })

  // 重写 router 方法
  ;['get', 'post', 'put', 'del', 'all'].forEach(method => {
    const oriMethod = router[method]

    router[method] = function (path, fn) {
      oriMethod.call(this, ...[path, async (ctx, next) => {
        await fn.call(this, { ctx, next })
      }])
    }
  })

  routers.forEach(route => {
    route.content({router, controller})
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(port);

  console.log()
  console.log(chalk.cyan(`  http://127.0.0.1:${port}/`))
  console.log()
}
