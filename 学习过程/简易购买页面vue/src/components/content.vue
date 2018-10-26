<template>
    <div>
        <div class='left'>
            <h2>全部产品</h2>
            <template  v-for='product in productlists'>
                <h3>{{ product.title }}</h3>
                <ul>
                    <li v-for='item in product.lists'>
                        <a :href='item.url'>{{ item.name }}</a>
                        <span class='hot' v-if="item.hot">HOT</span>
                    </li>
                </ul>
                <div v-if="product.underline" class="hr"></div>
            </template>
            <div class="br"></div>
            <h2 class='newmes'>最新消息</h2>
            <template>
                <ul>
                    <li v-for='news in newslists' class='news'><a :href="news.url">{{ news.title }}</a></li>
                </ul>
            </template>
        </div>
        <keep-alive>
            <banner :pics='pics'></banner>
        </keep-alive>        
        <div class='shoparea'>
            <template v-for='shop in shoplists'>
                <div class='shop' :class='shop.mrgr'>
                    <div class='shopdetail' :class='shop.id'>
                        <h2>{{ shop.title }}</h2>
                        <p>{{ shop.description }}</p>
                        <div class='btn'>
                            <router-link :to='shop.path' class='buy'>立即购买</router-link>
                        </div>
                    </div>
                </div>
            </template>   
        </div>
    </div>
</template>
    
<script>
import banner from './banner'
export default {
    components: {
        banner
    },
    data () {
        return {
           productlists: {
               pc:　{
                   title:　'PC产品',
                   underline:　true,
                   lists: [
                        {
                        name:　'数据统计',
                        url:　'http://www.baidu.com'
                        },
                        {
                        name: '数据预测',
                        url:　'http://www.baidu.com'
                        },
                        {
                        name: '流量分析',
                        url:　'http://www.baidu.com',
                        hot:　true
                        },
                        {
                        name: '广告发布',
                        url:　'http://www.baidu.com'
                        }
                    ]
               },
               phone:{
                   title :'手机应用类',
                   lists :[
                        {
                        name : '91助手',
                        url :'http://www.baidu.com'
                        },
                        {
                        name : '产品助手',
                        url :'http://www.baidu.com'
                        },
                        {
                        name :'智能地图',
                        url :'http://www.baidu.com',
                        hot :true
                        },
                        {
                        name :'团队语音',
                        url :'http://www.baidu.com'
                        }
                    ]
               }
           },
           newslists:　[
               {
                   title:　'这是标题1标题1标题1标题1标题1标题1标题1标题1标题1',
                   url :'http://www.baidu.com'
               },
               {
                   title:　'这是标题2标题2标题2标题2标题2',
                   url :'http://www.baidu.com'
               },
               {
                   title:　'这是标题3标题3标题3标题3标题3',
                   url :'http://www.baidu.com'
               },
               {
                   title:　'这是标题4标题4标题4',
                   url :'http://www.baidu.com'
               }
            ],
           shoplists:　[
               {
                   title: '开放产品',
                   description: '开放产品是一种产品',
                   id: 'erath',
                   path: '/detail/earth'
               },
               {
                   title: '品牌营销',
                   description: '品牌营销帮助你的产品更好地找到定位',
                   id: 'loud',
                   mrgr: 'mrgr',
                   path: '/detail/loud'
               },
               {
                   title: '使命必达',
                   description: '使命必达快速迭代永远保持最前端的速度',
                   id: 'car' ,
                   path: '/detail/car'          
                },
                {
                   title: '勇攀高峰',
                   description: '帮你勇闯高峰，到达事业的顶峰',
                   id: 'hill',
                   mrgr: 'mrgr'    ,
                   path: '/detail/hill'         
                }
            ],
           pics: [
            {
                url: require('../assets/banner/pic1.jpg'),
                page: 'xx1',
                path: '/detail/earth'
            },
            {
                url: require('../assets/banner/pic2.jpg'),
                page: 'xx2',
                path: '/detail/loud'
            },
            {
                url: require('../assets/banner/pic3.jpg'),
                page: 'xx3',
                path: '/detail/car'
            },
            {
                url: require('../assets/banner/pic4.jpg'),
                page: 'xx4',
                path: '/detail/hill'
            }
           ]
        }
    },
}
</script>
    

<style scoped>
    .left h2{
        background: #4fc08d;
        color: #fff;
        padding: 10px 15px;
        margin-bottom: 20px;
    }
    .left{
        background-color: #fff;
        float: left;
        overflow: hidden;
        width: 270px;
        min-height: 600px;
        margin-right: 30px;
    }
    .left h3{
        padding: 0 15px 5px 15px;
        font-weight: bold;
        color: #222;
    }
    .left ul{
        padding: 10px 15px;
    }
    .left ul li{
        padding: 5px;
    }
    .hr{
        height: 1px;
        width: 100%;
        background: #ddd;
        margin-bottom: 20px;
    }
    .br{
        height: 20px;
        width: 100%;
        background: #f0f2f5;

    }
    .hot{
        background: red;
        color: #fff;
    }
    .news{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 20px;
    }
    .shop{
        float: left;
        width: 430px;
        margin-right: 40px;
        box-shadow: 0 0 1px #ddd;
        background-color: #fff;
        margin-bottom: 20px;
    }
    .mrgr{
        margin-right: 0; 
    }
    .shoparea{
        float: left;
        width: 900px;
    }
    .shopdetail{
        padding: 20px 0 20px 140px;
    }
    .shoparea h2{
        font-size: 18px;
        font-weight: bold;
        color: #000;
        margin-bottom: 15px;
    }
    .shoparea .btn{
        margin-top: 15px;
    }
    .car{
        background-image: url(../assets/car.png);
        background-position: 15px 15px;
        background-repeat: no-repeat;
    }
    .loud{
        background-image: url(../assets/loud.png);
        background-position: 15px 15px;
        background-repeat: no-repeat;
    }
    .hill{
        background-image: url(../assets/hill.png);
        background-position: 15px 15px;
        background-repeat: no-repeat;
    }
    .erath{
        background-image: url(../assets/erath.png);
        background-position: 15px 15px;
        background-repeat: no-repeat;
    }
    .buy{
        display: block;
        height: 34px;
        width: 96px;
        background-color: #4fc08d;
        color: #fff;
        line-height: 34px;
        text-align: center;
    }
    .btn{
        margin-bottom: 5px;
    }
</style>