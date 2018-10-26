<template>
    <div class='introduce'>
        <div class="top">
            <h2>数据统计</h2>
            <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>        
            <div class="choose">
                <div class="head">
                    <span class='title'>产品类型:</span>
                    <ul>
                        <li v-for='(item,index) in titles' 
                        :class="{bcgc: nowindex == index}" 
                        @click='clickit(index)'>{{ item.name }}</li>
                    </ul>
                </div>
                <div>
                    <span class='title'>适用地区:</span>
                    <select name="" id="">
                        <option value="北京">北京</option>
                        <option value="广州">广州</option>
                        <option value="上海">上海</option>
                        <option value="重庆">重庆</option>
                        <option value="内蒙古">内蒙古</option>
                        <option value="西藏">西藏</option>
                    </select>
                    </div>
                <div><span class='title'>有效时间:</span><span>半年</span></div>
                <div><span class='title'>总价:</span><span>500</span></div>
                <div><span class='title'></span><button>立即购买</button></div>
            </div>
        </div>
        <div class="bottom">
            <h2>产品说明</h2>
            <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
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
                routerindex: '0',
                nowindex: '0',
                titles: [
                    {name: '红色版'},
                    {name: '蓝色版'},
                    {name: '绿色版'}
                ]
            }
        },
        methods: {
            clickit (index) {
                this.nowindex = index
            }
        },
        mounted () {
            this.$emit('leftli', this.routerindex)
        },
        
    }
</script>

<style scoped>
    .top{
        background-color: white;
        margin-bottom: 20px;
    }
    .top h2{
        font-size: 20px;
        padding: 20px;
    }
    .top p{
        background: #f7fcff;
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
    }
    li:hover{
        background-color: #4fc08d;
        cursor: pointer;
        color: white;
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
    .bottom{
        background-color: white;
        padding: 15px 20px;
    }
    .bottom h2{
        font-size: 20px;
        padding-bottom: 15px;
    }
    .bottom p{
        padding-bottom: 20px;
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
    .bcgc{
        background: #4fc08d;
        color: #fff;
    }
    select{
        opacity: .5;
        border-radius: 10%;
        height: 25px;
    }
</style>