(function(){
    var childrenlist = document.querySelector('.left').querySelectorAll('.childrenlist');
    //点击初始化
    function init(){
        for(var j = 0; j<childrenlist.length; j++){
            childrenlist[j].className= 'childrenlist';
        }
    }
    for(var i = 0; i<childrenlist.length; i++){
        childrenlist[i].index = i;
        childrenlist[i].onclick = function(){
            init();
            childrenlist[this.index].className='childrenlist show';
        }
    }
    
 })()   