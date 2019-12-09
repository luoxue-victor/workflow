module.exports.command = function (injectCommand) {
  injectCommand(function({ program,cleanArgs, boxConfig }) {
    program
      .command("build [app-page]")
      .description(`构建生产环境`)
      .option("-r, --report", "打包分析报告")
      .option("-d, --dll", "合并差分包")
      .action(async (name, cmd) => {
        const options = cleanArgs(cmd);
        const args = Object.assign(options, { name }, boxConfig);
        process.env.NODE_ENV = "production";
        if (!name && boxConfig.pages) {
          args.clear = true;
          Object.keys(boxConfig.pages).forEach(page => {
            args.name = page;
            action(args);
          });
        } else {
          action(args);
        }
      });
  });
}

function action(options) {
  const rimraf = require("rimraf");
  const ora = require("ora");
  const chalk = require("chalk");
  const path = require("path");
  // 删除 dist 目录
  options.clear && rimraf.sync(path.join(process.cwd(), "dist"));

  const config = require("./base")(options);
  const webpack = require("webpack");
  const spinner = ora("开始构建项目...");
  spinner.start();

  if (typeof options.chainWebpack === "function") {
    options.chainWebpack(config);
  }

  webpack(config.toConfig(), function(err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );

    if (stats.hasErrors()) {
      console.log(chalk.red("构建失败\n"));
      process.exit(1);
    }
    console.log(chalk.cyan("build完成\n"));
  });
}
