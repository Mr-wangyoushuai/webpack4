# webpack4
## 零配置
- 初始化一个package.json
```
npm init -y
```

- 安装webpack （局部）

```c
 npm install webpack webpack-cli -D
```
在文件夹中新建文件夹src 然后在src下建立index.js文件

在index.js文件中写入代码 
```javascript
let str = '野花';
console.log(str)
```
执行命令
```
npx webpack
```
我们可以看到在目录下生成dist目录打开里面的main.js可以看到打包成功；
将main.js引入html中发现成功输出  野花