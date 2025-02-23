// 创建audio标签
var audio = new Audio();
$('body').append(audio)
// 初始化audio
var $audio = $('audio')
var player = new Player($audio)

// 音乐进度条初始化 及 操作
var $progressBar = $('.music_progress_bar')
var $progressLine = $('.music_progress_line')
var $progressDot = $('.music_progress_dot')
var progress = new Progress($progressBar,$progressLine,$progressDot)
progress.progressClick(function(value) {
    player.musicSeekTo(value,function() {
        $('.music_play').trigger('click')
    })
})
progress.progressMove(function(value){
     player.musicSeekTo(value,function(){})
})

// 声音进度条初始化 及 操作
var $voiceBar = $('.music_voice_bar')
var $voiceLine = $('.music_voice_line')
var $voiceDot = $('.music_voice_dot')
var voiceProgress = new Progress($voiceBar, $voiceLine, $voiceDot)
voiceProgress.progressClick(function (value) {
    player.musicVoiceSeekTo(value)
})
voiceProgress.progressMove(function (value) {
    player.musicVoiceSeekTo(value)
})

// jsonp
function dataJson(data) {
    // 通过数据创建音乐列表 getPlayerList()为getlist.js的一个函数
    getPlayerList(data)
    console.log(data)
    player.musicList = data
}

// 对鼠标移入移出,点击事件进行监听
$(function() {  
    // 自定义滚动条
    $('.content_list').mCustomScrollbar()
    // 1-监听歌曲列表每一项的移入和移出，显示列表菜单。
        // jq得hover方法接收两个函数，第一个函数，鼠标移入做得事，2移出
    $('.list_music').hover(function(){
        // 显示子菜单  隐藏歌曲时长
            // jq的find()可以找到后代所有元素
        $(this).find(".list_menu").stop().fadeIn(100)
        $(this).find('.list_time a').stop().fadeIn(100)
        $(this).find('.list_time span').stop().fadeOut(100)
    },function(){
        // 隐藏子菜单  显示时长
            $(this).find(".list_menu").stop().fadeOut(100)
            $(this).find('.list_time a').stop().fadeOut(100)
            $(this).find('.list_time span').stop().fadeIn(100)
    })

    // 2-监听选中按钮得点击
    $('.list_check').click(function(){
        $(this).find('.check_box').toggleClass('checked')
    })

    // 3-监听子菜单播放按钮的点击
        // 获取底部的播放按钮
        var $musicPlay = $('.music_play')
    $('.play').click(function(){
        var $item = $(this).parents('.list_music')
       
        // 点击切换类
        if ($(this).hasClass('play1')) {
            $(this).removeClass('play1')
            $(this).addClass('play2')
        }
        else{
            $(this).removeClass('play2')
            $(this).addClass('play1')
        }
        // 播放图标排斥  只能一首音乐在播放
        $item.siblings().find('.play').removeClass('play2')
        $item.siblings().find('.play').addClass('play1')

        // 同步底部的播放按钮
            // 检测子菜单的播放按钮是否处于播放状态
        if ($(this).attr('class').indexOf('play2') != -1) {
            $musicPlay.addClass('music_play2')
            // 让文字高亮
            $item.find('div').css('color','#fff')
                // 文字高亮排他
            $item.siblings().find('div').css('color', 'rgba(255,255,255, 0.5)')
        }else{
            $musicPlay.removeClass('music_play2')
            //让文字不高亮
            $item.find('div').css('color', 'rgba(255,255,255, 0.5)')
        }

        // 切换序号的状态, (播放波浪显示)
        $item.find('.list_number').toggleClass('list_number2')
            // 排他 -- 只能播放的音乐显示波浪
        $item.siblings().find('.list_number').removeClass('list_number2')
        
        // 播放音乐
            // 获取索引和音乐信息
        var index = $item.attr('index')
        var item = $item.attr('item')
        // if ($audio != null) {
        //     audio.src = item;
        // }
        var time = $item.attr('time')
        player.playMusic(index,item, time)

        // 切换歌曲信息
        initMusicInfo(player.musicList[index])
        // 切换歌词信息
        initMusicLyric(player.musicList[index])
    })

    // 4-监听底部控制区域播放按钮
    $musicPlay.click(function(){
        // 判断是否播放过音乐
        if (player.currentIndex === -1) {
            // 没有播放过音乐
                // eq()选择器,返回指定序号的dom
                // trigger()函数, 触发指定的事件
            $('.list_music').eq(0).find('.play').trigger('click')
        }else{
            // 已经播放过音乐
            $('.list_music').eq(player.currentIndex).find('.play').trigger('click')
        }
    })

    // 5-监听底部控制区域上一首按钮
    $('.music_pre').click(function () {
        $('.list_music').eq(player.preIndex()).find('.play').trigger('click')
    })

    // 6-监听底部控制区域下一首按钮
    $('.music_next').click(function () {
        $('.list_music').eq(player.nextIndex()).find('.play').trigger('click')
    })

    // 7-监听删除按钮的点击
    $('.music_menu_del').click(function(){
        var $item = $(this).parents('.list_music')

        // 判断当前音乐是否正在播放
        if ($item.attr('index') === player.currentIndex) {
            $('.music_next').trigger('click')
        }
        $item.remove()
        player.changeMusic($item.attr('index'))
        
        // 重新排序
        $('.list_music').each(function(index,ele){
            ele.setAttribute('index', index)
            $(ele).find('.list_number').text(index + 1)
        })
    })

    // 8-监听播放的进度
        //audio标签的事件--timeupdata
    player.musicTimeUpdate(function (currentTime, duration, timeStr) {
        // 同步时间
        $('.music_progress_time').text(timeStr)
        // 同步进度条
            // 播放比例的计算
        var value = currentTime / duration * 100
        progress.setProgress(value)
        if (currentTime === duration) {
            $('.music_next').trigger('click');
        }

        // 同步歌词
        var index = lyric.currentIndex(currentTime)
        var $item = $('.song_lyric li').eq(index)
        $item.addClass('cur')
        $item.siblings().removeClass('cur')

        if (index < 2) return  
        $('.song_lyric').css({
            marginTop: (-index +2) * 30
        })
    })

    // 9-监听声音按钮的点击
    $('.music_voice_icon').click(function(){
        // 图标的切换
        $(this).toggleClass('music_voice_icon2')
        // 声音的切换
        if ($(this).hasClass('music_voice_icon2')) {
            // 变为没有声音
            player.musicVoiceSeekTo(0)
        }else{
            // 变为有声音
            player.musicVoiceSeekTo(1)
        }
    })

    /* getPlayerMusic()
    function getPlayerMusic() {
        $.ajax({
            url: '../js/getlist.js',
            dataType: 'jsonp',
            jsonp: 'callback',
            timeout: 2000,
            success: function(res){
                console.log(res);
            },
            error: function(e){
                console.log(e); 
            }
        })
    } */
    initMusicLyric(player.musicList[0])
    var lyric
    function initMusicLyric(music) {
        lyric = new Lyric(music.link_lrc)
        var $lyricCon = $('.song_lyric')
        // 清空上一首音乐的歌词
        $lyricCon.html('')
        lyric.loadLyric(function () {
            // 创建歌曲列表
            $.each(lyric.lyrics, function (index, ele) {
                var $item = $("<li>" + ele + "</li>")
                $lyricCon.append($item)
            })
        })
    }
    
})

// 初始化歌词信息
// 初始化歌词列表函数调用
