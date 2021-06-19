/**
 * 加减对NaN没影响
 * +xxx 变成 数字
 * xxx*1 变成 数字
 * + '' 变成 字符串
 * !!xxx 变成 布尔值
 * 
 *  == 
 * NaN 不等于任何数
 * 两边是Object比较地址是否相同
 * null == undefined 返回true
 * String == Number，（不是纯数字的）将String转为NaN比较
 * Boolean先转换为Number再比较
 *   
 *  ===
 * null === undefined 返回false
 * 类型一致 字符串比较编码 数值比较数值
 */


console.log(+undefined); // NaN

let str = '123';
let res = +str + 1;
console.log(res); // 124

console.log(0.1+0.2);// 0.30000000000000004
console.log('11' == 11);

let a = {};
b = a;
console.log(a === b);// true