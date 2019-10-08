<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: #eeeeee!important;
}
.contentBox {
  /* height: calc(100vh - 52px); */
  padding: 10px 80px;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  min-height: 100%;
  background-color: #eee;
  min-width: 1300px;
}
</style>
