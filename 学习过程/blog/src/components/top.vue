<template>
  <div class='top-wrap'>
      <div class="header">
          <div class='logo'>
            <router-link tag='a' to='/'><img src="../assets/logo.png" alt=""></router-link>
          </div>
          <div class='nav'>
            <ul>
              <router-link tag='li' to='/' v-for='(nav,index) in navs' @click.native='triangleTip(index)'
              :class='{ bg: index == navindex }'>{{ nav }}
              <span :class='{trianglet: index == navindex}'></span>
              </router-link>
            </ul>
          </div>
          <div class='search'>
            <span class="lnr lnr-magnifier"></span>
            <input type="text" name="search" id="search" placeholder="音乐//视频/电台/用户" v-model='searchMsg' @keyup='showSearchList'>
            <div class='search-list' v-show='showSearch'>
              <router-link tag='p' to='/' class='note'>搜"{{ searchMsg }}"相关用户 &gt; </router-link>
              <div class='rap'>
                <div class='list' v-if='singers.length!=0'>
                  <div class='title'>
                    <h3><span class="lnr lnr-user"></span>歌手</h3>
                  </div>
                  <div class='detail'>
                    <router-link tag='a' to='/' class='item' v-for='singer in singers'>{{ singer }}</router-link>
                  </div>
                </div>
                <div class='list' v-if='songs.length!=0'>
                  <div class='title'>
                    <h3><span class="lnr lnr-music-note"></span>单曲</h3>
                  </div>
                  <div class='detail'>
                    <router-link tag='a' to='/' class='item' v-for='song in songs'>{{ song }}</router-link>
                  </div>
                </div>
                <div class='list' v-if='cds.length!=0'>
                  <div class='title'>
                    <h3><span class="lnr lnr-film-play"></span>专辑</h3>
                  </div>
                  <div class='detail'>
                    <router-link tag='a' to='/' class='item' v-for='cd in cds'>{{ cd }}</router-link>
                  </div>
                </div>
                <div class='list' v-if='vedios.length!=0'>
                  <div class='title'>
                    <h3><span class="lnr lnr-camera-video"></span>视频</h3>
                  </div>
                  <div class='detail'>
                    <router-link tag='a' to='/' class='item' v-for='vedio in vedios'>MV: {{ vedio }}</router-link>
                  </div>
                </div>
                <div class='list' v-if='songlists.length!=0'>
                  <div class='title'>
                    <h3><span class="lnr lnr-text-align-justify"></span>歌单</h3>
                  </div>
                  <div class='detail'>
                    <router-link tag='a' to='/' class='item' v-for='songlist in songlists'>{{ songlist }}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='vedio-submit'>
              <span class="lnr lnr-camera-video"></span>
              <router-link tag='a' to='/'>视频投稿</router-link>
          </div>
          <div class='login' @mouseenter='showLoginType' @mouseleave='hideLoginType'>
            <span class='login-show'>登陆</span><span class='triangleb'></span>
          </div> 
          <div class='login-type' v-if='showLogin' @mouseenter='showLoginType' @mouseleave='hideLoginType'>
            <span class='trianglet'></span>
            <ul>
              <li><span class="lnr lnr-smartphone"></span>手机登陆</li>
              <li><span class="lnr lnr-envelope"></span>邮箱登录</li>
            </ul>
          </div>
      </div>
      <div class='nav-child'>
        <div class='wrap'>
          <ul>
            <router-link to='/' tag='li' v-for='(nav,index) in navchild' 
            :class='{ bg: childnavindex == index }' @click.native='childnav(index)'>
            {{ nav }}
            </router-link>
          </ul>
      </div>
      </div>
  </div>
</template>
  
  <script>
  export default {
  data () {
      return {
        navindex: 0,
        childnavindex: 0,
        showSearch: false,
        showLogin :false,
        searchMsg : '',
        singers: [],
        songs: [],
        cds: [],
        vedios: [],
        songlists: [],
        navs: [
          '发现音乐',
          '朋友',
          '商城',
          '音乐人',
        ],
        navchild: [
          '推荐',
          '排行榜',
          '歌单',
          '主播电台',
          '歌手',
          '新碟上架',
        ]
      }
    },
    methods: {
      triangleTip (index) {
        this.navindex = index
      },
      childnav (index) {
        this.childnavindex = index
      },
      showLoginType () {
        this.showLogin = true ;
      },
      hideLoginType () {
        this.showLogin = false ;
      },
      showSearchList () {
        if(this.searchMsg != ''){
          this.showSearch = true
          clearTimeout(this.controllSearchTime)
          this.controllSearchTime = setTimeout( () => {
        
          //获取歌手名字最多3个
          this.$axios.get('/search?keywords=' + this.searchMsg + '&type=100' + '&limit=3')
          .then(res => {
            this.singers = []  
            for(let i=0; i < res.data.result.artists.length; i++){
              if(res.data.result.artists[i].name.includes(this.searchMsg)){
                this.singers.push(res.data.result.artists[i].name)
              }
              else{

              }
            }
          })
          .catch(error => {
            console.log(error)
          }) 
          
          //获取单曲最多4个
          this.$axios.get('/search?keywords=' + this.searchMsg +'&limit=4')
          .then(res => {
            this.songs = []  
            for(let i=0; i < res.data.result.songs.length; i++){
              this.songs.push(res.data.result.songs[i].name + '-' + res.data.result.songs[i].artists[0].name)
            }
          })
          .catch(error => {
            console.log(error)
          }) 

          //获取专辑最多2个
          this.$axios.get('/search?keywords=' + this.searchMsg + '&type=10' + '&limit=2')
          .then(res => {
            this.cds = []  
            for(let i=0; i < res.data.result.albums.length; i++){
              this.cds.push(res.data.result.albums[i].name + '-' + res.data.result.artists[i].name)
            }
          })
          .catch(error => {
            console.log(error)
          })

          //获取视频最多2个
          this.$axios.get('/search?keywords=' + this.searchMsg + '&type=1014' + '&limit=2')
          .then(res => {
            this.vedios = []  
            for(let i=0; i < res.data.result.videos.length; i++){
              this.vedios.push(res.data.result.videos[i].title + '-' + res.data.result.videos[i].creator[0].userName)
            }
          })
          .catch(error => {
            console.log(error)
          })

          //获取歌单最多2个
          this.$axios.get('/search?keywords=' + this.searchMsg + '&type=1000' + '&limit=2')
          .then(res => {
            this.songlists = []  
            for(let i=0; i < res.data.result.playlists.length; i++){
              this.songlists.push(res.data.result.playlists[i].name)
            }
          })
          .catch(error => {
            console.log(error)
          })
        },200)
        }
        
        else{
          this.showSearch = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .top-wrap{
    width: 100%;
    background-color: #242424;
  }
  .top-wrap .header{
    width: 1200px;
    height: 70px;
    margin: 0 auto;
    zoom:1;/*为了兼容IE*/
  }
  .top-wrap .header:after{
    content: "";
    clear: both;
  }
  .top-wrap .header .logo,.top-wrap .header .nav ul{
    float: left;
    height: 100%;
  }
  .top-wrap .header .logo img{
    width: 230px;
  }
  .top-wrap .header .nav ul{
    height: 70px;
  }
  .top-wrap .header .nav ul .bg{
    background-color: #000;
  }
  .top-wrap .header .nav ul li{
    list-style: none;
    float: left;
    color: #ccc;
    font-size: 14px;
    line-height: 70px;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
  }
  .top-wrap .header .nav ul li .trianglet{
    display: block;
    position: absolute;
    bottom: 0;
    left: 41%;
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent #C20C0C transparent;
    cursor: pointer;
  }
  .top-wrap .header .nav ul li:hover{
    color: #fff;
    background: #000;
  }
  .top-wrap .header .search{
    float: left;
    height: 26px;
    background: #fff;
    border-radius: 14px;
    margin-top: 22px;
    margin-left: 150px;
    padding-left: 8px;
    width: 166px;
    position: relative;
  }
  .top-wrap .header .search .lnr{
    display: inline-block;
    vertical-align: middle;
  }
  .top-wrap .header .search #search{
    display: inline-block;
    vertical-align: middle;
    outline: none;
    border: none;
    font-size: 12px;
    width: 80%;
  }
  .top-wrap .header .search .search-list{
    position: absolute;
    z-index: 100;
    left: 0;
    top: 32px;
    width: 240px;
    box-sizing: border-box;
    border: 1px solid #bebebe;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 4px 7px #555;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
    font-size: 12px;
  }
  .top-wrap .header .search .search-list .note{
    padding: 11px 10px;
    border-bottom: 1px solid #e2e2e2;
    height: 17px;
    cursor: pointer;
  }
  .top-wrap .header .search .search-list .rap .list{
    overflow: hidden;
  }
  .top-wrap .header .search .search-list .rap .list .title,.top-wrap .header .search .search-list .rap .list .detail{
    float: left;
  }
  .top-wrap .header .search .search-list .rap .list:nth-child(odd) .detail{
    background: #f9f8f8;
  }
  .top-wrap .header .search .search-list .rap .list .title{
    width: 52px;
  }
  .top-wrap .header .search .search-list .rap .list .detail{
    width: 185px;
    border-left: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    padding: 4px 0;
  }
  .top-wrap .header .search .search-list .rap .list .title h3{
    padding-left: 4px;
    font-size: 12px;
    margin-top: 8px;
    color: #333;
  }
  .top-wrap .header .search .search-list .rap .list .title h3 .lnr{
    margin-right: 4px;
    margin-top: -2px;
  }
  .top-wrap .header .search .search-list .rap .list .detail .item{
    text-decoration: none;    
    padding: 5px 0;
    padding-left: 8px;
    width: 100%;
    display: block;
    color: #000;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .top-wrap .header .search .search-list .rap .list .detail .item:hover{
    background: #e3e5e7;
  }
  .top-wrap .header .vedio-submit{
    margin-top: 21px;
    border: 1px solid #ccc;
    float: left;
    border-radius: 10px;
    width: 80px;
    height: 26px;
  }
  .top-wrap .header .vedio-submit .lnr{
    color: #ccc;
    display: inline-block;
    padding-left: 5px;
    vertical-align: middle;
  }
  .top-wrap .header .vedio-submit a{
    text-decoration: none;
    color: #ccc;
    font-size: 12px;
    display: inline-block;
  }
  .top-wrap .header .vedio-submit:hover{
    border: 1px solid #fff;
  }
  .top-wrap .header .login{
    margin-top: 22px;
    float: left;
    width: 56px;
    height: 50px;
    position: relative;
  }
  .top-wrap .header .login .login-show{
    color: #787878;
    font-size: 14px;
  }
  .top-wrap .header .login .login-show:hover{
    color: #fff;
    cursor: pointer;
  }
  .top-wrap .header .login .triangleb{
    display: block;
    position: absolute;
    top: 10px;
    right: 0px;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: #787878 transparent transparent transparent;
    cursor: pointer;
  }
  .top-wrap .header .login-type{
    position: absolute;
    top: 58px;
    right: 150px;
    background: #2b2b2b;
    width: 158px;
    border: 1px solid #202020;
    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.50);
    border-radius: 4px;
    z-index: 100;
  }
  .top-wrap .header .login-type .trianglet{
    display: block;
    position: absolute;
    top: -14px;
    left: 66px;
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
    cursor: pointer;
  }
  .top-wrap .header .login-type ul li{
    list-style: none;
    color: #eee;
    font-size: 14px;
    padding: 8px;
    border: 1px solid #232323;
    cursor: pointer;
  }
  .top-wrap .header .login-type ul li:hover{
    background: #333;
  }
  .top-wrap .header .login-type ul li .lnr{
    padding: 0 10px;
  }
  .top-wrap .header .vedio-submit,.top-wrap .header .login{
    margin-left: 40px;
  }
  .top-wrap .nav-child{
    width: 100%;
    background: #C20C0C;
    height: 35px;
  }
  .top-wrap .nav-child .wrap{
    width: 1100px;
    height: 35px;
    margin: 0 auto;
  }
  .top-wrap .nav-child ul{
    margin-left: 174px;
    height: 35px;
  }
  .top-wrap .nav-child ul li{
    float: left;
    list-style: none;
    cursor: pointer;
    padding: 0 20px;
    margin: 5px 20px 0;
    height: 20px;
    line-height: 20px;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    border-radius: 20px;
  }
  .top-wrap .nav-child ul li:hover{
    background: #9B0909;
  }
  .top-wrap .nav-child ul .bg{
    background: #9B0909;
  }
  </style>
  