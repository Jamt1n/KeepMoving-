Array.prototype._filter = function (fn) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

let arr = [1,3,2,5,4];
let newArr = arr._filter(item => item>3)
console.log(newArr)
