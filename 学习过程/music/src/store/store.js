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
      },
      totaltime (state,obj) {
        let time = obj
        let m = Math.round(time / 60) , s = Math.round(time % 60)
        let sec = (s > 10)? s : '0' + s
        let min = (m > 10)? m : '0' + m
        state.totaltime = min + ':' + sec 
      },
      currentime (state,obj) {
        let time = obj.currentTime
        let m = Math.round(time / 60) , s = Math.round(time % 60)
        let sec = (s > 10)? s : '0' + s
        let min = (m > 10)? m : '0' + m
        state.currentime = min + ':' + sec
        state.width = obj.currentTime/obj.duration * 100
      }
    },
    actions: { 
      currentime (context,obj) {
        console.log(obj)
        if(obj.ended){
            clearInterval(this.Timer)
        }
        else if(obj.paused){
          clearInterval(this.Timer)
        }
        else{
          this.Timer = setInterval(() => {
          context.commit('currentime',obj)
            }, 500);    
          } 
        }

    },
    getters: {  }
  }
  



  const songsLists = {
    state: { 
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