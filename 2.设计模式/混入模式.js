// mixin
class Yase {
  constructor(name) {
    this.name = name;
  }
}

class Skills {
  hurt() {
    console.log("造成伤害");
  }
  walk() {
    console.log("走路");
  }
  release() {
    console.log("释放技能");
  }
}

// let yase = new Yase();
function mixin(receivingClass, givingClass) {
  if (typeof arguments[2] !== "undefined") {
    for (let i = 2; i < arguments.length; i++) {
      receivingClass.prototype[arguments[i]] =
        givingClass.prototype[arguments[i]];
    }
  }
}
mixin(Yase, Skills, "hurt", "walk", "release");
let yase = new Yase();
console.log(yase.__proto__);
yase.release();
