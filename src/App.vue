<template>
  <div id="app">
    <div>
      <h1 class="title">Phasmophobia Ghost Filter</h1>
      <span class="update">Tool's Latest Update : 2021/7/9</span>
    </div>
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
}
.title {
  margin-bottom: 4px;
}
.update {
  vertical-align: baseline;
  font-size: 1rem;
}
</style>
