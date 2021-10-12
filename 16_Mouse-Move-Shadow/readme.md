> 2021/10/12

![在这里插入图片描述](https://img-blog.csdnimg.cn/0520dd5aebf442998b5c9a903d429466.png)

# 我的学习感悟

- 很好玩的一个小demo 通过监听鼠标的移动 对四个方向上文字的阴影进行设置 （可以看到就是上面的四种颜色）

- 又复习了一遍解构赋值~

  ```js
  const {offsetX: x, offsetY: y} = e;// 把事件对象e的X坐标赋给x Yz
  ```

- `offsetWidth`实际获取的是盒模型的宽度(width+border + padding)

- `e.offsetX` 获取对应对象的屏幕X坐标数值 本例中 用于获取鼠标现在的x坐标

# 16 - Mouse Move Shadow 前辈笔记01

>首次上傳：2017/10/02

## **主題**
透過textShadow讓文字的陰影隨滑鼠位置偏移，  
並稍微帶到ES6的解構賦值的用法。  
[[BLOG]](https://guahsu.io/2017/10/JavaScript30-16-Mouse-Move-Shadow/)  
[[DEMO]](http://guahsu.io/JavaScript30/16_Mouse-Move-Shadow/index-GuaHsu.html)  

## **步驟**
### Step1. 設定目標區域與基本偏移量
1. 抓取HTML中的`hero`與`text`做為目標區域
2. 設定基本偏移基準`walk = 100`

### Step2. 建立觸發條件與事件
1. 設定`hero.addEventListener('mousemove', shadow)`
2. 觸發事件備註：
```javascript
function shadow(e) {
  // 透過解構賦值取得並設定資訊
  const { offsetHeight: height,
          offsetWidth: width } = hero;
  let { offsetX: x,
        offsetY: y  } = e;
  // 如果在目標區域外，則在加上目標座標值
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  // 四捨五入最終偏移值
  const xWalk = Math.round((x / width * walk) - (walk/2));
  const yWalk = Math.round((y / height * walk) - (walk/2));
  console.log(xWalk, yWalk);
  // 使用textShadow來設定文字陰影
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0px rgba(0, 0, 0, 0.5),
    ${xWalk * -1}px ${yWalk}px 0px rgba(0, 0, 0, 0.5),
    ${yWalk}px ${xWalk * -1}px 0px rgba(0, 0, 0, 0.5),
    ${yWalk * -1}px ${xWalk}px 0px rgba(0, 0, 0, 0.5)
    `
}
```

## **Javascript語法&備註**
**解構賦值(Destructuring assignment)**
透過解構賦值，可以把直接把物件/陣列中的值塞入變數中，  
擷取一小段程式碼做說明：
```javascript
// 下面這段等同於 const height = hero.offsetHeight;
const { offsetHeight: height } = hero;
// 下面這段等同於 let x = e.offsetX;
let { offsetX: x } = e;
```
>參閱:[MDN-Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
關於解構賦值對我來說目前還是需要很用力的去閱讀才能讀懂，  
雖然可以簡寫並縮短不少程式碼，但使用上滿不直覺的，  
所以我自己目前還是會用舊的賦值寫法多，努力中。

**Math.round**
可以將內容的數值進行四捨五入的動作。
>參閱:[MDN-Math.round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

## **CSS語法備註**
```css
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black;
```
>參閱:[MDN-text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)



# 16 文字阴影的鼠标随动效果

> 本篇作者：©[大史不说话](https://github.com/dashnowords)——Chinasoft Frontend Web Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 16 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-08-20    
> 最后更新：2017-08-21

## 挑战任务

   初始文件`index-start.html`中提供了一个包含了`h1`元素的`div`元素，`h1`元素已经设置了`text-Shadow`的样式。本次编程挑战中需要完成的效果是根据用户当前的鼠标位置来操纵文字阴影的位置。

## 实现效果

![结果展示](https://github.com/dashnowords/JavaScript30/blob/master/16%20-%20Mouse%20Move%20Shadow/effects.png)

## 基本知识

`text-shadow`样式为标准CSS3样式，用于添加**一个或多个**文字阴影，用于其的语法格式为：

```css
text-shadow: h-shadow v-shadow blur color

```

## 过程指南

1.在`script`标签中，我们使用3个变量，一个指向`div`元素，一个指向其子元素`h1`，最后一个变量`factor`用于标记阴影距离`h1`中心的距离和鼠标距离`h1`中心距离的比例，用于计算阴影的具体位置。

2.在`hero`元素上监听鼠标移动事件`mousemove`，并添加事件处理的回调函数`shadowMove`.

```js
hero.addEventListener('mousemove',shadowMove);
```

3.为获得第一个阴影的瞬时位置，需要通过鼠标位置距离`h1`中心的距离乘以`factor`系数来获得，`pos`表示鼠标当前位置的坐标,range指代`hero`元素的宽和高：

```js
    var disX = parseInt((pos.x-range.x/2)*factor);
    var disY = parseInt((pos.y-range.y/2)*factor);
```

4.从事件发生的event对象中获取需要的值：

```js
    var range = {
      x:hero.offsetWidth,
      y:hero.offsetHeight
    }
    var pos = {
      x:e.target.offsetLeft+e.offsetX,
      y:e.target.offsetTop+e.offsetY
    }
```

5.计算出`h1`元素第一个阴影位置后，可以以坐标镜像或旋转90°等不同的方式来生成其他阴影，本例中我们采用绕`h1`元素中心旋转90°的方式共生成4个阴影：

```js
  text.style.textShadow = `
      ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
      ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
      ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
      ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `;
```

