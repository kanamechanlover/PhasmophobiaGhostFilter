<template>
    <div class="ghost-frame" :class="{ 'non-target': !target }">
        <div class="ghost-name" :class="{ target: target, 'non-target': !target }">
            {{ text }}
        </div>
        <div class="trait-icons">
            <div class="icon" v-for="(icon, index) in icons" :key="index">
                <i :class="getTraitIcon(icon)" :title="getTraitName(icon)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Traits, TraitIcons, TraitState, getGhostTraits } from '../models/defines.js'
export default {
    props: {
        // ゴースト名
        text: {
            type: String,
            default: 'ゴースト名',
        },
    },
    mounted: function() {
        this.update();
    },
    computed: {
        ...mapGetters('TraitStatus', [
            'getTraitState'
        ]),
        // ゴーストの証拠リスト
        ghostTraits() {
            return getGhostTraits(this.text);
        },
        // 対象である
        isTarget() {
            return this.target;
        }
    },
    methods: {
        // 証拠アイコン取得
        getTraitIcon(key) {
            return TraitIcons[key];
        },
        // 証拠名
        getTraitName(key) {
            return Traits.find(trait => trait.key == key).name;
        },
        // 更新
        update() {
            console.log('ResultGhost.update', this.text);
            const traits = getGhostTraits(this.text);
            this.target = Traits.every(trait => {
                const key = trait.key;
                const state = this.getTraitState(key);
                const having = (traits.indexOf(key) != -1);
                const otherWith = (!having && state == TraitState.With);
                const selfWithout = (having && state == TraitState.Without);
                return (!otherWith) && (!selfWithout);
            })
            if (this.target) {
                this.icons = traits.filter(key => {
                    const state = this.getTraitState(key);
                    return (state == TraitState.Unknown);
                });
            }
            else {
                this.icons = [];
            }
        }
    },
    data: function() {
        return {
            target: true,
            icons: []
        };
    },
    watch: {
        text: function(...args) {
            console.log('ResultGhost', args);
            this.update();
        },
    },
}
</script>

<style scoped>

.ghost-frame {
    width: 100%;
    padding: 4px;
    display: flex;
    flex-direction: row;
    position: relative;
    margin-bottom: 4px;
}
.ghost-name {
    flex: 1;
    line-height: 0.8rem;
    text-align: left;
    border-radius: 1.0rem;
    padding: 6px 16px;
}
.trait-icons {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    padding-right: 20px;
}
.icon {
    margin-left: 4px;
    color: white;
}
.target {
    border: 1px solid green;
    background: mediumseagreen;
    color: white;
    font-size: 1.0rem;
}
.ghost-name.non-target {
    border: 1px solid silver;
    background: transparent;
}

/* スマホ向け設定 */
@media screen and (max-width: 480px) {
    .ghost-frame.non-target {
        display: none;
    }
}
</style>