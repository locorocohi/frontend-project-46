#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    const { format } = options;
    console.log(genDiff(firstConfig, secondConfig, format));
  })
  .parse(process.argv);