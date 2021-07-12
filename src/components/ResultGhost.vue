<template>
    <div class="ghost-frame" :class="{ 'non-target': !target }">
        <div class="ghost-content">
            <div class="ghost-details">
                <div class="ghost-details-wrapper"  v-if="!collapsed">
                    <div class="ghost-detail" v-for="(detail, index) in details" :key="index"
                            :class="{ target: target, 'non-target': !target }">
                        {{ detail }}
                    </div>
                </div>
            </div>
        </div>
        <div class="ghost-bar" @click="toggleDetail"
                @mouseenter="onMouseEnter" @touchstart="onMouseEnter"
                @mouseleave="onMouseLeave" @touchend="onMouseLeave" @touchcancel="onMouseLeave">
            <div class="ghost-name" :class="{ target: target, 'non-target': !target, hover: hover }">
                {{ text }}
            </div>
            <div class="trait-icons">
                <div class="icon" v-for="(icon, index) in icons" :key="index">
                    <i :class="getTraitIcon(icon)" :title="getTraitName(icon)"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Traits, TraitIcons, TraitState, getGhostTraits, getGhostDetails } from '../models/defines.js'
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
        this.updateDetails();
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
        // マウスイベント
        onMouseEnter: function() {
            this.hover = true;
        },
        onMouseLeave: function() {
            this.hover = false;
        },
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
        },
        // ゴースト詳細取得
        updateDetails: function() {
            this.details = getGhostDetails(this.text);
        },
        // ゴースト詳細表示非表示切替
        toggleDetail: function() {
            console.log('toggleDetail');
            this.collapsed = !this.collapsed;
            if (!this.collapsed) {
                this.$emit('expandDetail');
            }
        },
        // ゴースト詳細非表示(格納)
        collapseDetail: function() {
            this.collapsed = true;
        }
    },
    data: function() {
        return {
            target: true,
            icons: [],
            details: [],
            collapsed: true, // ゴースト詳細格納フラグ
            hover: false, // マウスホバーフラグ
        };
    },
    watch: {
        text: function(...args) {
            console.log('ResultGhost', args);
            this.update();
            this.updateDetails();
        },
    },
}
</script>

<style scoped>

.ghost-frame {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
    border: 1px solid gray;
    border-radius: 1rem;
    position: relative;
    user-select: none;
}
.ghost-name {
    flex: 1;
    line-height: 0.8rem;
    text-align: left;
    border-radius: 1.0rem;
    padding: 6px 16px;
}

.ghost-bar {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    padding: 4px;
    display: flex;
    flex-direction: row;
    padding: 4px;
    cursor: pointer;
}

.ghost-name {
    flex: 1;
    line-height: 0.8rem;
    text-align: left;
    border-radius: 1.0rem;
    padding: 6px 16px;
    border-width: 1px;
    border-style: solid;
    margin: 1px;
}
.ghost-name.hover {
    border-width: 2px;
    margin: 0px;
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
.trait-icons .icon {
    margin-left: 4px;
    color: white;
}
.ghost-name.target {
    border-color: green;
    background: mediumseagreen;
    color: white;
    font-size: 1.0rem;
}
.ghost-name.non-target {
    border-color: silver;
    background: transparent;
    font-size: 1.0rem;
}

/* 格納コンテンツの内容 */
.ghost-content {
    border-radius: 1rem;
    background: silver;
    display: flex;
    flex-direction: column;
}
.ghost-details {
    padding: 34px 8px 2px 16px;
    background: whitesmoke;
    border-radius: 1rem;
    text-align: left;
}
.ghost-details.target {
    border: 1px solid green;
}
.ghost-details.non-target {
    border: 1px solid green;
}

/* スマホ向け設定 */
@media screen and (max-width: 480px) {
    .ghost-frame.non-target {
        display: none;
    }
}
</style>