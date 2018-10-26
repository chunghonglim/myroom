<template>
  <div>
    <div class="header">
      <router-link to='/'><img src="./assets/logo.png" alt=""></router-link>
      <ul>
        <li @click='clickenter'>{{ idname }}</li>
        <li>|</li>
        <li><a href="http://www.baidu.com" target='_blank'>注册</a></li>
        <li>|</li>
        <li @click='clickabout'>关于</li>
      </ul>
    </div>
    <div class="content">
      <div>
          <div class='contents'>
            <router-view :shoppics='shoppics'></router-view>
          </div>
      </div>
    </div>
    <div class="footer"><p>© 2018 fishenal MIT</p></div>
    <transition name='drop'>
        <keep-alive>
          <enter v-if='showenter && flag' @closeenter='closeenter' @getid='useid'>
          </enter>
          <about v-if='showabout' @closeabout='closeabout'>     
          </about> 
        </keep-alive> 
    </transition>
  </div>  
</template>

<script>
import enter from './components/enter'
import about from './components/about'
export default {
    data () {
      return {
        showenter: false,
        showabout: false,
        idname: '登陆',
        flag: true,
        shoppics: [
        {
          url: require('./assets/erath.png'),
        },
        {
          url: require('./assets/car.png'),
        },
        {
          url: require('./assets/hill.png'),
        },
        {
          url: require('./assets/loud.png'),
        },
      ]
      }
    },
    components: {
      enter,
      about
    },
    methods: {
      clickenter () {
        this.showenter = true
      },
      closeenter () {
        this.showenter = false
      },
      clickabout () {
        this.showabout = true
      },
      closeabout () {
        this.showabout = false
      },
      useid (id) {
        this.idname = '欢迎你,'+ id
        this.flag = false
      }  
    }
}
</script>

<style>
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
  .header{
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
    margin-bottom: 10px;
  }
  .header img{
    width:50px;
    height: 50px;
    margin:20px auto 20px 80px;  
  }
  .header ul{
    float:right;
    line-height: 90px;
    margin-right: 40px;
  }
  .header ul li{
    padding-right: 10px;
    float:left;
    line-height: 90px;
    cursor: pointer;
  }
  .box{
    overflow: hidden;
  }
  .contents{
    overflow: hidden;
  }
  .content{
    width: 1250px;
    margin: 0 auto;
    overflow: hidden;
  }
  .footer{
    text-align: center;
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #e3e4e8;
    margin-top: 30px;
  }
  .drop-leave-to,.drop-enter{
    opacity: 0;
  }
  .drop-leave-active,.drop-enter-active{
    transition: opacity .5s ease
  }
</style>
