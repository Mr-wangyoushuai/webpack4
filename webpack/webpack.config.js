const path = require('path');
const Terser = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCss = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
// const TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'bundle.[hash].js', //  打包后的文件
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://dsdfjlk.cn' 将所有资源都加前缀
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './build',
        compress: true,
        // hot: true
        // 3> 自己写后台 叫后台和前端一起起一个服务 从后台起服务
        

        // 2> 前端模拟数据 不存在跨域
        // before(app) {
        //     app.get('/user', (req, res) => {
        //         res.json({name: 'wangyoushuai'})
        //     })
        // }
        // 1> 代理
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:9000',
        //         pathRewrite: {'/api': ''}
        //     }
        // }
    },
    // watch: true,
    module: {
        noParse: /jquery/,
        rules: [
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options:{
            //             enforce: 'pre' // 强制先执行 // post 后执行
            //         }
            //     }
            // },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(jpg|png|gif)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 20 * 1024,
                        outputPath: './img/', // 将图片放到一个img文件夹下
                        // publicPath: './img'
                    }
                }
            },
            {
                test: /\.js$/, use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                            '@babel/plugin-transform-runtime'
                        ]
                    }

                },
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/, use:
                    [
                        {
                            loader: ExtractCss.loader,
                            options:{publicPath: '../'}
                        },
                        'css-loader',
                        'postcss-loader']
            }, // 字符串也可以传成对象 {loader：'style-loader'}
            {
                test: /\.less$/, use: [
                    // 'style-loader',// style标签放到head标签内
                    {
                        loader: ExtractCss.loader,
                        options:{publicPath: '../'}
                    }, 
                    'css-loader', // @ import 解析路径
                    'postcss-loader',
                    'less-loader' // 需要less less-loader 解析less文件
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
            },
            hash: true
        }),
        new ExtractCss({
            filename: 'css/[name].css', // 通过'css/[name].css'将css放到css文件夹下
            // moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
            // chunkFilename: '[name].css',
            // ignoreOrder: false // 忽略顺序冲突
        }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
       
        new webpack.DefinePlugin({
            ENV_NODE_DEV: JSON.stringify('development'),
            ENV_NODE_PROD: JSON.stringify('production')
        }),
        new CopyWebpackPlugin([
            {from:'static', to: 'static'}
        ])
    ],
    optimization: {
        minimizer: [new Terser({
            parallel: true,
            cache: true,
            sourceMap: true
        }), new OptimizeCss({})]
    },
    externals: { // 不进入打包 但是可以使用 import require等语法
        jquery: '$' //字符串中可以是 $ jquery jQuery 或者是任意字符串
    }
}