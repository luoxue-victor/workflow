
module.exports = ({ config }) => {
  return () => {
    config
      .optimization
      .runtimeChunk({
        name: 'manifest'
      })
  }
}
