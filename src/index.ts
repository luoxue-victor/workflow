import('./moduleA').then(res => {
  console.log(res.default)
  throw new Error('error')
})
