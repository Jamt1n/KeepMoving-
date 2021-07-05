// function $(arg) {
//     return {
//         click: function (cb) {
//             document.querySelector(arg).onclick = cb;
//         }
//     }
// }

class Jq {
  constructor(arg) {
    if (typeof arg === "string") {
      // this.elm = document.querySelector(arg);
      // this[0] = elm1 ....
      let eles = document.querySelectorAll(arg);
      this.addEles(eles);
    } else if (typeof arg === "function") {
      document.addEventListener("DOMContentLoaded", arg);
    } else {
      if (typeof arg.length !== "undefined") {
        this.addEles(arg);
      } else {
        this[0] = arg;
        this.length = 1;
      }
    }
  }
  addEles(eles) {
    eles.forEach((ele, i) => {
      this[i] = ele;
    });
    this.length = eles.length;
  }
  click(cb) {
    // this.elm.addEventListener("click", cb)
    for (let i = 0; i < this.length; i++) {
      this[i].addEventListener("click", cb);
    }
  }
  on(eventName, cb) {
      let eventArr = eventName.split(' ');
      // 针对多个节点绑定多个事件
      for (let i=0;i<this.length; i++) {
          for (let j = 0;j<eventArr.length;j++) {
              this[i].addEventListener(eventArr[j], cb);
          }
      }
  }
}

function $(arg) {
  return new Jq(arg);
}
