window.onload = function () {
    // 获取需要的标签
    var slider = $('slider')  // 最外层
    var slider_main = $('slider_main')  // 轮播区域  == 宽度为两张图片的宽度
    var slider_main_img = slider_main.children;  // 所有的图片
    var slider_ctl = $('slider_ctl')   // 控制器和指示器区域
    
    // 当前的索引
    var indexNow = 0
    // 动态的创建指示器
    for (let i = 0; i < slider_main_img.length; i++) {
        var span = document.createElement('span')
        span.className = 'slider-ctl-icon'
        slider_ctl.appendChild(span)
    }
    // 默认第一个圆点指示器选中
    slider_ctl.children[2].className = 'slider-ctl-icon current'

    // 图片是绝对定位的，所以让第一张在轮播区域的左侧，其余的在右侧
    var scroll_w = slider.offsetWidth;
    for (let i = 1; i < slider_main_img.length; i++) {
        slider_main_img[i].style.left = scroll_w + 'px'
    }

    // 监听上一张/下一张/指示器的点击事件
    var slider_ctl_child = slider_ctl.children
    console.log(slider_ctl_child.length);
    
    for (let i = 0; i < slider_ctl_child.length; i++) {
        // 监听点击
        slider_ctl_child[i].onmousedown = function() {
            // 判断是那个触发点击事件  通过类名来判断
            if (this.className === 'slider-ctl-prev') {  // 上一张
                /* 
                    1、当前可视区域的图片快速右移
                    2、上一张图片快速出现在可视区域的左边
                    3、让这张图片做动画进入
                */
               // 当前图片右移
               buffer(slider_main_img[indexNow], {'left':scroll_w})
               // 当前下标自减
               indexNow--
               // 判断
               if (indexNow < 0) {
                   indexNow = slider_main_img.length-1
               }
               slider_main_img[indexNow].style.left = -scroll_w + 'px'
               buffer(slider_main_img[indexNow], { 'left': 0})
            } else if (this.className === 'slider-ctl-next') {  // 下一张
                /* 
                    1、当前可视区域的图片快速左移
                    2、上一张图片快速出现在可视区域的右边
                    3、让这张图片做动画进入
                */
                /* // 当前图片右移
                buffer(slider_main_img[indexNow], { 'left': -scroll_w })
                // 当前下标自增
                indexNow++
                // 判断
                if (indexNow >= slider_main_img.length) {
                    indexNow = 0
                }
                slider_main_img[indexNow].style.left = scroll_w + 'px'
                buffer(slider_main_img[indexNow], { 'left': 0 }) */
                autoPlay()
            }else{  // 圆点指示器
                /* 
                    1、用当前点击的索引和选中索引对比
                    2、在当前的右边，相当于点击了下一张
                    3、在当前的左边，相当于点击了上一张
                */

                // 让圆点的索引从0开始 因为前面有上一张和下一章按钮， 所以减去2
                 var index = i-2
                // 对比
                if (index > indexNow) {  // 右边》下一张
                    // 当前图片右移
                    buffer(slider_main_img[indexNow], { 'left': -scroll_w })
                    slider_main_img[index].style.left = scroll_w + 'px'
                }else if (index < indexNow) {  // 左边》上一张
                    buffer(slider_main_img[indexNow], { 'left': scroll_w })
                    slider_main_img[index].style.left = -scroll_w + 'px'
                }
                indexNow = index
                buffer(slider_main_img[indexNow], { 'left': 0 })
            }
            changeIndex()
        }
    }
    // 自动播放
    var timer = setInterval(autoPlay, 1000);
    // 设置和清除定时器
    slider.onmouseover = function () {
        clearInterval(timer)
    }
    slider.onmouseout = function () {
        timer = setInterval(autoPlay, 1000);
    }

    function autoPlay(params) {
        /* 
                   1、当前可视区域的图片快速左移
                   2、上一张图片快速出现在可视区域的右边
                   3、让这张图片做动画进入
               */
        // 当前图片右移
        buffer(slider_main_img[indexNow], { 'left': -scroll_w })
        // 当前下标自增
        indexNow++
        // 判断
        if (indexNow >= slider_main_img.length) {
            indexNow = 0
        }
        slider_main_img[indexNow].style.left = scroll_w + 'px'
        buffer(slider_main_img[indexNow], { 'left': 0 })
        changeIndex()
    }

    // 切换圆点的索引
    function changeIndex() {
        for (let i = 2; i < slider_ctl_child.length; i++) {
            slider_ctl_child[i].className = 'slider-ctl-icon'
        }
        slider_ctl_child[indexNow + 2].className = 'slider-ctl-icon current'
    }
}