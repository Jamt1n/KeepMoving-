var name = "x";
var people = {
  name: "y",
  setName: (name) => {
    this.name = name;
    return () => {
      return this.name;
    };
  },
};
var getName = people.setName(name);
console.log(people.name); // y
console.log(getName()); // x

console.log("start");
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
Promise.resolve().then(function () {
  console.log("promise3");
});
console.log("end");
// start end promise3 timer1 promise1 timer2 promise2
