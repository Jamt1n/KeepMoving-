// function flat(arr) {
//     let res = [];
//     arr.forEach(item => {
//         if (Array.isArray(item)) {
//             res = res.concat(flat(item));
//         }else {
//             res.push(item);
//         }
//     })
//     return res;
// }
Array.prototype.flat1 = function(){
    let arr = this;
    function inner(arr){
        return arr.reduce(function(a,b){
            return a.concat(Array.isArray(b) ? inner(b) : b)
        },[])
    }
    return inner(arr)
}

Array.prototype._flat = function(n) {
    n = n === undefined ? 1 : n;
    if (n < 1) return this;
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        if (Array.isArray(this[i])) {
            newArr = newArr.concat(this[i].flat(n - 1));
        } else {
            newArr.push(this[i]);
        }
    }
    return newArr;
}


let arr = [1,3,2,[5,[4]]];
console.log(arr._flat());
