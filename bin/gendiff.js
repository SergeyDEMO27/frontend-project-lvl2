#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<configFileOne> <configFileTwo>')
  .option('-f, --format [type]', 'output format')
  .action((configFileOne, configFileTwo) => (
    console.log(genDiff(configFileOne, configFileTwo))));
program.parse(process.argv);
