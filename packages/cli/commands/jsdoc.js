const fs = require('fs-extra');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');

exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('jsdoc2md [target]')
    .description('创建一个项目')
    .action((target, cmd) => {
      const options = cleanArgs(cmd)

      jsdoc2md
        .render({
          'example-lang': 'javascript',
          files: path.resolve(process.cwd(), target || './src/**/*.js'),
          'name-format': 'backticks',
        })
        .then(x => {
          fs.outputFile(path.resolve(process.cwd(), './docs/README.md'), x);
        });
    })
}
