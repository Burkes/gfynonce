#!/usr/bin/env node

// aiming for older node version compatibility

var gfynonce = require('../');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));

var options = Object.assign({}, { separator: '', adjectives: 2, animals: 1 }, argv);

console.log(gfynonce(options));
