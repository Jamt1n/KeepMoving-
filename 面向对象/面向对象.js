/**
 * 面向对象
 * 研究对象-》属性及方法-》抽象成类-》(提供复用性)-》
 * 抽象成基类(父类)-》逻辑关系
 * 类   对象
 */

// 一、类
// ES5
function Person(name) {
  this.name = name;
}
let zhangsan = new Person("张三");
let lisi = new Person("李四");
// 方法 （节约性能， this挂方法消耗内存）
Person.prototype.fn = function () {
  console.log("fn");
};
// ES6
class Person {
  constructor(name) {
    this.name = name;
  }
  // 方法
  fn() {
    console.log("fn");
  }
}

// 二、公有私有属性
// ES5
function Person(name) {
  let _weight = "130kg"; // 内部作用域，外面拿不到
  this.name = name; // this的属性实例化能拿到
}
// ES2020  "#"修饰符
class Person {
  constructor(name) {
    #weight = "130kg";
    this.name = name;
  }
  getWeight() {
    return this.#weight;
  }
}

// 三、静态成员
// ES5
function Person(name) {
  this.name = name;
}
Person.num = 10; // 静态成员
let person = new Person("张三");
console.log(person.num); // 错误
// ES6
class Person {
  constructor(name) {
    this.name = name;
  }
  static num = 10;
  static fn() {
    console.log("fn");
  }
}
Person.fn();
// 要求一个类只能有一个实例。
// let instance;
class Person {
  static instance;
  constructor(name) {
    if (!Person.instance) {
      Person.instance = this;
    } else {
      return Person.instance;
    }
    this.name = name;
  }
}

// 访问器属性
class Person {
  constructor() {
    // this.name = "张三";
  }
  get name() {
    return "张三"
  }
  set name(newValue) {
    console.log(newValue)
  }
}
let zhangsan = new Person();
console.log(zhangsan.name)
