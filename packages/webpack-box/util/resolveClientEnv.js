module.exports = function resolveClientEnv(options) {
  const env = {}
  if (process.env) {
    Object.keys(process.env).forEach((key) => {
      if (key === 'NODE_ENV') {
        env[key] = process.env[key]
      }
    })
  }
  if (options.env) {
    Object.keys(options.env).forEach((key) => {
      process.env[key] = options.env[key]
    })
    Object.assign(env, options.env)
  }
  return env
}
