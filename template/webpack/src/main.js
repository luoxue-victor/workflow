// 加载react
import Bar from './typescript/index.ts'

new Bar()

if (process.env.REACT === 'react') {
  require('../packages/react/template')
}
