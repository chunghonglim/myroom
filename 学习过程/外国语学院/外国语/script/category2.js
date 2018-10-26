(function(){
    var childlist = document.querySelector('.left').querySelectorAll('.childlist'),
        list = document.querySelector('.left').querySelectorAll('.list');
        //点击初始化
        function init(){
            for(var j = 0; j<list.length; j++){
                for (var k= 0; k<childlist.length; k++){
                    childlist[k].style.display = 'none';
                }
                list[j].className= 'list';
            }
        }
        for(var i = 0; i<list.length; i++){
            list[i].index = i;
            list[i].onclick = function(){
                init();
                childlist[this.index].style.display = 'block';
                console.log(childlist[this.index]);
                list[this.index].className='list show';
                
            }
        }
    
})() 