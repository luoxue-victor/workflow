module.exports = function (options) {
  const express = require('express')
  const { renderToString } = require('react-dom/server')
  const chalk = require('chalk')
  const path = require('path')

  require('@babel/register')()

  const SSR = require(path.join(process.cwd(), 'src', 'ssr.jsx'))
  const port = process.env.PORT || 7005

  server(port)

  function server(port) {
    const app = express()
    app.use(express.static('static'))
    app.get('/', (req, res) => res.status(200).send(renderMarkup(renderToString(SSR))))

    const empty = '    '
    const common = `App running at:
      - Local: http://127.0.0.1:${port}\n`
    console.log(chalk.cyan(`\n${empty}${common}`))

    app.listen(port, () => process.send && process.send('online'))
  }

  function renderMarkup(html) {
    return `<!DOCTYPE html>
  <html>
    <head>
      <title>Webpack SSR Demo</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <div id="app">${html}</div>
    </body>
  </html>`
  }
}
