import S1 from "../skills/yase/s1.js";
import S2 from "../skills/yase/s2.js";
import S3 from "../skills/yase/s3.js";

export default class Yase {
  constructor(myEvent) {
    this.name = "亚瑟";
    this.ico = "./sources/heroes/yase1.png";
    this.skin = "./sources/skins/301660.png"
    this.skills = [new S1(), new S2(), new S3()];
    myEvent.addEvent("init", this.init);
  }
  init() {
    console.log("亚瑟初始化");
  }
}
