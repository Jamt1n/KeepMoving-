// 可选链操作符
let user = {
  name: {
    age: 18,
  },
};
// let age = user.name && user.name.age;// 替换成👇
let age = user?.name?.age;
console.log(age);

// 空合并运算符
function fn(name, age) {
  name = name ?? "张三";
  age = age || 18;
  return { name, age };
}
console.log(fn("", 18));

// bigint
const max = Number.MAX_SAFE_INTEGER;
// console.log(max + 4);
console.log(BigInt(max) + 4n);
