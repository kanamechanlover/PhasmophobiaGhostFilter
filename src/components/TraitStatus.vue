<template>
    <div class="frame" @click="onClickAction"
            @mouseenter="onMouseEnter" @touchstart="onMouseEnter"
            @mouseleave="onMouseLeave" @touchend="onMouseLeave">
        <div class="back">
            <div class="left" :class="{next: nextSelect == 1, hover: hover}"></div>
            <div class="right" :class="{next: nextSelect == 2, hover: hover}"></div>
        </div>
        <div class="middle">
            <div class="lever" :class="{
                neutral: isNeutral, with: isWith, without: isWithout,
                'on-with': isWith, 'on-without': isWithout, hover: hover,
            }"></div>
        </div>
        <div class="front mix-blrend-multiply">
            <div class="front-icon">
                <i class="fa-2x" :class="traitIcon"></i>
            </div>
        </div>
        <div class="front">
            <div class="with-text">
                <span>{{ optionNames[1] }}</span>
            </div>
            <div class="lever-text">
                <span class="outline-white" v-html="computedText"></span>
            </div>
            <div class="without-text">
                <span>{{ optionNames[2] }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Traits, TraitState, TraitIcons } from '../models/defines.js'

export default {
    props: {
        text: {
            type: String,
            default: '証拠名',
        },
    },
    mounted: function() {
        this.updateTraitIcon(this.text);
    },
    computed: {
        computedText() {
            return this.text.replace(/\s/, '<br />');
        },
        // 無指定
        isNeutral() {
            return this.selected == TraitState.Unknown;
        },
        // 有り
        isWith() {
            return this.selected == TraitState.With;
        },
        // 無し
        isWithout() {
            return this.selected == TraitState.Without;
        },
    },
    methods: {
        ...mapMutations('TraitStatus', [
            'setTraitState',
        ]),
        onClickAction: function() {
            const before = this.selected;
            this.advance();
            console.log(this.text, before + ' -> ' + this.selected);
            this.$emit('changed', { selected: this.selected });
        },
        advance: function() {
            this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
            this.selected = this.options[this.selectedIndex];
            this.nextSelect = (this.selectedIndex + 1) % this.options.length;
        },
        reset: function() {
            this.selectedIndex = 0;
            this.selected = TraitState.Unknown;
            this.nextSelect = 1;
        },

        // マウスホバー検知
        onMouseEnter: function() {
            this.hover = true;
        },
        onMouseLeave: function() {
            this.hover = false;
        },

        // その他
        updateTraitIcon: function(text) {
            const trait = Traits.find(trait => (trait.name == text));
            const key = trait ? trait.key : '';
            this.traitIcon = (key in TraitIcons) ? TraitIcons[key] : '';
        },
    },
    data() {
        return {
            // 選択肢
            options: [TraitState.Unknown, TraitState.With, TraitState.Without],
            optionNames: ['', '有', '無'],
            // 選択中の値
            selected: TraitState.Unknown,
            selectedIndex: 0,
            // クリックしたら選択状態になる値
            nextSelect: 1,
            hover: false,
            // 証拠キー
            traitIcon: '',
        };
    },
    watch: {
        text: function(value) {
            this.updateTraitIcon(value);
        }
    }
}
</script>

<style scoped>
.frame {
    display: flex;
    flex-direction: row;
    position: relative;
    user-select: none;
    cursor: pointer;
    font-weight: bold;
}
.back {
    flex: 1;
    display: flex;
    flex-direction: row;
}
.left, .right, .lever {
    height: 2.5rem;
    border-radius: 2.5rem;
    line-height: 1rem;
    display: flex;
    flex-direction: row;
    text-align: center;
}
.left {
    flex: 1;
    text-align: left;
    border: 1px solid green;
    background: mediumseagreen;
    padding-left: 8px;
}
.right {
    flex: 1;
    text-align: right;
    border: 1px solid red;
    background: tomato;
    padding-right: 8px;
}
.middle {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    padding: 0px 4px;
}
.lever {
    width: 75%;
    background: white;
    border: 1px solid black;
    border-width: 2px;
    text-align: center;
}
.neutral {
    margin-left: auto;
    margin-right: auto;
}
.with {
    margin-right: auto;
}
.without {
    margin-left: auto;
}
.on-with {
    border-color: green !important;
    background: mediumseagreen;
    color: white !important;
}
.on-without {
    border-color: red !important;
    background: tomato;
    color: white !important;
}

.next.hover {
    border-width: 2px;
}

.left span, .right span, .lever span {
    margin-top: auto;
    margin-bottom: auto;
    flex: 1;
}

.front {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    flex-direction: row;
    line-height: 1rem;
    text-align: center;
    padding: 0px 4px;
}

.front-icon {
    flex: 1;
    color: gray;
    height: 1rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.with-text, .without-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
}

.lever-text {
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.8rem;
}

.mix-blrend-multiply {
    mix-blend-mode: multiply;
}

.outline-white {
    text-shadow:
         1px  1px 0px white,
        -1px  1px 0px white,
         1px -1px 0px white,
        -1px -1px 0px white,
         1px  0px 0px white,
         0px  1px 0px white,
        -1px  0px 0px white,
         0px -1px 0px white;
}

/* スマホ向け設定 */
@media screen and (max-width: 480px) {
    .lever {
        width: 70%;
    }
}
</style>