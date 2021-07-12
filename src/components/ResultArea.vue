<template>
    <div class="frame">
        <div class="header">
            一致するゴースト一覧
        </div>
        <div class="list" ref="ghostList">
            <ResultGhost ref="ghosts" :text="ghost.name" @expandDetail="collapseDetail(index)"
                v-for="(ghost, index) in ghosts" :key="index">
            </ResultGhost>
        </div>
    </div>
</template>

<script>
import { GhostTraits } from '../models/defines.js'
import ResultGhost from './ResultGhost.vue'

export default {
    components: {
        ResultGhost
    },
    mounted: function() {
        console.log('mounted', this.ghosts);
        const self = this;
        // ストアの値変更監視
        this.$store.subscribe((mutation) => {
            const updateFuncNames = [
                'TraitStatus/setTraitState',
                'TraitStatus/resetTraitState',
            ];
            if (updateFuncNames.indexOf(mutation.type) != -1) {
                self.update();
            }
        });
    },
    beforeUnmount: function() {
        console.log('beforeUnmount');
        this.$store.unsubscribe();
    },
    methods: {
        update: function() {
            this.$refs.ghosts.forEach(ghost => {
                ghost.update();
            });
        },
        collapseDetail: function(index) {
            this.$refs.ghosts.forEach((ghost, i) => {
                if (i != index) {
                    ghost.collapseDetail();
                }
            })
        }
    },
    data: function() {
        return {
            ghosts: GhostTraits.map(v => ({ name: v.name })),
        };
    },
}
</script>

<style scoped>
.frame {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 4px;
    border: 1px solid silver;
    border-radius: 1rem;
    background: whitesmoke;
}
.header {
    font-size: 1rem;
    font-weight: bold;
}
.list {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-x: hidden;
    overflow-y: auto;
    align-content: flex-start;
}

/* スマホ向け設定 */
@media screen and (max-width: 480px) {
    .list {
        flex-direction: column;
        flex-wrap: nowrap;
    }
}
</style>