<template>
    <div class='wrap'>
        <div class='contain'>
            <div class='f-song'>
                <div class='songinfo'>
                    <div class='left'>
                        <div class='cd'>
                            <img :src="picsrc" alt="">
                            <span></span>
                        </div>
                    </div>
                    <div class='right'>
                        <div class='hd'>
                            <span></span>
                            <div class='title'>{{ song }}</div>
                        </div>
                        <p>歌手 : 
                            <router-link tag='a' class='singer' to='/'>{{ singer }}</router-link>
                        </p>
                        <p>所属专辑 ：
                            <router-link tag='a' class='cd' to='/'>{{ cd }}</router-link>
                        </p>
                        <div class='btns'>
                            <span class='play' @click='submitinfo'>
                                <i>
                                    <em></em>
                                    <span>播放</span>
                                </i>
                            </span>
                            <span class='add'></span>
                            <span class='store'>
                                <a>收藏</a>
                            </span>
                            <span class='share'>
                                <a>分享</a>
                            </span>
                            <span class='download'>
                                <a>下载</a>
                            </span>
                        </div>
                        <div class='lyric'>
                            <p v-for='lyr in lyrictop'>{{ lyr }}</p>
                        </div>
                        <div class='lyric spr' v-show='top'>
                            <p v-for='lyr in lyricbottom'>{{ lyr }}</p>
                        </div>
                        <div class='spread'>
                            <span @click='spread'>展开 <i :class='{ top:top }' ></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class='lists'>
                <div class='relation'>
                    <h3>包含这首歌的歌单</h3>
                    <ul class='list'>
                        <li v-for='list in containsonglists' class='owe'>
                            <router-link tag='div' to='/' class='head'>
                                <img :src="list.coverImgUrl" alt="">
                            </router-link>
                            <div class='info'>
                                <router-link tag='p' to='/' class='description'>{{ list.name }}</router-link>
                                <p class='author'>by <router-link tag='span' to='/'> {{ list.creator.nickname }}</router-link></p>
                            </div>
                        </li>
                    </ul>
                    <h3>相似歌曲</h3>
                    <ul class='list'>
                        <li class='similar' v-for='song in similarsongs'>
                            <div class='text'>
                                <router-link to='/' class='song' tag='span'>{{ song.name }}</router-link>
                                <router-link to='/' class='singer' tag='span'>{{ song.artists[0].name }}</router-link>
                            </div>
                            <div class='ctr'>
                                <a class='ply' @click='submitInfo(song)'></a><a class='add'></a>
                            </div>
                        </li>
                    </ul>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import bus from './bus.js'

export default{
    data () {
        return {
            top: false,
            lyrictop: [],
            lyricbottom: [],
            songdetail: {},
            song: '',
            singer: '',
            cd: '',
            picsrc: '',
            containsonglists: [],
            similarsongs: []
        }
    },
    methods: {
        spread () {
            this.top = !this.top
        },
        submitinfo () {
            this.$store.commit('firstplay')
            const src = '/song/url?id=' + this.$route.params.songid
            this.$axios.get(src)
            .then(res => {
                this.$store.commit('playsrc',res)
                    if(this.$store.state.a.playsrc == null){
                    alert('付费歌曲')
                }
                else{
                    this.$store.commit('playdetail',this.songdetail)
                    bus.$emit('playnow')
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        submitInfo (song) {
            this.$store.commit('firstplay')
            const src = '/song/url?id=' + song.id
            this.$axios.get(src)
            .then(res => {
                this.$store.commit('playsrc',res)
                if(this.$store.state.a.playsrc == null){
                    alert('付费歌曲')
                }
                else{
                    this.$store.commit('similardetail',song)
                    bus.$emit('playnow')
                }
            })
            .catch(error => {
                console.log(error)
            })
        }

    },
    created() {
        /*获取歌词信息 第一次的时候还是得发请求，因为watch的时候第一个没变化*/
        this.$axios.get('/lyric?id='+ this.$route.params.songid)
        .then(res => {
            let lyric = res.data.lrc.lyric.replace(/\n*$/gi,'').split(/\s*\n*\[.*?\]\s*/).filter(v => !!v)
            this.lyrictop = lyric.slice(0,13)
            this.lyricbottom = lyric.slice(14,lyric.length - 1)
        })
        .catch(error => {
            console.log(error)
        }),
        this.$axios.get('/song/detail?ids=' + this.$route.params.songid)
        .then(res => {
            this.songdetail = res.data.songs[0]
            this.song = this.songdetail.name
            this.singer = this.songdetail.ar[0].name
            this.cd = this.songdetail.al.name
            this.picsrc = this.songdetail.al.picUrl
        })
        .catch(error => {
            console.log(error)
        }),
        this.$axios.get('/simi/playlist?id=' + this.$route.params.songid)
        .then(res => {
            this.containsonglists = res.data.playlists
        })
        .catch(error => {
            console.log(error)
        }),
        this.$axios.get('/simi/song?id=' + this.$route.params.songid)
        .then(res => {
            this.similarsongs = res.data.songs
        })
        .catch(error => {
            console.log(error)
        })
    },
    watch: {
        $route(to, from) {
            //获取歌词信息
            this.$axios.get('/lyric?id='+ to.params.songid)
            .then(res => {
                let lyric = res.data.lrc.lyric.replace(/\n*$/gi,'').split(/\s*\n*\[.*?\]\s*/).filter(v => !!v)
                this.lyrictop = lyric.slice(0,13)
                this.lyricbottom = lyric.slice(14,lyric.length - 1)
            })
            .catch(error => {
                console.log(error)
            }),
            this.$axios.get('/song/detail?ids=' + to.params.songid)
            .then(res => {
                this.songdetail = res.data.songs[0]
                this.song = this.songdetail.name
                this.singer = this.songdetail.ar[0].name
                this.cd = this.songdetail.al.name
                this.picsrc = this.songdetail.al.picUrl
            })
            .catch(error => {
                console.log(error)
            }),
            this.$axios.get('/simi/playlist?id=' + to.params.songid)
            .then(res => {
                this.containsonglists = res.data.playlists
            })
            .catch(error => {
                console.log(error)
            }),
            this.$axios.get('/simi/song?id=' + to.params.songid)
            .then(res => {
                this.similarsongs = res.data.songs
                console.log(this.similarsongs)
            })
            .catch(error => {
                console.log(error)
            })
            }
    }
}
</script>

<style scoped>
.wrap{
    width: 100%;
}
.wrap .contain{
    width: 980px;
    min-height: 700px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    background: url(https://s2.music.126.net/style/web2/img/frame/wrap4.png?2741a5764cb28ed634db6fb48fc1e464) repeat-y center 0;
    overflow: hidden;
}
.wrap .contain .f-song{
    width: 641px;
    float: left;
    padding: 47px 30px 40px 39px;
}
.wrap .contain .f-song .songinfo:after{
    clear: both;
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
}
.wrap .contain .f-song .songinfo .left{
    float: left;
    width: 206px;
    margin-right: -226px;
    position: relative;
}
.wrap .contain .f-song .songinfo .left .cd{
    width: 198px;
    height: 198px;
    position: relative;
}
.wrap .contain .f-song .songinfo .left .cd img{
    width: 130px;
    height: 130px;
    margin: 34px;
    display: block;
}
.wrap .contain .f-song .songinfo .left .cd span{
    display: block;
    width: 206px;
    height: 205px;
    position: absolute;
    top: -38px;
    left: -4px;
    background: url(https://s2.music.126.net/style/web2/img/coverall.png?cb3b2db561edc59ef68b9a8a6c8d0749) no-repeat;
    background-position: -140px -580px;
}
.wrap .contain .f-song .songinfo .right{
    float: right;
    width: 414px;
    overflow: hidden;
}
.wrap .contain .f-song .songinfo .right .hd span{
    display: inline-block;
    vertical-align: middle;
    width: 54px;
    height: 24px;
    background: url(https://s2.music.126.net/style/web2/img/icon.png?9a516ea…) no-repeat 0 9999px;
    background-position: 0 -463px;
}
.wrap .contain .f-song .songinfo .right .hd .title{
    display: inline-block;
    vertical-align: middle;
    font-weight: 500;
    font-size: 22px;
    margin-left: 8px;
}
.wrap .contain .f-song .songinfo .right p{
    font-size: 12px;
    color: #999;
    margin: 10px 0;
}
.wrap .contain .f-song .songinfo .right p a:hover{
    text-decoration: underline;
}
.wrap .contain .f-song .songinfo .right p a{
    color: #0c73c2;
    text-decoration: none;
}
.wrap .contain .f-song .songinfo .right .btns:after{
    clear: both;
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
}
.wrap .contain .f-song .songinfo .right .btns .play{
    display: inline-block;
    float: left;
    cursor: pointer;
    text-align: center;
    height: 31px;
    width: 66px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: right -428px;
}
.wrap .contain .f-song .songinfo .right .btns .play:hover{
    background-position: right -510px;
}
.wrap .contain .f-song .songinfo .right .btns .play i{
    display: inline-block;
    width: 66px;
    height: 31px;
    overflow: hidden;
    cursor: pointer;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: 0 -387px;
}
.wrap .contain .f-song .songinfo .right .btns .play:hover i{
    background-position: 0 -469px;
}
.wrap .contain .f-song .songinfo .right .btns .play:hover i em{
    background-position: -28px -1622px;
}
.wrap .contain .f-song .songinfo .right .btns .play i em{
    float: left;
    width: 20px;
    height: 18px;
    margin: 6px -3px 2px 7px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: 0 -1622px;
    font-size: 12px;
    color: #fff;
    margin-left: 10px;
}
.wrap .contain .f-song .songinfo .right .btns .play i span{
    color: #fff;
    font-size: 12px;
    line-height: 31px;
    font-style: normal;
    margin-right: 5px;
}
.wrap .contain .f-song .songinfo .right .btns .add{
    display: inline-block;
    float: left;
    width: 31px;
    height: 31px;
    line-height: 30px;
    margin-left: -5px;
    padding-right: 0;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: 0 -1588px;
    cursor: pointer;
}
.wrap .contain .f-song .songinfo .right .btns .add:hover{
    background-position: -40px -1588px; 
}
.wrap .contain .f-song .songinfo .right .btns .store{
    display: inline-block;
    float: left;
    width: 68px;
    height: 31px;
    line-height: 30px;
    cursor: pointer;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: right -1020px;
}
.wrap .contain .f-song .songinfo .right .btns .store:hover{
    background-position: right -1106px; 
}
.wrap .contain .f-song .songinfo .right .btns .store:hover a{
    background-position: 0 -1063px;
}
.wrap .contain .f-song .songinfo .right .btns .store a{
    display: block;
    width: 30px;
    height: 100%;
    padding-right: 2px;
    padding-left: 28px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: 0 -977px;
    font-size: 12px;
    margin-left: 5px;
}
.wrap .contain .f-song .songinfo .right .btns .share{
    display: inline-block;
    float: left;
    width: 68px;
    height: 31px;
    line-height: 30px;
    cursor: pointer;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: right -1020px;
}
.wrap .contain .f-song .songinfo .right .btns .share:hover{
    background-position: right -1106px;
}
.wrap .contain .f-song .songinfo .right .btns .share:hover a{
    background-position: 0 -1268px;
}
.wrap .contain .f-song .songinfo .right .btns .share a{
    display: block;
    width: 30px;
    height: 100%;
    padding-right: 2px;
    padding-left: 28px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: 0 -1225px;
    font-size: 12px;
    margin-left: 5px;
}
.wrap .contain .f-song .songinfo .right .btns .download{
    display: inline-block;
    float: left;
    width: 68px;
    height: 31px;
    line-height: 30px;
    cursor: pointer;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: right -1020px;
}
.wrap .contain .f-song .songinfo .right .btns .download a{
    display: block;
    width: 30px;
    height: 100%;
    padding-right: 2px;
    padding-left: 28px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?506307338ab2e3071070d108e6762529) no-repeat 0 9999px;
    background-position: 0 -977px;
    font-size: 12px;
    margin-left: 5px;
}
.wrap .contain .f-song .songinfo .right .lyric{
    margin-top: 37px;
    line-height: 14px;
}
.wrap .contain .f-song .songinfo .right .lyric p{
    color: #333;
    font-size: 12px;
}
.wrap .contain .f-song .songinfo .right .spread span{
    color:  #0c73c2;
    font-size: 12px;
    cursor: pointer;
}
.wrap .contain .f-song .songinfo .right .spread span i{
    display: inline-block;
    width: 11px;
    height: 8px;
    background: url(https://s2.music.126.net/style/web2/img/icon.png?9a516eafe8eb4cd2d671062b42261178) no-repeat 0 9999px;
    background-position: -65px -520px;
}
.wrap .contain .f-song .songinfo .right .spread span .top{
    background-position: -45px -520px;
}
.wrap .contain .f-song .songinfo .right .spr{
    margin-top: 0;
}
.wrap .contain .lists{
    position: relative;
    float: right;
    width: 270px;
}
.wrap .contain .lists .relation{
    padding: 20px 40px 40px 30px;
}
.wrap .contain .lists .relation h3{
    height: 23px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
    font-size: 12px;
}
.wrap .contain .lists .relation ul{
    overflow: hidden;
    margin-bottom: 20px;
}
.wrap .contain .lists .relation ul .owe{
    list-style: none;
    width: 200px;
    height: 50px;
    margin-bottom: 15px;
    line-height: 24px;
}
.wrap .contain .lists .relation ul li .head{
    float: left;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
.wrap .contain .lists .relation ul li .head img{
    width: 50px;
    height: 50px;
}
.wrap .contain .lists .relation ul li .info{
    margin-left: 60px;
    line-height: 24px;
}
.wrap .contain .lists .relation ul li .info p{
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
}
.wrap .contain .lists .relation ul li .info .author{
    font-size: 12px;
    color: #999
}
.wrap .contain .lists .relation ul li .info .author span{
    color: #666;
}
.wrap .contain .lists .relation ul li .info .description:hover{
    cursor: pointer;
    text-decoration: underline;
}
.wrap .contain .lists .relation ul li .info .author span:hover{
    cursor: pointer;
    text-decoration: underline;
}
.wrap .contain .lists .relation ul .similar{
    margin-bottom: 10px;
    overflow: hidden;
}
.wrap .contain .lists .relation ul li .text{
    float: left;
    width: 156px;
    line-height: 16px;
    font-size: 12px;
    height: auto;
}
.wrap .contain .lists .relation ul li .text .song{
    color: #333;
    cursor: pointer;
    display: block;
}
.wrap .contain .lists .relation ul li .text .song:hover,.wrap .contain .lists .relation ul li .text .singer:hover{
    text-decoration: underline;
}
.wrap .contain .lists .relation ul li .text .singer{
    color: #999;
    cursor: pointer;
    display: block;
}
.wrap .contain .lists .relation ul li .ctr{
    float: right;
    top: 10px;
    line-height: 32px;
}
.wrap .contain .lists .relation ul li .ctr a{
    display: block;
    float: left;
    width: 10px;
    height: 11px;
    background: url(https://s2.music.126.net/style/web2/img/icon2.png?a397a6e…) no-repeat -9999px -9999px;
    opacity: 0.9;
    cursor: pointer;
}
.wrap .contain .lists .relation ul li .ctr .ply{
    margin-right: 16px;
    background-position: -69px -455px;
}
.wrap .contain .lists .relation ul li .ctr .add{
    background-position: -87px -454px;
}
</style>