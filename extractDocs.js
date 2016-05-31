#!/usr/bin/env node
'use strict';

const fs                    = require('fs');
const storyboard            = require('storyboard/lib/noPlugins');
const consoleListener       = require('storyboard/lib/listeners/console');

const mainStory = storyboard.mainStory;
const chalk = storyboard.chalk;

module.exports = function({
  template: templateFile,
  stdout, output,
  missingRefs,
  skipConditional,
}) {

  if (stdout) {
    storyboard.config({ filter: '-*' });
  } else {
    storyboard.addListener(consoleListener);
  }

  const story = mainStory.child({ src: 'extract-docs', title: 'Extract docs' });

  function getDocs(srcPath) {
    story.info('extract-docs', `Processing ${chalk.yellow.bold(srcPath)}...`);
    let lines;
    try {
      lines = fs.readFileSync(srcPath, 'utf8').split('\n');
    } catch (err) {
      story.warn('extract-docs', 'File does not exist');
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

      // End of comment block
      if (line === '-- */' ||
          (!fBlockComment && (!line.length || line.indexOf('// --') !== 0))) {
        if (!fCode) out += '\n';
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

  story.info('extract-docs', `Reading ${chalk.cyan.bold(templateFile)}...`);
  const template = fs.readFileSync(templateFile, 'utf8');

  story.info('extract-docs', 'Collecting the pieces...');
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
    story.info('extract-docs', `Writing ${chalk.cyan.bold(output)}...`);
    fs.writeFileSync(output, out, 'utf8');
  }

  story.info('extract-docs', 'Done');
  story.close();

  return out;
};
