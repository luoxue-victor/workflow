// tree-shaking
import { cube } from '@src/treeShaking'
console.log(cube(2))
// 动态加载ts
import('@src/ts/index.ts').then(res => {
  console.log(res)
})
// 加载图片
const myPubPic = require('./assets/my-pub.jpeg')
// 测试环境变量
if (process.env.NODE_ENV === 'production') {
  console.log('Welcome to production')
}
// 加载样式
require('./style')
const h2 = document.createElement('h2')
h2.className = 'test'
h2.innerText = 'webpack 5'
document.body.append(h2)
// 加载react
require('./react')
