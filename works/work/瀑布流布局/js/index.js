window.onload = function () {
    // 实现瀑布流布局
    waterFull("main", "box")


    // 动态加载图片
    var timer1 =null
    window.onscroll = function(){
        // 可通过setTimieout()节流
        this.clearTimeout(timer1)
        timer1 = setTimeout(() => {
            if (checkWillLoadImage()) {
                // 造数据
                var dataArr = [
                    { "src": "img04.jpg" },
                    { "src": "img05.jpg" },
                    { "src": "img06.jpg" },
                    { "src": "img07.jpg" },
                    { "src": "img08.jpg" },
                    { "src": "img09.jpg" },
                    { "src": "img10.jpg" },
                    { "src": "img11.jpg" },
                    { "src": "img12.jpg" },
                    { "src": "img13.jpg" },
                    { "src": "img14.jpg" },
                    { "src": "img15.jpg" },
                    { "src": "img16.jpg" },
                    { "src": "img17.jpg" },
                    { "src": "img18.jpg" },
                ]
                // 创建元素
                for (let i = 0; i < dataArr.length; i++) {
                    var newBox = document.createElement('div')
                    newBox.className = 'box'
                    $("main").appendChild(newBox)

                    var newPic = document.createElement('div')
                    newPic.className = 'pic'
                    newBox.appendChild(newPic)

                    var newImg = document.createElement('img')
                    newImg.src = 'images/' + dataArr[i].src
                    newPic.appendChild(newImg)
                }

                // 重新布局
                this.waterFull("main", "box")
            }
        }, 200); 
    }

    // 窗口大小发生改变
    var timer = null 
    window.onresize = function(){
        // 因为onresize事件非常的频繁，因此需要用定时器来节流
        this.clearTimeout(timer)
        timer = this.setTimeout(() => {
            this.waterFull('main','box')
        }, 200);
    }
}
/**
 * @description: 布局函数
 * @param {parent,child} (父盒子的id, 子盒子的class)
 * @return: 
 */
function waterFull(parent, child) {
    // 父盒子居中
    // 获取所有的盒子
    var allBox = $(parent).getElementsByClassName(child)
    // 获取子盒子的宽度  所有的子盒子的宽度是一样的。
    var boxWidth = allBox[0].offsetWidth
    // 获取屏幕的宽度
    var screenW = client().width
    // 求出列数
    var cols = parseInt(screenW / boxWidth)
    // 根据列数，计算父盒子的宽度
    $(parent).style.width = cols * boxWidth + 'px'
    // 居中
    $(parent).style.margin = "0 auto"

    // 子盒子的定位
    // 定义高度数组
    var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0
    // 遍历子盒子
    for (let i = 0; i < allBox.length; i++) {
        // 求出每个子盒子的高度
        boxHeight = allBox[i].offsetHeight
        // 取出第一行盒子的高度放入高度数组、
        if (i < cols) {  // 第一行
            heightArr.push(boxHeight)
            // 窗口大小发生改变的时候，可能会给第一行添加定位样式
            allBox[i].style = ''
        } else { // 剩余行
            // 取出最矮的盒子高度
            minBoxHeight = Math.min.apply(this, heightArr)
            // 求出最矮盒子对应的索引
            minBoxIndex = getMinBoxIndex(heightArr,minBoxHeight)

            //子盒子定位
            allBox[i].style.position = 'absolute'
            allBox[i].style.left = minBoxIndex * boxWidth + 'px'
            allBox[i].style.top = minBoxHeight + 'px'

            // 更新数组中最矮高度，因为前面叠加了一个盒子，所以最矮的高度已经改变了。
            // 第一行最矮盒子高度 + 叠加的盒子的高度
            // 更新了数组，从而最小值也会更新
            heightArr[minBoxIndex] += boxHeight
        }
    }

}

/**
 * @description: 在数组中获取对应值的下标
 * @param {arr Array, val Number} 
 * @return: index
 */
function getMinBoxIndex(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}

/**
 * @description: $函数，通过id获取元素
 * @param {string} 
 * @return: DOM
 */
function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null
}

/**
 * @description: 检查是否加载图片
 * @param {type} 
 * @return: boolean
 */
function checkWillLoadImage(){
    // 获取最后一个盒子
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length-1]

    // 求出最后一个盒子
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop

    // 求出屏幕的高度
    var screenH = document.body.clientHeight || document.documentElement.clientHeight

    // 求出页面偏离浏览器的高度
    var scrollTop = scroll().top

    return lastBoxDis <= screenH + scrollTop
}