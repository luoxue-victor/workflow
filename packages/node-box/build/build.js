module.exports = ({port = 1234, root = process.cwd()}) => {
  process.env.NODE_ENV = 'production'
  const Server = require('../index')
  Server({port, root})
}
