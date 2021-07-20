function bind(Fn, obj, ...args) {
  // 返回一个函数
  return function (...args2) {
    // 执行 call 函数
    return Fn.call(obj, ...args, ...args2);
  };
}

let b = {
  name: "jam",
};
let a = {
  fn: function () {
    console.log(this.name);
  },
};

bind(a.fn, b)();
