const JsonToTS = require('json-to-ts')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('json2ts')
    .description('json2ts')
    .action(async () => {
      const json = {
        cats: [
          {name: 'LUO'},
          {name: 'XUE'}
        ],
        favoriteNumber: 42,
        favoriteWord: 'Hello'
      }

      exports.JsonToTS(json, {
        rootName: 'MyRootObject'
      })
    })
}

exports.JsonToTS = (json, userOptions) => {
  JsonToTS(json, userOptions).forEach(typeInterface => {
    console.log(typeInterface)
  })
}
