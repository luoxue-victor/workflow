module.exports = {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },
  // GET 可省略
  '/api/users/1': { id: 2 },
  '/api/users/2': (req, res) => {
    res.json({
      success: true
    })
  },
  '/api/users/3' (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
  '/api/users/4': {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-30': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1
    }]
  }
}
