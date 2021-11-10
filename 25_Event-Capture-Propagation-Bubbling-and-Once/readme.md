> 11/8 
![demo25-new](https://gitee.com/su-fangzhou/blog-image/raw/master/202111101735786.gif)

上面这个太大了 可以点到链接里去看/直接点开demo体验

下面这个是老版本哈~

![JS30-25](https://gitee.com/su-fangzhou/blog-image/raw/master/202111101735829.gif)

# 我的感悟

- 解析`addEventListener`中事件的捕捉、转递、冒泡、单次執行方法，是对事件的一次绝佳实践！
- 使用 `e.stopPropagation();` 阻止冒泡！
- 另外step3 step5中提到了`addEventListener`的第三个参数的两个属性capture once，用于设定事件捕获顺序&阻止冒泡~可以改一改值来试下！

> 11/9更新

观[demo](https://www.w3school.com.cn/tiy/t.asp?f=event_stoppropagation)有感~添加了新功能与新知识点！（即为打勾的地方）

![image-20211110172832925](https://gitee.com/su-fangzhou/blog-image/raw/master/202111101728030.png)

也碰到了**新问题**！

- 利用复选框【1】更新checked的值（决定事件是为捕获还是冒泡）这里有一个很大的疑惑点！！在更新全局的checked值时，`divs.forEach(div => div.addEventListener())`中第三个参数中的checked是不受影响的，它只受初始定义的checked变量影响！问题留在这儿，等回头遇到类似的问题/看看[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)再来补充

# 25 - Event Capture, Propagation, Bubbling and Once

## **主題**
解析`addEventListener`中事件的捕捉、傳遞、氣泡與單次執行方法

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-25-Event-Capture-Propagation-Bubbling-and-Once) | [[DEMO]](https://guahsu.io/JavaScript30/25_Event-Capture-Propagation-Bubbling-and-Once/index-GuaHsu.html)

## **步驟**
### Step1. 建立事件模型與基本呼叫
首先建立三層DIV作為稍後測試使用的模型，
依序包覆為：紫色>淺橘色>深橘色
```html
<div class="one"> 
  <div class="two">
    <div class="three">
    </div>
  </div>
</div>
```
接著建立`click`事件
```javascript
// 取得頁面的所有div
const divs = document.querySelectorAll('div');

function logText(e) {
  // 印出當前div的class name
  console.log(this.classList.value);
}

// 為每個div加上click事件監聽
divs.forEach(div => div.addEventListener('click', logText));
```

### Step2. 預設的點擊事件
當對著畫面中間(深橘色/one)做點擊時，console印出來的是
```javascript
three
two
one
```
會從`click`的位置的最深處開始向外層連動所有的div`click`事件，像是氣泡一樣的從內向外浮出去。

### Step3. addEventListener的第三個參數-1:capture
深入檢查，會發現其實`addEventListener`是有第三個參數的：
```javascript
divs.forEach(div => div.addEventListener('click', logText, {
  capture: false, // 預設為false
}));
```
第三個參數的第一個屬性`Capture`就是事件的捕捉順序，  
剛剛提到`click`後console印出來順序是由內向外，  
若將`Capture`設為`true`會在點擊中間(深橘色/one)會印出：
```javascript
one
```
就只有印出one而已，這是因為對當前最外層的容器one去點了，  
就已經捕捉到目的了，所以他不會再往下找，只會到點擊的最外層目標為止。

### Step4. stopPropagation()
但如果想從內層往外層點，而且是依選取層印出對應層級的話，  
就要在列印的function加上`topPropagation()`來使用：
```javascript
function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation(); // stop bubbling!
}
```
這會使原本向外延伸的氣泡事件停止。

### Step5. addEventListener的第三個參數-2:once
而`addEventListener`的第三參數還有一個新屬性`once`，  
新增一個按鈕的`click`事件來測試：
```javascript
button.addEventListener('click', () => {
  console.log('Click!!!');
}, {
  once: true
});
```
它可以使這個按鈕`click`被執行結束後，直接`unbind`這個元素與事件，  
之後這個按鈕就已經不會再被觸發`click`事件了！
可以運用在很多避免重複點擊的狀況，例如表單送出後禁止user重複點擊。

## 其他
在一開始的練習[JavaScript練習-臺北市旅遊景點](https://guahsu.io/2017/05/JavaScript-TravelMap/)時也有記錄到這個第三參數，  
但當時只知道`capture`並不曉得`once`，對於整體的事件捕捉也不是很清楚，  
經由這個練習範例加深了這個印象，雖然目前還是沒有正式運用到，  
但這個觀念記著不吃虧，之後遇到相關問題會有更多可以思考的腦中資料：）。

