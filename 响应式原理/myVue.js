class myVue extends EventTarget{
  constructor(options) {
    super();
    this.$options = options;
    this._data = options.data;
    this.observe(this._data);
    this.compile();
  }
  compile() {
    let ele = document.querySelector(this.$options.el);
    let childNodes = ele.childNodes;
    childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // 标签
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
          this.addEventListener($1, ()=> {
            console.log("视图更新")
          })
        }
      }
    });
  }
  observe(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      let value = data[key];
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          console.log("get");
          return value;
        },
        set(newValue) {
          this.dispatchEvent(new CustomEvent(key));
          // 更新视图
          value = newValue;
          console.log("set");

        },
      });
    });
  }
}
