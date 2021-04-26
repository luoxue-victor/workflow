#!/usr/bin/env node
const path = require('path')
const bin = require('../../cli-box')

bin({
  root: path.join(__dirname, '..')
})
