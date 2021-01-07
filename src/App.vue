<template>
  <div id="app">
    <GhostFilterTable />
  </div>
</template>

<script>
import GhostFilterTable from './components/GhostFilterTable.vue'

export default {
  name: 'App',
  router: {
    base: '/PhasmophobiaGhostFilter.github.io/',
  },
  components: {
    GhostFilterTable
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
