(function (window) {
  function Player($audio) {
    return new Player.prototype.init($audio);
  }
  Player.prototype = {
    constructor: Player,
    musicList: [],
    init: function ($audio) {
      // $audio为jquery获取的audio
      // this.audio为原生的audio
      this.$audio = $audio;
      this.audio = $audio.get(0);
    //   console.log(this.$audio, this.audio);
    },
    _time: -1,
    currentIndex: -1,
    flag: false,
    playMusic: function (index, item, time) {
      // 判断当前是否在播放
      if (this.currentIndex === index) {
        // 同一首音乐
        if (this.audio.paused) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      } else {
        // 不是同一首
        this.$audio.attr("src", item);
        this.$audio.attr("time", time);
        this.audio.play();
        this.currentIndex = index;
        this._time = -1;
      }
    },
    // 处理上一首,下一首索引问题
    preIndex: function () {
      var index = this.currentIndex - 1;
      if (index < 0) {
        index = this.musicList.length - 1;
      }
      return index;
    },
    nextIndex: function () {
      var index = ++this.currentIndex;
      if (index > this.musicList.length - 1) {
        index = 0;
      }
      return index;
    },
    changeMusic: function (index) {
      this.musicList.splice(index, 1);
      // 判断当前删除的是否在正在播放的前面
      if (index < this.currentIndex) {
        this.currentIndex = this.currentIndex - 1;
      }
    },
    // 获取歌曲总时长
    getMusicDuration: function () {
      return this.audio.duration;
    },
    // 获取当前播放的时长
    getMusicCurrentTime: function () {
      return this.audio.currentTime;
    },
    countTime(str) {
      if (this._time !== -1) return this._time;
      const timeArr = str.split(":");
      let res = 0;
      const second = Number(timeArr[timeArr.length - 1]);
      const minSecond = Number(timeArr[timeArr.length - 2]) * 60;
      res = second + minSecond;
      this._time = res;
      return res;
    },
    // 更新时间
    musicTimeUpdate: function (callback) {
      var $this = this;

      this.$audio.on("timeupdate", function () {
        var duration = $this.audio.duration;
        if ($this.audio.duration == Infinity) {
          duration = $this.countTime($this.$audio.attr("time"));
        }
        var currentTime = $this.audio.currentTime;
        var timeStr = $this.formatDate(currentTime, duration);
        callback(currentTime, duration, timeStr);
      });
    },
    // 格式化时间文本
    formatDate: function (currentTime, duration) {
      // 结束时间处理(即总时长换分钟)
      var endMin = parseInt(duration / 60);
      var endSec = parseInt(duration % 60);
      // 加零处理
      if (endMin < 10) {
        endMin = "0" + endMin;
      }
      if (endSec < 10) {
        endSec = "0" + endSec;
      }

      // 开始时间处理
      var startMin = parseInt(currentTime / 60);
      var startSec = parseInt(currentTime % 60);
      // 加零处理
      if (startMin < 10) {
        startMin = "0" + startMin;
      }
      if (startSec < 10) {
        startSec = "0" + startSec;
      }

      return startMin + ":" + startSec + " / " + endMin + ":" + endSec;
    },
    // 音乐进度设置
    musicSeekTo: function (value, callback) {
      var $this = this;
      if (this.currentIndex === -1) {
        callback();
        setTimeout(() => {
          if (isNaN(value)) {
            return;
          } else {
            var ti = $this.audio.duration;
            if (ti === Infinity) {
              var minT = $this.$audio.attr("time").split(":");
              ti = minT[0] * 60 + Number(minT[1]);
            }
            // console.log($this.audio.duration, value, $this.getMusicDuration());
            $this.audio.currentTime = ti * value;
          }
        }, 100);
      } else {
        var ti = $this.audio.duration;
        if (ti === Infinity) {
          var minT = $this.$audio.attr("time").split(":");
          ti = minT[0] * 60 + Number(minT[1]);
        }
        $this.audio.currentTime = ti * value;
        // callback()
      }
      // this.audio.currentTime = this.audio.duration * value
    },
    // 声音设置
    musicVoiceSeekTo: function (value) {
      // volume 表示声音的值,从 // 0~1
      if (isNaN(value)) return;
      if (value < 0 || value > 1) return;
      this.audio.volume = value;
    },
  };
  Player.prototype.init.prototype = Player.prototype;
  window.Player = Player;
})(window);
