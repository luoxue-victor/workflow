import mongoose from 'mongoose'
import config from '../config'

const chalk = require('chalk')

require('./schema/info')
require('./schema/student')
require('./schema/course')

// 链接mongodb
const database = () => {
  mongoose.set('debug', true)

  mongoose.connect(config.dbPath, { useUnifiedTopology: true, useNewUrlParser: true })

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath)
  })
  mongoose.connection.on('error', (err) => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log(chalk.cyan(`> db at: ${config.dbPath}`))
  })
}

database()

module.exports = database
