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
    setTimeout(run);
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
    setTimeout(run);
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
}
