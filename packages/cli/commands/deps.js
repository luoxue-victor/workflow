const path = require('path');
const fs = require('fs');
const basePath = process.cwd();
const { getAllFiles, filingCabinet } = require('../libs/utils')

const registerCommand = (params) => {
  params.program
    .command('deps <filePath>')
    .description('输出文件依赖')
    .action(async (filePath, cmd) => {
      depsTree(Object.assign({
        args: params.cleanArgs(cmd),
        filePath
      }, params))
    })
}

const depsTree = async ({
  filePath
}) => {
  const files = await getAllFiles('src')
  const findFile = files.find((fPath) => fPath.includes(filePath))

  const cabinets = filingCabinet(findFile)
  const fileBasename = path.basename(findFile)
  const fileTree = {
    [fileBasename]: {}
  }

  cabinets.forEach(fileName => {
    fileTree[fileBasename][fileName] = {}
  })

  printTree(fileTree)
}

Object.assign(exports, {
  registerCommand,
  depsTree
})

function printTree(tree, level = 0, lastItems = []) {
  const treeKeys = Object.keys(tree);
  treeKeys.forEach((key, index) => {
    const displayPath = path.relative(basePath, key);
    const isLastItem = index === treeKeys.length - 1;

    if (!level) console.log(displayPath);
    else if (level === 1)
      console.log(`${!isLastItem ? '├' : '└'} ${displayPath}`);
    else {
      console.log(
        `${printTreePrefix(lastItems)}${
          !isLastItem ? '├' : '└'
        } ${displayPath}`,
      );
    }

    printTree(tree[key], level + 1, [...lastItems, isLastItem]);
  });
}

function printTreePrefix(lastItems) {
  return lastItems
    .map((last, index) => {
      if (index === 0) return '';
      return last ? '  ' : '| ';
    })
    .join('');
}