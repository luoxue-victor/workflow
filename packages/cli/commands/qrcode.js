
const qrcodeTerminal = require('qrcode-terminal');

const registerCommand = (params) => {
  params.program
    .command('qrcode <content>')
    .description('在终端生成二维码')
    .action((content) => {
      qrcode(content)
    })
}

const qrcode = async (content) => {
  qrcodeTerminal.generate(content, function (qrcode) {
    console.log(qrcode);
  });
}

Object.assign(exports, {
  registerCommand,
  qrcode
})