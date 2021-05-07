'use strict';

const os = require('os')

exports.getApiInfo = ctx => {
  const environments = {
    nodeVersion: process.versions['node'],
    hostname: os.hostname(),
    platform: `${process.platform}/${process.arch}`
  };
  const data = {
    environments
  };

  ctx.body = data;
};