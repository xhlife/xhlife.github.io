//  创建音乐列表  初始化歌词
function getPlayerList(data) {  
    var $content_list = $('.content_list')
    $.each(data,function(index, item){
        var $item = createItem(index,item)
        $content_list.append($item)
    }) 
    // 初始化歌曲信息函数调用
    initMusicInfo(data[0])
}

// 创建每一条歌曲
function createItem(index, item) {
    
    var $li = document.createElement('li')
    $li.className = 'list_music'
    $li.innerHTML = `<div class="list_check">
                                <span class="check_box"></span>
                            </div>
                            <div class="list_number">${index+1}</div>
                            <div class="list_name">${item.name}

                                <div class="list_menu">
                                    <a href="javascript:;" title="播放" class="play play1"></a>
                                    <a href="javascript:;" title="添加" class="add"></a>
                                    <a href="javascript:;" title="下载" class="download"></a>
                                    <a href="javascript:;" title="分享" class="share"></a>
                                </div>

                            </div>
                            <div class="list_singer">${item.singer}</div>
                            <div class="list_time">
                                <span>${item.time}</span>
                                <a href="javascript:;" title="删除" class='music_menu_del'>删除</a>
                            </div>`
        // 在原生的li对象上绑定index和music属性  
        $li.setAttribute('index',index)
        $li.setAttribute('item',item.link_url)
        $li.setAttribute('time', item.time)
    return $li
}

// 初始化歌曲信息
function initMusicInfo(music){
    // 获取对应的元素
    var $musicImage = $('.song_info_pic img')
    var $musicName = $('.song_info_name a')
    var $musicSinger = $('.song_info_singer a')
    var $musicAblum = $('.song_info_ablum a')
    var $musicProgessName = $('.music_progress_name')
    var $musicProgesstime = $('.music_progress_time')
    var $musicBg = $('.mask_bg')
    // 给对应得元素赋值
    $musicImage.attr('src', music.cover)
    $musicName.text(music.name)
    $musicSinger.text(music.singer)
    $musicAblum.text(music.album)
    $musicProgessName.text(music.name + "/" + music.singer)
    $musicProgesstime.text("00:00 / " + music.time)
    $musicBg.css("background","url('" + music.cover + "')")
}




    