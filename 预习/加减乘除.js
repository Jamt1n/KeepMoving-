/**
 * 有String拼串
 * 有NaN为NaN
 * boolean、undefined、null先转数字类型
 */
console.log(1+'1'); // 11
console.log(1 + NaN); // NaN
console.log(1 + null); // 1
console.log(1 + true); // 2
console.log(1 + false); // 1
console.log(1 + undefined); // NaN

/**
 * 有NaN 为 NaN
 * 任何一侧不为Number的会调用Number()
 * 
 */
console.log(10 - NaN);// NaN
console.log(null - 10);// -10

 /**
 * 有NaN 为 NaN
 * 任何一侧不为Number的会调用Number()
 */
console.log(2 * 3);// 6
console.log(true * 3);// 3

 /**
 * 有NaN 为 NaN
 * 任何一侧不为Number的会调用Number()
 */
console.log(3 / 1);// 3
console.log(true / 2);// 0.5

 /**
 * 有NaN 为 NaN
 * 任何一侧不为Number的会调用Number()
 */
console.log(10 % 0);// NaN
