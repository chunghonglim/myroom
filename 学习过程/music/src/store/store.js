import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const play = {
    state: { 
      pause: true,
      play: false,
      mode: 0,     /*播放模式：0列表循环 1单曲循环 2随机*/
      playsrc: '',    /*正在播放歌曲的url*/ 
      playdetail: [],    /*正在播放歌曲的信息*/ 
      totaltime: '00:00',
      currentime: '00:00',
      end: false,
      width: 0,
      buffer: 0,
      move: 0,  
      dragwidth: 0,
      voice: 1,
      voiceheight: 93,
     },
    mutations: { 
      playpause (state) {
        state.pause = !state.pause
        state.play = !state.play
      },
      firstplay (state) {
        state.play = true
        state.pause = false
      },
      mode (state) {
        state.mode++
        state.mode = state.mode % 3
      },
      playsrc (state,obj) {
        state.playsrc = obj.data.data[0].url
      },
      playdetail (state,obj) {
        state.playdetail = []
        state.playdetail.push(obj.name)
        state.playdetail.push(obj.ar[0].name)
        state.playdetail.push(obj.al.picUrl)
        console.log(state.playdetail)
      },
      //相似歌曲返回JSON数据不一样 这里另作处理
      similardetail (state,obj) {
        state.playdetail = []
        state.playdetail.push(obj.name)
        state.playdetail.push(obj.artists[0].name)
        state.playdetail.push(obj.artists[0].picUrl)
      },
      /*总时间*/ 
      totaltime (state,obj) {
        let time = obj
        let m = Math.round(time / 60) , s = Math.round(time % 60)
        let sec = (s > 10)? s : '0' + s
        let min = (m > 10)? m : '0' + m
        state.totaltime = min + ':' + sec 
      },
      /*当前播放时间*/ 
      currentime (state,obj) {
        let time = obj.currentTime
        let m = Math.round(time / 60) , s = Math.round(time % 60)
        let sec = (s > 9)? s : '0' + s
        let min = (m > 9)? m : '0' + m
        state.currentime = min + ':' + sec
        state.width = obj.currentTime/obj.duration * 100
        if(obj.buffered.end && obj.buffered.length > 0){
          state.buffer = obj.buffered.end(0)/obj.duration * 100
        }
        if(state.width == 100){
          state.pause = true
          clearInterval(this.Timer)
        }
      },
      /*拖动函数*/   
      move(state,val) {
        if(val > -1){
          if(val > 490){
            state.move = 490 
          }
          else{
            state.move = val 
          }
        }
        else{
          val = 0
        }
        state.dragwidth = (state.move / 493) * 100
        if(state.dragwidth >= 100){
          state.dragwidth = 100
        }
        else{
          state.width = state.dragwidth
        }
      },
      /*音量函数*/
      voice (state,val) {
        state.voiceheight -= val
        if(state.voiceheight < 0){
          state.voiceheight = 0
        }
        if(state.voiceheight > 93){
          state.voiceheight = 93
        }
      },
    },
    actions: { 
      /*派发当前时间函数*/ 
      currentime (context,obj) {
        if(obj.paused){
          clearInterval(this.Timer)
        }
        else{
          clearInterval(this.Timer)
          this.Timer = setInterval(() => {
          context.commit('currentime',obj)
          }, 500);  
        }  
      } 
    },
    getters: {  }
  }
  


  /*存数据*/ 
  const songsLists = {
    state: { 
      navhide: true,   
      recommendSongs: [],     /*热门推荐*/ 
      newSongs: [],           /*新碟上架*/ 
      riseSongs:[],           /*云音乐飙升榜*/ 
      freshSongs:[],          /*云音乐新歌榜*/
      originSongs: [],        /*云音乐原创榜*/
      enterSingers: [],       /*入驻歌手*/ 
     },
    mutations: {  },
    actions: {  }
  }

  



  export default new Vuex.Store({
    modules: {
      a: play,
      b: songsLists,
    }
  })