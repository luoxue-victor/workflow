const path = require('path');
const fs = require('fs');
const https = require('https');
const chalk = require('chalk');
const conf = {
  exts: ['.jpg', '.png', '.webp'],
  max: 5000000,
  files: {},
  isDeep: false,
  minOptimizeCompressRatio: 0.1,

  allImageCount: 0,
  ableCompressImageCount: 0,
  sumOptimizeCompressRatio: 0,
  avgOptimizeCompressRatio: 0, // 平均压缩比率
  oriImageSize: 0,
  nowImageSize: 0
};

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('tinypng [imgEntryPath] [isDeep]')
    .description('tinypng 压缩图片')
    .action(async (imgEntryPath = './', isDeep = true) => {
      if (/(.js)$/.test(imgEntryPath)) {
        const list = require(imgEntryPath)

        list.forEach((item) => {
          const tinyImg = new TinyImg(item, false);
          tinyImg.compress();
        })
        
        return
      }

      const tinyImg = new TinyImg(imgEntryPath, isDeep);
      tinyImg.compress();
    })
}
class TinyImg {
  constructor(imgEntryPath, isDeep) {
    this.conf = {
      ...conf,
      imgEntryPath,
      isDeep
    };
  }

  /**
   * @description 过滤待处理文件夹，得到待处理文件列表
   * @param {*} folder 待处理文件夹
   * @param {string} imgEntryPath 待处理文件列表
   * @return {*} void
   */
  compress(imgEntryPath = this.conf.imgEntryPath) {
    try {
      const filePath = path.join(imgEntryPath);
      if (!fs.existsSync(filePath)) {
        return console.error(chalk.red('目录或者文件不存在！'));
      }

      const stats = fs.statSync(filePath);
      if (!stats.isDirectory()) {
        this.handleImgFile(stats.isFile(), stats.size, filePath);
      }
      else {
        // 读取文件夹
        fs.readdirSync(filePath).forEach(file => {
          const fullFilePath = path.join(filePath, file);
          const fileStat = fs.statSync(fullFilePath); // 读取文件信息
          this.handleImgFile(fileStat.isFile(), fileStat.size, fullFilePath);
          // 是否深度递归处理文件夹
          if (this.conf.isDeep && fileStat.isDirectory()) {
            this.compress(fullFilePath);
          }
        });
      }
    }
    catch (e) {
      console.error(chalk.red(e.message));
    }
  }

  handleImgFile(isFile, fileSize, file) {
    if (this.isTinyImgFile(isFile, fileSize, file)) {
      this.fileUpload(file);
    }
  }

  // 过滤文件安全性/大小限制/后缀名
  isTinyImgFile(isFile, fileSize, file) {
    return isFile
      && conf.exts.includes(path.extname(file))
      && fileSize <= conf.max;
  }

  /**
   * 请求体
   * @param {*}
   * @returns {object} 请求体
   */
  buildRequestParams(type = 'webp') {
    return {
      method: 'POST',
      hostname: 'tinypng.com',
      path: '/web/shrink',
      headers: {
        rejectUnauthorized: false,
        'X-Forwarded-For': this.getRandomIP(),
        'Cache-Control': 'no-cache',
        'Content-Type': `image/${type}` ,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 '
          + '(KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
      }
    };
  }

  /**
   * @description 生成随机xff头
   * @return {string} xff header
   */
  getRandomIP() {
    return Array.from(Array(3))
      .map(() => parseInt(Math.random() * 255, 10))
      .concat([new Date().getTime() % 255])
      .join('.');
  }

  fileUpload(imgPath) {
    conf.allImageCount ++

    conf.files[imgPath] ? (conf.files[imgPath]++) : (conf.files[imgPath] = 1);

    const req = https.request(this.buildRequestParams(path.extname(imgPath).replace('.', '')), res => {
      res.on('data', buffer => {
        try {
          const postInfo = JSON.parse(buffer.toString());
          if (postInfo.error) {
            console.error(chalk.red(`压缩失败！\n 当前文件：${imgPath} \n ${postInfo.message}`));
          }
          else {
            this.fileUpdate(imgPath, postInfo);
          }
        } catch (error) {
          console.log(error)
        }
      });
    });
    req.write(fs.readFileSync(imgPath), 'binary');
    req.on('error', e => console.error(chalk.red(`请求错误! \n 当前文件：${imgPath} \n, e)`)));
    req.end();
  }

  fileUpdate(entryImgPath, info) {
    if ((1 - info.output.ratio) < conf.minOptimizeCompressRatio) {
      console.info(chalk.green.bold(`优化压缩比例是 ${(1 - info.output.ratio)} 大于最小优化压缩比率 ${conf.minOptimizeCompressRatio}，不需要替换图片`));
      return
    }

    const options = new URL(info.output.url);
    const req = https.request(options, res => {
      let body = '';
      res.setEncoding('binary');
      res.on('data', data => (body += data));
      res.on('end', () => {

        let log = '';
        log = '压缩成功:\n';
        log += `       -优化比例: ${((1 - info.output.ratio) * 100).toFixed(2)}%\n`;
        log += `       -原始大小: ${(info.input.size / 1024).toFixed(2)}KB\n`;
        log += `       -压缩大小: ${(info.output.size / 1024).toFixed(2)}KB\n`;
        log += `       -文件：${entryImgPath}`;
        console.info(chalk.green.bold(log));

        conf.ableCompressImageCount ++
        conf.avgOptimizeCompressRatio += (1 - info.output.ratio)
        conf.oriImageSize += info.input.size / 1024
        conf.nowImageSize += info.output.size / 1024

        console.log(`所有图片数量：${conf.allImageCount}，压缩比率大于10%的图片数量：${conf.ableCompressImageCount}，平均压缩比率：${conf.avgOptimizeCompressRatio / conf.ableCompressImageCount}`)
        console.log(`原始size：${conf.oriImageSize}KB，压缩size：${conf.nowImageSize}KB，压缩比例：${1 - (conf.nowImageSize / conf.oriImageSize)}，压缩量：${conf.oriImageSize - conf.nowImageSize}KB`)

        fs.writeFile(entryImgPath, body, 'binary', err => {
          if (err) {
            return console.error(chalk.green.red(log));
          }
        });
      });
    });
    req.on('error', e => console.error(chalk.green.bold(e)));
    req.end();
  }
}

exports.TinyImg = TinyImg