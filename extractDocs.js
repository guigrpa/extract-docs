#!/usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

let fLogs = true;
const log = (msg) => { if (fLogs) console.log(msg); };

const process = ({
  template: templateFile, // template file path
  stdout,  // print to stdout?
  output,  // output file path
  missingRefs,  // keep broken links in output?
  basePath = '.', // reference dir for solving paths
  skipConditional,  // skip conditional inserts?
}) => {
  if (stdout) fLogs = false;

  function getDocs(srcPath0) {
    const srcPath = path.join(basePath, srcPath0);
    log(`Processing ${chalk.yellow.bold(srcPath)}...`);
    let lines;
    try {
      lines = fs.readFileSync(srcPath, 'utf8').split('\n');
    } catch (err) {
      log(chalk.yellow.bold('WARNING: File does not exist'));
      return missingRefs ? `[[[${srcPath}]]]` : '';
    }
    let fCode = false;
    let fBlockComment = false;
    let out = '';
    for (const line0 of lines) {
      let line = line0.trim();
      if (line === '/* --') {
        fBlockComment = true;
        continue;
      }
      if ((line.indexOf('/* --') === 0 || line.indexOf('// --') === 0) && line.indexOf('START_DOCS') >= 0) {
        fBlockComment = true;
        out += '```js\n';
        continue;
      }

      // End of comment block
      if (line === '-- */' ||
          (fBlockComment && line.indexOf('END_DOCS') >= 0) ||
          (!fBlockComment && (!line.length || line.indexOf('// --') !== 0))) {
        if (line.indexOf('END_DOCS') >= 0) {
          out += '```\n';
        } else if (!fCode) {
          out += '\n';
        }
        fCode = true;
        fBlockComment = false;
        continue;
      }
      fCode = false;
      if (fBlockComment) {
        out += `${line0}\n`;
      } else {
        line = line.slice(6);
        out += `${line}\n`;
      }
    }
    out = out.trim();
    return out;
  }

  log(`Reading ${chalk.cyan.bold(templateFile)}...`);
  const template = fs.readFileSync(templateFile, 'utf8');

  log('Collecting the pieces...');
  const segments = template.split(/\[\[\[([\s\S]+?)\]\]\]/m);
  let out = '';
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (i % 2) {
      if (segment[0] === '*' || segment[0] === '+') {
        if (skipConditional) continue;
        const tmp = segment.slice(1);
        out += segment[0] === '+' ? getDocs(tmp) : tmp;
      } else {
        out += getDocs(segment);
      }
    } else {
      out += segment;
    }
  }

  if (stdout) {
    console.log(out);
  } else if (output != null) {
    log(`Writing ${chalk.cyan.bold(output)}...`);
    fs.writeFileSync(output, out, 'utf8');
  }

  log('Done');
  return out;
};

module.exports = process;
