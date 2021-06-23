#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'tree')
  .action((firstConfig, secondConfig) => (
    console.log(genDiff(firstConfig, secondConfig, program.opts().format))))
  .parse(process.argv);
