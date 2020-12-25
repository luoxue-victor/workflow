const sizeOf = require('image-size')

const registerCommand = ({ program, cleanArgs }) => {
  program
    .command('img')
    .description('处理图片')
    .option('-s, --size <url>', '图片大小')
    .action((cmd) => {
      getImgSize({ args: cleanArgs(cmd) })
    })
}

function getImgSize ({ args }) {
  imgSize(args.size)
}

function imgSize(url) {
  console.log('url == ', url)
  sizeOf(url, function (err, dimensions) {
    if (err) console.error(err)

    console.log(url, dimensions)
  })
}

Object.assign(exports, {
  registerCommand,
  imgSize
})
