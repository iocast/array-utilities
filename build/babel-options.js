var path = require('path');

exports.base = function() {
  return {
    filename: '',
    filenameRelative: '',
    sourceMap: true,
    sourceRoot: '',
    moduleRoot: path.resolve('src').replace(/\\/g, '/'),
    moduleIds: false,
    comments: false,
    compact: false,
    code: true,
    presets: [
      // Sidenote, if no targets are specified, @babel/preset-env will transform all ECMAScript 2015+ code by default
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-syntax-flow',
      '@babel/plugin-transform-flow-strip-types',
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': false }],
      '@babel/plugin-syntax-dynamic-import'
    ]
  };
};

exports.commonjs = function() {
  var options = exports.base();
  options.plugins.push('@babel/plugin-transform-modules-commonjs');
  return options;
};

exports.amd = function() {
  var options = exports.base();
  options.plugins.push('@babel/plugin-transform-modules-amd');
  return options;
};

exports.system = function() {
  var options = exports.base();
  options.plugins.push('@babel/plugin-transform-modules-systemjs');
  return options;
};

exports.es2015 = function() {
  var options = exports.base();
  return options;
};
