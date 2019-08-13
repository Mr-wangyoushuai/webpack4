import a from './a.js';
console.log(a)
if(module.hot){
    module.hot.accept('./a.js',() => {
        console.log('更新了')
    })
}


// console.log(a)
// import './css/index.css'
// console.log(a)
// import image from './a.jpg'
// let img = new Image();
// img.src = image;
// console.log(1)
// console.log(document.getElementsByTagName('div')[0])
// document.getElementsByTagName('div')[0].append(img);

// const xhr = new XMLHttpRequest();

// xhr.open('GET','/user', true),

// xhr.onload = function () {
//     console.log(xhr.response);
// }
// xhr.send();
// console.log('241324124423falksdjkfkahf4322')
// console.log(ENV_NODE_PROD,'fdsf1dfsfdsfdddddd111')
import $ from 'jquery';
// exposed-loader 暴露全局的loader  内联loader 可以挂在window上
console.log($)
// console.log(typeof a.b,111)
// require('./css/index.css');
// require('./css/body.less');
// let b = 'a';
// console.log(b)
// let fn = () => {
//     return 'aaa'
// }
// fn();
// @log
// class A{
//     a =1;
// }
// let b = new A();
// console.log(b.a)
// function log(target){
//     console.log(target,22)
// }