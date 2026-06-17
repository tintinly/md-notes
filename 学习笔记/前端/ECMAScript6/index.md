## ECMAScript6

### ES6 简介

ECMAScript6，简称 ES6，是 JavaScript 语言的一次重大更新。它于 2015 年发布，是原来的 ECMAScript 标准的第六个版本。ES6 带来了大量的新特性，包括箭头函数、模板字符串、let 和 const 关键字、解构、默认参数值、模块系统等等，大大提升了 JavaScript 的开发体验。

> 由于 vUE3 中大量使用了 ES6 的语法，所以 ES6 成为了学习 VUE3 的门槛之一。

ES6 对 JavaScript 的改进在以下几个方面：

1. 更加简洁：ES6 引入了一些新的语法，如箭头函数、类和模板字符串等，使代码更加简洁易懂
2. 更强大的功能：ES6 引入了一些新的 API、解构语法和迭代器等功能，从而使得 JavaScript 更加强大
3. 更好的适用性：ES6 引入的模块化功能为 JavaScript 代码的组织和管理提供了更好的方式，不仅提高了程序的可维护性，还让 JavaScript 更方便地应用于大型的应用程序

[ECMAScript 历史版本](#ECMAScript)

### ES6 变量

ES6 新增了 let 和 const，用来声明变量，使用的细节上也存在诸多差异

let 和 var 的差别：

1. let 不能重复声明；
2. let 有块级作用域，非函数的花括号遇见 let 会有块级作用域，也就是只能在花括号里面访问；
3. let 不会预解析进行变量提升；
4. let 定义的全局变量不会作为 window 的属性；
5. let 在 es6 中推荐优先使用；

const 和 var 的差异：

1. 新增 const 和 let 类似，只是 const 定义的变量不能修改；
2. 并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动；

```javascript
		// var 具有函数级作用域 
        // 重复声明
        var avar = 1;
        var avar = 2; // 2
        // 变量提升
        console.log(bvar); // 1
        var bvar = 1;
        // 会成为window对象的属性
        console.log(window.avar); // 2

        // let 
        // 不能重复声明
        let alet = 1;
        // let alet = 2; // SyntaxError: Identifier 'alet' has already been declared
        // 具有块级作用域 
        {
            let blet = 3;
            console.log(blet); // 3
        }
        // console.log(blet); // ReferenceError: blet is not defined
        // 不存在变量提升 
        // console.log(clet); // ReferenceError: Cannot access 'clet' before initialization
        let clet = 4;
        console.log(clet);
        // 不会成为window对象的属性
        console.log(window.alet); // undefined

        // const
        // 不能重新赋值
        const aconst = 5;
        // aconst = 6; // TypeError: Assignment to constant variable.
        // 具有块级作用域
        {
            const bconst = 7;
            console.log(bconst); // 7
        }
        // console.log(bconst); // ReferenceError: bconst is not defined
        // 数组或对象 可以修改内容但不能重新赋值  即引用地址不能变
        const arr = [1, 2, 3];
        arr.push(4); // 可以修改数组内容
        console.log(arr); // [1, 2, 3, 4]
        const obj = { name: 'Alice' };
        obj.name = 'Bob'; // 可以修改对象属性
        console.log(obj); // { name: 'Bob' }
```



### ES6 模板字符串

模板字符串（template string）是增强版的字符串，用反引号 \`  标识

1. 字符串中可以出现换行符；
2. 可以使用 `${xxx}` 形式输出变量和拼接变量；

```javascript
        // 模板字符串
        let item1 = 'Item 1';
        let item2 = 'Item 2';
        let item3 = 'Item 3';
        let item4 = 'Item 4';
        let str = "<ul>\n" +
            "    <li>" + item1 + "</li>\n" +
            "    <li>" + item2 + "</li>\n" +
            "    <li>" + item3 + "</li>\n" +
            "    <li>" + item4 + "</li>\n" +
            "</ul>";
        console.log(str);
        let templateStr = `<ul>
                            <li>${item1}</li>
                            <li>${item2}</li>
                            <li>${item3}</li>
                            <li>${item4}</li>
                        </ul>
                        `;
        console.log(templateStr);
```

### ES6 解构表达式

ES6 的解构赋值是一种方便的语法，可以快速将数组或对象中的值拆分并赋值给变量。解构赋值的语法使用花括号 `{}` 表示对象，方括号 `[]` 表示数组。通过解构赋值，函数更方便进行参数接受等！

```javascript
// 数组解构
        let arr = [1, 2, 3];
        let [a, b, c, d=10] = arr;
        console.log(a, b, c, d); // 1 2 3 10

        // 对象解构
        let person = { name: 'Alice', age: 30 };
        let { name1, age1 } = person;
        console.log(name1, age1); // undefined undefined
        let { age , name } = person;
        console.log(name, age); // Alice 30
        let {name: name2, age: age2} = person;
        console.log(name2, age2); // Alice 30

        // 参数列表解构
        function showArray([x, y, z=20]) {
            console.log(`x: ${x}, y: ${y}, z: ${z}`);
        }
        showArray([5, 10]); // x: 5, y: 10
        function greet({ name, age }) {
            console.log(`Hello, ${name}! You are ${age} years old.`);
        }
        greet(person); // Hello, Alice! You are 30 years old.
```

### ES6 的箭头函数

ES6 允许使用“箭头”义函数。语法类似 Java 中的 Lambda 表达式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        // 箭头函数
        let func1 = function() {};
        let func2 = () => {};

        let func3 = (x, y) => { console.log(x, y); return x + y; };
        let func4 = (x, y) => console.log(x, y); // 只有一个表达式时 可以省略大括号
        let func5 = x => console.log(x); // 只有一个参数时 可以省略括号
        let func6 = (x , y) => x + y; // 仅仅return 一个表达式时，可以省略大括号和 return 关键字


        // 普通函数的 this 是调用时确定的，箭头函数的 this 是定义时确定的。
        // 箭头函数 没有自己的 this，this 的值是外层作用域的 this 的值，在定义时就确定了。
        let obj = {
            name: 'Alice',
            regularFunc: function() {
                console.log(this); // 指向 obj
                console.log(this.name); // Alice
            },
            arrowFunc: () => {
                console.log(this); // 指向全局对象 window
                console.log(this.name); // ''
            }
        };
        obj.regularFunc();
        obj.arrowFunc();

        window.onload = function() {
            // 这使得箭头函数非常适合用作回调函数，尤其是在需要访问外层 this 的时候。
            var div1 = document.getElementById('div1');
            div1.onclick = function(){
                // this 指向 div1 可用于操作div1的样式
                console.log(this); // div1
                this.style.backgroundColor = 'lightcoral'; // this 指向 div1 

                setTimeout(function() {
                    // 因为 setTimeout 属于window对象（全局函数） 所以这里的 this 指向全局对象 window
                    console.log(this); // window
                    // this.style.backgroundColor = 'lightblue'; // this 指向 window 无法操作 div1 的样式
                }, 1000);

                setTimeout(() => {
                    this.style.backgroundColor = 'lightblue'; // this 指向 div1 可以操作 div1 的样式
                }, 2000);
            };
        };
        
        
    </script>
    <style>
        #div1 {
            width: 100px;
            height: 100px;
            background-color: lightblue;
        }
    </style>
</head>
<body>
    <div id="div1"></div>
</body>
</html>
```

### ES6 rest 参数 和 spread 展开

```js
// rest 形参
        let func1 = function(a, b, c, d, ...args) {
            console.log(a, b, c, d);
            console.log(args);
        };
        func1(1, 2, 3, 4, 5, 6, 7);

        // spread 实参数组展开
        let arr = [1, 2, 3];
        let func2 = function(x, y, z) {
            console.log(x, y, z);
        };
        func2(arr); // 1 undefined undefined
        func2(...arr); // 1 2 3
        let func3 = function([x, y, z]) {
            console.log(x, y, z);
        };
        func3(arr); // 1 2 3
        // func3(...arr); // number 1 is not iterable (cannot read property Symbol(Symbol.iterator))

        // spread 数组合并
        let arr1 = [1, 2];
        let arr2 = [3, 4];
        let mergedArr = [...arr1, ...arr2];
        console.log(mergedArr); // [1, 2, 3, 4]

        // spread 对象合并
        let obj1 = { name: 'Alice', age: 30 };
        let obj2 = { city: 'New York', country: 'USA' };
        let mergedObj = { ...obj1, ...obj2 };
        console.log(mergedObj); // { name: 'Alice', age: 30, city: 'New York', country: 'USA' }
```

### ES6 对象创建和拷贝

ES6 中新增了对象创建的语法糖，支持了 class extends constructor 等关键字，让 ES6 的语法和面向对象的语法更加接近。

[4.3 ES6 Class 类 | 菜鸟教程](https://www.runoob.com/w3cnote/es6-class.html)

浅拷贝和深拷贝

```javascript
// 浅拷贝
        let arr1 = [1, 2, 3];
        let arr2 = arr1; // 直接赋值，arr2引用了arr1的内存地址
        arr1[0] = 10;
        console.log(arr2); // [10, 2, 3]


        // 深拷贝
        let arr3 = [1, 2, 3];
        let arr4 = [...arr3]; // 使用扩展运算符创建新数组
        arr3[0] = 10;
        console.log(arr4); // [1, 2, 3]
        let obj1 = { name: 'Alice', age: 30 };
        let obj2 = { ...obj1 }; // 使用扩展运算符创建新对象
        obj1.name = 'Bob';
        console.log(obj2); // { name: 'Alice', age: 30 }
        let obj3 = JSON.parse(JSON.stringify(obj1)); // 使用 JSON 方法进行深拷贝
        obj1.name = 'Charlie';
        console.log(obj3); // { name: 'Bob', age: 30 }

```

### ES6 模块化处理

模块化是一种组织和管理前端代码的方式，将代码拆分成小的模块单元，使得代码更易于维护，扩展和复用。它包括了定义、导出、导入以及管理模块的方法和规范。

前端模块化的主要优势如下:


1. 提高代码可维护性：通过将代码拆分为小的模块单元，使得代码结构更为清晰，可读性更高，便于开发者阅读和维护；
2. 提高代码可复用性：通过将重复使用的代码变成可复用的模块，减少代码重复率，降低开发成本；
3. 提高代码可扩展性：通过模块化来实现代码的松耦合，便于更改和替换模块，从而方便地扩展功能；

目前，前端模块化有多种规范和实现，包括 CommonJS、AMD 和 ES6 模块化。ES6 模块化是 JavaScript 语言的模块标准，使用 import 和 export 关键字来实现模块的导入和导出。现在，大部分浏览器都已经原生支持 ES6 模块化，因此它成为了最为广泛使用的前端模块化标准.。

开启支持

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- type = "module"  使浏览器支持 ES6 模块化管理-->
    <script type="module" src="./modules/app.js"></script>
</head>
<body>
    
</body>
</html>
```

ES6 模块化的暴露方式：

1. 分别导出；

   ```js
   // module1.js
   // 分别暴露
   export const PI = 3.1415926;
   
   const E = 2.718281828;
   
   export function area(r) {
       return PI * r * r;
   }
   ```

2. 统一导出；

   ```js
   // module2.js
   // 统一暴露
   const PI = 3.1415926;
   
   const E = 2.718281828;
   
   function area(r) {
       return PI * r * r;
   }
   
   export { E, area };
   ```

3. 默认导出；

   ```js
   // 默认暴露
   const PI = 3.1415926;
   
   const E = 2.718281828;
   
   function area(r) {
       return PI * r * r;
   }
   
   // export default 只能有一个
   // 假设默认暴露一个
   export default {
       PI
   };
   
   // 全暴露
   export {
       PI,
       E,
       area
   };
   ```

> ES6 中无论以何种方式导出，导出的都是一个对象，导出的内容都可以理解为是向这个对象中添加属性或者方法！！！

导入

```js
// 导入模块的所有暴露
import * as module1 from './module1.js';

console.log(module1.PI);
console.log(module1.E); // undefined
console.log(module1.area(2));


// 解构赋值导入模块的部分暴露
import { E, area } from './module2.js';
console.log(E);
console.log(area(2));

// 导入模块的默认暴露
import module3 from './module3.js';
console.log(module3.PI); // 可导出
console.log(module3.E); // undefined
console.log(module3.area(2)); // not a function
```

