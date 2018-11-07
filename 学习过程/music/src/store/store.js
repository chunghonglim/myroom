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
        state.playsrc = ''
        state.playsrc = obj.data.data[0].url
      },
      playdetail (state,obj) {
        state.playdetail = []
        state.playdetail.push(obj.name)
        state.playdetail.push(obj.ar[0].name)
        state.playdetail.push(obj.al.picUrl)
      }
    },
    actions: { 

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