function deepCopy(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] == "object") {
        deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

let obj1 = { a: 1 };
let obj2 = deepCopy(obj1);
obj2.a = 2;
console.log(obj1);
