#!/usr/bin/env node
'use strict';

const program               = require('commander');
const packageJson           = require('./package.json');

const extractDocs           = require('./extractDocs');

const DEFAULT_TEMPLATE = './README_TEMPLATE.md';
const DEFAULT_OUTPUT   = './README.md';

program
  .version(packageJson.version)
  .option('--template [relativePath]',
    `Process this template [${DEFAULT_TEMPLATE}]`, DEFAULT_TEMPLATE)
  .option('--stdout', 'Write result to stdout', false)
  .option('-o, --output [relativePath]',
    `Save result here [${DEFAULT_OUTPUT}]`, DEFAULT_OUTPUT)
  .option('--missing-refs', 'Write missing file refs')
  .parse(process.argv);

extractDocs(program);
