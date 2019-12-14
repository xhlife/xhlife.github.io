const ap = new APlayer({
    container: document.getElementById('aplayer'), //播放器容器元素
    fixed: false,
    mini: false, //迷你模式
    autoplay: false, //自动播放
    theme: '#FADFA3', //主题色
    loop: 'all', //音频循环播放, 可选值: 'all'全部循环, 'one'单曲循环, 'none'不循环
    order: 'random', //音频循环顺序, 可选值: 'list'列表循环, 'random'随机循环
    preload: 'auto', //预加载，可选值: 'none', 'metadata', 'auto'
    volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
    mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    listFolded: true, //列表默认折叠
    listMaxHeight: 90, //列表最大高度
    audio: [
        {
            name: '听妈妈的话',
            artist: '周杰伦',
            url: '/audio/听妈妈的话+-+周杰伦.mp3',
            theme: '#ebd0c2'
        },
        {
            name: '野孩子',
            artist: '杨千嬅',
            url: '/audio/野孩子.m4a',
            theme: '#46718b'
        },
        {
            name: '等你下课',
            artist: '周杰伦',
            url: '/audio/周杰伦-等你下课(with+杨瑞代).mp3',
            theme: '#848484'
        },
        {
            name: '稻香',
            artist: '周杰伦',
            url: '/audio/周杰伦 - 稻香.mp3',
            theme: '#342'
        },
        {
            name: '七里香',
            artist: '周杰伦',
            url: '/audio/周杰伦 - 七里香.mp3',
            theme: '#289797'
        },
        {
            name: 'love story',
            artist: 'Taylor Swift',
            url: '/audio/love story.mp3',
            theme: '#492346'
        },
        {
            name: '晴天',
            artist: '周杰伦',
            url: '/audio/周杰伦 - 晴天.mp3',
            theme: '#569999'
        },
        {
            name: 'welcome to new York',
            artist: 'Taylor Swift',
            url: '/audio/Taylor Swift - Welcome To New York.mp3',
            theme: '#562323'
        },
        {
            name: 'Intro',
            artist: 'The xx',
            url: '/audio/The xx - Intro.mp3',
            theme: '#848484'
        },
        {
            name: '写给我第一个喜欢的女孩的歌',
            artist: '凯瑟喵',
            url: '/audio/凯瑟喵 - 写给我第一个喜欢的女孩的歌.mp3',
            theme: '#c98888'
        },
        {
            name: '半岛铁盒',
            artist: '周杰伦',
            url: '/audio/半岛铁盒+-+周杰伦.mp3',
            theme: '#569999'
        }
    ]
});