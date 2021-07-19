function deepCopy(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
          if (typeof obj[i] === 'object') {
              deepCopy(obj[i])
          }else {
              newObj[i] = obj[i];
          }
      }
  }
  return newObj;
}

let a = { a: 1 };
let b = deepCopy(a);
b.a = 2;
console.log(a);
