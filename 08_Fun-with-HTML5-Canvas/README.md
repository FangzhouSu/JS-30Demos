

![在这里插入图片描述](https://img-blog.csdnimg.cn/7bef6e7ab6dc4c79b33425cf0fd70b76.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5pWy5Luj56CB55qE5bCP5o-Q55C05omL,size_20,color_FFFFFF,t_70,g_se,x_16)

# 我的感悟

- 体验一下使用H5中的Canvas制作画布 了解了一些其中的API
- 加了一些内容 将画布居中了 画布是一个区块的感觉更加明显了！
- 原作者给canvas区块加上绝对定位是让其脱离文档流 
  - float让元素脱离文档流并让其他盒子中的内容为这个浮动的元素**让出位置**（**环绕**在该元素的周围）
  - absolute fixed导致元素脱离文档流并让其他元素（注意要避免子绝父相 不然就不准了！）**无视**脱离文档流的
  - 二者的差别就是 float 会被环绕（美滋滋） 用绝对定位 固定定位会被无视（惨兮兮）

这篇文章写得很好！讲述了下脱离文档流的内容 然后还画了特别生动的3D图！棒！

[css脱离文档流到底是什么意思，脱离文档流就不占据空间了吗？脱离文档流是不是指该元素从dom树中脱离？](https://www.zhihu.com/question/24529373/answer/29135021)

# 前辈的笔记

## **主題**

使用HTML5的Canvas來製作一個畫布，
透過滑鼠來繪製彩色粗細不一的線條～
[[BLOG\]](https://guahsu.io/2017/06/JavaScript30-08-Fun-with-HTML5-Canvas/)
[[DEMO\]](https://guahsu.github.io/JavaScript30/08_Fun-with-HTML5-Canvas/index-GuaHsu.html)

## **步驟**

### Step1

先在HTML的地方建立一個`<canvas>`的區塊，
並設置一個變數ctx作為canvas的操作元素，
設定顏色`strokeStyle`、樣式`lineJoin`、`lineCap`、`lineWidth`...

### Step2

接著設定變數各種待會會應用到的變數

```js
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55'; // 線條顏色
ctx.lineJoin = 'round'; // 線條連接樣式（轉角）
ctx.lineCap = 'round'; // 線條結束樣式
ctx.lineWidth = 100; // 線條寬度
let isDrawing = false; // 判斷是否執行畫圖中
let lastX = 0; 
let lastY = 0;
let hue = 0; // 色相值，在hsl中使用
let direction = true; // 判斷粗細增減用
```

### Step3

寫function來執行畫圖！

```
function draw(e) {
    // 判斷是否`isDrawing`，`false`則`return`不觸發此function
    if (!isDrawing) { return; } 
    // 設定線條顏色為hsl模式，吃變數hue
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; 
    // 起始畫圖路徑
    ctx.beginPath(); 
    // 將路徑指針移動到X、Y點
    ctx.moveTo(lastX, lastY); 
    // 將起始點與目前滑鼠位置的X、Y用線條連接起來
    ctx.lineTo(e.offsetX, e.offsetY); 
    // 將線條繪製出來
    ctx.stroke();
    // 把結束點放進X、Y變數中
    [lastX, lastY] = [e.offsetX, e.offsetY]; 
    
    // 做顏色的變化效果，當色相值超過360後歸零
    hue++; 
    if (hue >= 360) { 
        hue = 0; 
    }
    // 做線條寬度的變化效果，當寬度達到指令值得時候，切換direction的true/false
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) { 
        direction = !direction; 
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }      
}
```

### Step4

接著設定滑鼠對應的`addEventListener`效果

```
// 當滑鼠按下時，將目前滑鼠的位置設定為變數中的X、Y並讓isDrawing為true
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
// 滑鼠移動中，執行function draw
canvas.addEventListener('mousemove', draw);
// 滑鼠放開，滑鼠離開 都將isDrawing改為false不觸發function draw
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```

## **Javascript語法&備註**

### **direction = !direction**

學到的是透過這個方式來做true/false的切換。

## **HTML5語法&備註**

這篇幾乎都是使用到canvas的功能，
紀錄若要製作像這樣的畫布效果在canvas中的使用順序：

### 1. 定義線條樣式

(1) `strokeStyle`線條顏色
(2) `lineWidth`線條寬度
(3) `lineJoin`線條的轉角樣式
(4) `lineCap`線條的結束樣式

### 2. 移動順序

(1) `beginPath()`開啟一個新的繪製路徑 (2) `moveTo()`將繪製路徑的起點移動到指定的座標中 (3) `lineTo()`連接路徑終點到指定的座標中 (4) `stroke()`繪製路徑

> 參閱：[MDN-CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## 探索

作者有提到最後可以去加入一個圖片相疊時的效果`globalCompositeOperation`
還滿有趣的，可以再嘗試看看寫各種效果，或是弄幾個checkbox就可以設定很多畫筆跟效果了！

> 參閱：[CanvasRenderingContext2D.globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)