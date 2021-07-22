function curry(fn) {
    return function curryFn(...args) {
        if (args.length < fn.length) {
            return function () {
                return curryFn(...args.concat([...arguments]))
            }
        }else {
            return fn(...args)
        }
    }
}

let sum = curry((x, y, z) => x + y + z);
console.log(sum(1)(2)(3));
