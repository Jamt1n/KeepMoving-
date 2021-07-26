/**
 * 结合发布订阅模式
 */
class myVue {
  constructor(options) {
    this.$options = options;
    this._data = options.data;
    this.observe(this._data);
    this.compile();
  }
  compile() {
    let ele = document.querySelector(this.$options.el);
    this.compileNodes(ele);
  }
  compileNodes(ele) {
    let childNodes = ele.childNodes;
    childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // 元素节点
        if (node.childNodes.length > 0) {
          this.compileNodes(node);
        }
      } else if (node.nodeType === 3) {
        // 文本
        let reg = /\{\{\s*([^{}\s]+)\s*\}\}/g;
        let textContent = node.textContent;
        // console.log(textContent)
        if (reg.test(textContent)) {
          let $1 = RegExp.$1;
          // console.log("有大胡子", $1, this._data[$1]);
          node.textContent = node.textContent.replace(reg, this._data[$1]);

          // 事件监听
          // this.addEventListener($1, (e) => {
          //   console.log("视图更新");
          //   let oldValue = this._data[$1];
          //   let newValue = e.detail;
          //   node.textContent = node.textContent.replace(oldValue, newValue);
          // });
          new Watcher(this._data,$1,(newValue) => {
            console.log("视图更新");
            let oldValue = this._data[$1];
            node.textContent = node.textContent.replace(oldValue, newValue);
          });
        }
      }
    });
  }
  observe(data) {
    let keys = Object.keys(data);
    // let _this = this;
    keys.forEach((key) => {
      let value = data[key];
      // data[key]----->get
      let dep = new Dep();
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          console.log("get");
          // 收集watcher
          if (Dep.target) {
            dep.addSub(Dep.target);
          }
          return value;
        },
        set(newValue) {
          console.log("set", dep);
          // _this.dispatchEvent(
          //   new CustomEvent(key, {
          //     detail: newValue,
          //   })
          // );
          // 更新视图
          dep.notify(newValue);
          value = newValue;
        },
      });
    });
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify(newValue) {
    this.subs.forEach((sub) => {
      sub.update(newValue);
    });
  }
}

class Watcher {
  constructor(data, key, cb) {
    Dep.target = this;
    data[key]; // 触发get 收集watcher
    this.cb = cb;
    Dep.target = null;
  }
  update(newValue) {
    this.cb(newValue);
  }
}
