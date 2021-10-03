> 2021-10-3 咕咕了5天 又回来了~ 节奏保持住~



![在这里插入图片描述](https://img-blog.csdnimg.cn/194c41013eff4edd97b3b32bd1b55480.png)

> 从本demo开始 学习笔记借鉴的份数喜加1~

# 我的学习感悟

- 作者特别喜欢用 `querySelector` 获取元素呐！

```js
/* 获取元素  */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

- 虽说是使用H5中的video属性实现播放器 但是其中的方法都是用JS进行实现的！记得之前写小程序时这些全屏、快进啥的属性都是有对应的API去实现的~自己写这个有**造轮子**的感觉啊哈哈哈（这个视频播放器确实也是个轮子XD）之后想用就记得来这里拿哦！

- 本例的特色是七个可以实现不同功能的函数~
- 下面的监听事件在我们进行不同的操作时 调用回调函数（也就是从上面这七个函数中找到对应功能的函数）

# 11 - Custom Video Player 前辈笔记01

>首次上傳：2017/07/23

![](https://guahsu.io/2017/07/JavaScript30-11-Custom-Video-Player/demo11.png)

## **主題**
介紹如何使用HTML5的video tag來完成各種播放器功能，  
播放/暫停、快進/快退、音量控制、速率控制等...

[[BLOG]](https://guahsu.io/2017/07/JavaScript30-11-Custom-Video-Player/)  
[[DEMO]](https://guahsu.io/JavaScript30/11_Custom-Video-Player/index-GuaHsu.html)

## **步驟**
### Step1. 基本設定
作者已經有將基礎的css及html tag設定好，僅需針對各項目的功能開始進行js撰寫即可，  
但這邊我有將背景色調調整，並把對應icon改用font-awesome來顯示（原本是文字符號）。

>由於寫到最後已經很多寫法跟原作者的方法不太一樣，所以接著各功能會再稍微備註為何這麼寫。

### Step2. 播放/暫停按鈕
為了在整個播放器範圍及點擊播放按鈕時能播放/暫停，  
先針對這兩個元素做`addEventListener`，  
並在`togglePlay()`中使影片產生對應動作＆更換圖示，
比較特別的是使用了`video[method]`的寫法，來直接操作video的屬性，
直接用影片是否已暫停`paused`來做判斷。

````javascript
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  const icon = video.paused ? `<i class="icon-play"></i>` : `<i class="icon-pause"></i>`;
  toggle.innerHTML = icon;
  video[method]();
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
````
>原本是將圖標更換＆影片動作分開寫，我改成寫一起。

### Step3. 音量/速率操作
在HTML中已經定義好對應的`input-range`標籤，
在這裡只需要做監聽並取屬性值來操作就好了！

````html
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">Ï
````
在javascript的部分，ranges是透過`querySelectorAll`來取得的，
所以可以用`forEach`來把所有range加上`addEventListener`，
也因為range是拖曳條，除了`click`外，也必須要監聽`mousemove`，
而name的命名`volume`與`playbackRate`也就是video本身的屬性，直接使用。

````javascript
function handleRangeUpadte() {
  video[this.name] = this.value;
}
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpadte);
  range.addEventListener('mousemove', handleRangeUpadte);
})
````

### Step4. 快進/快退操作
一樣也在HTML中的`input`定義好對應的秒數了，只須取出使用。
````html
<button data-skip="-10" class="player__button skip_left"><i class="icon-backward"></i></button>
<button data-skip="25" class="player__button skip_right"><i class="icon-forward"></i></button>
````
在javascript的部分，原本的寫法只有點擊後觸發，  
因為我有加上鍵盤觸發的動作，所以將`skip`加上了一個參數`direction`來判斷，
而`skipButtons`也跟Step3的`ranges`一樣用forEach來加上監聽效果，
快進快退的作法是取出input中設定的`data-skip`後透過`currentTime`來調整影片時間。
````javascript
function skip(direction) {
  let skipTime = 0;
  if (direction === 'left') {
    skipTime = document.querySelector('.skip_left').dataset.skip;
  } else if (direction === 'right') {
    skipTime = document.querySelector('.skip_right').dataset.skip;
  } else {
    skipTime = this.dataset.skip;
  }
  video.currentTime += parseFloat(skipTime);
}
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})
````
### Step5. 進度條顯示
使用video的`currenTime`與`duration`計算出進度％數，  
再透過CSS改變進度條的色塊％數，值得一提的是作者有說到兩個監聽參數：
`timeupdate`與`progress`都可以做為影片時間變動時的觸發條件，  
我稍微小測試後發現，使用`progress`會在載入時就將進度顯示在正確位置，  
而`timeupdate`必須在啟動播放後才會去抓到正確的位置，  
可以將CSS中的flexBasis預設設為50%來觀察這兩者的差別。

````javascript
function handleProgress() {
  const precent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${precent}%`;
}
video.addEventListener('progress', handleProgress);
````

### Step6. 進度條操作
在影片的進度條上，做點擊切換段落，或著是按著滑動片段，
分解動作會有：`點擊`、`按住並移動`這兩種觸發條件，  
為了要讓function能同時判斷兩種狀態，必須要將其中一個條件設flag，  
這裡就將`mousedown`做了一個flag來操作狀態，  
並利用`e.offsetX`的位置及`progress.offsetWidth`寬度與影片總長來操作當前秒數。

監聽的部分，因為原本重複寫了四次`addEventListener`，  
所以我把會使用到的event寫在一個陣列裡面，使用forEach去執行。

````javascript
let mousedown = false;
function scrunb(e) {
  const mouseType = e.type;
  if (mouseType === 'mousedown') { mousedown = true; }
  if (mouseType === 'mouseup') { mousedown = false; }
  if (mouseType === 'click' || mouseType === 'mousemove' && mousedown) {
    const scrunbTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrunbTime;
  }
}
const progressEvents = ['click', 'mousemove', 'mousedown', 'mouseup'];
progressEvents.forEach(progressEvent => {
  progress.addEventListener(progressEvent, scrunb);
})
````

### Step7. 全螢幕
作者最後有提到的小功能，他說留給我們自己去研究。  
首先在HTML中加上對應的功能按鈕與圖標(就是這個放大圖標讓我去用font-aswsome的XD)

````html
<button class="player__button fullScreen" title="Full Screen"><i class="icon-fullscreen"></i></button>
````
然後再javascript中加入這段，多個判斷是為了不同的瀏覽器而寫，
值得一提的是，不用對取消全螢幕特別做處理，預設就會有esc關閉及對應的關閉icon了，
但如果有特別需求可以使用`exitFullscreen()`來關閉。

````javascript
function fullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}
fullScreenBtn.addEventListener('click', fullScreen);
````

### Step8. 鍵盤動作偵測
最後加上的功能是鍵盤對應操作，  
加入了空白對應播放/暫停、鍵盤左右鍵對應快進/快退，
空白鍵加上了`preventDefalut`是防止預設空白會跳到最底下的功能。

````javascript
function eventKeydown(e) {
  switch (e.keyCode) {
    //空白鍵
    case 32:
      e.preventDefault()
      togglePlay();
      break;
    //方向鍵左
    case 37:
      skip('left');
      break;
    //方向鍵右
    case 39:
      skip('right')
      break;
  }
}
document.addEventListener('keydown', eventKeydown);
````

## **HTML5語法&備註**
### **Video & Media Element**
這次的主軸是HTML的`video`標籤，所以滿多操作都是直接操作`video`的屬性，  
例如偵測暫停的`paused`或是當前播放時間`currentTime`，  
但其實這些屬性並非`video`獨有的，而是HTML Media Element，好比說`audio`也會有。

>參閱：  
>[MDN-Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)  
>[MDN-HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

## **JavaScript語法&備註**
### **屬性使用** 
在Step2中有使用`video[method]()`的方法來操作屬性，  
其實相關的操作方法就等同於`video.play()`，但不能寫成`video.method()`，  
因為這樣就變成呼叫video底下的function method了，  
所以使用中括號[]包起來的會自動變成字串，可以避免掉這樣的問題。

### **HTMLElement.dataset**
在Step4中使用到的，使用`dataset`可以取得`htmlTag`中的`data-*`屬性！
>參閱：[MDN-](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)

### **Event.preventDefault()**
在Step8中使用到的，這個方法是將取消事件（如果事件可取消），  
這次使用的場景是於網頁瀏覽器中按下空白，預設會將網頁捲到底部，  
但我希望只要啟動我的播放/暫停功能就好不要捲動，就可以使用。
>參閱：[MDN-Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
[MDN-Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)

## 探索
本次的探索滿多，都已經寫在Step中了，  
修改了播放器樣式及部分色調調整，對重複的監聽與變數整理，  
加入了全螢幕效果以及鍵盤操作功能。

## 其他
終於踏出JavaScript30 2/3的第一步，  
最近好多事，一直沒能好好靜下心來進修，  
除了JS30，之前預購的一些CSS課程也要陸續上線了，  
稍微覺得時間有點不夠用外，也開始容易分心了XD，
畢竟CSS等設計相關的課程看起來比較華麗啊哈哈哈。

加油持續把這系列練習完！！



# 前辈笔记02

> 作者：[@DrakeXiang](https://github.com/DrakeXiang) 　Review：[@zzh466](http://github.com/zzh466)、[@Xing Liu](https://github.com/S1ngS1ng)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 10 篇（额不是第11篇么）。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-02-06    
> 最后更新：2017-09-24

## 实现目标

* 为 `video` 元素添加自定义样式的播放控制面板
  * 可滑动调节音量、播放速度
  * 可通过按钮快进、回退
  * 可点击视频画面或按钮播放或暂停视频播放
  * 可点击或拖动进度条选择视频播放进度

## 解决思路

0. 首先，我们已经有了 HTML 文件，里面包含各种播放器用到的元素，格式也已经在 CSS 文件中帮我们设置好了
1. 在 JS 中选择我们需要添加功能的 HTML 元素，建立好变量
2. 用 JS 写好播放器的功能
3. 给第一步中获取的元素加上事件监听和回调，即可实现功能

## 知识点

* `video` 对象的各种属性、方法和事件
  * `paused`
    * `play()`
    * `pause()`
    * `currentTime`

## 过程指南

### 开始

HTML 元素中，`video` 标签是我们的视频，而下面的 `player__controls` 就是我们自己的控制面板

```html
<div class="player">
     <video class="player__video viewer" src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"></video>

     <div class="player__controls">
       <div class="progress">
        <div class="progress__filled"></div>
       </div>
       <button class="player__button toggle" title="Toggle Play">►</button>
       <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
       <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
       <button data-skip="-10" class="player__button">« 10s</button>
       <button data-skip="25" class="player__button">25s »</button>
     </div>
   </div>
```

开始之前我们先把所有需要用到的元素节点先取到：

```javascript
/* 获取元素  */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

### **播放/暂停**

#### 功能实现

视频最主要的功能自然就是播放和暂停了，而且其他功能也需要视频播放之后才能看出效果，所以我们先来实现这个功能。
`video` 对象有一个叫 `paused` 的属性来判断视频是否在播放；另外还提供了两个方法来进行播放和暂停的操作：`.play()` 方法可以播放视频，`.pause()` 方法暂停播放

那么只需要在点击的视频的时候进行这两个操作就可以了，我们可以写一个 `togglePlay` 方法，根据视频的播放状态来判断该执行哪个：

```javascript
function togglePlay() {
    if (video.paused) {
        video.play();
    } else (
        video.pause();
    )
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```

对于这种二选一的判断用三元操作符会更简洁，我们可以直接在一行里写完，像这样：

```javascript
function tooglePlay() {
    video.paused ? video.play() : video.pause()
}
```

或者我们可以用字符串来执行属性方法：

```javascript
function tooglePlay() {
    const method = vidoe.paused ? 'play' : 'pause';
    video[method]();

}
```

这种方法可能会觉得看起来别扭，但在有些情况下是挺有用的。现在我们点击视频的话已经能够正常切换播放和暂停的状态了。

#### **图标切换**

为了让用户知晓播放器状态，我们需要直观地通过图标来展示。当然，我们可以在 `togglePlay()` 方法中处理，不过更好的方式是给播放器加上另一个事件监听，用视频本身的播放状态来判断。

这是因为，除了点击播放/暂停按钮以外，我们还可以通过比如键盘快捷键、第三方插件甚至耳机上的操作按钮等其他方式来控制。因此，通过视频本身的播放状态来判断是最不容易出错的。代码如下：

```javascript
// 逻辑
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
// 事件
video.addEventListener('play', updateButton)；
video.addEventListener('pause', updateButton)；
```

上面的代码中，我们使用了关键字 `this`。其实在调用 `updateButton` 的时候，这个方法已经被绑定在了 `addEventListener` 的调用者上，也就是绑定到了 `video` 上。因此，`this.paused` 在这里就相当于 `video.paused`。

### **快退/快进**

在 HTML 中，我们已经给快退/快进键添加了一个 `data-skip` 属性，对应的值即为快退/快进的秒数。

我们先来写事件处理。首先要有一个回调函数，叫 `skip`。事件监听的对象，当然是 `skipButtons`，对应的就是快退/快进两个按键。可以尝试一下，如果我们直接在命令行输出这个 `skipButtons`，会得到一个数组。因此，我们需要用 `forEach` 来遍历一下，给每一个按钮都添加上事件监听：

```javascript
// 逻辑
function skip() {

}
// 事件
skipButtons.forEach(button => button.addEventListener('click', skip));
```

然后我们来处理逻辑部分。`video` 有一个属性叫 `currentTime`，可以用来设置视频当前的时间。我们只要修改这个属性就可以了：

```javascript
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
```

要注意的是，这里就不能用 `this` 来访问 `video` 对象了，因为在这里面，`this` 指向的是遍历得到的每一个 `button`，而我们是要修改 `video` 的 `currentTime` 属性。

`data-**` 这样的属性以前提到过了，在 JavaScript 中需要通过 `.dataset.**` 来访问。因为我们获取到的是字符串，所以要通过 `parseFloat` 来转换一下。

### **音量和播放速度**

接下来我们实现通过控制面板上两个滑动条来控制视频的音量和播放速度。这两个滑动条是 `range` 类型的 `input` 元素，在元素属性中我们指定了他们各自的最大、最小值和调节的“步值”。

其中需要注意的是，他们分别有一个 `volume` 和 `playbackRate` 的 `name` 属性，我们起这两个名字是因为他们是 `video` 对象里对应音量和播放速度的两个属性名。这样起名并不是必须的，但可以让我们后面 js 的操作更精简。

通过监听两个 `input` 元素的 `change` 事件，我们就可以通过其 `value` 值改变视频属性了：

```javascript
function handleRangeUpdate() {
    video[this.name] = this.value;
}

//遍历 ranges 给两个滑动条都绑定事件
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
```

因为我们上面说过，`input` 的 `name` 值和 `video` 对象中的属性名是一样的，可以看到在 `handleRangeUpdate` 函数中我们利用了 `this.name` 的写法来代表属性，，这里的 `this` 一样是 `addEventListener` 的调用者，即 `range`。

现在调节两个滑动条我们已经可以改变视频相应属性了，美中不足就是滑块的调节并不是实时的，而要等我们放开鼠标才会生效，这是因为 `change` 事件只在 `blur`，也就是元素失去焦点的时候才会触发。要解决这个问题我们可以把 `change` 事件改为 `input` 事件；另一种比较传统的方法是同时监听鼠标在该元素上的 `mousemove` 事件来执行更新的操作，
在原来的代码下加上一行：

```javascript
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
```

这样鼠标在这滑动条上移动的时候也会更新视频属性了，只不过只有在鼠标拖动滑块的时候才会有值的改变。

### **进度条操作**

我们的进度条需要能在鼠标点击和拖动的时候改变视频播放的进度。我们先实现进度条随着视频播放更新进度的功能。

进度条显示进度的原理很简单，`progress__filled` 这个元素是一个 `flex` 定位的元素，我们改变其 `flex-basis` 的百分比值就可以调节它所占父元素的宽度。`flex-basis` 值代表 `flex` 元素在**主轴**方向上的初始尺寸。关于 `flex-basis` 的更多信息请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)

```javascript
// 根据当前播放时间来调节进度条
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
```

现在只要运行 `handleProgress` 这个函数就能够更新对应的进度条，但我们需要的是自动执行这个操作。也许你会想到利用 `setInterval` 设置一个定时器，其实 `video` 元素给我们提供了更好的方法—— `timeupdate` 事件。这个事件会在媒体文件的 `currentTime` 属性改变的时触发，更多信息请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/timeupdate)

事件操作如下：

```javascript
video.addEventListener('timeupdate', handleProgress);
```

现在随着视频的播放，进度条也会更新进度了。

接着我们需要点击进度条时调整播放进度，那么我们改变进度，或者说宽度就需要得到鼠标点击的位置，这可以通过事件对象的 `offsetX` 属性来找到，该属性代表鼠标点击位置相对于该元素的水平偏移。得到偏移之后计算出该位置的百分比，那么也就知道了进度的百分比：

```javascript
...
// 根据点击位置设置播放时间
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * vidoe.duration;
    video.currentTime = scrubTime;
}

// 点击事件监听
progress.addEventListener('click', scrub);
```

进度条还要求可以拖动，这个操作我们可以通过设置一个*标志*来判断当前是否出于拖动状态，然后配合 `mousedown`、`mouseup` 事件来更新这个标志：

```javascript
...
let mousedown = false;

// 鼠标在 progress 上移动时更新进度
progress.addEventListener('mousemove', (e) => {

    // 若处于拖拽状态则执行更新
    if (mousedown) {
        scrub(e);
    }
});

// 鼠标按下改变标志
progress.addEventListener('mousedown', () => mousedown = true);

// 鼠标抬起恢复标志
progress.addEventListener('mouseup', () => mousedown = false);
```

这样就实现了拖拽进度条时改变播放进度的功能，实际使用的时候会发现拖拽和视频的更新并不是实时的，会有一定延迟，这是因为 `mousemove` 事件触发的频率非常高，视频更新的速度跟不上。

对于 `mousemove` 的回调函数其实我们可以写得更简洁：

```javascript
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
```

我们利用逻辑和操作符 `&&` 的**短路**特性来实现 “只有当 `mousedown` 为 `true`，或可类型转换为 `true` 时才执行 `scrub(e)`” 的判断操作，由于逻辑和的判断必须两个都为真时才成立，所以若第一项不为真，那么 js 就不会去管第二项是什么，因此也就不会执行 `scrub(e)`。这种写法在实际项目中是挺常见的，算是一个小技巧，希望大家可以熟悉并使用。

## **结语**

至此，我们已经实现了控制面板的绝大部分功能，最后一个留给大家自己尝试的功能是全屏播放：

* 在控制面板中添加一个全屏按钮
* 点击该按钮后可以进入/退出全屏模式

## ChangeLog

- 2017-02-06 完稿
- 2017-09-24 add missing code by [issue#30](https://github.com/soyaine/JavaScript30/issues/30)