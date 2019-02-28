let str = 'wangyoushuai'
console.log(str);
console.log('hello world');
// const ary = (fn , n) => (...args) => fn(...args.slice(0, n));
// let arr = [1,23,4,567,89,0];
// console.log(...arr.slice(1,4).join('-'));
// console.log(arr.slice(1,4).join('-'));
const all = (arr, fn = Boolean) => arr.every(fn);console.log(all([4, 2, 3], x => x >1))
console.log(Boolean(''), 'Boolean')