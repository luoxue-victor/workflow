module.exports = function(content) {
  return content.replace(new RegExp(/([\$_\w\.]+\?\.)/, 'g'), function(res) {
    const str = res.replace(/\?\./, '')
    const arrs = str.split('.')
    const strArr = []
    for (let i = 1; i <= arrs.length; i++) {
      strArr.push(arrs.slice(0, i).join('.'))
    }
    const compile = strArr.join('&&')
    const done = compile + '&&' + str + '.'
    console.log(done)

    return done
  })
}
