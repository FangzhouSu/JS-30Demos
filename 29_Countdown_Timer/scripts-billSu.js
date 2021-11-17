const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let countdown; // 全局变量，供计时器主体使用

// 写计时器函数
function timer(seconds){
    // 新的计时器启动之后 先把原本的setInterval删除，防止多个计时同时被开启
    clearInterval(countdown);
    const now = Date.now();
    const timeStamp = now + seconds * 1000;
    // 显示倒数时间的方法
    displayTimeLeft(seconds);
    // 显示（预计）结束时间的方法
    displayEndTime(timeStamp);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((timeStamp - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}
// 顯示倒數時間
function displayTimeLeft(seconds) {
    // 透過Math.floor來取得分鐘數(傳入秒數/60取得最大整數)
    const minutes = Math.floor(seconds /60);
    // 用％來取得傳入秒數除60的餘數（扣除分鐘數後的秒數）
    const remainderSeconds = seconds % 60;
    console.log({minutes, remainderSeconds});
    // 顯示秒數的部分若小於0數字前補0
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    // 顯示對應時間
    document.title = display;
    timerDisplay.textContent = display;
}
  
  // 顯示結束時間
function displayEndTime(timestamp) {
    // 用傳入的timestamp在取得date資訊
    const end = new Date(timestamp);
    // 從date取得小時數
    const hour = end.getHours();
    // 轉12小時制
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    // 從date取得分鐘數
    const minutes = end.getMinutes();
    // 顯示結束時間，與上方一樣，若分鐘數小於10，則前面補0
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
  
// 開始計時（HTML畫面設定好的時間）
function startTimer() {
    // 取得html中設定的data-time（秒數）
    const seconds = parseInt(this.dataset.time);
    // 傳入計時器function
    timer(seconds);
}

// 替每個時間按鈕加上監聽click事件，用來啟動計時function
buttons.forEach(button => button.addEventListener('click', startTimer));

// HTML中的input自定义倒数时间
document.customForm.addEventListener('submit', function(e) {
    // 因為用form，submit後避免跳頁使用preventDefault()來阻止預設事件
    e.preventDefault();// demo26中的知识点又用上了！（虽然是我自己加的知识点XD）
    // 取得input欄位的值
    const mins = this.minutes.value;
    // 傳入計時器
    timer(mins * 60);
    // 清空input
    this.reset();
})