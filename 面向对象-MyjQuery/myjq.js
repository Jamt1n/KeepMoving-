// function $(arg) {
//     return {
//         click: function (cb) {
//             document.querySelector(arg).onclick = cb;
//         }
//     }
// }

// const config = {
//   animationIterationCount: true,
//   columnCount: true,
//   fillOpacity: true,
//   flexGrow: true,
//   flexShrink: true,
//   fontWeight: true,
//   gridArea: true,
//   gridColumn: true,
//   gridColumnEnd: true,
//   gridColumnStart: true,
//   gridRow: true,
//   gridRowEnd: true,
//   gridRowStart: true,
//   lineHeight: true,
//   opacity: true,
//   order: true,
//   orphans: true,
//   widows: true,
//   zIndex: true,
//   zoom: true,
// };
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
    if (styleName in $.cssHooks) {
      return $.cssHooks[styleName].get(ele);
    }
    return getComputedStyle(ele, null)[styleName];
  }
  #setStyle(ele, styleName, styleValue) {
    if (typeof styleValue === "number" && !$.cssNumber[styleName]) {
      styleValue += "px";
    }
    if (styleName in $.cssHooks) {
      $.cssHooks[styleName].set(ele, styleValue);
    }
    ele.style[styleName] = styleValue;
  }
  animate(...args) {
    if (args.length === 3) {
      for (let i = 0; i < this.length; i++) {
        if (typeof args[1] === "number") {
            args[0] = {...args[0], transition: `${Object.keys(args[0]).length == 1 ? Object.keys(args[0])[0] : "all"} ${args[1] / 1000}s`,
          }; // 如果只有一个width就对width做transition ，太难看了下面的就不换了
          this.eq(i).css(args[0]);
          setTimeout(args[2], args[1]);
        } else if (args[1] == "slow") {
          args[0] = { ...args[0], transition: `all 4s` }; // slow默认4s
          this.eq(i).css(args[0]);
          setTimeout(args[2], 4000);
        } else if (args[1] == "fast") {
          args[0] = { ...args[0], transition: `all .5s` }; // fast默认0.5s
          this.eq(i).css(args[0]);
          setTimeout(args[2], 500);
        }
      }
    } else if (args.length === 2) {
      for (let i = 0; i < this.length; i++) {
        args[0] = { ...args[0], transition: `all 2s` }; // 默认2s
        this.eq(i).css(args[0]);
        setTimeout(args[1], 2000);
      }
    }
  }
}

$.cssNumber = {
  animationIterationCount: true,
  columnCount: true,
  fillOpacity: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true,
};

$.cssHooks = {};

function $(arg) {
  return new Jq(arg);
}
