// https://www.rollupjs.com/guide/javascript-api#rolluprollup
const rollup = require('rollup')

module.exports = async (inputOptions, outputOptions, isNeedGenerate) => {
  const bundle = await rollup.rollup(inputOptions)
  process.env.NODE_ENV = 'production'

  let bundler
  if (isNeedGenerate) {
    bundler = await bundle.generate(outputOptions)
  } else {
    bundler = await bundle.write(outputOptions)
  }

  return bundler
}
