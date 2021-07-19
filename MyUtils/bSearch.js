function bSearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
            return mid;
        }else if (arr[mid] > target) {
            high = mid - 1;
        }else {
            low = mid + 1;
        }
    }
    return -1
}


let arr = [1,3,2,5,4];
console.log(bSearch(arr, 5)); // 3
console.log(arr);
