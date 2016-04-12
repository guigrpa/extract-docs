'use strict';

// ===============================================
// Basic config
// ===============================================
const NAME = 'extract-docs';
const VERSION = '1.0.0';
const DESCRIPTION = 'A simple CLI tool to gather documentation from JS code';
const KEYWORDS = ['tools', 'docs'];

// ===============================================
// Specs
// ===============================================
const specs = {

  // -----------------------------------------------
  // General
  // -----------------------------------------------
  name: NAME,
  version: VERSION,
  description: DESCRIPTION,
  bin: {
    'extract-docs': 'extractDocs.js',
  },
  engines: {
    node: '>=4',
  },
  author: 'Guillermo Grau Panea',
  license: 'MIT',
  keywords: KEYWORDS,
  homepage: `https://github.com/guigrpa/${NAME}#readme`,
  bugs: { url: `https://github.com/guigrpa/${NAME}/issues` },
  repository: {
    type: 'git',
    url: `git+https://github.com/guigrpa/${NAME}.git`,
  },

  // -----------------------------------------------
  // Scripts
  // -----------------------------------------------
  scripts: {
    lint: 'eslint extractDocs.js',
    test: 'ava',
  },

  // -----------------------------------------------
  // Deps
  // -----------------------------------------------
  dependencies: {
    storyboard: '^1.1.0',
    commander: '^2.9.0',
  },

  devDependencies: {
    ava: '^0.13.0',
    'babel-cli': '^6.6.5',
    'babel-core': '^6.7.2',
    'babel-eslint': '^6.0.0',
    'babel-preset-es2015': '^6.6.0',
    'babel-preset-stage-2': '^6.5.0',
    eslint: '^2.4.0',
    'eslint-config-airbnb': '^6.2.0',
    'eslint-plugin-react': '^4.2.3',  // so that eslint-config-airbnb doesn't complain
  },

  // -----------------------------------------------
  // Other configs
  // -----------------------------------------------
  ava: {
    files: [
      './test/test.js',
    ],
    babel: 'inherit',
  },
};

// ===============================================
// Build package.json
// ===============================================
const _sortDeps = deps => {
  const newDeps = {};
  for (const key of Object.keys(deps).sort()) {
    newDeps[key] = deps[key];
  }
  return newDeps;
};
specs.dependencies = _sortDeps(specs.dependencies);
specs.devDependencies = _sortDeps(specs.devDependencies);
const packageJson = `${JSON.stringify(specs, null, '  ')}\n`;
require('fs').writeFileSync('package.json', packageJson);
