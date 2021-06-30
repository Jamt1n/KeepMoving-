// factory
class Luban {
  constructor() {
    this.name = "鲁班";
  }
}
class Yase {
  constructor() {
    this.name = "亚瑟";
  }
}

function Factory(heroName) {
  switch (heroName) {
    case "luban":
      return new Luban();
      break;
    case "yase":
      return new Yase();
      break;
    default:
      console.log("没有英雄");
      break;
  }
}
let yase = Factory("yase");
let luban = Factory("luban");
console.log(yase, luban);
