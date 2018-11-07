<template>
  <div>
    <top></top>
    <router-view></router-view>
    <bottom></bottom>
    <player></player>
  </div>
</template>

<script>
import top from './components/top'
import bottom from './components/bottom'
import player from './components/player'

export default {
  components: {
    top,
    bottom,
    player
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html{
  min-width: 1200px;
  width: 100%;
}
body{
  width: 100%;
}
</style>
