module.exports = function (args, api) {
  require(`../../${args.name}/lint`)({ args, api })
}
