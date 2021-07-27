// 原型继承
// function Parent() {
//     this.baba = 'baba';
// }
// Parent.prototype.getBaba = function () {
//     console.log(this.baba);
// }
// function Son() {
//     this.name = 'son';
// }
// Son.prototype = new Parent();
// Son.prototype.constructor = Son;

// call
function Parent() {
    this.baba = 'baba';
}
Parent.prototype.getBaba = function () {
    console.log(this.baba);
}
function Son() {
    // Parent.call(this, arguments)
    this.name = 'son';
}

// 寄生组合
Son.prototype = Object.create(Parent.prototype);
Son.prototype.constructor = Son;

// ES6
// class Parent {
//     constructor() {
//         this.baba = 'baba'
//     }
//     getBaba() {
//         console.log(this.baba);
//     }
// }
// class Son extends Parent {
//     constructor() {
//         super();
//         this.name = 'jam'
//     }
//
// }

let obj = new Son();
console.log(Son.prototype)
console.log(obj)
