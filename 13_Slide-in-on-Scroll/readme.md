很有趣的一个demo 

利用滚动事件监听 滑动页面时 对页面中的图片进行判断（是否滑了一半）如果符合要求就将其滑入

滑过这个图片/上移过半后 图片滑出



![在这里插入图片描述](https://img-blog.csdnimg.cn/8d4071ebacfe4cedaa834774f29d09e9.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/cd66abdc3e4442069e27963535bd400a.png)

> 2021-10-9

# 我的学习感悟

- 获取页面中所有图片

  ```html
  <img src="../ByteDance.jpg" width="60%" class="align-right slide-in">
  ```

  ```js
  const slideImages = document.querySelectorAll('.slide-in')
  ```

- 再用forEach对其进行遍历

  ```js
  slideImages.forEach(img => {
      // img为遍历到的所有图片元素
  })
  ```

  

- 了解到了 利用页面中的一些属性达成“判断是否滑过某个元素的某个位置”

  - `window.scrollY `文档在垂直方向已滚动的像素值
  - `window.innerHeight` 窗口的文档显示区的高度
  - `img.offsetTop`指 img 距离上方或上层控件的位置

  ![img](https://img-blog.csdnimg.cn/20190530103353390.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ppbnhpMTExMg==,size_16,color_FFFFFF,t_70)

  - `img.height`img元素的高度

  - `img.classList.add/remove('active')`在图片的样式中加上/移去这个属性

    - ```css
      .slide-in.active {
          opacity:1;
          transform:translateX(0%) scale(1);
      }
      ```

- `debounce` 的作用：
  降低事件监听的频率，使用了 Lodash 中的 debounce 方法。



# 13 - Slide in on Scroll 前辈笔记01

>首次上傳：2017/08/06

![](https://guahsu.io/2017/08/JavaScript30-13-Slide-in-on-Scroll/demo13.gif)

## **主題**
這篇介紹當滾動視窗到定點時動畫滑入圖片的效果，  
而我在這裡替圖片增加了簡易的lazy load效果。

[[BLOG]](https://guahsu.io/2017/07/JavaScript30-13-Slide-in-on-Scroll/)  
[[DEMO]](https://guahsu.io/JavaScript30/13_Slide-in-on-Scroll/index-GuaHsu.html)

## **步驟**
### Step1. 基礎設定
作者已經在所有的圖片中加入了待會會用到的class : 
1. align-right / align-left : 滑入效果用（左/右）
2. slide-in : JavaScript抓取用
並已經將相關的動畫滑入效果寫好。

### Step2. 建立觸發條件,並監聽滾動事件
目的是使滾動視窗到定點時顯示效果，  
所以要監聽的是整個視窗，用`window`，事件選用`scroll`，  
但是如果單純使用`scroll`來操作的話，每次的畫面滾動都會有大量事件被觸發，  
會對效能上造成影響，所以作者多寫了一個`debounce`來使觸發間隔為20毫秒以上：
````javascript
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
    var context = this, args = arguments;
    var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
    };
}
````
所以監聽事件就會寫成`window.addEventListener('scroll', debounce(checkSlide));`。  

### Step3. 設定觸發後的事件內容
在一開始先取得所有`.slide-in`的圖片元素，使用`querySelectorAll`，
````javascript
const sliderImages = document.querySelectorAll('.slide-in');
````
接著編寫每次`scroll`處發的`checkSlide` function:
````javascript
function checkSlide() {
    sliderImages.forEach(sliderImage => {
        // 取得圖片1/2高度的定位點（卷軸垂直位移量＋視窗高度）- 1/2圖片高度
        const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
        // 取得圖片底部定位點（利用圖片頂部定位點+圖片高度取得）
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        // 判斷視窗是否已經超過圖片高度一半
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        // 判斷滾動範圍是否已經超過圖片底部（卷軸垂直位移量）
        const isNotScrolledPast = window.scrollY < imageBottom;
        // 判斷是否超過圖片一半高，且視窗尚未超過圖片底部來增加或移除css效果
        if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active');
        } else {
          sliderImage.classList.remove('active');
        }
    });
}
````

## **探索**
學會了抓取視窗高度並當滾動至對應位置時載入/移除動畫效果，  
就想來試試看增加一個功能，當到對應位置時，才去做圖片的載入及動畫效果，  
就是`lazyload`的很簡易版應用，套用在這個練習上。

首先先把每個圖片改為用`data-imglink`來放圖片連結，像是這樣
````html
<img src="" data-imglink="http://unsplash.it/400/401" class="align-right slide-in">
````

接著來修改觸發的事件內容，因為原本的寫法只要重新讀到圖片1/2位置就會觸發，
我要做的只要第一次觸發效果就好，且是在讀取圖片頂端時觸發，
所以修改如下，新增的用備註註明：

````javascript
function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
    // 取得圖片的定位點
    const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height);
    // 判斷是否滾動到圖片的頂端
    const isImgTop = slideInAt > sliderImage.offsetTop;
    
    if (isImgTop) {
        // 透過dataset取得html裡面的data-imglink連結
        const imageLink = sliderImage.dataset.imglink;
        // 用setAttribute來設置取得的連結
        sliderImage.setAttribute('src', imageLink);
        // 增加一個事件，當圖片載入完成後套用css的動畫效果
        sliderImage.addEventListener('load', () => {
            sliderImage.classList.add('active');
        });
    }
    })
}
````

## **JavaScript語法備註**
**Window.scrollY**
目前瀏覽器視窗已滾動的Y軸（垂直位置）
>參閱：[MDN-Window.scrollY](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY)

**Window.innerHeight**
目前瀏覽器視窗的高度
>參閱：[MDN-Window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight)

**HTMLElement.offsetTop**
返回指定元素相對於有父元素`(offsetParent)`中的頂端位置，  
以此練習來說，`sliderImage`的父元素就是`window`。
>參閱：[MDN-Window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight)

**HTMLElement.dataset**
透過`dataset`可以取回在HTML中設置的`data-*`內容，  
注意使用`dataset`時property不用再將加上`data-`開頭，例如：    
````html
<div class="test" data-greet="hi"></div>
````
````javascript
document.querySelector('.test').dataset.greet; // hi
````
>參閱：[MDN-HTMLElement.dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)



# 13 图片随屏幕滚动而滑入滑出的效果指南 前辈笔记02

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 13 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-07-14    
> 最后更新：2017-07-18

## 实现效果

页面中的文章有几张配图，随着页面上下滚动，图片位置划过图片一半时，图片从两侧滑入；图片位置离开可见区域时，图片向两侧滑出。

![Scroll 效果演示](https://cl.ly/2k2e2H0b1U0J/Screen%20Recording%202017-07-18%20at%2010.04%20%E4%B8%8A%E5%8D%88.gif)（图片太大，可点击[外链](https://cl.ly/2k2e2H0b1U0J)查看，或查看[在线效果](http://soyaine.cn/JavaScript30/13%20-%20Slide%20in%20on%20Scroll/index-SOYAINE.html)。)

下图中蓝色方框位置即是图片所占位置，初始文档中已经写好了内容及样式，需要完成控制图片显示部分的代码来实现图片滑动的效果。

![pic](https://cl.ly/2c2R0q2L040c/Image%202017-07-14%20at%2010.35.43%20%E4%B8%8A%E5%8D%88.png)

## 知识点

涉及控制图片的 CSS 属性：

- `translateX` 来控制左右移动
- `scale` 来控制缩放

涉及页面尺寸的属性：

- `window.scrollY` 文档从顶部开始滚动过的像素值
- `window.innerHeight viewport` 部分的高度
- `ele.height` 元素的高度
- `ele.offsetTop` 当前元素顶部相对于其 offsetParent 元素的顶部的距离。

`debounce` 的作用：
降低事件监听的频率，使用了 Lodash 中的 debounce 方法。

## 解决思路

1. 获取页面中的所有图片元素
2. 滚动事件监听
3. 尺寸获取及处理
4. 滚动至指定区域的条件判断

## 过程指南

1. 获取所有涉及到的图片

   ```js
   const slideImages = document.querySelectorAll('.slide-in');
   ```

2. 滚动事件监听

   ```js
       function checkSlide(e) {
           console.log(e);
           console.count(e);
       }
   
       window.addEventListener('scroll', debounce(checkSlide));
   ```

   针对页面的滚动事件进行监听，可以先打出事件对象来看看。同时在接下来的调试过程中也能利用这打出各个尺寸的值，来帮助我们感受每个尺寸的含义。
   此外由于每次滚动都触发监听事件，会降低 JavaScript 运行性能，所以用 `debounce` 函数来降低触发的次数。

3. 针对每次监听到的滚动事件，遍历所有图片元素，判断是否显示或隐藏图片。由于图片的显示控制只需通过增减 `.active` 类，此处的重点在于判断的条件如何确认，为便于形象地感受页面滚动时，各个尺寸的变化，我画了一张示意图，如下：
   ![尺寸示意图](https://cl.ly/0w3p1v1y3q14/Image%202017-07-18%20at%2010.24.10%20%E4%B8%8A%E5%8D%88.png)
   其中<label style="color: rgba(255, 153, 0, 0.5);">橙色半透明</label>部分指可滚动页面整体，<label style="color: #f90">橙色标注</label>部分是指会随着页面滚动而变化的尺寸，黑色标注的尺寸是固定不变的。
   页面的滑动过程经过了两个临界点，一个是下滑到图片的一半处，另一个是完全滑过图片使图片已不再视窗之内，分别决定了图片的显示和隐藏。

   ```js
   // 滑动页面的底部距离扣除图片一半的高
   const slideInAt = (window.scrollY + window.innerHeight) - img.height / 2;
   // 图片底部距离顶端的距离
   const imgBottom = img.offsetTop + img.height;
   ```

   需要利用两个临界点来判断图片是否处在需要显示的区域内，故利用两个值来存取此条件的结果（以保证每次事件监听的结果赋值给常亮后，不会随 `window` 的属性值变化）。

   ```js
   // 已滑过了图片的一半
   const isHalfShow = slideInAt > img.offsetTop;
   // 未完全滑过图片
   const isNotScrollPast = window.scrollY < imgBottom;
   ```

4. 对于满足显示条件的，给此图片添加 `.active` 类，不满足的则去掉。

   ```js
   if (isHalfShow && isNotScrollPast) {
       img.classList.add('active');
   } else {
       img.classList.remove('active');
   }
   ```

   至此，图片控制逻辑已全部完成。
   亲手滑动感受一下吧o(*≧▽≦)ツ