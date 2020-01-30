window.onload = function(){
    // 1 获取biaoqian
    var allList = $('tab_header').getElementsByTagName('li')
    var allDom = $('tab_content').getElementsByClassName('dom')
/*     console.log(allList);
    console.log(allDom); */

    // 遍历监听
    for(var i = 0; i<allList.length;i++){
        var li = allList[i];
        li.index = i;
        li.onmouseover = function () {
            for (let j = 0; j < allList.length; j++) {
                allList[j].className = '';
                allDom[j].style.display = 'none'
            }
            this.className = 'selected';
            // 通过arr[i]方式获取节点，然后对样式进行修改
            allDom[this.index].style.display = 'block';
        }
    }
    
    
}

function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null
}