// single
// class Person {
//   static instance;
//   constructor(name) {
//     if (!Person.instance) {
//       Person.instance = this;
//     } else {
//       return Person.instance;
//     }
//     this.name = name;
//   }
// }
// let zhangsan = new Person("张三");
// let lisi = new Person("李四");
// console.log(zhangsan, lisi); // Person { name: '张三' } Person { name: '张三' }

let obj1 = {
  name: "张三",
  age: 20,
};
let obj2 = {
  name: "张三",
  age: 20,
};
console.log(obj1 === obj2); // 也是单例模式

class Person {
  constructor(name) {
    this.name = name;
  }
}
class Animal {
  constructor(name) {
    this.name = name;
  }
}
// 通用单例
function creatInstance(fn) {
  let instance;
  return function (...args) {
    if (!instance) {
      instance = new fn(...args);
    }
    return instance;
  };
}
let singlePerson = creatInstance(Person);
let zhangsan = new singlePerson("张三");
let lisi = new singlePerson("李四");
console.log(zhangsan, lisi); // Person { name: '张三' } Person { name: '张三' }

// 单例应用 (游戏只有一个皇帝，两个就出问题了 \ 全局对话框)
class Dialog {
  constructor() {
    let dialog = document.createElement("div");
    this.dialog = dialog;
    this.dialog.style.display = "none";
    this.isShow = false;
  }
  showDialog() {
    if (!this.isShow) {
      this.dialog.innerHTML = "对话框";
      document.body.append(this.dialog);
      this.dialog.style.display = "block";
    } else {
      console.log("已经显示了");
    }
  }
}
// let dialog1 = new Dialog(); // 以上代码会有两个实例
// let dialog2 = new Dialog(); // 以上代码会有两个实例

let createInstanceFn = creatInstance(Dialog);
let dialog1 = new createInstanceFn(); // 以上代码会有两个实例
