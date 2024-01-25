
<template>
  <Start menutitle="Examples for Microservices"/>  
</template>

<script>
/* eslint-disable */
import Start from './components/Start.vue'
import TranslationView from './components/TranslationView.vue'
import TrendsView from './components/TrendsView.vue'

import HomeView from './views/HomeView.vue'


export default {
  name: 'App',
  components: {
    Start,
    TranslationView,
    TrendsView,
    HomeView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
