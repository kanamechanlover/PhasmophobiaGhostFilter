<template>
    <div id="app">
        <Layout />
    </div>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
    name: 'App',
    router: {
        base: '/PhasmophobiaGhostFilter.github.io/',
    },
    components: {
        Layout
    }
}
</script>

<style>
html,body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    touch-action: manipulation; /* ダブルタップによる拡大を無効 */
    user-select: none;
}
#app {
    font-family: '游ゴシック', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 16px;
    height: 100%;
}

/* スマホ向け設定(横向き) */
@media screen and (max-height: 420px) {
    html,body {
        overflow-y: scroll;
    }
}
</style>
