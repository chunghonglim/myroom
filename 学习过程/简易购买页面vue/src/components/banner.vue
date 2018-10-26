<template>
    <div class='banner' @mouseout='startban' @mouseover='stopban'>
        <router-link :to='pics[nowindex].path'><img :src='pics[nowindex].url' alt=""></router-link>
        <div class='pagenum'>
            <h2>{{ pics[nowindex].page }}</h2>
            <ul>
                <li @click='left'>&lt;</li>
                <li v-for='(list,index) in lists' @click='change(index)' 
                :class='{underline: index == nowindex}'>{{ list.title }}</li>
                <li @click='right'>&gt;</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props : ['pics'],
    data () {
        return {
            nowindex: '0',
            lists: [
                {
                    title: '1'
                },
                {
                    title: '2'
                },
                {
                    title: '3'
                },
                {
                    title: '4'
                }
            ]
        }
    },
    methods: {
        left () {
            if(this.nowindex==0){
                this.nowindex = 3
            }
            else{
                this.nowindex--
            }
        },
        right () {
            this.nowindex++
            this.nowindex = this.nowindex % 4
        },
        change (index) {
            this.nowindex = index
        },
        startban () {
            this.autoban=setInterval(() => {
            this.right()
            },2000)
        },
        stopban () {
            clearInterval(this.autoban)
        }
    },
    mounted () {
            this.startban()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .banner{
        float: left;
        width: 900px;
        height: 506px;
        position: relative;
        margin-bottom: 10px;
    }
    .banner img{
        position: absolute;
        left: 0;
        top: 0;
    }
    .pagenum{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0,0,0,.5);
        height:30px;
        color: #fff;
    }
    .pagenum h2,ul{
        display: block;
    }
    .pagenum h2{
        float: left;
        line-height: 30px;
        margin-left: 15px;
    }
    .pagenum ul{
        float: right;
    }
    .pagenum ul li{
        float: left;
        line-height: 30px;
        margin-right: 10px;
        cursor: pointer;
    }
    .underline{
        text-decoration: underline;
    }
    .banpic-enter,.banpic-leave-to{
        transform: translatex(100px)
    }

</style>
