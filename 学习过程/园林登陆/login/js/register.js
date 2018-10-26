(function(){
    var form = document.querySelector('form'),
        formchild = form.children;
    
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
    
    //点击指引特效
    function clear(){
        for(var i=0;i<formchild.length-1;i++){
            formchild[i].style.borderBottom = '1px solid #E0E0E0';
        }
    }
    function change(target){
        clear();
        target.parentNode.style.borderBottom = '1px solid green';
    }
    eventUntil.addHandle(document,'click',function(){
        var event = eventUntil.getEvent(event);
        var target = eventUntil.getTarget(event);
        switch(target.nodeName){
            case 'INPUT': change(target);
                          break;
        }
    })

    //判断提交过程及准确性
    var name = document.querySelector('#name'),
        card = document.querySelector('#card'),
        phone = document.querySelector('#phone'),
        code = document.querySelector('#code'),
        password = document.querySelector('#password'),
        repassword = document.querySelector('#repassword'),
        email = document.querySelector('#email'),
        readyRegister = document.querySelector('#ready-register');
        readyRegister.disabled = true;   //刚加载默认不可点击
        
    //判定是否可以提交
    function bgchange(){
        if(name.value == '' || card.value.length< 18 || phone.value.length < 11
            || password.value.length < 6 || email.value == '' || code.value.length < 6 
            || password.value != repassword.value ){
            readyRegister.disabled = true;
            readyRegister.className = '';
        }
        else{
            readyRegister.className = 'bgchange';
            readyRegister.disabled = false;
        }
    }

    //判断输入准确性
    eventUntil.addHandle(document,'keyup',function(){
        var event = eventUntil.getEvent(event);
        var target = eventUntil.getTarget(event);
        switch(target.id){
            case 'name'  :bgchange();
                        break;
            case 'phone' :bgchange();
                        target.value = target.value.replace(/\D/g,'');
                        if(target.value.length > 11){
                            target.value = target.value.slice(0,11);
                        }  
                        break;
            case 'card'  :bgchange();
                        target.value = target.value.replace(new RegExp("[\\u4E00-\\u9FFF]+","g"),'')
                        if(target.value.length>18){
                            target.value = target.value.slice(0,18);
                        }
                        break;
            case 'code'  :bgchange();
                        target.value = target.value.replace(/\D/g,'');
                        if(target.value.length > 6){
                            target.value = target.value.slice(0,6);
                        }  
                        break;
            case 'password' :bgchange();
                            break;
            case 'repassword' :bgchange();
                               break;            
            case 'email' :bgchange();
                          break;                            
        }
    })

    //判断二次输入密码是否正确
    function passWord(){
        var inputElement = repassword.parentNode.children[2];
        if(repassword.value != password.value && repassword.value != ''){
            inputElement.className = 'check-password';
            inputElement.innerHTML = '密码不一致';
        }
        else if(repassword.value == password.value){
            inputElement.className = '';
            inputElement.innerHTML = '';
        }
    }

    eventUntil.addHandle(repassword,'blur',passWord)
    eventUntil.addHandle(password,'blur',passWord)
})()