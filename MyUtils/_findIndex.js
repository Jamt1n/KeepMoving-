Array.prototype._find = function (fn) {
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            return i
        }
    }
    return -1;
}

let arr = [1,3,2,5,4];
let newArr = arr._find(item => item>3)
console.log(newArr)
