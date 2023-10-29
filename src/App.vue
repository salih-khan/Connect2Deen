<template>
 <div class="container-fluid full-application">
  <router-view/>

  <Player/>

 </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.full-application{
  background-color: #F7F7F7;
  min-height: 100vh;
  
}

</style>

<script>
import Player from './components/Player.vue'

export default{
  components: {
    Player
  }
}
</script>