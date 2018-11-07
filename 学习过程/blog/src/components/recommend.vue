<template>
  <div class='recommend'>
    <div class='banner-wrap'>
      <div class='banner'>
        <transition name='slide-fade'>
          <a class='bannerpic' :href="img.url || '/song/detail' + img.targetId" v-for='(img,index) in imgs[0]' :key='index' v-if='index == nowindex'>
            <img :src='img.imageUrl' alt="" @mouseenter='stopban' @mouseleave='startban'>
          </a>
        </transition>
        <div class='banner-dot'>
          <span class='dot' v-for='(dot,index) in dots' @click='dotchange(index)' 
          :class='{ dotactive : index==nowindex }'></span>
        </div>
        <div class='tag'>
          <div class='next'><span class="lnr lnr-chevron-right" @click='next'></span></div>
          <div class='pre'><span class="lnr lnr-chevron-left" @click='previous'></span></div>
        </div>
      </div>
    </div>
    <div class='lists-wrap'>
      <div class='songs-wrap'>
        <div class='songs-lists hot'>
          <div class='title'>
            <router-link to='/' tag='a' class='tip'>
              <span class="lnr lnr-magic-wand"></span>热门推荐
            </router-link>
            <router-link to='/' tag='a' class='type'>华语</router-link>
            <router-link to='/' tag='a' class='type'>流行</router-link>
            <router-link to='/' tag='a' class='type'>摇滚</router-link>
            <router-link to='/' tag='a' class='type'>民谣</router-link>
            <router-link to='/' tag='a' class='type'>电子</router-link>
            <router-link to='/' tag='a' class='more'>
              更多 
              <span class="lnr lnr-arrow-right"></span>
            </router-link>
          </div>
          <div class='lists'>
            <ul>
              <li v-for='hot in hotRecommend'>
                <router-link tag='div' to='/' class='song'>
                  <img :src='hot.picUrl' alt="">
                  <a class='bg'></a>
                  <div class='playcount'>
                    <div class='click'><span class="lnr lnr-select"></span> {{ hot.playCount }} <img src="" alt=""></div>
                    <div class='playsong'><router-link tag='span' class='fontfamily ljh-bofang' to='/' title="播放"></router-link></div>
                  </div>
                </router-link>
                <router-link tag='p' to='/'>{{ hot.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class='songs-lists new'>
          <div class='title'>
            <router-link to='/' tag='a' class='tip'>
              <span class="lnr lnr-magic-wand"></span>新碟上架
            </router-link>
            <router-link to='/' tag='a' class='more'>
              更多 
              <span class="lnr lnr-arrow-right"></span>
            </router-link>
          </div>
          <div class='new-lists'>
            <div class='rol'>
              <ul :style='{ transform: "translateX(" +  translatex +"px)"} '>
                <li v-for='fresh in newRecommend'>
                  <router-link to='/' tag='div' class='song'>
                    <img :src='fresh.picUrl' alt="">
                    <a class='bg'></a>
                    <router-link tag='p' to='/' class='name'>{{ fresh.name }}</router-link>
                    <router-link tag='p' to='/' class='singer'>{{ fresh.artist.name }}</router-link>
                    <span class='playsong'><router-link tag='span' class='fontfamily ljh-bofang' to='/' title="播放"></router-link></span>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class='tag'>
              <div class='next'><span class="lnr lnr-chevron-right" @click='slidenext'></span></div>
              <div class='pre'><span class="lnr lnr-chevron-left" @click='slidepre'></span></div>
            </div>
          </div>
        </div>
        <div class='songs-lists billboard'>
          <div class='title'>
            <router-link to='/' tag='a' class='tip'>
              <span class="lnr lnr-magic-wand"></span>榜单
            </router-link>
            <router-link to='/' tag='a' class='more'>
              更多 
              <span class="lnr lnr-arrow-right"></span>
            </router-link>
          </div>
          <div class='bill-lists'>
            <dl class='blk rise'>
              <dt class='head'>
                  <router-link tag='img' to='/' src='http://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100'></router-link>
                  <div class='tit'>
                    <h3>云音乐飙升榜</h3>
                    <span class='fontfamily ljh-bofang' title="播放"></span><span class="lnr lnr-file-add" title="收藏"></span>
                  </div>
              </dt>
              <dd>
                <ol>
                  <li v-for='(song,index) in riseSongs'>
                    <span>{{ index+1 }}</span> <router-link tag='a' to='/'>{{ song.name }}</router-link>
                    <div class='oper'>
                        <span class='fontfamily ljh-bofang' title="播放" @click='submitinfo(index,song)'></span>
                        <span class="lnr lnr-plus-circle" title="添加"></span>
                        <span class="lnr lnr-file-add" title="收藏"></span>
                    </div>
                  </li>
                  <router-link tag='div' class='more' to='/'>查看更多></router-link>
                </ol>
              </dd>
            </dl>
            <dl class='blk fresh'>
                <dt class='head'>
                    <router-link tag='img' to='/' src='http://p3.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100'></router-link>
                    <div class='tit'>
                      <h3>云音乐新歌榜</h3>
                      <span class='fontfamily ljh-bofang' title="播放"></span>
                      <span class="lnr lnr-file-add" title="收藏"></span>
                    </div>
                </dt>
                <dd>
                  <ol>
                    <li v-for='(song,index) in freshSongs'>
                      <span>{{ index+1 }}</span> <router-link tag='a' to='/'>{{ song.name }}</router-link>
                      <div class='oper'>
                          <span class='fontfamily ljh-bofang' title="播放" @click='submitinfo(index,song)'></span>
                          <span class="lnr lnr-plus-circle" title="添加"></span>
                          <span class="lnr lnr-file-add" title="收藏"></span>
                      </div>
                    </li>
                    <router-link tag='div' class='more' to='/'>查看更多></router-link>
                  </ol>
                </dd>
            </dl>
            <dl class='blk origin'>
                <dt class='head'>
                    <router-link tag='img' to='/' src='http://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100'></router-link>
                    <div class='tit'>
                      <h3>网易原创歌曲榜</h3>
                      <span class='fontfamily ljh-bofang' title="播放"></span><span class="lnr lnr-file-add" title="收藏"></span>
                    </div>
                </dt>
                <dd>
                  <ol>
                    <li v-for='(song,index) in originSongs'>
                      <span>{{ index+1 }}</span> <router-link tag='a' to='/'>{{ song.name }}</router-link>
                      <div class='oper'>
                          <span class='fontfamily ljh-bofang' title="播放" @click='submitinfo(index,song),Bus'></span>
                          <span class="lnr lnr-plus-circle" title="添加"></span>
                          <span class="lnr lnr-file-add" title="收藏"></span>
                      </div>
                    </li>
                    <router-link tag='div' class='more' to='/'>查看更多></router-link>
                  </ol>
                </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class='person-lists'>
        <div class='user-1'>
          <P>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</P>
          <a class='login'>用户登陆</a>
        </div>
        <div class='e-singers'>
          <p>
            <span>入驻歌手</span><a href="">查看更多 ></a>
          </p>
          <ul class='singers-detail'>
            <router-link tag='li' to='/' class='singer-detail' v-for='singer in enterSingers'>
              <img :src='singer.img1v1Url' alt="">
              <div class='info'>
                <span>音乐人</span>
                <span>{{ singer.name }}</span> 
              </div>
            </router-link>
          </ul>
          <router-link tag='a' class='apply' to='/'>申请网易成为音乐人</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from './bus.js'

export default {
  data () {
    return {
      imgs: [],
      nowindex: 0,
      dots: [ , , , , , , , ,],
      hotRecommend: [],
      newRecommend: [],
      translatex: 0,
      riseSongs: [],
      freshSongs: [],
      originSongs: [],
      enterSingers: [],
    }
  },
  created() {
    this.$axios.get('/banner')
    .then(res => {
        this.imgs.push(res.data.banners)
    })
    .catch(error => {
      console.log(error)
    }),
    this.$axios.get('/personalized')
    .then(res => {
      this.$store.state.b.recommendSongs.push(res.data.result)
      for(var i=0; i<8; i++){
        res.data.result[i].playCount = Math.round(res.data.result[i].playCount)
        res.data.result[i].playCount = res.data.result[i].playCount + ''
       if(res.data.result[i].playCount.length > 5){
          res.data.result[i].playCount = res.data.result[i].playCount.slice(0,-4) + 'w'
          this.hotRecommend.push(res.data.result[i])
        }
        else{
          this.hotRecommend.push(res.data.result[i])
        }
      }
    })
    .catch(error => {
      console.log(error)
    }),
    this.$axios.get('/top/album?offset=0')
    .then(res => {
      this.$store.state.b.newSongs.push(res.data.albums)
      this.newRecommend = this.$store.state.b.newSongs[0].slice(0,20)
    })
    .catch(error => {
      console.log(error)
    }),
    this.$axios.get('/top/list?idx=3')
    .then(res => {
      this.$store.state.b.riseSongs.push(res.data.playlist)
      this.riseSongs = this.$store.state.b.riseSongs[0].tracks.slice(0,10)
    })
    .catch(error => {
      console.log(error)
    }),
    this.$axios.get('/top/list?idx=0')
    .then(res => {
      this.$store.state.b.freshSongs.push(res.data.playlist)
      this.freshSongs = this.$store.state.b.freshSongs[0].tracks.slice(0,10)
    })
    .catch(error => {
      console.log(error)
    }),
    this.$axios.get('/top/list?idx=2')
    .then(res => {
      this.$store.state.b.originSongs.push(res.data.playlist)
      this.originSongs = this.$store.state.b.originSongs[0].tracks.slice(0,10)
    })
    .catch(error => {
      console.log(error)
    }),
    this.$axios.get('artist/list?cat=5001')
    .then(res => {
      this.$store.state.b.enterSingers.push(res.data.artists)
      this.enterSingers = this.$store.state.b.enterSingers[0].slice(0,5)
    })
    .catch(error => {
      console.log(error)
    })
  },
  mounted() {
    this.startban()
  },
  methods: {
    dotchange (index) {
      this.nowindex = index
    },
    next () {
      this.nowindex++
      this.nowindex = this.nowindex % 8
    },
    previous () {
      if(this.nowindex == 0){
        this.nowindex = 7
      }
      else{
        this.nowindex--
      }
    },
    startban () {
      this.banner = setInterval(
      () => this.next(),5000
    )
    },
    stopban () {
      clearInterval(this.banner)
    },
    slidenext () {
      if(this.translatex == -1920){
        this.translatex = 0
      }
      else{
        this.translatex = this.translatex - 640
      }
    },
    slidepre () {
      if(this.translatex == 0){
        this.translatex = -1920
      }
      else{
        this.translatex = this.translatex + 640
      }
    },
    submitinfo (index,song) {
      this.$store.commit('firstplay')
      const src = '/song/url?id=' + song.id
      this.$axios.get(src)
      .then(res => {
        this.$store.commit('playsrc',res)
        if(this.$store.state.a.playsrc == null){
          alert('付费歌曲')
        }
        else{
          this.$store.commit('playdetail',song)
          bus.$emit('playnow')
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.recommend{
  width: 100%;
  background-color: #f5f5f5;
}
.recommend .banner-wrap{
  width: 982px;
  height: 332px;
  margin: 0 auto;
}
.recommend .banner-wrap .banner{
  width: 982px;
  height: 332px;
  position: relative;
}
.slide-fade-leave-to,.slide-fade-enter{
  opacity: 0;
}
.slide-fade-leave-active,.slide-fade-enter-active{   /*banner淡入淡出时间*/
  transition: opacity .8s ease;
}
.recommend .banner-wrap .banner .bannerpic img{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.recommend .banner-wrap .banner .banner-dot{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 982px;
  line-height: 50px;
  text-align: center;
}
.recommend .banner-wrap .banner .banner-dot .dot{
  background: #eee;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 6px;
  cursor: pointer;
}
.recommend .banner-wrap .banner .banner-dot .dotactive{
  background: #eee;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 6px;
  cursor: pointer;
  background: red;
}
.recommend .banner-wrap .banner .banner-dot .dot:hover{
  background: red;
}
.recommend .banner-wrap .banner .tag .next{   /*IE9及以下不支持flex*/
  position: absolute;
  top: 40%;
  right: 0;
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 60px;
}
.recommend .banner-wrap .banner .tag .pre{
  position: absolute;
  top: 40%;
  left: 0;
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 60px;
}
.recommend .banner-wrap .banner .tag .next .lnr,.recommend .banner-wrap .banner .tag .pre .lnr{
  cursor: pointer;
  font-size: 30px;
  color: #fff;
}
.recommend .banner-wrap .banner .tag .next:hover,.recommend .banner-wrap .banner .tag .pre:hover{
  background-color: #333;
  opacity: .8;
}
.recommend .lists-wrap{
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  min-height: 700px;
  overflow: hidden;
  border-bottom: none;
}
.recommend .lists-wrap .songs-wrap{
  width: 689px;
  float: left;
  padding: 20px 20px 40px;
  border-right: 1px solid #666;
}
.recommend .lists-wrap .songs-wrap .new{
  margin-bottom: 30px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .title{
  border-bottom: 2px solid #C10D0C;
  padding-bottom: 5px;
  padding-right: 6px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .title a{
  text-decoration: none;
  font-size: 12px;
  color: #666;
}
.recommend .lists-wrap .songs-wrap .songs-lists .title .tip{
  font-size: 20px;
  color: #000;
  margin-right: 5px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .title .tip .lnr{
  padding: 0 10px 0 12px;
  color: #C10D0C;
}
.recommend .lists-wrap .songs-wrap .songs-lists .title .type{
  border-right: 1px solid #666;
  padding: 0 14px 0 8px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .title .more{
 float: right;
 margin-top: 8px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .title .more:hover{
  color: #000;
}
.recommend .lists-wrap .songs-wrap .songs-lists .title .more .lnr{
  color: #C10D0C;
  font-weight: bold;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul{
  overflow: hidden;
  margin-top: 20px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li{
  float: left;
  width: 140px;
  height: 204px;
  padding-left: 42px;
  padding-bottom: 30px;
  list-style: none;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li:nth-child(1),.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li:nth-child(5){
  padding-left: 0;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li .song{
  display: block;
  width: 140px;
  height: 140px;
  position: relative;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li .song img{
  width: 140px;
  height: 140px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li .song .bg{
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 140px;
  height: 140px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af68e54c9dff5747c1bac5a95c78ea1c) no-repeat;
  background-position: 0 0;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li .song .playcount{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 140px;
  height: 27px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af68e54c9dff5747c1bac5a95c78ea1c) no-repeat;
  background-position: 0 -537px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li .song .playcount .click{
  display: inline-block;
  color: #ccc;
  font-size: 12px;
  padding-left: 10px;
  margin-top: 5px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li .song .playcount .playsong{
  display: inline-block;
  color: #ccc;
  float: right;
  margin: 3px 10px 0 0;
  cursor: pointer;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li .song .playcount .playsong:hover{
  color: #fff;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li p{
  font-size: 14px;
  padding-top: 8px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .lists ul li p:hover{
  text-decoration: underline;
  cursor: pointer;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists{
  width: 689px;
  background: #f5f5f5;
  position: relative;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul{
  overflow: hidden;
  height: 150px;
  width: 3200px;
  padding-top: 35px;
  transform: translateX(0);
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul{
  transition: 1.5s;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol{
  height: 186px;
  width: 640px;
  margin-top: 20px;
  margin-left: 20px;
  overflow: hidden;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li{
  list-style: none;
  width: 118px;
  height: 150px;
  float: left;
  margin-left: 10px;
  position: relative;
  background: url(https://s2.music.126.net/style/web2/img/index/index.png?95ff6d2646b21f3cbcb80c4f915ed2df) no-repeat 0 9999px;
  background-position: -260px 100px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song{
  width: 100px;
  height: 100px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song img{
  display: block;
  width: 100px;
  height: 100px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song .bg{
  position: absolute;
  width: 118px;
  height: 100px;
  top: 0;
  left: 0;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af68e54c9dff5747c1bac5a95c78ea1c) no-repeat;
  background-position: 0 -570px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song p{
  font-size: 12px;
  cursor: pointer;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song p:hover{
  text-decoration: underline;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song .singer{
  color: #666;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song .playsong{
  position: absolute;
  right: 24px;
  bottom: 52px;
  color: #f2f2f2;
  opacity: .5;
  display: none;
  font-size: 18px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song .playsong:hover{
  opacity: 1;
  cursor: pointer;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .rol ul li .song:hover .playsong{
  display: block;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .tag .next{
  position: absolute;
  top: 30%;
  right: 0;
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 60px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .tag .pre{
  position: absolute;
  top: 30%;
  left: 0;
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 60px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .tag .lnr{
  color: #999;
  cursor: pointer;
  font-weight: bold;
}
.recommend .lists-wrap .songs-wrap .songs-lists .new-lists .tag .lnr:hover{
  color: #333;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists{
  width: 690px;
  overflow: hidden;
  background: url(https://s2.music.126.net/style/web2/img/index/index_bill.png?24b14428264a21f6fb6c2ee269c43450) no-repeat;
  margin-top: 20px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk{
  width: 230px;
  float: left;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk .head{
  overflow: hidden;
  height: 100px;
  padding: 20px 0  0 20px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk .head img{
  display: block;
  float: left;
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk .head .tit{
  float: left;
  padding-left: 18px;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk .head .tit h3{
  font-size: 14px;
  margin: 10px 0;
  color: #333;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk .head .tit span{
  color: #999;
  cursor: pointer;
  font-size: 22px;
  padding-right: 10px;
  font-weight: bold;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk .head .tit span:hover{
  color: #333;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li{
  height: 32px;
  line-height: 32px;
  position: relative;
  list-style: none;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li span{
  margin-left: 26px;
  margin-right: 20px;
  color: #666;
  display: inline-block;
  width: 20px;
  text-align: center;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li a{
  display: block;
  position: absolute;
  left: 60px;
  top: 0;
  width: 150px;
  text-decoration: none;
  cursor: pointer;
  font-size: 12px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li:hover a{
  width: 90px;
  text-decoration: underline;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li:nth-child(-n+3) span{
  color: #C10D0C;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol .more{
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  margin-right: 20px;
  text-align: right;
  cursor: pointer;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol .more:hover{
  text-decoration: underline;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li .oper{
  position: absolute;
  right: 6px;
  top: 0;
  display: none;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li:hover .oper{
  display: block;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li .oper span{
  margin: 0 0;
  cursor: pointer;
  color: #999;
  font-weight: bold;
}
.recommend .lists-wrap .songs-wrap .songs-lists .bill-lists .blk dd ol li .oper span:hover{
  color: #666;
}
.recommend .lists-wrap .person-lists{
  float: right;
  width: 250px;
  min-height: 700px;
}
.recommend .lists-wrap .person-lists .user-1{
  width: 250px;
  height: 126px;
  background: url(https://s2.music.126.net/style/web2/img/index/index.png?95ff6d2646b21f3cbcb80c4f915ed2df) no-repeat 0 9999px;
  background-position: 0 0;
}
.recommend .lists-wrap .person-lists .user-1 p{
  font-size: 12px;
  padding: 20px;
  color: #666;
}
.recommend .lists-wrap .person-lists .user-1 .login{
  display: block;
  width: 100px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background: url(https://s2.music.126.net/style/web2/img/index/index.png?95ff6d2646b21f3cbcb80c4f915ed2df) no-repeat 0 9999px;
  background-position: 0 -195px;
  font-size: 12px;
  color: #fff;
  text-shadow: 0 1px 0 #8a060b;
  margin: 2px 0 0 72px;
  cursor: pointer;
}
.recommend .lists-wrap .person-lists .user-1 .login:hover{
  background-position: -110px -195px;
}
.recommend .lists-wrap .e-singers p{
  padding: 12px 0 10px 0;
  margin: 0 18px;
  font-size: 12px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.recommend .lists-wrap .person-lists .e-singers p span{
  float: left;
  font-weight: bold;
  color: #333;
}
.recommend .lists-wrap .person-lists .e-singers p a{
  float: right;
  text-decoration: none;
  color: #666;
}
.recommend .lists-wrap .person-lists .e-singers .singers-detail{
  width: 210px;
  margin-left: 18px;
  margin-top: 16px;
}
.recommend .lists-wrap .person-lists .e-singers .singers-detail .singer-detail{
  width: 210px;
  height: 62px;
  background: #fafafa;
  overflow: hidden;
  margin: 5px 0;
  font-size: 12px;
  cursor: pointer;
}
.recommend .lists-wrap .person-lists .e-singers .singers-detail .singer-detail:hover{
  background: #e9e9e9;
}
.recommend .lists-wrap .person-lists .e-singers .singers-detail .singer-detail img{
  display: block;
  width: 62px;
  height: 62px;
  float: left;
}
.recommend .lists-wrap .person-lists .e-singers .singers-detail .singer-detail .info{
  float: left;
  width: 129px;
  height: 60px;
  padding-left: 18px;
  border: 1px solid #e9e9e9;
  border-left: none;
}
.recommend .lists-wrap .person-lists .e-singers .singers-detail .singer-detail .info span{
  display: block;
  padding-top: 7px;
  color: #333;
  font-weight: bold;
}
.recommend .lists-wrap .person-lists .e-singers .apply{
  display: block;
  margin-left: 17px;
  border-radius: 4px;
  height: 31px;
  width: 210px;
  line-height: 31px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  text-decoration: none;
  background: #fafafa;
  border: 1px solid #e9e9e9;
  color: #333;
  font-weight: bold;
  margin-top: 22px;
}
.recommend .lists-wrap .person-lists .e-singers .apply:hover{
  background: #fff;
}
</style>
