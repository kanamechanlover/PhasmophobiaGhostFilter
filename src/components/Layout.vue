<template>
    <div class="layout-frame">
        <div class="layout-header">
            <div class="layout-title">Phasmophobia Ghost Filter</div>
            <div class="layout-update">Tool's Latest Update : 2021/9/10</div>
        </div>
        <div class="layout-contents">
            <div class="layout-panel">
                <Panel></Panel>
            </div>
            <div class="layout-result">
                <ResultArea></ResultArea>
            </div>
        </div>
    </div>
</template>

<script>
import Panel from './Panel.vue'
import ResultArea from './ResultArea.vue'

export default {
    components: {
        Panel,
        ResultArea,
    }
}
</script>

<style scoped>
.layout-frame {
    display: flex;
    flex-direction: column;
    max-width: 640px;
    margin: 0px auto;
}
.layout-title {
    margin-top: 8px;
    margin-bottom: 4px;
    font-weight: bold;
    line-height: 1.2rem;
}
.layout-update {
    vertical-align: baseline;
    font-size: 0.8rem;
    color: gray;
}
.layout-contents {
    flex: 1;
    display: flex;
    overflow-y: hidden;
}
.layout-panel {
    display: flex;
    flex-direction: column;
}
.layout-result {
    flex: 1;
    background: whitesmoke;
    min-height: 100px;
    margin: 4px;
    border-radius: 1rem;
}

/* PC向け設定 */
@media screen and (min-width: 481px) {
    .layout-title {
        font-size: 1.5rem;
    }
    .layout-contents {
        flex-direction: row;
    }
}

/* スマホ向け設定 */
@media screen and (max-width: 480px) {
    .layout-frame {
        width: 100%;
        height: 100%;
    }
    .layout-title {
        font-size: 1.2rem;
        line-height: 1.0rem;
    }
    .layout-contents {
        flex-direction: column-reverse;
    }
}
</style>