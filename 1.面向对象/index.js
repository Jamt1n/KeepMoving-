// 疯狗一直叫
class Dog {
  wow() {
    console.log("wow");
  }
  yelp() {
    this.wow();
  }
}
class MadDog extends Dog {
  yelp() {
    setInterval(() => {
      this.wow();
    }, 500);
  }
}
let xiaoming = new MadDog();
xiaoming.yelp();

// 实现链式调用
// let p = new Promise();
// p.then().then()....
// return this; 返还实例对象
class Person {
  fn() {
    console.log("fn");
    // return this;
    return new Person();
  }
}
let zhangsan = new Person();
zhangsan.fn().fn();

// __proto__ 和 prototype 关系
function Person(name) {
  this.name = name;
}
console.log(Person.prototype);
console.log(Person.__proto__);
let obj = {};
// obj.__proto__.name = '张三'; // 不规范
Object.setPrototypeOf(obj, { name: "张三" });
