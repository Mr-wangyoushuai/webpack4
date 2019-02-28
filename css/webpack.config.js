const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCss = require('extract-text-webpack-plugin');
module.exports = {
  devServer: {
    port: 3001,
    progress: true,
    open: true,
    hot: true
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: {},
      hash: true
    }),
    new ExtractCss('mine.css')
  ],
  module: {
    rules: [ 
      {
        test: /\.css$/,
        use: ExtractCss.extract({
          fallback: 'style-loader',
          use:'css-loader'
        })
      } 
    ]
     
  }
}