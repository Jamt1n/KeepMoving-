// flyweight
// let userNumber = 10;  //单数是大人  双数是小孩；
let horseNum = 0;

// class CreateHorse{
//     constructor(type){
//         horseNum++;
//         this.horseNum = horseNum;
//         this.type = type?'大马':'小马';
//     }
//     ride(uid){
//         console.log(`人${uid}在骑${this.horseNum}号${this.type}`);
//     }
// }

// 更多实例
// for(let i=1;i<=userNumber;i++){
//     let horse;
//     if(i%2===0){
//         horse = new CreateHorse(false);
//     }else{
//         horse = new CreateHorse(true);
//     }
//     horse.ride(i);
// }
// console.log(horseNum);

// 享元模式
// let  smallHorse = new CreateHorse(false);
// let  bigHorse = new CreateHorse(true);
// for(let i=1;i<=userNumber;i++){
//     if(i%2===0){
//         smallHorse.ride(i);
//     }else{
//         bigHorse.ride(i);
//     }
// }
// console.log(horseNum);

// 改进享元模式
class CreateHorse {
  constructor(type) {
    horseNum++;
    this.horseNum = horseNum;
    this.type = type ? "大马" : "小马";
    this.finish = true;
  }
  ride(uid) {
    return new Promise((resolve) => {
      console.log(`人${uid}在骑${this.horseNum}号${this.type}`);
      this.finish = false;
      setTimeout(() => {
        resolve(`人${uid}在骑${this.horseNum}号${this.type}骑行完毕!!`);
        this.finish = true;
      }, 2000);
    });
  }
}

class HorsePool {
  constructor() {
    this.horse = [
      new CreateHorse(true),
      new CreateHorse(true),
      new CreateHorse(true),
    ];
    this.people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
  rideHorse() {
    this.people.forEach((uid) => {
      let horse = this.getHorse();
      if (horse) {
        horse.ride(uid).then((res) => {
          console.log(res);
          this.people.shift() && this.rideHorse() && this.people.length;
        });
      }
    });
  }
  getHorse() {
    return this.horse.find((item) => item.finish);
  }
}

let horsePool = new HorsePool();
horsePool.rideHorse();
