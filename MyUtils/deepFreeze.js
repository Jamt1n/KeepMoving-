function deepFreeze(obj) {
  Object.freeze(obj);
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (typeof obj[i] === "object") {
        deepFreeze(obj[i]);
      }
    }
  }
}

let obj = { a: { a: 1 } };
deepFreeze(obj);
obj.a.a = 2;
console.log(obj);
