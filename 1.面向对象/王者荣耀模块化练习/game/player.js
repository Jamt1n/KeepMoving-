import Yase from "./heroes/yase.js";
import Luban from "./heroes/luban.js";

export default class Player {
  constructor(name, myEvent) {
    this.name = name;
    this.heroes = [new Yase(myEvent), new Luban(myEvent)];
  }
}
