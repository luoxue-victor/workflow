#!/usr/bin/env node
process.env.NODE_ENV = "none";
const commandsName = ["build", "dev", 'dll', 'build:ssr', 'ssr:server'];
const {
  injectCommand,
  commandComplete,
  commandName
} = require("../cli/CommandAPI");
commandName.push(...commandsName);

commandsName.forEach(name => {
  const { command } = require(`../build/${name}`);
  command(injectCommand);
});

commandComplete();
