const glob = require('glob');
const path = require('path');

const Config = require('webpack-chain');
const config = new Config();

const resolve = (p) => {
  return path.join(process.cwd(), p);
};

const configFiles = glob.sync('../config/*.js');

module.exports = () => {
  configFiles.forEach((p) => require(p)(config, resolve)());

  return config;
};
