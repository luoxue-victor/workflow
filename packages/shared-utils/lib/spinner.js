const ora = require('ora')
const chalk = require('chalk')

const spinner = ora()
let lastMsg = null
let isPaused = false

exports.logWithSpinner = (symbol, msg) => {
  if (!msg) {
    msg = symbol
    symbol = chalk.green('✔')
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  }
  spinner.text = ` ${msg}`
  lastMsg = {
    symbol: `${symbol} `,
    text: msg
  }
  spinner.start()
}

exports.stopSpinner = (persist) => {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  } else {
    spinner.stop()
  }
  lastMsg = null
}

exports.pauseSpinner = () => {
  if (spinner.isSpinning) {
    spinner.stop()
    isPaused = true
  }
}

exports.resumeSpinner = () => {
  if (isPaused) {
    spinner.start()
    isPaused = false
  }
}

exports.failSpinner = (text) => {
  spinner.fail(text)
}
