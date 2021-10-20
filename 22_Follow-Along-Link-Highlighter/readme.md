> 21/10/20

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5c1feadb31e4b60ba10a696a01f5a38.png)

> 完成如下动画效果：
>
> - 鼠标移动到对应标签时，为其添加白色背景框
>   - 鼠标移动到其他标签时白色背景框不消失而是直接跟着鼠标平移至新标签

# 我的学习感悟

- DOM操作是非常重要的呐！好多看起来很棒的效果都需要我们使用JS操作
- 感觉这些简单的“动态效果”都是三步走
  - 获取DOM元素
  - 写回调函数
    - 回调函数中一般还会细化地获取一些元素 便于进行操作
  - 监听事件并调用回调函数，实现效果

> - `Element.getBoundingClientRect()`   方法返回元素的大小及其相对于视口的位置。   
>
>   返回值是一个`DOMRect`对象，这个对象是由该元素的`getClientRects()`方法返回的一组矩形的集合, 即：是与该元素相关的CSS边框集合。
>
>   `DOMRect` 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。   
>
>   `DOMRect`相关属性: 
>
>   | Attribute | Type  | Description                                                  |
>   | --------- | ----- | ------------------------------------------------------------ |
>   | bottom    | float | Y 轴，相对于视口原点（viewport origin）矩形盒子的底部。只读。 |
>   | height    | float | 矩形盒子的高度（等同于 bottom 减 top）。只读。               |
>   | left      | float | X 轴，相对于视口原点（viewport origin）矩形盒子的左侧。只读。 |
>   | right     | float | X 轴，相对于视口原点（viewport origin）矩形盒子的右侧。只读。 |
>   | top       | float | Y 轴，相对于视口原点（viewport origin）矩形盒子的顶部。只读。 |
>   | width     | float | 矩形盒子的宽度（等同于 right 减 left）。只读。               |
>   | x         | float | X轴横坐标，矩形盒子左边相对于视口原点（viewport origin）的距离。只读。 |
>   | y         | float | Y轴纵坐标，矩形盒子顶部相对于视口原点（viewport origin）的距离。只读。 |

# 22 - Follow Along Link Highlighter

![](https://guahsu.io/2017/10/JavaScript30-22-Follow-Along-Link-Highlighter/demo22.gif)

## **主題**
透過`getBoundingClientRect`與CSS的`transform`來達到HightLight樣式會跟著指定位置移動的效果。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-22-Follow-Along-Link-Highlighter)  
[[DEMO]](http://guahsu.io/JavaScript30/22_Follow-Along-Link-Highlighter/index-GuaHsu.html)  

## **步驟**
### Step1. 取得頁面元素
```javascript
// 取得HTML中所有的a元素
const triggers = document.querySelectorAll('a');
// 建立一個span來放置highlight效果
const highlight = document.createElement('span');
highlight.classList.add('highlight');
// 將建立的span加到頁面中
document.body.append(highlight);
```

### Step2. 撰寫移入狀態
用以下的JS對目標(a連結)定位並設定樣式
```javascript
// 效果
function highlightLink() {
  // 取得this(由a.addEventListener傳入，所以會是該a)的資訊
  const linkCoords = this.getBoundingClientRect();
  // 建立一個coords物件來存放會使用的寬高與定位資訊
  const cords = {
    width: linkCoords.width,
    height: linkCoords.height,
    left: linkCoords.left + window.scrollX,
    top: linkCoords.top + window.scrollY
  }
  // 設定highlight效果的寬高及定位
  highlight.style.width = `${cords.width}px`;
  highlight.style.height = `${cords.height}px`;
  highlight.style.transform = `translate(${cords.left}px, ${cords.top}px`;
}

// 監聽所有a元素的滑鼠移入，觸發highlightLink
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
```
位移的效果主要來自已經寫好的css與js裡面重新定位的`translate`
```css
.highlight {
  transition: all 0.2s;
  border-bottom:2px solid white;
  position: absolute;
  top:0;
  background:white;
  left:0;
  z-index: -1;
  border-radius:20px;
  display: block;
  box-shadow: 0 0 10px rgba(0,0,0,0.2)
}
```

## **語法&備註**
### **Element.getBoundingClientRect()**
返回目標元素的大小與相對於瀏覽器視窗的位置資訊

>參閱：[MDN-Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)



# 22 Follow Along Link Highliter 中文指南

> 本篇作者：©[大史不说话](https://github.com/dashnowords)——Chinasoft Frontend Web Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 22 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-09-12    
> 最后更新：2017-09-16

## 挑战任务

初始文档`index-start.html`提供了一组使用`<ul>`及`<li>`标签包裹的导航标签。本次的编程挑战任务是完成如下动画效果：当鼠标移动至某个对应标签上时，为标签添加一个白色的背景框，高亮表示该标签被选中，当鼠标移动至其他标签后，白色背景框不消失，而是直接跟随鼠标平移至新的标签，实现效果见下图展示。

## 实现效果

![结果展示](https://github.com/soyaine/JavaScript30/blob/master/22%20-%20Follow%20Along%20Link%20Highlighter/effects.gif)


## 相关知识

`Element.getBoundingClientRect()`   
Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。   
返回值是一个`DOMRect`对象，这个对象是由该元素的`getClientRects()`方法返回的一组矩形的集合, 即：是与该元素相关的CSS边框集合。`DOMRect` 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。   
DOMRect相关属性: 

| Attribute | Type  | Description                                                  |
| --------- | ----- | ------------------------------------------------------------ |
| bottom    | float | Y 轴，相对于视口原点（viewport origin）矩形盒子的底部。只读。 |
| height    | float | 矩形盒子的高度（等同于 bottom 减 top）。只读。               |
| left      | float | X 轴，相对于视口原点（viewport origin）矩形盒子的左侧。只读。 |
| right     | float | X 轴，相对于视口原点（viewport origin）矩形盒子的右侧。只读。 |
| top       | float | Y 轴，相对于视口原点（viewport origin）矩形盒子的顶部。只读。 |
| width     | float | 矩形盒子的宽度（等同于 right 减 left）。只读。               |
| x         | float | X轴横坐标，矩形盒子左边相对于视口原点（viewport origin）的距离。只读。 |
| y         | float | Y轴纵坐标，矩形盒子顶部相对于视口原点（viewport origin）的距离。只读。 |

## 编程思路

1.生成一个绝对定位的块元素，在后续改变其`top`及`left`坐标值移动至对应标签处，来呈现不同标签被激活的效果;    
2.鼠标移动至`<li>`标签后，使用`Element.getBoundingClientRect()方法`获得该标签的位置信息;    
3.将获得的`<li>`的`top`及`left`值赋给绝对定位块元素，使其移动至被激活的标签，位于标签文字下方。   

## 过程指南

> 这位前辈这个demo的效果木有做出来欸！只有标题的效果 正文没做出来的说~

1.生成绝对定位块元素

```js
  var activeBackground = document.createElement('span');
  activeBackground.setAttribute('class','highlight');
  document.body.appendChild(activeBackground);

  //避免第一次激活时跳动,如果没有此句，可以看到第一次标签被激活时，块元素会从左上角移动至对应标签处。
  activeBackground.style.display = 'none';
```

2.使用`Element.getBoundingClientRect()方法`获得对应标签的位置信息

```js
 function lightOn(e){
    var activeLink = e.target.getBoundingClientRect();
    var coords = {
      height:activeLink.height,
      width:activeLink.width,
      left:window.pageXOffset + activeLink.left,
      top: window.pageYOffset + activeLink.top
    }
   activeBackground.style.height = `${coords.height}px`;
   activeBackground.style.width = `${coords.width}px`;
   activeBackground.style.left = `${coords.left}px`;
   activeBackground.style.top = `${coords.top}px`;
   activeBackground.style.display = 'inline';
}
```

3.将点亮函数与标签的鼠标移入事件绑定

```js
      //监听鼠标移入事件及鼠标移出事件
      for(var i = 0; i < len; i++){
        oLi[i].onmouseenter = lightOn;
      }
```

