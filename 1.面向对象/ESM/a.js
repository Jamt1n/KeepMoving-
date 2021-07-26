let a = 10;
let b = function () {
    console.log('b')
}
function f () {
    console.log("export default");
}
// console.log(a);
// 导出 多个
export { a };
export { b };
// export default 只能导出一次
// export default f
export { f as default}
