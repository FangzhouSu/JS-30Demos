> 21/10/13

![在这里插入图片描述](https://img-blog.csdnimg.cn/9eacab29cd4944178ddf2bc4f8cf21f8.png)



# 我的学习感悟

- 很简单的一个demo
  - 去除数组元素的某部分（使用正则表达式）并从小排列到大 A - Z 也就是ASCII码从小到大的顺序
- 复习了一些数组的API
  - `.sort((a,b) => func(a) > func(b) > 1 : -1)` a大 则返回1 a排在b后面
  - `.map()`创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数后的返回值。
    - 简单举例`arr = [1,2,3]` `arr.map(item => item*2)` 返回`[2,4,6]`
    - 经典案例 `new Array(6).fill(0).map(() => new Array(8).fill(0))` 6行8列的二维数组
  - `join('')` 数组转字符串
- 正则表达式回头还得学！不老会的啊😂

# 17 - Sort Without Articles 前辈笔记01

>首次上傳：2017/10/04

## **主題**
介紹如何將陣列在排除部分文字的情況下排序。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-17-Sort-Without-Articles/)  
[[DEMO]](http://guahsu.io/JavaScript30/17_Sort-Without-Articles/index-GuaHsu.html)  

## **步驟**
### Step1. 建立篩選的function
使用`replace`搭配正規表示式來將包含了`a, the, an`開頭的文字替換為空白。
```javascript
function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}
```

### Step2. 對目標陣列進行篩選與排序
這裡將原本的寫法與簡寫放在一起，可以發現整體簡潔不少。
```javascript
//原本的寫法
const sortedBands = bands.sort(function(a, b){
    if(strip(a) > strip(b)) {
        return 1;
    }else {
        return -1;
    }
})
//利用箭頭函數與三元運算式的簡寫：
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b)) ? 1 : -1);
```

### Step3. 把排序完的渲染到HTML中
使用`map`與`join`來組成`<li>`元素放置
```javascript
document.querySelector('#bands').innerHTML = 
      sortedBands.map(band => `<li>${band}</li>`).join('');
```
>使用join('')修改連結符號為空白, 否則原先陣列的分隔符號是`,`也會一併渲染在html中。

## 其他
這篇相對比較簡單一些，  
運用到都是之前有練習過的語法:D



# 17 数组的去前缀排序 前辈笔记02

> 本篇作者：©[大史不说话](https://github.com/dashnowords)——Chinasoft Frontend Web Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 17 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-08-23    
> 最后更新：2017-08-24

## 挑战任务

   初始文件`index-start.html`中提供了一个无序列表元素，并在`script`标签中提供了一个字符串数组。请为这些字符串排序，要求去除字符串中的`The`，`A`以及`An`的前缀后再进行排序，并把排序后的结果作为列表项展示在无序列表中。

## 实现效果

![结果展示](https://github.com/soyaine/JavaScript30/blob/master/17%20-%20Sort%20Without%20Articles/effects.png)

## 基本思路

1.基本的编程任务有两个要点，即**排序**和**展示**;<br>
2.数组排序部分最外层即为`Array.sort(arr)`函数，内层实现具体排序规则;<br>
3.展示部分即将排列好的新数组拼接成带有标签的HTML元素，然后一次性插入到列表中。

## 过程指南(以非ES6版本为例)

1.声明去前缀函数，使用`String.replace()`函数实现，第一参数使用字面量正则表达式。

```js
function delPrefix(item){
    return item.replace(/^(The|A|An)\s{1}/,'');
}
```

2.使用`Array.sort()`对数组进行排序，将数组中逐项使用`delPrefix()`去掉前缀后再进行对比。

```js
var sortedbands = bands.sort(function(a,b){
    return delPrefix(a) > delPrefix(b) ? 1 : -1;
});
```

3.使用选择器选中无序列表`#bands`，将排序后的数组作为列表项插入其中。

```js
 document.getElementById('bands').innerHTML = '<li>'+arr.join('</li><li>')+'</li>';
```

## 细节知识点

1.`Array.prototype.sort(*param*)`方法虽然有返回值，但排序结果也影响原数组，在非ES6版本的代码中，我们使用了指向原数组的变量`bands`,而在ES6版本的代码中将排序后的结果赋值给了新的变量sortedbands，从结果可以看出，两者达到了相同的目的。

2.在ES6版本的代码结尾处，我们修改原数组`bands`中的第一项，并在控制台打印出排序后的数组`sortedbands`，从结果可以看出`sortedbands`也受到了影响，由此可以看出`Array.prototype.sort()`函数只是返回了一个指向原数组的引用，而并没有生成新的数组。
