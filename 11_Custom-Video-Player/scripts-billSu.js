/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullScreenBtn = player.querySelector('.fullScreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 01 针对 播放/暂停按钮做监听 
// 将原版解决方案的影片动作video[method]()与更换按钮icon的操作结合起来了~
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  const icon = video.paused ? '►' : '❚ ❚';// method属性值为play时 显示►图标
  toggle.innerHTML = icon;
  // video[method]() 比较特别的写法~用于直接操作video的属性！
  video[method]();
}

// 02 音量（左）、播放倍速（右）操作
// 在HTML中已经定义好 range类型的input标签了  所以这里调整对应的属性值即可
function handleRangeUpadte() {
  video[this.name] = this.value;
}

// 03 快进、快退操作
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

// 04 进度条显示
function handleProgress() {
  const precent = (video.currentTime / video.duration) * 100;// 使用video的两个属性计算出进度的%数
  progressBar.style.flexBasis = `${precent}%`;
}

// 05 进度条操作（点击、拖拽）
let mousedown = false;
function scrunb(e) {
  const mouseType = e.type;
  if (mouseType === 'mousedown') { mousedown = true; }
  if (mouseType === 'mouseup') { mousedown = false; }
  if (mouseType === 'click' || mouseType === 'mousemove' && mousedown) {
    const scrunbTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrunbTime
  }
}

// 06 全屏播放
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

// 07 对键盘的所有动作进行监听
function eventKeydown(e) {
  switch (e.keyCode) {
    //空白鍵
    case 32:
      e.preventDefault()
      togglePlay();// 调用暂停、播放的函数
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

/* Hook up the event listners 连接事件与监听器们 */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// 保证拖拽滑动条时也可以更新视频属性 但是我试过 不加也可以实现这个需求呢...
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpadte);
  range.addEventListener('mousemove', handleRangeUpadte);
})

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})

video.addEventListener('progress', handleProgress);

const progressEvents = ['click', 'mousemove', 'mousedown', 'mouseup'];
progressEvents.forEach(progressEvent => {
  progress.addEventListener(progressEvent, scrunb);
})

fullScreenBtn.addEventListener('click', fullScreen);

document.addEventListener('keydown', eventKeydown);