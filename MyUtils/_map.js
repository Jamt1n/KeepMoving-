Array.prototype._map = function (fn) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(fn(this[i]));
    }
    return arr;
}

let arr = [1,3,2,5,4];
let newArr = arr._map(item => {
    console.log(item+1)
    return item+1
})
console.log(newArr)
