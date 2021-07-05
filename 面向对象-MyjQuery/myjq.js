// function $(arg) {
//     return {
//         click: function (cb) {
//             document.querySelector(arg).onclick = cb;
//         }
//     }
// }

class Jq {
  constructor(arg, root) {
    if (typeof root === "undefined") {
      this["prevObject"] = [document];
    } else {
      this["prevObject"] = root;
    }
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
    let eventArr = eventName.split(" ");
    // 针对多个节点绑定多个事件
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < eventArr.length; j++) {
        this[i].addEventListener(eventArr[j], cb);
      }
    }
  }
  eq(index) {
    return new Jq(this[index], this);
  }
  end() {
    return this["prevObject"];
  }
  get(index) {
    return this[index];
  }
  css(...args) {
    if (args.length === 1) {
      if (typeof args[0] === "object") {
        // 1 多样式
        for (let i = 0; i < this.length; i++) {
          for (let j in args[0]) {
            this.#setStyle(this[i], j, args[0][j]);
          }
        }
      } else {
        // 2 一个样式 ：多个元素只会获取第一个元素样式
        return this.#getStyle(this[0], args[0]);
      }
    } else {
      // 3 两个参数， 设置一个样式
      for (let i = 0; i < this.length; i++) {
        this.#setStyle(this[0], args[0], args[1]);
      }
    }
    return this;
  }
  #getStyle(ele, styleName) {
    return getComputedStyle(ele, null)[styleName];
  }
  #setStyle(ele, styleName, styleValue) {
    ele.style[styleName] = styleValue;
  }
}

function $(arg) {
  return new Jq(arg);
}
