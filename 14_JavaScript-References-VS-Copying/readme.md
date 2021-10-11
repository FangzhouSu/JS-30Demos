> 2021-10-10

![在这里插入图片描述](https://img-blog.csdnimg.cn/0d58cec98edf44c3813022dabfa70544.png)

补充一下深拷贝、浅拷贝的内容

![在这里插入图片描述](https://img-blog.csdnimg.cn/eaddb1bb15ca4d588c17aedb1ed6029a.png)

# 我的学习感悟

- 学习感悟基本都在上图了~
- 介绍了几种 **复制对象的内容但是不会获取原对象的引用（地址值）** 的方法
  - 数组
    - `arr.splice()`
    - `[].concat(arr)`
    - `[…arr]`
    - `Array.from(arr)`
  - 对象
    - `Object.assign({}, obj, {基于obj对象新增添的属性:值})`
    - `JSON.parse(JSON.stringify(obj))`

- 了解了 赋值、浅拷贝、深拷贝的区别

  - [这篇文章](https://www.jianshu.com/p/56598f2ac42e)写得不错——

  ![img](https://upload-images.jianshu.io/upload_images/15856169-26e2e4a0fc8a39b4.png?imageMogr2/auto-orient/strip|imageView2/2/w/310/format/webp)

  - 赋值、深拷贝、浅拷贝三者的区别

  ![img](https://upload-images.jianshu.io/upload_images/15856169-88bd5975eafaa488.png?imageMogr2/auto-orient/strip|imageView2/2/w/600/format/webp)

  - 来看个例子

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/eaddb1bb15ca4d588c17aedb1ed6029a.png)

- 有感而发 去中文指南那里pr了一下

![在这里插入图片描述](https://img-blog.csdnimg.cn/34fe334b6c5b483b8be056742952ef62.png)



# 14 - JavaScript References VS Copying 前辈笔记01

>首次上傳：2017/08/26

## **主題**
介紹JavaScript中陣列與物件的引用(refrence)及複製(Copying)。

[[BLOG]](https://guahsu.io/2017/08/JavaScript30-14-JavaScript-References-VS-Copying/)  
[[DEMO]](http://guahsu.io/JavaScript30/14_JavaScript-References-VS-Copying/index-GuaHsu.html)  

## **步驟**
### Step1. 原始型別
JavaScript中的原始型別(Primitive Type)：  
1. String
2. Number
3. Boolean
4. Null
5. Undefine

### Step2. 物件型別
JavaScript中的物件型別(Object Type)：  
1. 使用者自訂的物件 - `var obj = {}`
2. 內建的物件型別 - Array, Date, Math, RegExp ..  
對，`Array`也是個物件。

````javascript
// JS的陣列中可以使用物件的字串用法
var arr = ['a', 'b', 'c'];
console.log(arr[0]); // 'a'
console.log(arr['0']); // 'a'

// JS的陣列也可以塞屬性
arr.test = function() { return 'Hi'; };
arr.test(); // 'Hi'

typeof(arr); // 'object'
````

### Step3. Call by value
原始型別都是Call by value，當複製時不影響彼此，  
如以下範例（上述個原始型別皆是）：
````javascript
var a = 'a';
var b = a;
console.log(a, b); // a a
b = 'b';
console.log(a, b); // a b
````
最初的`b = a`使`b`指向與`a`同一個記憶體位置(存放字串a)，  
而當`b = 'b'`時，b建立了一個記憶體位置存放字串b，並指向該位置。

### Step4. Call by refrence
當物件型別被複製使用時，是會被彼此改變的  
如以下範例：
````javascript
// Array
var arr = ['a', 'b'];
var arr2 = arr;
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'c'] ['a', 'c']

// Object
var obj = { a: 1, b: 2 };
var obj2 = obj;
console.log(obj, obj2);// { a: 1, b: 2 } { a: 1, b: 2 }
obj2.b = 3;
console.log(obj, obj2);// { a: 1, b: 3 } { a: 1, b: 3 }
````
以陣列為例，當最初的`arr2 = arr`時，  
`arr2`指向與`arr`同個記憶體位置(存放陣列['a', 'b'])，  
但在`arr2[1] = 'c'`時，`arr2`仍指著與`arr`同個位置，  
所以當改變了索引[1]的值時，`arr`及`arr2`的索引[1]都被變更了。  

### Step5. 陣列的複製
為了避免Call by refrence時會去異動到原本的陣列，  
就要先把原本的陣列做一次複製，用剛才的範例來做，  
有以下幾種方法：
**Array.prototype.Slice()**
如果直接使用`slice()`不指定起始與結束位置的話，  
就等於直接複製整個整列：  
````javascript
var arr = ['a', 'b'];
var arr2 = arr.slice();
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']
````
>參閱：[MDN-Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

**Array.prototype.concat()**
使用`concat()`可以合併陣列，所以如果使用空陣列來合併原陣列，  
也會達到複製整個陣列的效果：
````javascript
var arr = ['a', 'b'];
var arr2 = [].concat(arr);
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']
````
>參閱：[MDN-Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

**Spread syntax**
ES6的`Spread`語法，直接使用於複製方法如下：
````javascript
var arr = ['a', 'b'];
var arr2 = [...arr];
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']
````
>參閱：[MDN-Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

**Array.from()**
同為ES6的`Array.from()`也可以快速達到複製的效果：

````javascript
var arr = ['a', 'b'];
var arr2 = Array.from(arr);
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']
````
>參閱：[MDN-Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### Step6. 物件的複製
同樣的，物件也會有call by refrence的特性，  
所以與陣列相同，使用之前的範例來做物件的複製：

**Object.assign()**
使用`Object.assign()`來做，指定一個空的物件並把目標對象塞進去就好了：
````javascript
var obj = { a: 1, b: 2 };
var obj2 = Object.assign({}, obj);
console.log(obj, obj2);// { a: 1, b: 2 } { a: 1, b: 2 }
obj2.b = 3;
console.log(obj, obj2);// { a: 1, b: 3 } { a: 1, b: 3 }
````

>參閱：[MDN-Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

### Step7. JSON.parse * JSON.stringify
利用`JSON.parse * JSON.stringify`來把目標對象作轉換賦值的動作，
不論目標對象是什麼型別，都可以用這招來做複製：
````javascript
//Array
var arr = ['a', 'b'];
var arr2 = JSON.parse(JSON.stringify(arr));
console.log(arr, arr2);// ['a', 'b'] ['a', 'b']
arr2[1] = 'c';
console.log(arr, arr2);// ['a', 'b'] ['a', 'c']

//Object
var obj = { a: 1, b: 2 };
var obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj, obj2);// { a: 1, b: 2 } { a: 1, b: 2 }
obj2.b = 3;
console.log(obj, obj2);// { a: 1, b: 3 } { a: 1, b: 3 }
````





# 14 JS中的引用与复制 前辈笔记02

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 14 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-07-19    
> 最后更新：2018-12-05

## 实现效果

这个部分主要是帮助你通过不同的语句来感受在 JavaScript 中对不同类型数据的引用（Reference）和复制（Copy）的区别。由于操作在 Console 中进行，所以请直接运行页面后打开 Console，边编辑代码，边查看结果。

## 过程指南

1. 首先从 String、Number、Boolean 类型的值开始。

   ```js
   let age = 100;
   let age2 = age;
   console.log(age, age2); // 100 100
   age = 200;
   console.log(age, age2); // 200 100
   ```

   先声明了一个 Number 型的变量 `age`，并将此变量赋值给另一个变量 `age2`，这时两个变量的值都是 100。
   然后赋给 `age` 新的值，可见对 `age` 的修改并不会对 `age2` 造成影响。

2. 那对于数组来说，情况是否一样呢？下面我们来看看数组。

   ```js
   const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
   const team = players;
   console.log(players, team);
   ```

   延续上面的思路，先声明一个数组 `players`，并将其赋值给 `team`。试想一下，如果需要修改 `team` 中的值，我们可以如何操作？或许可以这样？

   ```js
   team[3] = 'Lux';
   ```

   来看看发生了什么。

   ```js
   console.log(players, team); 
   // ["Wes", "Sarah", "Ryan", "Lux"] ["Wes", "Sarah", "Ryan", "Lux"]
   ```

   WOW 原数组 `plaryers` 也被修改了。为什么会这样？因为 `team` 只是这个数组的引用，并不是它的复制。`team` 和 `players` 这两个变量指向的是同一个数组。  
   所以如何解决这个问题？接下来我们开始真正的复制吧！

    - **方法一 [`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)** 

      由于运行 `slice` 得到的结果是一个对原数组的浅拷贝，原数组不会被修改。所以如果修改这两个数组中任意 一个，另一个都不会受到影响。

      ```js
      const team2 = players.slice();
      team2[3] = 'Lux2';
      console.log(players, team2); 
      ```

    - **方法二 [`Array.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)**

      `concat()` 方法是用来合并数组的，它也不会更改原有的数组，而是返回一个新数组，所以可以将 `players` 数组与一个空数组合并，得到的结果就符合预期了。

      ```js
      const team3 = [].concat(players);
      team3[3] = 'Lux3';
      console.log(players, team3); 
      ```

    - **方法三 ES6 [扩展语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)**

      扩展语法可以像扩展参数列表一样来扩展数组，效果与上述方法类似，但比较简洁。

      ```js
      const team4 = [...players];
      team4[3] = 'Lux4';
      console.log(players, team4);
      ```

    - **方法四 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)**

      此外使用 Array 创建新的数组实例的方法也是可行的。

      ```js
      const team5 = Array.from(players);
      team5[3] = 'Lux5';
      console.log(players, team5);
      ```

   除此之外，还可以用 `push` 这样的方法。数组部分已经介绍完毕，下面我们进入 Object 类型数据的试验吧~

3. 对于 Object 数据，我们用一个 `person` 对象来试试。

   先声明对象：

   ```js
   const person = {
      name: 'Wes Bos',
      age: 80
    };
   ```

   然后思考一下如何可以取得它的复制，试试想当然的做法：

   ```js
   const captain = person;
   captain.number = 99;
   console.log(person, captain);
   // Object {name: "Wes Bos", age: 80, number: 99} 
   // Object {name: "Wes Bos", age: 80, number: 99}
   ```

   这样好像行不通，`person` 的值也被更改了，那该如何才能真正复制呢？

   - **方法一 [`Object.assign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)**

     使用 `Object.assign(target, ...sources)` 时，后来的源对象的属性值，将会覆盖它之前的对象的属性。所以可以先复制 `person` 之后，再赋给属性新的值。

     需要注意的是：这个例子里面，我们用的数组和对象都只是一层嵌套，Lodash 有一个深度复制的方法，但使用之前需要多考虑一下。

     ```js
     const cap2 = Object.assign({}, person, { number: 99, age: 12 });
     console.log(cap2); // Object {name: "Wes Bos", age: 12, number: 99}
     ```

   - **方法二 JSON 转换**

     利用 JSON 可以先将对象转成字符串的格式，然后再把它转成 JSON，从而实现复制。

     ```js
     const wes = {
       name: 'Wes',
       age: 100,
       social: {
         twitter: '@wesbos',
         facebook: 'wesbos.developer'
       }
     };
     
     const dev = Object.assign({}, wes);
     const dev2 = JSON.parse(JSON.stringify(wes));
     console.log(wes);
     console.log(dev);
     console.log(dev2);
     ```


OVER~\(^o^)/~

















