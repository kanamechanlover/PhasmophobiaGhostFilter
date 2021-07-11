<template>
    <div class="panel-frame">
        <div class="panel-header">
            <div class="panel-title">
                証拠判明状況 &emsp; 操作パネル
            </div>
            <div class="panel-clear-button">
                <div class="clear" @click="reset">
                    リセット
                </div>
            </div>
        </div>
        <div class="panel-list">
            <TraitStatus class="item" ref="status" @changed="onChangedStatus(trait.key, $event.selected)"
                v-for="(trait, index) in traits" :key="index" :text="trait.name">
            </TraitStatus>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Traits } from '../models/defines.js'
import TraitStatus from './TraitStatus.vue'

export default {
    components: {
        TraitStatus,
    },
    computed: {
        traits() {
            return Traits;
        }
    },
    methods: {
        ...mapMutations('TraitStatus', [
            'setTraitState',
            'resetTraitState',
        ]),
        onChangedStatus: function(key, value) {
            this.setTraitState({ key: key, value: value });
        },
        reset: function() {
            this.$refs.status.forEach(elm => {
                elm.reset();
            });
            this.resetTraitState();
        }
    },
}
</script>

<style scoped>
.panel-frame {
    margin: 4px;
    padding: 4px;
    border: 1px solid gray;
    border-radius: 1rem;
    background: silver;
    font-weight: bold;
}
.panel-header {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
}
.panel-title {
    flex: 1;
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    font-weight: bold;
    text-align: left;
    padding-left: 8px;
    color: black;
}
.panel-clear-button {
    margin-left: 4px;
}
.clear {
    border: 1px solid darkgoldenrod;
    border-radius: 1rem;
    background: khaki;
    padding: 4px 8px;
    line-height: 1rem;
    user-select: none;
    cursor: pointer;
}
.clear:hover {
    background: yellow;
    font-weight: bold;
}
.panel-list {
    display: flex;
    flex-direction: column;
}
.item {
    padding: 0px 4px;
    margin-bottom: 8px;
}


/* スマホ向け設定 */
@media screen and (max-width: 480px) {
    .panel-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .item {
        flex: 50%;
    }
}
</style>