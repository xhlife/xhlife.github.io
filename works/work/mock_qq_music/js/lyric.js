(function(window){
    function Lyric(path){
        return new Lyric.prototype.init(path)
    }
    Lyric.prototype = {
        constructor:Lyric,
        init:function(path){
            this.path = path
        },
        times: [], // 保存时间
        lyrics: [], // 保存歌词
        index: -1,
        loadLyric: function(callback){
            $this = this
            $this.parseLyric(this.path)
            callback()
            // console.log(window.location.origin + $this.path)
            // $.ajax({
            //     url: window.location.origin + $this.path,
            //     type: "GET",
            //     crossDomain: true,
            //     success: function (data) {
            //         $this.parseLyric(data)
            //         callback()
            //     },
            //     error: function (e) {
            //         console.log(e);
            //     }
            // })
        },
        parseLyric: function(data){
            $this = this
            $this.times = []
            $this.lyrics = []
            var array = data.split("\n")
            // 遍历取出每一条歌词
            // [00:00.92]
            // 匹配时间 \d 查找数字 *匹配0或n个
            // (\d*:\d*.\d*\)  () 代表分组. 把里面的分为一组
            // 通过元组得到  00:00.92
            var timeReg = /\[(\d*:\d*.\d*)\]/
            // 通过元组,在通过exec()匹配,那么会返回匹配的字段,和元组字段
            $.each(array,function(index, ele){
                var lrc = ele.split(']')
                // debugger
                // 排除空的字符串(没有歌词的)     
                if (!lrc[1] || lrc[1].length == 1) return true

                $this.lyrics.push(lrc[1])

                var res = timeReg.exec(ele)
                // return true表示继续循环
                if (res == null)  return true
                // var timeStr0 = res[0] // =>[00:00.92]
                var timeStr = res[1];  // 00:00.92
                var timeStrArr = timeStr.split(':')
                var min = parseInt(timeStrArr[0] * 60)
                var sec = Number(timeStrArr[1])     
                var time = parseFloat((min + sec).toFixed(2))
                // console.log(time);
                $this.times.push(time)


            })
        },
        currentIndex: function(currentTime){
           if (currentTime >= this.times[0]) {
               this.index++
               this.times.shift()   // 删除数组最前面的元素
           }
           return this.index
        }
    }
    Lyric.prototype.init.prototype = Lyric.prototype
    window.Lyric = Lyric
})(window)
