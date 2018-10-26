(function(){
    var name = document.querySelector('#name'),
        password = document.querySelector('#password'),
        code = document.querySelector('#code'),
        logining = document.querySelector('#logining');
        logining.disabled = true; //刚加载默认不可点击
    var eventUntil = {
        getEvent : function(event){
            return event || window.event;
        },
        getTarget : function(event){
            return event.target || event.srcElement
        },
        addHandle : function(element,type,handle){
            if(element.addEventListener){
                element.addEventListener(type,handle,false)
            }
            else if(element.attachEvent){
                element.attachEvent('on'+type,handle)
            }
            else{
                element["on"+type] = handle;
            }
        }
    }
    //判定是否可以登陆函数
    function bgchange(){
        if(name.value.length < 18 || password.value.length < 6 || code.value.length < 6 ){
            logining.disabled = true;
            logining.className = '';
        }
        else{
            logining.className = 'bgchange';
            logining.disabled = false;
        }
    }

    //用户名和密码及验证码输入判断事件
    eventUntil.addHandle(document,'keyup',function(){
        var event = eventUntil.getEvent(event);
        var target = eventUntil.getTarget(event);
        switch(target.id){
            case 'name' :bgchange();
                        name.value = name.value.replace(new RegExp("[\\u4E00-\\u9FFF]+","g"),'');
                        if(name.value.length>18){
                            name.value = name.value.slice(0,18);
                        }
                        break;
            case 'password' :bgchange();
                            break;
            case 'code' :bgchange();
                        code.value = code.value.replace(/\D/g,'');
                        if(code.value.length > 6){
                            code.value = code.value.slice(0,6);
                        }
                        break;
        }
    })
})()