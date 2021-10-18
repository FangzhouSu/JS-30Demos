效果图这里直接参考 GuahSu前辈的gif了

![img](https://guahsu.io/2017/10/JavaScript30-21-Geolocation/demo21.gif)



![在这里插入图片描述](https://img-blog.csdnimg.cn/04f339cc74884bcfaff973216f1b9f32.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/a4c604a7d11b4a7a945cbee9f570d521.png)

# 我的学习感悟

- 利用浏览器内置`Web Geolocation API`获取到的地理位置及相关坐标

  - 并显示在`index-start.html`中的可视化指南针上

- 在手机浏览器上运行来模拟功能

  - 或者使用`npm install + npm start`启动本地服务器 local server，

  ​    来获取经纬度啥的（据说因为电脑没有陀螺仪，所以没法有指南针的作用？）（可能会触发“非安全连接警告”XD) 

# 21 Geolocation

## **主題**
利用`navigator.geolocation`來取得裝置的地理位置與速率。

[[BLOG]](https://guahsu.io/2017/10/JavaScript30-21-Geolocation)  
[[DEMO]](http://guahsu.io/JavaScript30/21_Geolocation/index-GuaHsu.html)  

## **步驟**
### Step1. 啟動Local Server
這個練習需要使用到local server，  
如果你已經有一個可在本機run起來的server可以直接使用，  
或在這層資料夾底下運行`npm install`來安裝`browser-sync`，  
安裝完成後可以透過指令`npm start`來啟動localserver(預設port3000)，  

>npm指令需要下載node.js來使用

### Step2. 測試
由於這個練習是需要取得定位資訊，  
所以可以透過手機瀏覽器利用`npm start`啟動server後的內網ip來連線，  
或是使用Mac的`Xcode`開發工具來模擬移動中的裝置(影片教學是使用後者)。

### Step3. 撰寫程式
```javascript
// 取得HTML中的元素
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
// 使用watchPosition來取得使用者的地理位置及海拔、速度
navigator.geolocation.watchPosition((data) => {
  // 若成功取回，則會回傳一組Position(這裡定義名稱為data)
  console.log(data);
  // 使用coords.speed取回速度(公尺/秒)
  speed.textContent = data.coords.speed;
  // 使用coords.heading取得方位，代表偏離北方的角度，0為正北、90為正東
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
  // 錯誤回傳訊息，例如未取得定位授權時
  console.error(err);
});
```
>參閱：[MDN-Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)

# 21 Geolocation 中文指南

> 本篇作者：©[大史不说话](https://github.com/dashnowords)——Chinasoft Frontend Web Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 21 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-09-08    
> 最后更新：2017-09-11

## 挑战任务

本次的挑战任务，是利用浏览器内置`Web Geolocation API`,将获取到的地理位置及相关坐标，与`index-start.html`中的可视化指南针连接在一起。

## 实现效果

![结果展示](https://github.com/soyaine/JavaScript30/blob/master/21%20-%20Geolocation/effects.png)
由于笔记本电脑一般不带速度及方向传感器，从结果中可以看到返回值中`heading`及`speed`键值均为`null`,为演示可视化效果，代码中采用手动赋值的方式进行演示。   

## 相关知识

1.有关地理位置接口`Geolocation`的说明，可查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation)中的相关解释。    

2.`getCurrentPosition()`方法和`watchPosition()`方法
`getCurrentPosition()`方法在调用时返回一次相关信息，`watchPosition()`方法调用后将持续返回相关信息，两个方法调用时除了传入相关的回调函数外，还需要传入`options`配置对象作为第三参数，`options`相关键值如下：

- `enableHighAccuracy`参数表示是否高精度可用，为Boolean类型，默认为false，如果开启，响应时间会变慢，同时，在手机设备上会用掉更多的流量，也就是money了。
- `timeout`参数表示等待响应的最大时间，默认是0毫秒，表示无穷时间。
- `maximumAge`表示应用程序的缓存时间。单位毫秒，默认是0，意味着每次请求都是立即去获取一个全新的对象内容。

## 过程指南

1.使用`getCurrentPosition()`方法获得相关信息   

```js
  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(success, error, options);
  }else{
    console.log('Your broswer does not support the Geolocation API');
  }
```

2.当成功返回结果时，在控制台输出结果，并根据结果对相应的DOM元素进行样式调整   

```js
function success(pos) {
  console.log(pos);
  var crd = pos.coords;
  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  //改变传感器速度值和罗盘的指向
   speed.innerHTML = crd.speed;
   arrow.style.transform = `rotate(${crd.heading}deg)`;
  
};
```

