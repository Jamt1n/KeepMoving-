![img](https://user-gold-cdn.xitu.io/2019/11/6/16e3fec6c1fb209e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 原型

#### \_\_proto\_\_ 称作 隐式原型。

#### prototype 称作 显式原型。

- 所有引用类型（函数，数组，对象）都拥有\_\_proto\_\_属性（隐式原型)
- 所有函数除了有_proto_属性之外还拥有prototype属性（显式原型）
- 原型对象：每创建一个函数，该函数会自动带有一个prototype属性，该属性是一个指针，指向了一个对象，我们称之为原型对象。



```javascript
function Person(name, age){ 
    this.name = name;
    this.age = age;
 }
 
 Person.prototype.motherland = 'china'
```

```javascript
 let person01 = new Person('小明', 18);
```

```javascript
1. Person.prototype.constructor == Person // **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
2. person01.__proto__ == Person.prototype // **准则2：实例（即person01）的__proto__和原型对象指向同一个地方**

```



```javascript
// 从上方 function Foo() 开始分析这一张经典之图
function Foo()
let f1 = new Foo();
let f2 = new Foo();

f1.__proto__ = Foo.prototype; // 准则2
f2.__proto__ = Foo.prototype; // 准则2
Foo.prototype.__proto__ = Object.protitype; // 准则2 (Foo.prototype本质也是普通对象，可适用准则2)
Object.prototype.__proto__ = null; // 原型链到此停止
Foo.prototype.constructor = Foo; // 准则1
Foo.__proto__ = Function.prototype; // 准则2
Function.prototype.__proto__  = Object.protitype; //  准则2 (Function.prototype本质也是普通对象，可适用准则2)
Object.prototype.__proto__ = null; // 原型链到此停止
// **此处注意Foo 和 Function的区别， Foo是 Function的实例**

// 从中间 Function Object()开始分析这一张经典之图
Function Object()
let o1 = new  Object();
let o2 = new  Object();

o1.__proto__ = Object.prototype; // 准则2
o2.__proto__ = Object.prototype; // 准则2
Object.prototype.__proto__ = null; // 原型链到此停止
Object.prototype.constructor = Object; // 准则1
Object.__proto__ = Function.prototype // 准则2 (Object本质也是函数)；
// 此处有点绕，Object本质是函数，Function本质是对象
Function.prototype.__proto__ =  Object.prototype; // 准则2 (Function.prototype本质也是普通对象，可适用准则2)
Object.prototype.__proto__ = null; // 原型链到此停止

// 从下方 Function Function()开始分析这一张经典之图
Function Function()
Function.__proto__ = Function.prototype // 准则2
Function.prototype.constructor = Function; // 准则1
```

由此可以得出结论： 除了Object的原型对象（Object.prototype）的__proto__指向null，其他内置函数对象的原型对象（例如：Array.prototype）和自定义构造函数的 __proto__都指向Object.prototype, 因为原型对象本身是普通对象。 即：

```javascript
Object.prototype.__proto__ = null;
Array.prototype.__proto__ = Object.prototype;
Foo.prototype.__proto__  = Object.prototype;
```





## 原型、原型链的意思何在

```javascript
console.log(person01)
```

打印person01， 他有自己属性 name = '小明'，age = 18; 同时通过原型链关系，他有属性motherland = 'china'；

我们再创建person2实例

```javascript
let person02 = new Person('小花', 20);
console.log(person02)
```

打印person02， 他有自己属性 name = '小花'，age = 20; 同时通过原型链关系，他有属性motherland = 'china'； 看出来了没有，原型对象存放了person01、person02共有的属性所属国motherland = 'china'. 我们不用在每个实例上添加motherland 属性，而是将这一属性存在他们的构造函数原型对象上，对于人类Person这样的构造函数。相同的属性、方法还有很多很多，比如我们是黑头发，我们都有吃，睡这样一个方法，当相同的属性、方法越多，原型、原型链的意义越大。 那我们可以这样操作

```javascript
Person.prototype.hairColor = 'black';
Person.prototype.eat = function(){
    console.log('We usually eat three meals a day.')
}
console.log(person01)
console.log(person02)
```

此时我们再打印person01、person02，我们惊喜的发现，他们有了属性hairColor和eat方法；实例们动态的获得了Person构造函数之后添加的属性、方法，这是就是原型、原型链的意义所在！可以动态获取，可以节省内存。

> 另外我们还要注意：如果person01将头发染成了黄色，那么hairColor会是什么呢？

可以看到，person01的hairColor = 'yellow'， 而person02的hairColor = 'black'； 实例对象重写原型上继承的属相、方法，相当于“属性覆盖、属性屏蔽”，这一操作不会改变原型上的属性、方法，自然也不会改变由统一构造函数创建的其他实例，只有修改原型对象上的属性、方法，才能改变其他实例通过原型链获得的属性、方法。



### 作者：妖精的尾巴

链接：https://juejin.cn/post/6844903989088092174
来源：掘金