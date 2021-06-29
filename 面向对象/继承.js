// 构造函数；1.首字母大写；2.this指向实例化对象；
function Person(name) {
  this.name = name;
  this.age = 20;
  this.hobby = function () {
    console.log("喜欢篮球");
  };
}
let zhangsan  = new Person("张三");

// 继承；
function Dad(name, age) {
  this.name = name;
  this.age = age;
  this.money = "100000";
}
function Son(name, age) {
  // Dad.call(this,name,age);
  // Dad.apply(this,[name,age])
  Dad.bind(this)(name, age);
  this.sex = "男";
}

let zhangsann = new Son("张三", 20);
console.log(zhangsann.money);
