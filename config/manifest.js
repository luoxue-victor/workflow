
module.exports = (config, resolve) => {
  return () => {
    config
      .optimization
      .runtimeChunk({
        name: "manifest"
      })
  }
}