<template>
  <div id="app">
    <v-header></v-header>
      <router-view></router-view>
  </div>
</template>

<script>

  import vHeader from './components/vHeader.vue'


  export default {
    name: 'app',
    components:{//注册组件
      vHeader
    },
    created: function () {
      console.log(1)
    },
    mounted: function () {
      console.log(2)
    },
    activated: function () {
      console.log(3)
    },
    deactivated: function () {
      console.log(4)
    }

  }
</script>

<style>
  #app{
    padding-top:0.9rem;
  }
</style>
