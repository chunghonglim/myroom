(function (){
    var obox=document.querySelector('.banner').querySelectorAll('.box'),
        opic=document.querySelector('.banner').querySelectorAll('.pic'),
        smallpic=document.querySelector('.banner').querySelector('.smallpic'),
        nowindex = 0, //序列
        clearauto; //计时器
    //初始化样式
    obox[0].className = 'box zindex';
    obox[0].style.opacity = '1';
    opic[0].style.borderColor = '#3499ea';
    
    //清除样式
    function unshow(){
        for(var i = 0; i < opic.length; i++){
            opic[i].style.borderColor = '#fff';
            obox[i].style.opacity = '0';
            obox[i].className = 'box';
        }
    }
    
    //自动轮播函数
    function autoban(){
        nowindex++;
        nowindex = nowindex % 5;
        unshow();
        opic[nowindex].style.borderColor = '#3499ea';
        obox[nowindex].style.opacity = '1';
    }
    //自动轮播执行函数
    function auto(){
        clearauto = setInterval(autoban,3000)
    }
    
    auto();

    for(var i = 0; i < opic.length; i++){
        opic[i].index = i;
        opic[i].onmouseenter = function (){
            unshow();
            nowindex = this.index;
            obox[this.index].className = 'box zindex'
            opic[this.index].style.borderColor = '#3499ea';
            obox[this.index].style.opacity = '1';
            clearInterval(clearauto);
        }
        //鼠标判断轮播事件
        obox[i].onmouseleave = function (){
            auto();
        }
        smallpic.onmouseleave = function(){
            auto();
        }
        obox[i].onmouseenter = function (){
            clearInterval(clearauto);
        }
    }
})()