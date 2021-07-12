/**
 * Proxy重构
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
        // 属性 指令处理
        let attrs = node.attributes;
        [...attrs].forEach((attr) => {
          let attrName = attr.name;
          let attrValue = attr.value;
          console.log(attrName, attrValue);
          if (attrName === "v-model") {
            node.value = this._data[attrValue];
            node.addEventListener("input", (e) => {
              let newValue = e.target.value;
              console.log(e.target.value);
              this._data[attrValue] = newValue;
            });
          } else if (attrName === "v-html") {
            console.log(this._data)
            node.innerHTML = this._data[attrValue];
            new Watcher(this._data, attrValue, (newValue) => {
              console.log("视图更新");
              node.innerHTML = newValue;
            });
          } else if (attrName === "v-text") {
            node.textContent = this._data[attrValue];
            new Watcher(this._data, attrValue, (newValue) => {
              console.log("视图更新");
              node.textContent = newValue;
            });
          }
        });

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
          new Watcher(this._data, $1, (newValue) => {
            console.log("视图更新");
            let oldValue = this._data[$1];
            node.textContent = node.textContent.replace(oldValue, newValue);
          });
        }
      }
    });
  }
  //  -------- refactor
  observe(data) {
    let temp = {};

    this._data = new Proxy(data, {
      get(target, key) {
        console.log("get");
        temp[key] = new Dep();
        if (Dep.target) {
          temp[key].addSub(Dep.target);
        }
        return Reflect.get(target, key);
      },
      set(target, key, newValue) {
        console.log("set");
        temp[key].notify(newValue);
        return Reflect.set(target, key, newValue);
      },
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
    // Dep.target = null;
  }
  update(newValue) {
    this.cb(newValue);
  }
}
