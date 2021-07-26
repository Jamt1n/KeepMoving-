// 设计模式  1.设计原则  2.设计模式

// 封装：代码的复用。 设计模式：经验的复用

// 设计原则：单一职责
class Hero {
  constructor() {
    this.name = " ";
    this.skillName1 = "";
    this.skillName2 = ""; // 违背原则
  }
}

// 开闭原则
// 里氏替换原则
class Hero {
  constructor() {
    this.name = "";
  }
  fly() {
    console.log("飞");
  }
}
class Yase extends Hero {
  constructor() {
    super("亚瑟");
  }
  // fly() {
  //   console.log("不能飞"); // 违背原则
  // }
}
let yase = new Hero();
yase.fly();

// 迪米特法则
// 接口隔离原则
// 依赖倒置原则
