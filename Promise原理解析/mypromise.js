export default class MyPromise {
  constructor(handle) {
    this["[[PromiseState]]"] = "pending";
    this["[[PromiseResult]]"] = undefined;
    this.resolveFn = undefined;
    this.rejectFn = undefined;
    this.resolveQueue = [];
    this.rejectQueue = [];
    handle(this.#resolve.bind(this), this.#reject.bind(this));
  }
  #resolve(val) {
    this["[[PromiseState]]"] = "fullfilled";
    this["[[PromiseResult]]"] = val;
    // this.resolveFn && this.resolveFn(val);
    const run = () => {
      let cb;
      // [fn1, fn2...]
      while ((cb = this.resolveQueue.shift())) {
        cb && cb(val);
      }
    };
    // run();
    // setTimeout(run);
    const observer = new MutationObserver(run);
    observer.observe(document.body, {
      attributes: true,
    });
    document.body.setAttribute("kkb", "value");
  }
  #reject(err) {
    this["[[PromiseState]]"] = "rejected";
    this["[[PromiseResult]]"] = err;
    // this.rejectFn && this.rejectFn(err);
    const run = () => {
      let cb;
      // [fn1, fn2...]
      while ((cb = this.rejectQueue.shift())) {
        cb && cb(val);
      }
    };
    // run();
    // setTimeout(run);
    const observer = new MutationObserver(run);
    observer.observe(document.body, {
      attributes: true,
    });
    document.body.setAttribute("kkb", "value");
  }

  then(onResolved, onRejected) {
    // this.resolveFn = onResolved;
    // this.rejectFn = onRejected;

    this.resolveQueue.push(onResolved);
    this.rejectQueue.push(onRejected);

    // if (this["[[PromiseState]]"] === "fullfilled") {
    //   onResolved && onResolved(this["[[PromiseResult]]"]);
    // } else {
    //   onRejected && onRejected(this["[[PromiseResult]]"]);
    // }
  }

  catch(fn) {
    return this.then(undefined, fn);
  }
  static resolve(val) {
    return new MyPromise((resolve) => {
      resolve(val);
    });
  }
  static reject(err) {
    return new MyPromise((resolve, reject) => {
      reject(err);
    });
  }
  static race(lists) {
    let isExe = false;
    return new MyPromise((resolve, reject) => {
      lists.forEach((item) => {
        item.then(
          (res) => {
            if (!isExe) {
              resolve(res);
              isExe = true;
            }
          },
          (err) => {
            if (!isExe) {
              reject(err);
              isExe = true;
            }
          }
        );
      });
    });
  }
  static allSettled(lists) {
    // let resArr = [1,2];
    let resArr = new Array(lists.length);
    let num = 0;
    return new MyPromise((reslove) => {
      lists.forEach((item, key) => {
        let obj = {};
        item.then(
          (res) => {
            obj["status"] = "fulfilled";
            obj["value"] = res;
            resArr[key] = obj;
            // console.log(1,resArr);
            num++;
            if (num >= lists.length) {
              reslove(resArr);
            }
          },
          (err) => {
            obj["status"] = "rejected";
            obj["reson"] = err;
            resArr[key] = obj;
            num++;
            // console.log(2,resArr);
            if (num >= lists.length) {
              reslove(resArr);
            }
          }
        );
      });
    });
  }
  // 作业
  finally(fn) {
    //无论结果是fulfilled或者是rejected，都会执行指定的回调函数
    return this.then(
      (res) => MyPromise.resolve(fn()).then(() => res),
      (err) => MyPromise.resolve(fn()).then(() => { //用resolve因为最终用的是throw抛出错误
          throw err;
        })
    );
  }
  static all(lists) {
    let resArr = new Array(lists.length);
    let num = 0;
    return new MyPromise((reslove) => {
      lists.forEach((item, key) => {
        item.then((res) => {
          resArr[key] = res;
          num++;
          if (num >= lists.length) {
            reslove(resArr); // 只返回resolve值的数组
          }
        });
      });
    });
  }
}
