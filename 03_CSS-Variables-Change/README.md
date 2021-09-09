![在这里插入图片描述](https://img-blog.csdnimg.cn/116c73d90dfe4623bbd1b2acba34d1b5.png)

# 我的心得

- CSS的样式是如何变化的 这里的知识点没太搞懂 比较像sass 但是这部分还没有学习

```css
:root{
    --base: #ffc600;
    --spacing: 10px;
    --blur: 10px;
    --grayscale: 0%;
}
img{
    padding: var(--spacing);/* 加边框 */
    background: var(--base);/* 加图片 */
    filter: blur(var(--blur)) grayscale(var(--grayscale));/* 滤镜功能 */
    /* 因为选取的图片忒大了 缩了一下尺寸~ */
    width: 66%;
}
.h1 {
    color: var(--base);
}
```



- `addEventListener`

用了挺多次了——

为元素添加事件

这里运用的是 监测鼠标的移动

```js
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));//用于感应拖动条 获得更新的值
```

第一句没太弄懂是干啥的。

第二句应该是感应鼠标移动的

- 用于改变CSS样式的语句

`style.setProperty()`

等同於`style.cssPropertyName`

```js
style.setProperty('padding', '15px');
/* 等同於 */
style.padding = '15px';
```

但在實際應用中，前者的做法會**很方便帶參數進去**。

> 參照:[MDN-setProperty](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)







# 前辈的笔记

## **主題**

用JS與CSS搭配製作一個即時的濾淨效果， 特效為調整內距、模糊、邊框色。
[[BLOG\]](https://guahsu.io/2017/05/JavaScript30-03-CSS-Variables/)
[[DEMO\]](https://guahsu.github.io/JavaScript30/03_CSS-Variables/index-GuaHsu.html)

## **步驟**

#### Step1

利用CSS variable來定義CSS的變數(有點像sass的感覺)

#### Step2

利用addEventLinstener來綁HTML的控制桿，
並更新值到CSS變數中來達到即時調整的效果。

## **Javascript語法&備註**

### **dataset**

用`dataset`可以取出對象的`data-*`屬性，也等同於`getAttribute`

```
<div id="test" data-no="123"></div>
document.querySelector('#test').dataset.no // 輸出123
document.querySelector('#test ').getAttribute('data-no'); // 輸出123
```

### **style.setProperty()**

等同於style.cssPropertyName

```
style.setProperty('padding', '15px');
/* 等同於 */
style.padding = '15px';
```

但在實際應用中，前者的做法會很方便帶參數進去。

> 參照:[MDN-setProperty](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)

## **CSS語法&備註**

### **filter:blur()**

CSS3的濾鏡功能，blur是高斯模糊，參數越高越模糊。

> 參照:[MDN-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

## 探索

依樣畫葫蘆的新增了`grayscale()`的效果，
在CSS中要使用兩個以上的濾鏡效果寫再一起就好，
如果分開來的話會變成覆蓋：

```css
/* 這樣會變成覆蓋，剩下garyscale的效果 */
img {
    filter: blur(10px);
    filter: grayscale(10%);
}
/* 寫在同一處，才能吃到兩個效果 */
img {
    filter: blur(10px) grayscale(10%);
}
```