const { transformSync: babelTransform } = require('@babel/core');
const plugin = require('babel-plugin-react-svg');
const Svgo = require('svgo');

// SVGO Optimize
function optimize(opts = {}) {
  const svgo = new Svgo(opts);

  return content => svgo.optimize(content).then(data => data.data);
}

// Babel Transform
function transform({ jsx = false } = {}) {
  return content =>
    babelTransform(content, {
      // this was the actual fix that was required to make the react-svg-loader
      // with the newer @babel/core
      filename: 'dummy.svg',
      babelrc: false,
      presets: [jsx ? undefined : '@babel/preset-react'].filter(Boolean),
      plugins: [require.resolve('@babel/plugin-syntax-jsx'), plugin],
    });
}

module.exports = {
  optimize,
  transform,
};
