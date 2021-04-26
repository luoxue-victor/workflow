
const accesslog = require('koa-accesslog');
const logger = require('koa-logger')

module.exports = (app, config) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(accesslog());
  } else {
    app.use(logger())
  }
}
