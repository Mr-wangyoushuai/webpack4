# webpack4 css
css使我们前端的精髓之一，它使我们的页面有了颜色，布局有了风格。我们接下来就打包css
我们先安装关于打包css的loader ```css-loader style-loader```
```
npm install css-loader style-loader -D
```
- ```css-loader``` 负责解析css文件
- ```style-loader``` 负责吧css插入页面的style标签内
- 配置规则是先执行的往后写，即按照执行顺序从右往左

安装完成后，我们在配置文件中配置解析规则
```
module: {
  rule: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
  ]
}
```
这样我们创建index.css文件在src中，在入口文件index.js中 引入css
```
require(index.css)
```
css文件写入
```
body{
  background: red;
}
```
我们 ``` npm run dev ``` 启动。 打开发现解析了css文件。但是我们发现这只是将css插入到页面标签中了
这时我们想将css单独生成一个文件通过link引入，我们就需要用到一个插件 抽离```css``` 插件
安装插件
```
npm i extract-text-webpack-plugin@next -D
```
- 请注意这里后面一定要加@next,不然webpack4用不了
- 一般在生产环境配置，开发环境中不配置，没有实际作用，也不会热更新，如果开发环境中有需要，可以找资料另行解决

完成后我们在配置文件中配置
```
顶部配置
const ExtractCss = require('extract-text-webpack-plugin');
在module中配置中配置规则
rules: [
  {
    test: /\.css$/,
    use: ExtractCss.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  }
]
完成后在插件配置(plugins)中加入生成文件
new ExtractCss('mine.css')// 生成文件 mine.css
```
当然也可以用``` mini-css-extract-plugin``` 插件，访问 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin);


