let request = require("request");

function handleRequestByPromise(options) {
  let op = Object.assign(
    {
      url: "",
      method: "POST",
      encoding: null,
      header: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
      }
    },
    options
  );

  if (op.url === "") {
    throw new Error("请求的url地址不正确");
  }

  const promise = new Promise(function(resolve, reject) {
    request(op, (err, response, body) => {
      if (err) reject(err);

      if (response && response.statusCode === 200) {
        resolve(body);
      } else {
        console.log('code: ', response.statusCode)
        reject(`请求失败`);
      }
    });
  });

  return promise;
}

exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('ajax [path]')
    .description('创建一个项目')
    .action(async (name, cmd) => {
      const payload = {}

      const data = await handleRequestByPromise({
        url: '',
        json: payload
      })

      console.log(data)
    })
}