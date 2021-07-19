Array.prototype._forEach = function (fn) {
    for (let i = 0; i < this.length; i++) {
        fn(this[i]);
    }
}

let arr = [1,3,2,5,4];
arr._forEach(item => {
    console.log(item)
})
