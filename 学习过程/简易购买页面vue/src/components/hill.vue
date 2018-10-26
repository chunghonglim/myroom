<template>
        <div class='introduce'>
            <div class="top">
                <h2>流量分析</h2>
                <p class="words">是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>        
                <div class="choose">
                    <div class="head">
                        <span class='title'>购买数量:</span>
                        <span class='crease mrgleft' @click='decrease'>-</span>
                        <span class='numb'><input type="text" v-model='num'>{{ controll }}</span>
                        <span class='crease mrgright' @click='increase'>+</span>
                    </div>
                    <div>
                        <span class='title'>产品类型:</span>
                        <select name="" id="">
                            <option value="入门版">入门版</option>
                            <option value="中级版">中级版</option>
                            <option value="高级版">高级版</option>
                            <option value="大师版">大师版</option>
                        </select>
        
                    </div>
                    <div>
                        <span class='title'>有效时间:</span>
                        <ul>
                            <li v-for='(item,index) in styles' 
                            :title='item.style' 
                            @click='clickchange(index)' 
                            :class='{ bgc: nowindex == index }'>
                            {{ item.style }}
                        </li>
                        </ul>
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
                <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。 以上这些情景不是科幻大片独有的，它们有的已经或会在未来的某一天成为现实。而这一切所倚靠的就是预测分析技术。 大数据时代下，作为其核心，预测分析已在商业和社会中得到广泛应用。随着越来越多的数据被记录和整理，未来预测分析必定会成为所有领域的关键技术。 作为预测分析领域的专家，埃里克·西格尔博士深谙预测分析界已经实现和正在发生的事情、面临的问题和将来可能的前景。在《大数据预测》一书中，他结合预测分析的应用实例，对其进行了深入、细致且全面的解读。 关于预测分析，你想了解的全部，你的生活以及这个世界会因为预测分析改变到什么程度，《大数据预测》都会告诉你。</p>
                <h2 class='bold'>用户行为指标</h2>
                <p>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</p>
                <p>用户在网站的停留时间；</p>
                <p>用户来源网站（也叫“引导网站”）；</p>
                <p>用户所使用的搜索引擎及其关键词；</p>
                <p>在不同时段的用户访问量情况等。</p>
                <h2 class='bold'>浏览网站方式</h2>
                <p>用户上网设备类型</p>
                <p>用户浏览器的名称和版本</p>
                <p>访问者电脑分辨率显示模式</p>
                <p>用户所使用的操作系统名称和版本</p>
                <p>用户所在地理区域分布状况等</p>

            </div>
        </div>
    </template>
    
<script>
export default {
    data () {
        return {
            routerindex: '2',
            num: '20',
            price : '100',
            nowindex: '0',
            styles: [
                {
                    style: '半年',
                    change: false
                },
                {
                    style: '一年',
                    change: false
                },
                {
                    style: '三年',
                    change: false
                },
            ],
            editors: [
                {
                    editor: '客户版',
                    change: false
                },
                {
                    editor: '代理商版',
                    change: false
                },
                {
                    editor: '专家版',
                    change: false
                },
            ],
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
</style>