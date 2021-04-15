import moduleB from './lib/moduleB'

import('./lib/moduleA').then(res => {
  console.log(res.default)
})

console.log(moduleB)
