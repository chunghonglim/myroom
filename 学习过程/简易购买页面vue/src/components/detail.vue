<template>
    <div>
        <div class="contain">
            <div class="leftbox">
                <div class="pic">
                    <img :src="shoppics[nowindex].url" alt="">
                </div>
                <ul>
                    <router-link 
                    v-for='(product,index) in products' 
                    tag="li" 
                    :to='product.path' 
                    :class='{active:index == nowindex}' 
                    @click.native='changebck(index)' 
                    >
                        {{ product.name }}
                    </router-link>
                </ul>
            </div>
            <div class="rightbox">
                <keep-alive>
                    <router-view  @leftli='changelibkc'>
                    </router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['shoppics'],
        data () {
            return {
                nowindex: '0',
                products: [
                    {
                        name: '数据统计',
                        path: 'earth'
                    },
                    {
                        name: '数据预测',
                        path: 'car'
                    },
                    {
                        name: '流量分析',
                        path: 'hill'
                    },
                    {
                        name: '广告发布',
                        path: 'loud'
                    },
                ]
            }
        },
        methods: {
            changebck (index) {
                this.nowindex = index
            },
            changelibkc (routerindex) {
                this.nowindex = routerindex
                console.log(123)
            }
        }
    }
</script>

<style scoped>
    .contain{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        padding-top: 20px;
    }
    img{
        margin-top: 10px;
    }
    .leftbox{
        float: left;
        width: 200px;
        text-align: center;
        background-color: #fff;
        margin-right: 20px;
    }
    ul{
        margin-top: 20px;
        padding-bottom: 20px;
    }
    li{
        padding: 10px 15px;
        cursor: pointer;
    }
    li:hover{
        background-color: #4fc08d;
        color: #fff;
    }
    .detail-right {
        float: left;
        width: 980px;
        margin-left: 20px;
    }
    .active{
        background-color: #4fc08d;
        color: #fff;
    }
    .rightbox{
        float: left;
    }
</style>