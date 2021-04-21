module.exports = () => {
  process.env.NODE_ENV = 'development'
  nodemon({
    script: path.join(__dirname, '..', 'nodemon.js')
  })
}
