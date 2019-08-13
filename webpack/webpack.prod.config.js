let config = require('./webpack.config.js');
let { smart } = require('webpack-merge');
console.log(smart)
module.exports = smart(config, {
    mode: 'production'
})