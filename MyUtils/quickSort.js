function quickSort(arr, left, right) {
    if (left >= right) return;
    let i = left;
    let j = right;
    let flag = arr[left];
    while (i < j) {
        while (i < j && arr[j] > flag) {
            j--;
        }
        while (i < j && arr[i] <= flag) {
            i++;
        }
        if (i < j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    arr[left] = arr[i];
    arr[i] = flag;
    quickSort(arr, left, i - 1);
    quickSort(arr, i + 1, right)
}

let arr = [1,3,2,5,4];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
