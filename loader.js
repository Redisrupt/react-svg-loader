const loaderUtils = require('loader-utils');
const { optimize, transform } = require('./react-svg-core');

module.exports = function loader(content) {
  const loaderOpts = loaderUtils.getOptions(this) || {};

  const cb = this.async();

  Promise.resolve(String(content))
    .then(optimize(loaderOpts.svgo))
    .then(transform({ jsx: loaderOpts.jsx }))
    .then(result => cb(null, result.code))
    .catch(err => cb(err));
};
