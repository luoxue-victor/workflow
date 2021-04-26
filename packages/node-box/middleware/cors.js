const cors = require('koa2-cors')

module.exports = (app, config = {}) => {
  app.use(
    cors(Object.assign({
      origin: function (ctx) {
        return '*'
      },
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
    }, config))
  );
}
