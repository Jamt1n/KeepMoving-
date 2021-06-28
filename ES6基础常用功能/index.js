const deepFreeze = require("./deepFreeze");
let obj = { a: 1, b: { c: 3 } };
deepFreeze(obj);
obj.b = 1;
console.log(obj);
