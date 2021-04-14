const Mock = require('mockjs')

module.exports = {
  // 支持值为 Object 和 Array
  // http://localhost:8888/api/users/12
  '/api/users/12': Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-30': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1
    }]
  })
}
