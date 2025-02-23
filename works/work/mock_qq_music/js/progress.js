(function (window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot)
    }
    Progress.prototype = {
        constructor: Progress,
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar
            this.$progressLine = $progressLine
            this.$progressDot = $progressDot
        },
        isMove:false,
        // 进度条圆点点击事件
        progressClick: function(callback){
            var $this = this  
            this.$progressBar.click(function(event){
                event.stopPropagation()
                // 获取背景距离窗口默认的位置(即最前点距离默认窗口)
                var normalLeft = $(this).offset().left
                
                // 获取点击位置距离窗口的距离
                    // jquery的pageX属性
                var eventLeft = event.pageX
                // 设置前景的宽度
                $this.$progressLine.css('width', eventLeft - normalLeft)
                // 设置圆点的位置
                $this.$progressDot.css('left', eventLeft - normalLeft)
                // 计算进度条的比例
                var value = (eventLeft - normalLeft) / $(this).width()
                
                callback(value)       
            })
        },
        // 进度条拖拽事件
        progressMove: function(callback){
            var $this = this
            // 记录百分比值
            var width = this.$progressBar.width()
            // 获取背景距离窗口默认的位置(即最前点距离默认窗口)
            var normalLeft = this.$progressBar.offset().left
            
            // 监听鼠标的按下
            this.$progressDot.mousedown(function(){
                $this.isMove = true  
                // 监听鼠标的移动
                $(document).mousemove(function(){

                    // 获取点击位置距离窗口的距离
                    // jquery的pageX属性
                    var eventLeft = event.pageX

                    // 设置前景的宽度  // 设置圆点的位置
                    if ((event.pageX - normalLeft) >= 0 && (event.pageX - normalLeft) <= width) {
                        $this.$progressLine.css('width', eventLeft - normalLeft)
                        $this.$progressDot.css('left', eventLeft - normalLeft)
                    }
                        // 计算进度条的比例
                    var value = (eventLeft - normalLeft) / width
                    // 监听鼠标的抬起
                    $(document).mouseup(function () {
                        // off()方法移出通过on()方法添加的事件

                        $(document).off('mousemove')
                        callback(value)
                        $this.isMove = false
                    })
                })
            })
            
        },
        // 根据播放进度设置进度条
        setProgress: function(value){
            if (this.isMove) return
            if (value < 0 || value > 100) return;
            this.$progressLine.css({
                width: value + "%"
            })
            this.$progressDot.css({
                left: value + "%"
            })
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress
})(window)
