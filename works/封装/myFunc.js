/**
 * @description: 获取滚动的头部距离和左边距离 scrollTop/scrollLeft
 * @param:    undefined 
 * @return: {*}
 */
function scroll() {
    if (window.pageYOffset !== null) {
        // 直接返回一个对象
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
        // 如果没有这个对象，那么判断当前浏览器遵循的模式
        //  BackCompat 对应 quirks mode（怪异模式）， CSS1Compat 对应strict mode(标准模式)
    } else if (document.compatMode === "CSS1Compat") {  // W3C标准
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
}

/**
 * @description: 获取屏幕的宽度和高度 clientWidth/clientHeight
 * body和documentElement获取的会有所不同，因为会计算边框
 * @param {type} 
 * @return: 
 */
function client(){
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if (document.compatMode === "CSS1Compat") {
        return {
            width: window.document.documentElement.clientWidth,
            height: window.document.documentElement.clientHeight
        }
    }
    return {
        width: window.body.clientWidth,
        height: window.body.clientHeight
    }
}

/**
    * @description: 匀速动画的封装
    * @param {object} obj
    * @param {number} target
    * @param {number} speed
    * @return: 
*/
function constant(obj, target, speed) {
    // 把定时器作为元素的属性，谁调用这个函数，就新开一个定时器

    // 清除定时器
    clearInterval(obj.timer)

    //判断运动的方向 如果当前位置大于target值，那么往左（速度取负），否则往右走（速度取正）
    var dir = obj.offsetLeft < target ? speed : -speed

    // 设置定时器
    obj.timer = setInterval(() => {
        obj.style.left = obj.offsetLeft + dir + 'px'
        /* 
            把target作为判断条件,如果target不是speed的整倍，动画都会超出target。
            比如：target: 399.9 ,speed:20, 那么会超出0.1.....
            比如：target: 400.1 ,speed:20, 那么会超出19.9....
            原因：因为left每次都是+20
        */
        /*  if (obj.offsetLeft >= target) {
             clearInterval(obj.timer)
         } */
        if (Math.abs(target - obj.offsetLeft) < Math.abs(dir)) {
            clearInterval(obj.timer)
            obj.style.left = target + 'px'
        }
    }, 20);
}

/**
 * @description: 缓动动画函数
 * @param {object} obj
 * @param {object} json
 * @param {function} fn
 * @return: 
 */
function buffer(obj, json, fn) {
    // 清除定时器
    clearInterval(obj.timer)

    // 设置定时器
    var begin = 0, target = 0, speed = 0
    obj.timer = setInterval(() => {
        // 旗帜 用于何时清除定时器
        var flag = true
        for (var k in json) {
            // 获取初始值
            if ('opacity' === k) {
                begin = Math.round(parseFloat(getCSSAttrValue(obj, k) * 100)) || 0
                target = parseInt(parseFloat(json[k]) * 100)
            } else {
                begin = parseInt(getCSSAttrValue(obj, k)) || 0
                target = parseInt(json[k])
            }
            // 步长
            speed = (target - begin) * 0.2
            // 判断向上取整还是向下取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed)
            // 盒子动起来 或者 改变透明度
            if ('opacity' === k) {  // 透明度
                // w3c浏览器
                obj.style.opacity = (begin + speed) / 100
                // ie浏览器
                obj.style.fliter = 'alpha(opacity=' + (begin + speed) + ')'
            } else if ('zIndex' === k) {
                obj.style[k] = json[k]
            } 
            else {
                obj.style[k] = begin + speed + 'px'
            }

            // obj.innerText = begin

            // 判断是否已经遍历完所有属性，并且所有属性都已经到达target值
            if (begin !== target) {
                flag = false
            }
        }
        // 清除定时器
        if (flag) {
            clearInterval(obj.timer)

            // 判断有没有回调函数
            if (fn) {
                fn()
            }
        }
    }, 20);
}


/**
 * @description: 获取元素的样式属性的值
 * @param {object}  obj
 * @param {string}  attr
 * @return: obj.style.attr
 */
function getCSSAttrValue(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    } else {
        return window.getComputedStyle(obj, null)[attr]
    }
}
/**
 * @description: 函数节流
 * @param {Function} fn
 * @param {number} delay
 * @return: function
 */
function throttle(){
    var timer = null;
    return function(){
        clearInterval(timer)
        timer = setTimeout(fn, delay);
    }
}

function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}
