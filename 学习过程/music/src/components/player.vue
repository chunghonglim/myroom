<template>
    <div class='play-bar'>
      <div :class='{ innerbar:true, showbar:haveshow || havelock }'  @mouseleave='hidebar'>
        <div class='bar-bg'></div>
        <div class='fill-bg'>
          <div class='f-bg'>
            <a :class='{ lockbtn:true, unlock:havelock}' @click='lock'></a>
          </div>
          <div class='s-bg'></div>
        </div>
        <div class='show-bar' @mouseenter='showbar'></div>
        <div class='wrap'>
          <div class='btns'>
            <a href='javascript:;' class='pre' title='上一首'></a>
            <a href='javascript:;' :class='{ play:true , pause:!$store.state.a.pause }' title='播放/暂停' 
            @click='Play'></a>
            <a href='javascript:;' class='next' title='下一首'></a>
          </div>
          <div class='head'>
            <img :src="this.$store.state.a.playdetail[2]" alt="">
            <router-link tag='a' to='/'></router-link>
          </div>
          <div class='play'>
            <div class='words'>
              <router-link tag='a' class='song' to='/'>{{ this.$store.state.a.playdetail[0] }}</router-link>
              <router-link tag='a' class='singer' to='/'>{{ this.$store.state.a.playdetail[1] }}</router-link>
              <router-link tag='a' class='fromto' to='/'></router-link>
            </div>
            <div class='scroll-bar'>
              <div class='barbg'>
                <div class='rdy' style='width: 0px'></div>
                <div class='cur' :style='{ width: this.$store.state.a.width +"%"}'>
                  <span>
                    <i></i>
                  </span>
                </div>
              </div>
              <span class='time'>
                <a>{{ this.$store.state.a.currentime }}</a>
                / {{ this.$store.state.a.totaltime }}
              </span>
            </div>

          </div>
          <div class='oper'>
            <a href="javascript:;" class='like' title='收藏'></a>
            <a href="javascript:;" class='share' title='分享'></a>
          </div>
          <div class='ctrl'>
            <div class='vctr' v-if='voiceshow'>
              <div class='vbarbg'></div>
              <div class='vbg'>
                <div class='curr' style='height: 70px'></div>
                <span class='vbtn' style='top: 16.2px'></span>
              </div>
            </div>
            <a class='icon-voice' title='音量' @click='voiceShow'></a>
            <a :class='[mode]' :title='[modetitle]' @click='playType'></a>
            <span class='playlist'>
              <span class='tip' v-show='false'>已添加到播放列表</span>
              <a class='num'>98</a>
            </span>
          </div>
        </div>
      </div>
      <audio :src="this.$store.state.a.playsrc" controls='controls' ref='audios'></audio>
    </div>
  </template>
  
  <script>
  import bus from './bus.js'
  
  export default {
    data () {
      return {
        havelock: false,
        haveshow: false,
        playtype: [{class: 'circle', title: '循环'},
                   {class: 'circleself', title: '单曲循环'},
                   {class: 'random', title: '随机播放'}
                  ],
        mode: 'circle',
        modetitle: '循环',
        voiceshow: false,
      }
    },
    methods: {
      lock () {
        this.havelock = !this.havelock
      },
      showbar () {
        this.haveshow = true;
      },
      hidebar () {
        this.haveshow = false;
      },
      Play () {
        this.$store.commit('playpause')
        if(this.$store.state.a.pause){
          this.$refs.audios.pause()
        }
        else{
          this.$refs.audios.play()
        }
        this.$store.dispatch('currentime',this.$refs.audios)
      },
      playType () {
        this.$store.commit('mode')
        this.mode = this.playtype[this.$store.state.a.mode].class
        this.modetitle = this.playtype[this.$store.state.a.mode].title
      },
      voiceShow () {
        this.voiceshow = !this.voiceshow
      },
    },
    mounted () {
      bus.$on('playnow',() =>
        {
          setTimeout(() => {this.$refs.audios.play()
          this.$store.commit('totaltime',this.$refs.audios.duration)
          this.$store.dispatch('currentime',this.$refs.audios)
          },150)
        })
    },
    beforeDestroy () {
      bus.$off('playnow')
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .play-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    width: 100%;
  }
  .play-bar .innerbar{
    position: absolute;
    top: -6px;
    left: 0;
    width: 100%;
    height: 53px;
    margin: 0 auto;
    transition: top 1s;
  }
  .play-bar .showbar{
    top: -53px;
    transition: top 1s;
  }
  .play-bar .innerbar .bar-bg{
    height: 53px;
    zoom: 1;
    margin-right: 67px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3…) no-repeat 0 9999px;
    background-position: 0 0;
    background-repeat: repeat-x;
  }
  .play-bar .innerbg{
    position: relative;
    z-index: 100;
  }
  .play-bar .innerbar .fill-bg .f-bg{
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3…) no-repeat 0 9999px;
    background-position: 0 -380px;
    z-index: 100;
  }
  .play-bar .innerbar .fill-bg .s-bg{
    position: absolute;
    top: -1px;
    right: 0;
    width: 15px;
    height: 54px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3…) no-repeat 0 9999px;
    background-position: -52px -393px;
  }
  .play-bar .innerbar .fill-bg .f-bg .lockbtn{
    display: block;
    width: 18px;
    height: 18px;
    margin: 6px 0 0 17px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3…) no-repeat 0 9999px;
    background-position: -80px -380px;
    cursor: pointer;
  }
  .play-bar .innerbar .fill-bg .f-bg .unlock{
    background-position: -100px -380px;
  }
  .play-bar .innerbar .show-bar{
    position: absolute;
    top: -10px;
    width: 100%;
    height: 20px;
    cursor: pointer;
  }
  .play-bar .innerbar .wrap{
    position: absolute;
    left: 14%;
    top: 6px;
    z-index: 100;
    width: 980px;
    height: 47px;
    margin: 0 auto;
  }
  .play-bar .innerbar .wrap .btns{
    float: left;
    width: 137px;
    padding: 6px 0 0 0;
    overflow: hidden;
  }
  .play-bar .innerbar .wrap .btns .pre{
    display: block;
    float: left;
    width: 28px;
    height: 28px;
    margin-right: 8px;
    margin-top: 5px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3320fbadba539e3cac269df6b2) no-repeat 0 9999px;
    background-position: 0 -130px;
  }
  .play-bar .innerbar .wrap .btns .pre:hover{
    background-position: -30px -130px;
  }
  .play-bar .innerbar .wrap .btns .play{
    display: block;
    float: left;
    width: 36px;
    height: 36px;
    margin-right: 8px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3320fbadba539e3cac269df6b2)no-repeat 0 9999px;
    background-position: 0 -204px;
  }
  .play-bar .innerbar .wrap .btns .play:hover{
    background-position: -40px -204px;
  }
  .play-bar .innerbar .wrap .btns .pause{
    background-position: 0 -165px;
  }
  .play-bar .innerbar .wrap .btns .pause:hover{
    background-position: -40px -165px;
  }
  .play-bar .innerbar .wrap .btns .next{
    display: block;
    float: left;
    width: 28px;
    height: 28px;
    margin-right: 8px;
    margin-top: 5px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3320fbadba539e3cac269df6b2) no-repeat 0 9999px;
    background-position: -80px -130px;
  }
  .play-bar .innerbar .wrap .btns .next:hover{
    background-position: -110px -130px;
  }
  .play-bar .innerbar .wrap .head{
    width: 34px;
    height: 34px;
    margin: 6px 15px 0 0;
    position: relative;
    float: left;
  }
  .play-bar .innerbar .wrap .head img{
    width: 34px;
    height: 34px;
  }
  .play-bar .innerbar .wrap .head a{
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    width: 34px;
    height: 35px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3…) no-repeat 0 9999px;
    background-position: 0 -80px;
    cursor: pointer;
  }
  .play-bar .innerbar .wrap .play{
    width: 608px;
    position: relative;
    float: left;
  }
  .play-bar .innerbar .wrap .play .words{
    height: 28px;
    overflow: hidden;
    color: #e8e8e8;
    text-shadow: 0 1px 0 #171717;
    line-height: 28px;
  }
  .play-bar .innerbar .wrap .play .words a{
    cursor: pointer;
    font-size: 12px;
    text-decoration: none;
  }
  .play-bar .innerbar .wrap .play .words .song{
    max-width: 300px;
    color: #e8e8e8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .play-bar .innerbar .wrap .play .words .singer{
    max-width: 220px;
    margin-left: 15px;
    color: #9b9b9b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .play-bar .innerbar .wrap .play .words .fromto{
    float: left;
    width: 14px;
    height: 15px;
    margin: 7px 0 0 13px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3320fbadba539e3cac269df6b2)no-repeat 0 9999px;
    background-position: -110px -103px;
  }
  .play-bar .innerbar .wrap .play .scroll-bar{
    width: 493px;
    position: relative;
  }
  .play-bar .innerbar .wrap .play .scroll-bar .barbg{
    width: 493px;
    height: 9px;
    background: url(https://s2.music.126.net/style/web2/img/frame/statbar.png?721b4e327e245d590be16a8a2bea3fdd)no-repeat 0 9999px;
    background-position: right 0;
  }
  .play-bar .innerbar .wrap .play .scroll-bar .barbg .rdy{
    height: 9px;
    background: url(https://s2.music.126.net/style/web2/img/frame/statbar.png?721b4e327e245d590be16a8a2bea3fdd)no-repeat 0 9999px;
    background-position: right -30px;
  }
  .play-bar .innerbar .wrap .play .scroll-bar .barbg .cur{
    position: absolute;
    top: 0;
    left: 0;
    height: 9px;
    background: url(https://s2.music.126.net/style/web2/img/frame/statbar.png?721b4e327e245d590be16a8a2bea3fdd)no-repeat 0 9999px;
    background-position: left -66px;
  }
  .play-bar .innerbar .wrap .play .scroll-bar .barbg .cur span{
    display: block;
    position: absolute;
    top: -7px;
    right: -13px;
    width: 22px;
    height: 24px;
    margin-left: -11px;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?8e98e744a053cdbfe916249540e06392) no-repeat;
    background-position: 0 -250px;
  }
  .play-bar .innerbar .wrap .play .scroll-bar .barbg .cur span i{
    visibility: hidden;
    position: absolute;
    left: 5px;
    top: 5px;
    width: 12px;
    height: 12px;
    background: url(https://s2.music.126.net/style/web2/img/outchain/loading.gif?a4762730baa65638e0633fc50b881799);
  }
  .play-bar .innerbar .wrap .play .scroll-bar .time{
    position: absolute;
    top: -5px;
    right: -84px;
    color: #797979;
    text-shadow: 0 1px 0 #121212;
    font-size: 12px;
  }
  .play-bar .innerbar .wrap .play .scroll-bar .time a{
    color: #a1a1a1;
    text-align: left;
  }
  .play-bar .innerbar .wrap .oper{
    width: 60px;
    float: left;
  }
  .play-bar .innerbar .wrap .oper .like{
    display: block;
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3320fbadba539e3cac269df6b2) no-repeat 0 9999px;
    background-position: -88px -163px;
    cursor: pointer;
  }
  .play-bar .innerbar .wrap .oper .like:hover{
    background-position: -88px -189px;
  }
  .play-bar .innerbar .wrap .oper .share{
    display: block;
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?6d3d4f3320fbadba539e3cac269df6b2) no-repeat 0 9999px;
    background-position: -114px -163px;
    cursor: pointer;
  }
  .play-bar .innerbar .wrap .oper .share:hover{
    background-position: -114px -189px;
  }
  .play-bar .innerbar .wrap .ctrl{
    position: relative;
    z-index: 10;
    width: 113px;
    padding-left: 13px;
    float: left;
  }
  .play-bar .innerbar .wrap .ctrl .vctr{
    position: absolute;
    top: -113px;
    left: 9px;
    clear: both;
    width: 32px;
    height: 113px;
  }
  .play-bar .innerbar .wrap .ctrl .vctr .vbarbg{
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 113px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?8807d0634fc3bf41e2fc1705e3ab380c) no-repeat 0 9999px;
    background-position: 0 -503px;
  }
  .play-bar .innerbar .wrap .ctrl .vctr .vbg{
    position: absolute;
    top: 7px;
    left: 14px;
    width: 4px;
    height: 93px;
    padding: 4px 0;
  }
  .play-bar .innerbar .wrap .ctrl .vctr .vbg .curr{
    position: absolute;
    top: auto;
    bottom: 4px;
    left: 0;
    width: 4px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?8807d0634fc3bf41e2fc1705e3ab380c) no-repeat 0 9999px;
    background-position: -40px bottom;
    overflow: hidden;
  }
  .play-bar .innerbar .wrap .ctrl .vctr .vbg .vbtn{
    position: absolute;
    top: 0;
    left: -7px;
    display: block;
    width: 18px;
    height: 20px;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?1e0a1206538d361784618530b23e798c) no-repeat;
    background-position: -40px -250px;
    cursor: pointer;
  }
  .play-bar .innerbar .wrap .ctrl .vctr .vbg .vbtn:hover{
    background-position: -40px -280px;
  }
  .play-bar .innerbar .wrap .ctrl a{
    display: block;
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?8807d0634fc3bf41e2fc1705e3ab380c) no-repeat 0 9999px;
    cursor: pointer;
  }
  .play-bar .innerbar .wrap .ctrl .icon-voice{
    background-position: -2px -248px;
  }
  .play-bar .innerbar .wrap .ctrl .icon-voice:hover{
    background-position: -31px -248px;
  }
  .play-bar .innerbar .wrap .ctrl .circle{
    background-position: -3px -344px;
  }
  .play-bar .innerbar .wrap .ctrl .circle:hover{
    background-position: -33px -344px;
  }
  .play-bar .innerbar .wrap .ctrl .circleself{
    background-position: -66px -344px;
  }
  .play-bar .innerbar .wrap .ctrl .circleself:hover{
    background-position: -93px -344px
  }
  .play-bar .innerbar .wrap .ctrl .random{
    background-position: -66px -248px;
  }
  .play-bar .innerbar .wrap .ctrl .random:hover{
    background-position: -93px -248px;
  }
  .play-bar .innerbar .wrap .ctrl .playlist{
    float: left;
    display: block;
    width: 59px;
    height: 36px;
    position: relative;
  }
  .play-bar .innerbar .wrap .ctrl .playlist .num:hover{
    background-position: -42px -98px;
  }
  .play-bar .innerbar .wrap .ctrl .playlist .num{
    display: block;
    float: none;
    width: 38px;
    padding-left: 21px;
    background-position: -42px -68px;
    line-height: 27px;
    text-align: center;
    color: #666;
    text-shadow: 0 1px 0 #080707;
    text-indent: 0;
    text-decoration: none;
    font-size: 12px;
  }
  .play-bar .innerbar .wrap .ctrl .playlist .tip{
    position: absolute;
    top: -51px;
    left: -65px;
    clear: both;
    width: 152px;
    height: 49px;
    background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?8807d0634fc3bf41e2fc1705e3ab380c)no-repeat 0 9999px;
    background-position: 0 -287px;
    text-align: center;
    color: #fff;
    line-height: 37px;
    font-size: 14px;
  }
  </style>