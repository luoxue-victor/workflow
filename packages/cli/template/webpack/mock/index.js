module.exports = {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] }, // http://localhost:8888/api/users
  // GET POST 可省略
  '/api/users/1': { id: 2 }, // http://localhost:8888/api/users/1
  '/api/users/2': (req, res) => { // http://localhost:8888/api/users/2
    res.json({
      success: true
    })
  },
  '/api/users/3': function (req, res) { // http://127.0.0.1:8888/api/users/3
    res.json({
      success: true
    })
  }
}
