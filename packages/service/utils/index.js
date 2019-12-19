[
  'catch',
  'log',
  'path',
  'args',
  'add',
  'render',
  'extendPackage'
].forEach(m => {
  Object.assign(exports, require(`./${m}`))
})
