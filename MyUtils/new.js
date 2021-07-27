function newFn(fn, ...args) {
    // 1.创建一个js对象，并且将该js对象的隐式原型指向构造函数的原型
    const newObj = Object.create(fn.prototype);
    // 2.调用函数，把函数的this绑定给这个新对象
    const result = fn.apply(newObj,args);
    // 3.判断函数是否返回有返回对象，如果有就返回该函数的返回对象，否则返回新对象
    return result && typeof result === 'object' ? result : newObj;
}


function Person() {
    this.name = 'jam'
}

let obj = newFn(Person);
console.log(obj)
