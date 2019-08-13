const express = require('express');
const webpack = require('webpack');
const middle = require('webpack-dev-middleware');
let app = express ();
let config = require('./webpack.config.js');
let compiler = webpack(config);

app.use(middle(compiler));
app.get('/user', (req, res) => {
    res.json({name: 'zhaneegsawwn'})
})
app.listen(9000);