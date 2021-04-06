import _ from 'lodash'

export function square(x) {
  console.log('我是一个 square')
  console.log(_)
  return x * x
}

export function cube(x) {
  console.log('我是一个 cube')
  return x * x * x
}
