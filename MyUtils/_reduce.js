Array.prototype._reduce = function (fn, initValue) {
  let result = initValue;
  for (let i = 0; i < this.length; i++) {
    // 执行回调
    result = fn(result, this[i]);
  }
  return result;
};

let arr = [1, 2, 3];
let newArr = arr._reduce((pre, cur) => pre + cur, 0);
console.log(newArr);
