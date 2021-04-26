#!/usr/bin/env node
const path = require('path')
const cli = require('@pkb/cli-box')

cli({
  root: path.join(__dirname, '..')
})
