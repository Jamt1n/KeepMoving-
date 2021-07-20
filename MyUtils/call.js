function call(Fn, obj, ...args) {
  // 判断
  if (obj === undefined || obj === null) {
    obj = globalThis; // 全局对象
  }
  // 为obj添加临时方法
  obj.temp = Fn;
  // 调用 temp 方法
  let result = obj.temp(...args);
  // 删除 temp 方法
  delete obj.temp;
  // 返回执行结果
  return result;
}

// call(add, obj, 10, 20);
