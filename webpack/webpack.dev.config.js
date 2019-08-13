let config = require('./webpack.config.js');
let { smart } = require('webpack-merge');

module.exports = smart(config, {
    mode: 'production'
})
