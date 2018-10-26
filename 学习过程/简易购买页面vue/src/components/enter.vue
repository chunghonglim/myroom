<template>
    <div>
        <div class="dialog">
            <span class="close" @click='clickclose'>x</span>
            <div>
                <span class="uesrname">用户名：</span>
                <input type="text" placeholder="请输入用户名" v-model='id'>
                <span class="warning">{{ checkid }}</span>
            </div>
            <div>
                <span class="userpassword">密码：</span>
                <input type="password" placeholder="请输入密码" v-model='passid'>
                <span class="warning">{{ checkpassid }}</span>
            </div>
            <button @click='rewarn'>提交</button>
            <p>{{ answer }}</p>     
        </div>
        <div class="tanchuang" @click='clickclose'></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            id: '',
            passid: '',
            usernameerror: '',
            userpasserror: '',
            answer: ''
        }
    },
    methods: {
        clickclose () {
            this.$emit('closeenter')
        },
        rewarn () {
            if(!/@/g.test(this.id)|!/^\w{6,8}$/g.test(this.passid)){
                this.answer = '部分选项未通过'
                return this.answer
            }
            else{
                this.answer = ''
                this.$emit('getid',this.id)
                this.clickclose()
                return this.answer
            }
        }
    },
    computed: {
        checkid () {
            if(/@/g.test(this.id)){
                this.usernameerror = ''
                return this.usernameerror
            }
            else{
                this.usernameerror = '用户名应包含@'
                if (!this.userFlag) {
                    this.usernameerror = ''
                    this.userFlag = true
                }              
                return this.usernameerror
            }
        },
        checkpassid () {
            if(/^\w{6,8}$/g.test(this.passid)){
                this.userpasserror = ''
                return this.userpasserror
            }
            else{
                this.userpasserror = '密码应为6-8位'
                if (!this.passwordFlag) {
                    this.userpasserror = ''
                    this.passwordFlag = true
                }
                return this.userpasserror
            }
        }
    }
}
</script>

<style scoped>
    .tanchuang{
        width:100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        left: 0;
        top: 0;

    }
    .dialog{
        width: 647px;
        height: 196px;
        position: fixed;
        left: 30%;
        top: 20%;
        background-color: #fff;
        padding: 8px;
        border: 2px solid #464068;
        z-index: 10;
    }
    .dialog .close{
        position: absolute;
        right: 8px;
        top: 8px;
        cursor: pointer;
    }
    .dialog .close:hover {
        color: #4fc08d;
    }
    .uesrname{
        width: 100px;
        display: inline-block;
        font-size: 16px;
    }
    .userpassword{
        width: 100px;
        display: inline-block;
        font-size: 16px;
    }
    .dialog div{
        margin: 30px;
    }
    .dialog button{
        margin-left: 130px;
    }
    .warning{
        color: red;
        margin-left: 20px;
    }
    p{
        padding-top: 20px;
        margin-left: 130px;
    }
    button{
        height: 28px;
        width: 80px;
        background-color: #4fc08d;
        color: #fff;
        line-height: 28px;
        text-align: center;
    }
</style>