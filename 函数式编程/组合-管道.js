// 组合及管道  compose  pipe

function aFn(num) {
    return num + 2;
}

function bFn(num) {
    return 2 * num;
}

// 基于值来计算
// console.log( bFn(aFn(5)));
// 无值编程 （合成运算过程）;
// pointFree风格：无值编程  合成运算过程  。

// 组合：从右至左执行的；
// 管道：从左至右执行的；
// const compose = function(bFn,aFn){
//     return function(num){
//         return bFn(aFn(num));
//     }
// }

const compose = function(...fns){
    return function(arg){
       return  fns.reverse().reduce((acc,fn)=>{
           return fn(acc);
       },arg)
    }
}

// 组合
const compose = (...fns)=>arg=>fns.reverse().reduce((acc,fn)=>fn(acc),arg);

// 管道
const pipe = (...fns)=>arg=>fns.reduce((acc,fn)=>fn(acc),arg);

let myFn = compose(bFn,aFn);
// let res =  myFn(5);
// console.log(res);

const str = "大家好，我是中国人。我爱中国。我们同住地球村。";

// function formatStr(str){
//     let res = str.match(/。/g);
//     return res.length%2===0?'偶数':'奇数';
// }
// 获取句号
const getPeriod = str=>str.match(/。/g);
// 获取长度
const getLength = str=>str.length;
// 判断奇偶
const oddOrEven = num=>num%2===0?'偶数':'奇数';

const formatStr = compose(oddOrEven,getLength,getPeriod);

console.log(formatStr(str));

// forEach map  filter some every reduce ....

// 作业：实现 myMap  和 myFilter

let arr = [{
    name:"张三",
    age:20
},{
    name:"李四",
    age:25
},{
    name:"王五",
    age:28
}]

let res =  arr.map(item=>{
  console.log(item);
  return item;
});
console.log(res);
let res = arr.filter(item=>item.age>25);
console.log(res);
