function flat(arr) {
    let res = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            res = res.concat(flat(item));
        }else {
            res.push(item);
        }
    })
    return res;
}

let arr = [1,3,2,[5,[4]]];
console.log(flat(arr));
