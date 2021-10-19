

> 10/19

啥也没有发生…

等二刷去看原作者的教学视频好了~

![image-20211019212922407](https://gitee.com/su-fangzhou/blog-image/raw/master/202110192129663.png)

# 我的学习感悟

- 本demo主要内容：使用浏览器内置得 Web Speech API  将说的话输出到页面上（只有chrome浏览器支持）
  - 听起来很好玩不是么 但是——
  - 因为语音识别需要将捕捉到的信息发送至google服务器进行处理，所以这个demo的例子效果它出不来。。。

- 连着两天的效果运行不出来，挫败感++，等有精力了再来玩一玩这个API吧 暂且跳过了~



# 20 - Speech Detection

## **主題**
利用`SpeechRecognition`來做語音識別，  
並透過`interimResults`來輸出識別的結果。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-20-Speech-Detection)  
[[DEMO]](http://guahsu.io/JavaScript30/20_Speech-Detection/index-GuaHsu.html)  

## **步驟**
### Step1. 啟動Local Server
這個練習需要使用到local server，  
如果你已經有一個可在本機run起來的server可以直接使用，  
或在這層資料夾底下運行`npm install`來安裝`browser-sync`，  
安裝完成後可以透過指令`npm start`來啟動localserver(預設port3000)，  
>npm指令需要下載node.js來使用

### Step2. 將SpeechRecognition建立起來
```javascript
// 將全域環境中的SpeechRecognition指好(依據不同瀏覽器)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// 建立一個變數recognition來放為語音識別功能
const recognition = new SpeechRecognition();
// 讓語音識別回傳識別後的資訊（預設為false)
recognition.interimResults = true;
```
參閱：[MDN-SpeechRecognition.interimResults](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults)

### Step3. 把輸出區域準備好
```javascript
// 建立一個p元素在html設定好的文字區中
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
```

### Step4. 對識別系統做監聽
識別回傳的資料是`NodeList`，所以要用`map`操作得先轉`array`
```javascript
// 監聽識別回傳
recognition.addEventListener('result', e => {
  // 將回傳資料先轉為array來操作
  const transcript = Array.from(e.results)
    // 透過map取得回傳陣列中的第0筆
    .map(result => result[0])
    // 在取得第0筆中的transcript
    .map(result => result.transcript)
    // 用join把連結符號消掉
    .join('')

  // 把回傳內容塞到p元素中
  p.textContent = transcript;
  // 如果回傳內容已經結束（一段話的結尾）在建立一個新的p元素來放下一段文字
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
})

// 監聽如果語音識別結束，則在開啟一次新的識別
recognition.addEventListener('end', recognition.start);
// 開始識別
recognition.start();
```

## 其他
在測試的過程中，不知道是我發音的問題還是怎麼回事，  
我在說出`localhost`的過程中居然被識別成`Tokyo Hot`XDDDD  

![](https://guahsu.io/2017/10/JavaScript30-20-Speech-Detection/console.png)



# 20 Speech Detection 中文指南

> 本篇作者：©[大史不说话](https://github.com/dashnowords)——Chinasoft Frontend Web Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 20 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-09-04    
> 最后更新：2017-09-07

## 挑战任务

本次的挑战任务，是利用浏览器内置`Web speech API`,将自己所说的话输出在页面上,仅chrome浏览器支持。   
说明：由于只有chrome浏览器实现了该接口，而语音识别需要将捕捉到的信息发送至google服务器进行处理，故本文档只提供解决思路和参考代码。

## 实现效果

![结果展示](https://github.com/soyaine/JavaScript30/blob/master/20%20-%20Speech%20Detection/effects.png)

## 相关知识

有关语音识别接口`SpeechRecognition`的说明，可查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechRecognition)中的相关解释。

## 基本思路   

1.新建语音识别对象;   
2.开启语音识别服务;   
3.通过监听`result`事件，实时获取捕获到的语音信息;   
4.通过监听`end`事件，当一次语音捕获结束后，重新开启该功能，实现持续的语音监听功能。   

## 过程指南

1.由于目前只有chrome浏览器实现了此功能，故直接使用带有前缀的构造函数来构建一个语音识别对象。   

```js
var speech = new webkitSpeechRecognition();
```

2.设置语音识别对象的基本属性，并开启该功能。

```js
  speech.interimResults = true;
  //返回即时语音，即时语音是指SpeechRecognitionResult.isFinal 为false时捕获到的信息。
  speech.lang = 'en-US';//设置语音识别类别为英语
  speech.start();//开启功能
```

3.监听收到结果事件，将语音识别结果输出在DOM元素上。   

```js
  speech.addEventListener('result', (e) => {
      const results = Array.from(e.results) 
      // e.results中保存的是识别的结果，本来并不是数组，需要将其转换为数组，方便使用其map、join等方法。
        .map(result => result[0])
        .map(result => result.transcript) // 获取到每一段话，是一个数组类型
        .join(''); // 将每一段话连接成字符串
       //将结果输出在页面上
        words.innerHTML = results;
      }
```

## 延伸思考

由于国内网络原因，可考虑使用[科大讯飞的语音识别sdk](http://www.xfyun.cn/)，感兴趣的同学可自行尝试实现。
