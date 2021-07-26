import Player from "./player.js";
import MyEvent from "../myEvent.js";

export default class Game {
  constructor() {
    this.player = null;
    this.MyEvent = new MyEvent();
  }
  login(name) {
    this.player = new Player(name, this.MyEvent);
    // 触发英雄初始化
    this.MyEvent.trigger("init");
  }
}
