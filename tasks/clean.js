const del = require('del');

const { path } = require('../gulpOptions');

module.exports = () => del(path.clean);
