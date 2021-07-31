Array.prototype.reduceToMap = function (callback, context) {
  return arr.reduce((previous, current, index, arr) => {
    let value = context
      ? callback.call(context, current, index, arr)
      : callback(current, index, arr);
    previous.push(value);
    return previous;
  }, []);
};

Array.prototype.myMap = function (callback, context) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    let item;
    if (context) {
      item = callback.call(context, this[i], i, this);
    } else {
      item = callback(this[i], i, this);
    }
    res.push(item);
  }
  return res;
};
