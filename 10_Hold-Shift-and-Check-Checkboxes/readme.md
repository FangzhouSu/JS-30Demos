> 2021-9-27

![在这里插入图片描述](https://img-blog.csdnimg.cn/cae45b7c5aff473fa08f7303d9ae2299.png)

# 我的学习感悟

- 使用JS控制checkbox来实现效果~

- 利用`<label for=“a”>`绑定按钮 `<input id="a">`
- 利用`input:checked+label{...}` 实现选中即赋予属性`…`
- 原作者的做法是有一些问题在里面的（毕竟代码比较简练） 所以跟着前辈的方法又来了一个新版的~
  - 直接进行 shift + 点击 会导致endClick后面的内容一股脑被选择
  - 无法局部取消选择

综合这两个问题 写了个更复杂的版本~



新版本中最难理解（也是我不太理解的）的就是那个 删除功能  他是咋标记的呢？ （其实和选取功能是同理的）

所以新版的批量选取我也没有完全看明白！

回头需要在控制台里打印一下selectClick click checkbox等元素再研究下！



## 改进点

恰好之前做react案例也是todolist 跟这个几乎一个意思 那个功能要多一些

之后研究下JS能不能做到这些

- 添加一条内容 
  - 其中内容的文字可以自由编辑
- 可以删除内容
- 点击全选按钮可以一键全选（这个感觉。。费点劲儿吧。。）











# 前辈的笔记

>首次上傳：2017/07/02

![](https://guahsu.io/2017/07/JavaScript30-10-Hold-Shift-and-Check-Checkboxes/demo10.gif)

## **主題**
介紹如何使用Shift + 左鍵來完成連續區間選取，  
在這篇的探索中，我增加了連續區間取消選取及部分問題的改善。
[[BLOG]](https://guahsu.io/2017/07/JavaScript30-10-Hold-Shift-and-Check-Checkboxes/)  
[[原版DEMO]](https://guahsu.io/JavaScript30/10_Hold-Shift-and-Check-Checkboxes/index-FINISHED.html) 
[[探索版DEMO]](https://guahsu.io/JavaScript30/10_Hold-Shift-and-Check-Checkboxes/index-GuaHsu.html) 

## **步驟**
### Step1. 基本設定
用`querySelectorAll('.inbox input[type="checkbox"]`來把HTML中的checkbox選起來，  
並設置一個變數`let lastChecked;`作為稍後勾選位置的紀錄使用。

### Step2. 觸發設定
把所有選取的checkboxes使用`forEach`來加入`addEventListener('click', handelCheck)`。
### Step3. handelCheck
在這個function裡面，建立了一個區域變數`let inBetween = false`來當作選取區間的標記，  
並在每次觸發時檢查是否”有按著shift點擊”`if(e.shiftKey && this.checked)`，  
若有的話則再跑一次`forEach`來透過`inBetween`對每個checkbox進行區間標記，  
把屬於區間內的checkbox勾起來，並記錄此次點擊的位置。

#### 程式備註
````javascript
//選取所有的checkbox
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

function handleCheck(e) {
    let inBetween = false;
    // 檢查是否按著shift點選
    if (e.shiftKey && this.checked) {
        checkboxes.forEach(checkbox => {
        // 當前點選的checkbox開始記錄到最後一個點選的checkbox關閉標記
        if (checkbox === this || checkbox === lastChecked) {
            inBetween = !inBetween;
            console.log('STarting to check them inbetween!');
        }
        // 勾選區間內為true的checkbox
        if (inBetween) {
            checkbox.checked = true;
        }
        });
    }
    lastChecked = this;
}
// 為每個checkbox加上click事件
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
````

## **探索**
一開始做完原本作者講述的方法（也就是上面那段）的做法後，  
發現有些小問題，例如直接對著同一個checkbox點選會導致全選，  
也沒有辦法做區間取消選取的功能，所以重新寫了一個可以區間選取/取消的版本。

### 分析動作
想一下會使用連續選取時，我自己的動作會有這幾種：

1. 單選：單純的點一下進行勾選/取消
2. 範圍選取：按住shift後點到其他checkbox
3. 範圍取消：在2按住shift的狀態下，點到已勾選的checkbox

所以我依據這些動作分別寫了對應的功能。

### 程式備註
````javascript
// 選取所有checkbox
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let click; // 單純的點擊
let selectClick; // 按下shift後的選取 
let cancelClick; // 按下shift後的取消
    
const handleCheck = function (e) {
    if (e.shiftKey && this.checked) {
        selectClick = this;
        selectBox();
    } else if (e.shiftKey && !this.checked) {
        cancelClick = this;
        cancleBox();
    } else if (this.checked) {
        click = this;
        selectClick = undefined;
        cancelClick = undefined;
    } else {
        click = undefined;
        selectClick = undefined;
        cancelClick = undefined;
    }
    // 選取功能
    function selectBox() {
        let inBetween = false;
        checkboxes.forEach(checkbox => {
            // 將選取範圍內的checkbox加上標記
            if (checkbox === selectClick || checkbox === click) {
                inBetween = !inBetween;
            }
            // 將有標記的checkbox勾選（且click不為undefined與selectClick是為了避免點自己全選）
            if (inBetween && click !== undefined && click !== selectClick) {
                checkbox.checked = true;
            }
        })
    }
    //取消選取
    function cancleBox(el) {
        let inBetween = false;
        checkboxes.forEach(checkbox => {
            // 將選取範圍內的checkbox加上標記
            if (checkbox === selectClick || checkbox === cancelClick) {
                inBetween = !inBetween;
            }
            // 將有標記的checkbox勾選（以及selectClick）
            if (inBetween || checkbox === selectClick) {
                checkbox.checked = false;
            }
        })
    }
}
// 偵測checkbox的click
checkboxes.forEach(checkbox => { checkbox.addEventListener('click', handleCheck) });
// 偵測當shift放開時讓click恢復未選取的狀態
window.addEventListener('keyup', (e) => {
    if (e.keyCode === 16 || e.shiftKey) {
        click = undefined;
    };
})
````
