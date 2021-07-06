function flat(arr) {
  let res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      res = res.concat(flat(item));
    } else {
      res.push(item);
    }
  });
  return res;
}

let arr = [1, 2, 3, [4, [5]]];
console.log(flat(arr));
