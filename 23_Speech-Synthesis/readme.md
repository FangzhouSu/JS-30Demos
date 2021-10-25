> 21/10/25

![image-20211025215413948](https://gitee.com/su-fangzhou/blog-image/raw/master/202110252154263.png)



# 我的学习感悟

- 主要用到了两个接口

1.`SpeechSynthesisUtterance`接口   

本接口用于**设置阅读器阅读的配置参数**，包括语言，阅读速度，语调等，实例化`SpeechSynthesisUtterance`后，可以通过为其属性赋值来完成参数配置。

> 參閱：[MDN-Element.getBoundingClientRect()](https://developer.mozilla.org/zh-TW/docs/Web/API/SpeechSynthesisUtterance)

2.`SpeechSynthesis`接口   

本接口用于**控制阅读器行为**，包括获取浏览器支持的朗读语言，文本朗读，暂停，停止等，接口属性中定义有paused,speaking等只读属性来表明当前的状态。

> 參閱：[MDN-SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

- 实现一个功能，对应地写一个回调函数，并对相应行为进行监听、调用回调函数，使用原生JS实现功能的流程都大抵相似~

# 23 - Speech Synthesis

![](https://guahsu.io/2017/10/JavaScript30-23-Speech-Synthesis/demo23.png)

## **主題**
使用`SpeechSynthesisUtterance`及`speechSynthesis`來使文字轉語音。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-23-Speech-Synthesis)  
[[DEMO]](http://guahsu.io/JavaScript30/23_Speech-Synthesis/index-GuaHsu.html)  

上次有做過語音轉文字的練習[[20 - Speech Detection]](https://guahsu.io/2017/10/JavaScript30-20-Speech-Detection/)，  
這次則是要使用文字轉語音，透過介面中的輸入欄位來轉語音播放，  
並可透過設定好的控制條來變更語音速率/音準。

## **步驟**
### Step1. 取得頁面元素並設置SpeechSynthesisUtterance
```javascript
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
// 使html中的輸入欄位成為SpeechSynthesisUtterance要使用的值
msg.text = document.querySelector('[name="text"]').value
```

### Step2. 設定語音播放語系選單
```javascript
// 取得語系資訊 
function populateVoices() {
  voices = this.getVoices();
  // 將所有語系塞進下拉選單中
  voicesDropdown.innerHTML = voices
    // 使用filter篩選出包含zh及en的語系
    .filter(voice => voice.lang.includes('zh') || voice.lang.includes('en'))
    // 篩選後的array透過map把資料組成html
    .map(voice => `<option value=${voice.name}>${voice.name} (${voice.lang})</option>`)
    // 用join來合併且消除原本陣列的逗點
    .join('');
}
// 監聽語音清單變更後進行語系清單的更新
speechSynthesis.addEventListener('voiceschanged', populateVoices);
```

### Step3. 播放與功能設定
```javascript
// 播放切換
function toggle(starOver = true) {
  speechSynthesis.cancel();
  if (starOver) {
    speechSynthesis.speak(msg);
  }
}
// 設定選擇的發音語系
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}
// 設定速率跟音準
function setOption() {
  // 傳入的變數名稱與SpeechSynthesisUtterance本身的物件相同
  // 所以可以透過這種方式來直接用
  msg[this.name] = this.value;
  toggle();
}
// 監聽語系選單，選擇後切換語系
voicesDropdown.addEventListener('change', setVoice);
// 監聽速率跟音準控制條，移動後設定
options.forEach(option => option.addEventListener('change', setOption));
// 播放按鈕
speakButton.addEventListener('click', toggle);
// 停止按鈕
stopButton.addEventListener('click', () => toggle(false));
```

## **語法&備註**
### **SpeechSynthesisUtterance**
可以設置語音服務應讀取的文字內容及播放的細節(語系、速率、音量..等屬性)
>參閱：[MDN-Element.getBoundingClientRect()](https://developer.mozilla.org/zh-TW/docs/Web/API/SpeechSynthesisUtterance)

### **SpeechSynthesis**
執行語音服務的主要功能，包含了播放、暫停..等屬性

>參閱：[MDN-SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)



# 23 Speech Synthesis 中文指南

> 本篇作者：©[大史不说话](https://github.com/dashnowords)——Chinasoft Frontend Web Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 23 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-09-20   
> 最后更新：2017-09-22

## 挑战任务

初始文档`index-start.html`提供了一个阅读器，你需要完成如下编程任务：   
1.使用相应的WebAPI接口获得浏览器支持的语言种类列表，并填充至页面的下拉菜单中，选择中文;   
2.在文本域中输入对应语言的文字，点击`speak`按钮后浏览器会阅读输入的文字；   
3.在浏览器阅读时，点击`stop`按钮，浏览器会停止阅读；   
4.拖动`rate`和`pitch`滑块可改变阅读速度和音高。

## 实现效果

![结果展示](https://github.com/soyaine/JavaScript30/blob/master/23%20-%20Speech%20Synthesis/effects.png)

## 相关知识   

1.`SpeechSynthesisUtterance`接口   
  本接口用于设置阅读器阅读的配置参数，包括语言，阅读速度，语调等，实例化`SpeechSynthesisUtterance`后，可以通过为其属性赋值来完成参数配置，详细信息请直接参考MDN中的[SpeechSynthesisUtterance接口说明](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)。   
2.`SpeechSynthesis`接口   
  本接口用于控制阅读器行为，包括获取浏览器支持的朗读语言，文本朗读，暂停，停止等，接口属性中定义有paused,speaking等只读属性来表明当前的状态,详细使用方式请参考MDN中的[SpeechSynthesis接口说明](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)。

## 编程思路

    本次编程任务使用相应接口的最基本功能即可实现，编程中根据挑战任务中的说明逐步实现即可。

## 过程指南

1.取得`speechSynthesis`对象，并取得浏览器支持的朗读语言，将所有支持的选项动态添加至下拉列表

```js
const synth = window.speechSynthesis;

//将获取支持语言并添加至下拉列表的代码段封装在一个函数中
function getSupportVoice() {
  voices = synth.getVoices();//获取支持的语言
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
   
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voicesDropdown.appendChild(option);
  }
}

//经测试直接执行getSupportVoice()时无法获得预期效果，须由事件触发该函数。
synth.addEventListener('voiceschanged', getSupportVoice);
```

2.点击`speak`按钮后朗读（为方便说明，以下代码段与所提供的完成代码顺序不完全一致）   

```js
//实例化配置对象
const msg = new SpeechSynthesisUtterance();

//定义一段默认朗读内容
msg.text = '你能说中文吗';

//点击speak按钮时阅读文字
function speak() {
  console.log(voicesDropdown.value);
  synth.speak(msg);
}

//将阅读函数绑定至`speak`按钮的点击事件上
speakButton.addEventListener('click', speak);
```

3.点击`stop`按钮停止朗读

```js
//停止朗读
function stopSpeak(){
  synth.cancel();
}
//将停止朗读函数绑定至`stop`按钮的点击事件上
stopButton.addEventListener('click', stopSpeak);
```

4.参数配置可更改   

```js
//index-start.html中提供的选择器将返回rate值,pitch值以及阅读内容对应的DOM元素
  const options = document.querySelectorAll('[type="range"], [name="text"]');
//将阅读参数赋值至msg的同名实例属性
function paramChange(){
  msg[this.name] = this.value;
}
options.forEach(opt => opt.addEventListener('change', paramChange));
```



