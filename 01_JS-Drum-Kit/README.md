> 2021-9-6一刷 参考前辈们的记录-笔记01 笔记02

# 我的心得

这个小demo中还是有不太懂的语法~

因为用到了不少高级的用法 我也没有特意去查 那么二刷的时候 一定要对这些内容十分清楚！



下面贴出来让我感到困惑的语句 这些困惑点主要是 函数的使用/参数的形式以及使用方法

```js
window.addEventListener('keydown', playSound);

const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

key.classList.add('playing') //#1 回傳element的class值(陣列)

// 將一個物件或是字串轉為陣列格式的語法
const keys = Array.from(document.querySelectorAll('.key'));

// 新增transitionend listener 
// 用于在点击特效结束时（transitionend)，呼叫removeTransition
const keys = Array.from(document.querySelectorAll('.key'));
/*下面用到了forEach循环与箭头函数
	前者可以简单地迭代获取数组的每个元素
	后者可以简单地实现一个函数 key = > xxx 等价于 function(key){xxx}
 另外这个键盘监听事件再次出现了*/
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

// 建立removeTransition函数 用来移除点击特效
function removeTransition(e){
    // 判断传入的propertyName是否为transform 如果不是 就退出
    // 如果是transform 则移除playing模式 不再发出声音
    if(e.propertyName !== 'transform'){
        return;
    }
    e.target.classList.remove('playing');
}
```



另外发现一个项目的小bug

*如果按住键盘不放 特效无法消失 会一直亮着。。*

类似这样子。。

![在这里插入图片描述](https://img-blog.csdnimg.cn/92a51e30269c400f9cf5a96bf9685a4f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5pWy5Luj56CB55qE5bCP5o-Q55C05omL,size_20,color_FFFFFF,t_70,g_se,x_16)

# 笔记01

https://github.com/dustinhsiao21/Javascript30-dustin/tree/master/01%20-%20JavaScript%20Drum%20Kit

### 摘要

1. 利用輸入鍵盤的案件事件`keydown`觸發功能，利用`keyCode`取值，並將`keyCode`的值對應到`data-key`，接者對相對應的`audioaudio[data-key="${e.keyCode}"]`放出音樂`audio.play()`。

```
window.addEventListener('keydown', playsound);
```

1. 可以把音樂撥放時間重置 `audio.currentTime = num`
2. 利用`selector.classList.add('playing')`，可將選定的標籤加入class的後綴字；同理用`selector.classList.remove('playing')`可移除選定的class後綴字。
3. 事件`transitionend`使用方式:當使用過`transition`後執行callback內容。



### CSS概念

1. flex基本用法:
   - align-items : center; //垂直置中
   - justify-content:center; //水平置中
2. transition動畫效果用法: property duration timing-function delay;ex:transition:all 0.07s ease
   - property:有width, color...
   - timing function:
     - ease cubic-bezier(0.25, 0.1, 0.25, 1.0)
     - liner cubic-bezier(0.0, 0.0, 1.0, 1.0)
     - ease-in cubic-bezier(0.42, 0.0, 1.0, 1.0)
     - ease-out cubic-bezier(0.0, 0.0, 0.58, 1.0)
     - ease-in-out cubic-bezier(0.42, 0.0, 0.58, 1.0)
3. 可以直接註冊標籤，並在css內敘述標籤功能。
4. 背景圖片

```
html{
	background:url(http://...)
    background-size:cover
}
```

# 笔记02

https://github.com/guahsu/JavaScript30/tree/master/01_Java-Script-Drum-Kit

这位前辈的总结写得很全面！还附带上了对应知识点的MDN链接

## **主題**

透過JS使鍵盤按下後播放出對應按鍵的聲音，並同時產生一個特效，
在按下其他鍵後會關閉該特效並於新按鍵中啟用。
[[BLOG\]](https://guahsu.io/2017/05/JavaScript30-01-Java-Script-Drum-Kit/)
[[DEMO\]](https://guahsu.io/JavaScript30/01_Java-Script-Drum-Kit/index-GuaHsu.html)

## **步驟**

#### Step1. 新增keydown listener

利用`window.addEventListener('keydown', playSound);`來監聽鍵盤動作。

#### Step2. 建立function`playSound`

1. 利用傳入的e.keyCode來取得對應的`audio`標籤及該按鍵的`div`標籤
2. 判斷傳入的e.keyCode是否有對應的`audio`標籤，若無則退出
3. 使對應的`div`加上`playing`樣式，產生對應的典及特效
4. 使對應的`audio`播放時間為0
5. 播放對應的音檔

#### Step3. 新增transitionend listener

1. 偵測所有包含`className='key'`的元件
2. 當該元件觸發特效並結束時(`transitionend`)，呼叫`removeTransition`

#### Step4. 建立function`removeTransition`

1. 判斷傳入的propretyName是否為transform，若否則退出
2. 若為transform，則移除`playing`樣式

## **JavaScript語法&備註**

### **element.classList**：

這個會回傳element的class值(陣列)，
範例用到了classList的方法`add()`及`remove()`

```
classList.add('aaa', 'bbb', 'ccc'); //新增多個className
classList.remove('aaa', 'bbb', 'ccc'); //移除多個className
```

如果已經存在/不存在的className則會被忽略。

> 還有其他方法如:
> `toggle()`偵測是否存在這個className，存在則刪除/不存在則新增
> `contains()`偵測是否存在這個className, 返回true/false
> 參閱：[MDN-Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

### **HTMLmediaElement(audio)**：

HTML的`audio`標籤，在HTML放置如下標籤指定音源

```
<audio src="sound/a.mp3"></audio>
```

透過javascript來操作：
`element.play()`:進行播放
`element.currentTime`:指定播放秒數
範例中使用`currentTime`是為了達到連發的效果XD

> 參閱：[MDN-HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

### **forEach**

之前沒在javascript中使用的語法，用法如下：

```
arr.forEach(callback function)
```

我是用for迴圈來比對做語法理解的：

```js
let datas = ['data1', 'data2', 'data3'];
//for迴圈寫法
for (let i = 0; i < datas.length; i++) {
    console.log(datas[i]);
}
//forEach寫法
datas.forEach(function(data){
    console.log(data);
});
//都會輸出
//data1
//data2
//data3

datas.forEach(console.log);
//如果透過上面直接console.log來看到結果是：
//data1 0 ["data1", "data2", "data3"]
//data2 1 ["data1", "data2", "data3"]
//data3 2 ["data1", "data2", "data3"]
//回傳的分別是value, index, array本身內容。
```

> 參閱：[MDN-Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

### **箭頭函式(Arrow Function)**

ES6的新語法

```js
//傳統寫法
let func1 = function(arg) { console.log('Hi, ' + arg); };
//箭頭函式寫法
let func2 = arg => console.log('Hi, ' + arg);
//補充:如果該function沒有參數要傳，要帶空括號如下
let func3 = () => console.log('Hi');
```

> 參閱：[MDN-Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### **addEventListener** 用于监听键盘动作

因為我是是第一次看到`transtionend`這個event，
所以去MDN查了HTML DOM event記錄連結在此

> 參閱：[MDN-Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)

### **template literals**

模板文字，同樣屬於第一次看到的東西，
利用``` - 反引號(back-tick)或稱重音符(grave accent)來組合字串，
在範圍內可利用`${}`加上變數操作

例如原本的字串+變數組合寫法：

```
let str = '<div data-key="' + key + '">' +
         '<button>click me</button>' +
         '</div>';
```

改用template string來做只要

```
let str = `<div data-key="${key}">
         <button>click me</button>
         </div>`;
```

用```包住字串，利用`${}`來包變數
這樣可以很輕鬆的組出易於閱讀的組合字串！
不用像以前還要注意單雙引號與+的配合了~

> 參閱：[MDN-Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

### **Array.from**

範例中有這段

```
const keys = Array.from(document.querySelectorAll('.key'));
```

查詢了`Array.from`才知道這是一個將一個物件或是字串轉為陣列格式的語法，
但當時覺得為何要把陣列在轉成陣列?querySelectorAll不就是返回陣列嗎?
在查下去才發現querySelectorAll返回的是nodeList且**nodeList跟Array是不同的!**
雖然都很像陣列，但nodeList並沒有array.prototype上的方法！
最簡單的例子是用array.push()去測試，會發現由querySelectAll得到的物件無法用.push()。

```js
let testNodeList = document.querySelectAll('.key');
testNodeList.push('add'); // <--非陣列會報錯TypeError: testNodeList.push is not a function

let testArray = Array.from(testNodeList);
testArray.push('add'); // <-- 轉為陣列就可以了
```

至於在範例中轉型的原因，
我想應該是因為若無轉型為Array使用nodeList來forEach可能會導致某些瀏覽器版本錯誤。

> nodeList由querySelectorAll及childNodes返回的 參閱：[MDN-NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)

## **CSS語法&備註**

### **display:flex**

CSS3的排版語法，以範例中的來做備註紀錄

```
.keys {
    display: flex; /*要使用flex要在元素內先宣告flex*/
    flex: 1; /*這是一個簡寫，全部為flex: flex-grow｜flex-shrink｜flex-basis*/
    min-height: 100vh; /*vh代表view height, 百分比呈現*/
    align-items: center; /*宣告為flex後才有效的屬性，垂直置中*/
    justify-content: center;/*宣告為flex後才有效的屬性，水平置中*/
}
```

> 參閱：[MDN-flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)

## 探索

原範例只能由鍵盤觸發，
我的探索是為這個範例加上可由滑鼠點擊觸發的功能

```
const keys = Array.from(document.querySelectorAll('.key'));

//新增click功能綁定至每個class="key"
keys.forEach(key => key.addEventListener('click', playSound));

function playSound(e) {
    //依據不同的事件來取得對應的key_code(e.type可以看，以下是簡寫版)
    let keyCode = e.keyCode || this.getAttribute('data-key');

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`div[data-key="${keyCode}"]`);

    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}
```