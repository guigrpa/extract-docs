// ===============================================
// Basic config
// ===============================================
const NAME = 'extract-docs';
const VERSION = '1.4.0';
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
    'extract-docs': 'cli.js',
  },
  main: 'extractDocs.js',
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
    build: 'node package && npm run lint',
    lint: 'eslint extractDocs.js',
  },

  // -----------------------------------------------
  // Deps
  // -----------------------------------------------
  dependencies: {
    chalk: '1.1.3',
    commander: '2.9.0',
  },

  devDependencies: {
    // Linting
    eslint: '3.8.1',
    'eslint-config-airbnb': '12.0.0',
    'eslint-plugin-flowtype': '2.20.0',
    'eslint-plugin-import': '1.16.0',
    'eslint-plugin-jsx-a11y': '2.2.3',
    'eslint-plugin-react': '6.4.1',
    'babel-eslint': '7.0.0',
  },
};

// ===============================================
// Build package.json
// ===============================================
const _sortDeps = (deps) => {
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
