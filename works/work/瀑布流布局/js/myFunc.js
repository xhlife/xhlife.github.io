/**
 * @description: 获取滚动的头部距离和左边距离
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
function client() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else if (document.compatMode === "CSS1Compat") {
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


