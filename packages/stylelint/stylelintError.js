const chalk = require('chalk')

const TYPE = 'stylelint-error'

exports.transformer = (error) => {
  const { originalStack } = error
  const match = originalStack.some(({ fileName }) => (
    fileName &&
    fileName.indexOf('stylelint-webpack-plugin') > 0
  ))
  if (match) {
    return { ...error, type: TYPE }
  }
  return error
}

function severityColor(severity) {
  switch (severity.toLowerCase()) {
    case 'success': return 'green'
    case 'info': return 'blue'
    case 'note': return 'white'
    case 'warning': return 'yellow'
    case 'error': return 'red'
    default: return 'red'
  }
}

exports.formatter = (errors, severity) => {
  errors = errors.filter((e) => e.type === TYPE)
  if (errors.length > 0) {
    return [
      '',
      chalk`{bgMagenta.white  stylelint } {${severityColor(severity)} ${severity}}`,
      ...errors.map(({ message }) => message)
    ]
  }
  return []
}
