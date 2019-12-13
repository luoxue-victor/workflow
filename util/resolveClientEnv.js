module.exports = function resolveClientEnv (options, raw) {
  const env = {}
  if (process.env) {
    Object.keys(process.env).forEach(key => {
      if (key === 'NODE_ENV') {
        env[key] = process.env[key]
      }
    })
  }
  if (options.env) {
    Object.assign(env, options.env)
  }
  return env
}
