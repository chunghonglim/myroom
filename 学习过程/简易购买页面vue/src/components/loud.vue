<template>
        <div class='introduce'>
            <div class="top">
                <h2>广告发布</h2>
                <p class="words">广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>        
                <div class="choose">
                    <div class="head">
                        <span class='title'>购买数量:</span>
                        <span class='crease mrgleft' @click='decrease'>-</span>
                        <span class='numb'><input type="text" v-model='num'>{{ controll }}</span>
                        <span class='crease mrgright' @click='increase'>+</span>
                    </div>
                    <div>
                        <span class='title'>行业:</span>
                        <select name="" id="">
                            <option value="出版业">出版业</option>
                            <option value="媒体">媒体</option>
                            <option value="金融">金融</option>
                            <option value="互联网">互联网</option>
                        </select>
        
                    </div>
                    <div>
                        <span class='title'>有效时间:</span><span>半年</span>
                    </div>
                    <div>
                        <span class='title'>产品版本:</span>
                        <ul>
                            <li v-for='(item,index) in editors' 
                            :title='item.editor' 
                            @click='change(index)' 
                            :class='{ bgc: item.change }'>
                            {{ item.editor }}
                        </li>
                        </ul>
                    </div>
                    <div><span class='title'>总价:</span><span>{{ price }}</span></div>
                    <div><span class='title'></span><button>立即购买</button></div>
                </div>
            </div>
            <div class="bottom">
                    <h2>产品说明</h2>
                    <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
                    <table>
                        <tr>
                            <td>安全安保</td>
                            <td>办公文教</td>
                            <td>彩票</td>
                            <td>车辆物流</td>
                            <td>成人用品</td>
                            <td>出版传媒</td>
                        </tr>
                        <tr>
                            <td>安全安保</td>
                            <td>办公文教</td>
                            <td>彩票</td>
                            <td>车辆物流</td>
                            <td>成人用品</td>
                            <td>出版传媒</td>
                        </tr>
                        <tr>
                            <td>安全安保</td>
                            <td>办公文教</td>
                            <td>彩票</td>
                            <td>车辆物流</td>
                            <td>成人用品</td>
                            <td>出版传媒</td>
                        </tr>
                        <tr>
                            <td>安全安保</td>
                            <td>办公文教</td>
                            <td>彩票</td>
                            <td>车辆物流</td>
                            <td>成人用品</td>
                            <td>出版传媒</td>
                        </tr>
                    </table>
                    </div>
        </div>
    </template>
    
<script>
export default {
    data () {
        return {
            routerindex: '3',
            num: '20',
            price : '100',
            nowindex: '0',
            editors: [
                {
                    editor: '初级版',
                    change: false
                },
                {
                    editor: '中级版',
                    change: false
                },
                {
                    editor: '高级版',
                    change: false
                },
                {
                    editor: '专家版',
                    change: false
                }
            ]
        }
    },
    methods: {
        clickchange (index) {
            this.nowindex = index
        },
        increase () {
            if(this.num>=100){
                this.num = 100
            }
            else{
                this.num++
            }
        },
        decrease () {
            if(this.num==0){
                this.num = 0
            }
            else{
                this.num--
            }
        },
        change (index) {
            this.editors[index].change = !this.editors[index].change
        }
    },
    mounted () {
        this.editors[0].change = true
        this.$emit('leftli', this.routerindex)
    },
    computed: {
        controll () {
            if(/\D/g.test(this.num)){
                this.num = 20
                this.price = 100
            }
            else(
                this.price = this.num * 5 * (this.nowindex + 1)
            )
        }
    }
}
</script>
    
<style scoped>
    .introduce{
        width: 900px;
    }
    .top{
        background-color: white;
        margin-bottom: 20px;
    }
    .bottom{
        background-color: white;
        padding: 15px 20px;
    }
    .bottom h2{
        font-size: 20px;
        padding-bottom: 15px;
    }
    .bottom p{
        line-height: 1.6;
    }
    .top h2{
        font-size: 20px;
        padding: 20px;
    }
    .top p{
        padding: 10px 20px;
        color: #999;
        line-height: 1.8;
    }
    .choose{
        padding: 30px 20px;
        font-size: 14px;
    }
    div{
        padding-bottom: 20px;
    }
    .title{
        width: 100px;
        display: inline-block;
        vertical-align: middle;
    }
    select{
        opacity: .5;
        border-radius: 10%;
        height: 25px;
    }
    button{
        background: #4fc08d;
        color: #fff;
        padding: 8px 16px;
        cursor: pointer;
        border: none;
    }
    .bcgc{
        background: #4fc08d;
        color: #fff;
    }
    .bcgc{
        background-color: white;
    }
    .crease{
        display: inline-block;
        border: 1px solid #e3e3e3;
        height: 25px;
        line-height: 25px;
        width: 25px;
        text-align: center;
        cursor: pointer;
    }
    .numb{
        display: inline-block;
        border: none;
        height: 25px;
        line-height: 25px;
        width: 27px;
        text-align: center;
        outline: none;
        border-bottom: 1px solid #e3e3e3;
        border-top: 1px solid #e3e3e3;
    }
    input{
        border: none;
        height: 22px;
        line-height: 22px;
        width: 27px;
        text-align: center;
        outline: none;

    }
    .mrgleft{
        margin-right: -4px;
    }
    .mrgright{
        margin-left: -4px;
    }
    ul{
        display: inline-block;
        vertical-align: middle;
    }
    li{
        float: left;
        padding: 8px;
        border: 1px solid #e3e3e3;
        color: black;
        background-color: white;
        border-radius: 10%;
        margin-right: 10px;
        cursor: pointer;
    }
    .bgc{
        background: #4fc08d;
        color: #fff;
    }
    .words{
        background: #f7fcff;
        padding: 10px 20px;
        color: #999;
        line-height: 1.8;
    }
    .bold{
        font-weight: bold;
        padding-top: 20px;
    }
    table{
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
        border-spacing: 0;
        box-shadow: 0 0 black;
        text-align: center;
        margin: 10px auto;
    }
    td{
        border: 1px solid #f0f2f5;
        padding: 15px;
    }

</style>