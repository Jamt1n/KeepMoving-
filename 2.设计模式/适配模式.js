function getUsers() {
  return [
    {
      name: "zhangsan",
      age: 20,
    },
    {
      name: "lisi",
      age: 30,
    },
  ];
}
// [{zhangsan:20},{lisi:30}]
// axios也做了平台适配
function Adaptor(users) {
  let arr = [];
  for (let i = 0; i < users.length; i++) {
    arr[users[i].name] = users[i].age;
  }
  return arr;
}
let res = getUsers();
console.log(Adaptor(res));
