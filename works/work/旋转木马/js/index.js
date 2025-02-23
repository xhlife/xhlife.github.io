window.onload = function(){
    // 获取需要的标签
    var slider = $('slider')
    var slider_main = $('slider_main')
    var allList = slider_main.children
    var slider_ctl = $('slider_ctl')

    // 指示器的逐渐隐藏和显示
    slider.onmouseover = function(){
        buffer(slider_ctl,{"opacity":1})
    }
    slider.onmouseout = function () {
        buffer(slider_ctl, { "opacity": 0})
    }

    // 图片定位  == 把样式写在json中
    var json = [
        {   //  1
            width: 400,
            top: 20,
            left: 50,
            opacity: 0.2,
            zIndex: 2
        },
        {  // 2
            width: 600,
            top: 70,
            left: 0,
            opacity: 0.8,
            zIndex: 3
        },
        {   // 3
            width: 800,
            top: 100,
            left: 200,
            opacity: 1,
            zIndex: 4
        },
        {  // 4
            width: 600,
            top: 70,
            left: 600,
            opacity: 0.8,
            zIndex: 3
        },
        {   //5
            width: 400,
            top: 20,
            left: 750,
            opacity: 0.2,
            zIndex: 2
        }
    ];
    for (let i = 0; i < json.length; i++) {
        buffer(allList[i], json[i])
    }
    // 监听点击
    for (let i = 0; i < slider_ctl.children.length; i++) {
        var item  = slider_ctl.children[i]
        item.onmousedown = function () {
            if (this.className === 'slider_ctl_prev') {  // 左边
                // 通过改变json中各项的顺序，从而达到改变图片位置的目的
                // push() 数组尾部添加，shift()头部删除
                // 把数组的头部放到尾部
                json.push(json.shift())
            }else{  // 右边
                // unshift()头部添加， pop()尾部删除
                json.unshift(json.pop())
            }
            // 重新布局
            for (let i = 0; i < json.length; i++) {
                buffer(allList[i], json[i])
            }
        }
    }

}

