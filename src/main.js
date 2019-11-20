import TS from './ts/index.ts'

require('./style/index.css')
require('./style/app.css')
require('./style/index.less')
require('./style/index.scss')
require('./style/index.postcss')

new TS();

const h2 = document.createElement('h2')
h2.className = 'test'
h2.innerText = 'testaaa'
document.body.append(h2);