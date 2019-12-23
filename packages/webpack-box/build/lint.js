module.exports = function (args, api) {
  require(`../packages/${args.name}/lint`)({ args, api })
}
