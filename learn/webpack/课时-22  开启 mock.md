## 课时 22：开启 mock

在配置中添加 mock 属性为 true 即可开启 mock，当执行 webpack-box dev 命令时自动添加到 server 中

直接访问 mock 链接即可

webpack-box.config.js

```js
{
  mock: true; // 开启 mock
}
```

mock 目录

所有 mock 在这里添加即可

```js
└──── mock
   │── index.js
   └── mock.js
```

### 使用

mock/index.js

```js
module.exports = {
  // 支持值为 Object 和 Array
  "GET /api/users": { users: [1, 2] }, // http://localhost:8888/api/users
  // GET POST 可省略
  "/api/users/1": { id: 2 }, // http://localhost:8888/api/users/1
  "/api/users/2": (req, res) => {
    // http://localhost:8888/api/users/2
    res.json({
      success: true
    });
  },
  "/api/users/3"(req, res) {
    // http://127.0.0.1:8888/api/users/3
    res.json({
      success: true
    });
  }
};
```

使用 mockjs 做假数据

mock/mock.js

```js
const Mock = require("mockjs");

module.exports = {
  // 支持值为 Object 和 Array
  // http://localhost:8888/api/users/12
  "/api/users/12": Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "list|1-30": [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1
      }
    ]
  })
};
```
