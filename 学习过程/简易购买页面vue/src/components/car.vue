<template>
    <div class='introduce'>
        <div class="top">
            <h2>数据预测</h2>
            <p>未来，大数据会变得越来越重要，其核心应用预测也会成为互联网行业以及产业变革的重要力量，我们很有必要对数据预测及其分析方法进行全面且深入的了解。在这一点上，《大数据预测》是本很好的读物，适合大数据所有相关行业的人阅读。</p>        
            <div class="choose">
                <div class="head">
                    <span class='title'>购买数量:</span>
                    <span class='crease mrgleft' @click='decrease'>-</span>
                    <span class='numb'><input type="text" v-model='num'>{{ controll }}</span>
                    <span class='crease mrgright' @click='increase'>+</span>
                </div>
                <div>
                    <span class='title'>媒介:</span>
                    <ul>
                        <li v-for='(item,index) in styles' 
                        :title='item.style' 
                        @click='clickchange(index)' 
                        :class='{ bgc: item.change }'>
                        {{ item.style }}
                    </li>
                    </ul>
                </div>
                <div><span class='title'>有效时间:</span><span>一年</span></div>
                <div><span class='title'>总价:</span><span>{{ price }}</span></div>
                <div><span class='title'></span><button>立即购买</button></div>
            </div>
        </div>
        <div class="bottom">
            <h2>产品说明</h2>
            <p>2020年的一天，在你驱车前往公司的路上，导航系统通过预测交通流量，会自动帮你选择一条最合适的交通路线；车内推荐系统会根据你的饮食习惯预测你可能会喜欢吃什么，并推荐沿途的早餐店；你的电子社交助理已经为你自动选择了你可能感兴趣的社交网信息；当车内系统预测到你驾车有些分心时，座椅会自动震动进行提醒…… 以上这些情景不是科幻大片独有的，它们有的已经或会在未来的某一天成为现实。而这一切所倚靠的就是预测分析技术。 大数据时代下，作为其核心，预测分析已在商业和社会中得到广泛应用。随着越来越多的数据被记录和整理，未来预测分析必定会成为所有领域的关键技术。 作为预测分析领域的专家，埃里克·西格尔博士深谙预测分析界已经实现和正在发生的事情、面临的问题和将来可能的前景。在《大数据预测》一书中，他结合预测分析的应用实例，对其进行了深入、细致且全面的解读。 关于预测分析，你想了解的全部，你的生活以及这个世界会因为预测分析改变到什么程度，《大数据预测》都会告诉你。</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            routerindex: '1',
            num: '20',
            price : '100',
            styles: [
                {
                    style: '纸质报告',
                    change: false
                },
                {
                    style: 'PDF',
                    change: false
                },
                {
                    style: '页面报告',
                    change: false
                },
                {
                    style: '邮件',
                    change: false
                },
            ]
        }
    },
    methods: {
        clickchange (index) {
            this.styles[index].change = !this.styles[index].change
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
        }
    },
    mounted () {
        this.styles[0].change = true
        this.$emit('leftli', this.routerindex)
    },
    computed: {
        controll () {
            if(/\D/g.test(this.num)){
                this.num = 20
                this.price = 100
            }
            else(
                this.price = this.num * 5
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
</style>