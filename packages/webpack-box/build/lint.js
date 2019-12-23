module.exports = function (args, api) {
  require(`pk-cli-plugin-${args.name}/lint`)({ args, api })
}
