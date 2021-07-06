console.log(111);
// 回调解决异步问题 -》问题：回调地狱
function test(cb) {
  setTimeout(() => {
    console.log("setTimeout");
    cb && cb();
  }, 1000);
}
test(function () {
  console.log(222);
});
