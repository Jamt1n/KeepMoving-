// decorator
// 功能扩展 extends
class Yase {
  constructor() {
    this.name = "亚瑟";
  }
  release() {
    console.log("释放技能");
  }
}
let yase = new Yase();
yase.release();

function hurt() {
  console.log("造成100点伤害");
}
function walk() {
  console.log("走");
}
Function.prototype.Decorator = function (fn) {
  return () => {
    this();
    fn();
  };
};
// yase.release.Decorator(hurt)();
// 装饰者链
yase.release.Decorator(hurt).Decorator(walk)();
