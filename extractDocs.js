#!/usr/bin/env node
'use strict';

const fs                    = require('fs');
const storyboard            = require('storyboard-core');
const program               = require('commander');
const packageJson           = require('./package.json');

const DEFAULT_TEMPLATE = './README_TEMPLATE.md';
const DEFAULT_OUTPUT   = './README.md';

const mainStory = storyboard.mainStory;
const chalk = storyboard.chalk;

program
  .version(packageJson.version)
  .option('--template [relativePath]',
    `Process this template [${DEFAULT_TEMPLATE}]`, DEFAULT_TEMPLATE)
  .option('--stdout', 'Write result to stdout', false)
  .option('-o, --output [relativePath]',
    `Save result here [${DEFAULT_OUTPUT}]`, DEFAULT_OUTPUT)
  .parse(process.argv);

if (program.stdout) {
  storyboard.config({ filter: '-*' });
}

const story = mainStory.child({ src: 'extract-docs', title: 'Extract docs' });

function getDocs(srcPath) {
  story.info('extract-docs', `Processing ${chalk.yellow.bold(srcPath)}...`);
  const lines = fs.readFileSync(srcPath, 'utf8').split('\n');
  let fCode = false;
  let out = '';
  for (let line of lines) {
    line = line.trim();
    if ((!line.length) || (line.indexOf('// --') !== 0)) {
      if (!fCode) {
        out += '\n';
      }
      fCode = true;
      continue;
    }
    fCode = false;
    line = line.slice(6);
    out += `${line}\n`;
  }
  out = out.trim();
  return out;
}

story.info('extract-docs', `Reading ${chalk.cyan.bold(program.template)}...`);
const template = fs.readFileSync(program.template, 'utf8');

story.info('extract-docs', 'Collecting the pieces...');
const segments = template.split(/\[\[\[(.+)\]\]\]/);
let out = '';
for (let i = 0; i < segments.length; i++) {
  const segment = segments[i];
  if (i % 2) {
    out += getDocs(segment);
  } else {
    out += segment;
  }
}

if (program.stdout) {
  console.log(out);
} else {
  story.info('extract-docs', `Writing ${chalk.cyan.bold(program.output)}...`);
  fs.writeFileSync(program.output, out, 'utf8');
}

story.info('extract-docs', 'Done');
story.close();
