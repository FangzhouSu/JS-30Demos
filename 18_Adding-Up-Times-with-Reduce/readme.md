> 10/14（一不小心跳了一个demo😂）

[效果展示](https://fangzhousu.github.io/JS-30Demos/18_Adding-Up-Times-with-Reduce/index-billSu.html)

![在这里插入图片描述](https://img-blog.csdnimg.cn/b038a7ea0ea84417918ab637930bc04c.png)

# 我的学习感悟

- 第一反应是，这个想法好像可以应用在写视频相关的脚本上？统计一下b站上的视频看到66集时过去了多少分钟，后面还有多少分钟
  - 只需要获得时间即可~

- 我愿称这个demo为 **map、reduce方法结合解构赋值** 的最佳实践！

  - `map()` 方法创建一个新数组，其结果是该数组中的每个元素是**调用一次提供的函数**后的返回值
  - `.reduce((total, seconds) => total + seconds);`归并求和
  - `const [mins, secs] = timeCode.split(':').map(x => parseFloat(x));`解构赋值结合map方法，好使！

- 另外本例中对一个数组的连续性操作得到一个数的操作也很优雅！

  - ```js
    const seconds = timeNodes
    	.map(node => node.dataset.time)
    	.map(timeCode => {
            const [min, secs] = timeCode.split(':').map(parseFloat);
            return min*60+secs;
        })
    	.reduce((total, seconds) => total + seconds)
    ```

- 复习了下两个parse的用法

  - `parseInt` 

  `parseInt`函数将其第一个参数转换为一个字符串，对该字符串**进行解析**，然后返回一个整数或 `NaN`。

  > 注意如果第一个参数从左到右数，遇到字符就会舍弃字符+字符后面的内容
  >
  > ```js
  > parseInt('00x1111', 2);// 0
  > parseInt('0011x11', 2);// 3
  > ```

  ```js
  parseInt('123xxx', 5) // 先把'123xxx'转换为'123' 将'123'看作5进制数，返回十进制数38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
  ```

  - `parseFloat`

  **`parseFloat()`** 函数解析一个参数（必要时先转换为字符串）并返回一个浮点数。

  ```js
  parseFloat('5556.6www');// 5556.6
  ```

  

  - 有趣的一个用法

  ```js
  var a = ["88","66"];
  // 将a数组转换为数值型可以简单地这样做
  a.map(parseFloat);// [88,66]这里其实我也不知道为啥可以XD
  //a.map(parseInt) 返回就是 [88,NaN]🥺
  
  // 也可以常规一些~
  a.map(x => parseInt(x));// .map(x => parseFloat(x))
  ```

  

  

# 18 - Adding Up Times with Reduce 前辈笔记01

>首次上傳：2017/10/05

## **主題**
利用`map()`與`reduce()`來取得播放清單的總秒數。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-18-Adding-Up-Times-with-Reduce/)  
[[DEMO]](http://guahsu.io/JavaScript30/18_Adding-Up-Times-with-Reduce/index-GuaHsu.html)  

## **步驟**
### Step1. 取得全部的時間值
在HTML中，時間資訊放在`<li data-time>`中，  
所以透過`querySelectorAll`來取得，  
因為接著會使用`map`及`reduce`操作，  
資料型態必須先轉為Array。
```javascript
// 透過Array.from或是[...]來將querySelectorAll取回的NodeList轉Array
const timeNodes = Array.from(document.querySelectorAll('[data-time'));
```

### Step2. 將取回的資料轉為秒數並加總
```javascript
const seconds = timeNodes
      // 取出每個元素中的data-time資料
      .map(node => node.dataset.time)
      .map(timeCode => {
        // 用解構賦值的方式分別取出split(':')後的分與秒
        // 再透過一個map執行parseFloat將字串轉數值
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        // 回傳這組資料轉換後的總秒數
        return (mins * 60) + secs;
      })
      // 用reduce來加總每次執行結果
      .reduce((total, seconds) => total + seconds);
```

### Step3. 把總秒數轉為時分秒格式
```javascript
// 利用取得的總秒數來進行總共時分秒的計算
// 使用Math.floor取整數，再利用%來操作餘數
let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
```

### Step4. 印出結果
```javascript
console.log(`${hours}:${mins}:${secondsLeft}`);
```

## 其他
這篇也算是之前學習的再次運用，  
比較特別的是發現map中可以直接使用function！
```javascript
const [mins, secs] = timeCode.split(':').map(parseFloat);
//等同於
const [mins, secs] = timeCode.split(':').map(function(str){
    return parseFloat(str);
});
```



# 18 使用reduce进行时间累加 前辈笔记02

> 本篇作者：©[大史不说话](https://github.com/dashnowords)——Chinasoft Frontend Web Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 18 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-08-25    
> 最后更新：2017-08-29

## 挑战任务

   初始文件`index-start.html`中提供了一个包含多个列表项的无序列表元素，每一个列表项均添加了`data-time`属性，该属性用**分**和**秒**表示了时间。要求将所有的时间累加在一起，并用`时:分:秒`来表示计算的结果。

## 实现效果

![结果展示](https://github.com/soyaine/JavaScript30/blob/master/18%20-%20AddingUpTimesWithReduce/effects.png)

## 基本思路

1.取得所有`li`中`data-time`属性的值，将时间换算为秒并累加求得总时间（单位：秒）;<br>
2.手动计算将总时间转化为新的格式“XX小时XX分XX秒”;<br>
3.将结果显示在页面上。

## 过程指南(以非ES6版本为例)

1.取得所有`li`标签

```js
var oLi = document.getElementsByTagName('li');
```

2.遍历`li`元素节点，取得每个`data-time`的值并以：为界将其分解为含有两个元素的数组,每个数组中含有两项，第一项为表示分钟的字符串，第二项为表示秒的字符串，将两者进行运算转化为表示秒的数字，并添加进新的数组。

```js
    for( var i = 0, len = oLi.length; i < len; i++){
      var timeItem = oLi[i].dataset['time'].split(':');
      //将时间转换为秒
      times.push(parseInt(timeItem[0],10)*60+parseInt(timeItem[1],10));
    }
```

3.将新数组`times`中各项累加

```js
//方法1.因为times为数组类型，故可以直接使用reduce函数进行累加
    return times.reduce(function(a,b){
      return a+b;
    },0);
//方法2.不熟悉reduce函数的也可通过for循环遍历数组各项进行结果累加
```

4.总时间格式转换

```js
    //总时间对60取余即为不足1分钟的秒数
    var sec = seconds % 60;
    //总时间除以3600并向下取整为小时数
    var hour = Math.floor(seconds/3600);
    //总时间减去前两项即可获得分钟数
    var min = (seconds - 3600*hour - sec)/60;
```

5.将结果打印在界面上即可
