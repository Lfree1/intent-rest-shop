<template>
  <div id="app">
    <p id="title">&lt;intent&gt;</p>
    <Shop/>
  </div>
</template>

<script>
import Shop from './components/Shop.vue'

export default {
  name: 'app',
  components: {
    Shop
  }
};
</script>

<style>
#app {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#title {
  font-weight: bold;
  font-size: 100px;
  color: navy;
}
</style>
