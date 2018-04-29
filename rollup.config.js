import babelrc from 'babelrc-rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

const banner = `/* 
 * @preserve
 * gfynonce v${pkg.version} (${pkg.homepage})
 * ${pkg.description}
 * MIT License
 * 
 */`;

const plugins = [
  json(),
  babel(babelrc()),
];

const regularConfig = {
  plugins,
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.name,
      banner,
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
};

const minifiedConfig = Object.assign({}, regularConfig, {
  plugins: [
    json(),
    babel(babelrc()),
    uglify({
      output: {
        comments: /@preserve/,
      },
    })
  ],
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      banner,
    },
  ],
});

export default [regularConfig, minifiedConfig];