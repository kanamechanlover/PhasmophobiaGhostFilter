<template>
    <div class="frame" @click="onClickAction" @touch="onClickAction"
            @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"
            @touchstart="onTouchStart" @touchmove="onTouchMove"
            @touchend="onTouchEnd" @touchleave="onTouchEnd" @touchcancel="onTouchEnd">
        <div class="back">
            <div class="left" :class="{next: nextSelect == 0, hover: hover}"></div>
            <div class="right" :class="{next: nextSelect == 2, hover: hover}"></div>
        </div>
        <div class="middle">
            <div class="middle-wrapper" ref="middle">
                <div class="lever" ref="lever" :class="{
                    'neutral': isNeutral, 'with': isWith, 'without': isWithout,
                    'on-with': isWith, 'on-without': isWithout, 'hover': hover, 'touching': touching
                }" :style="{left: leverX}"></div>
            </div>
        </div>
        <div class="front icon mix-blrend-multiply">
            <div class="front-icon" v-for="index in 3" :key="index">
                <i :class="{'fa-2x': index == 2, 'fa-lg': index != 2, [traitIcon]: true}"></i>
            </div>
        </div>
        <div class="front">
            <div class="with-text">
                <span>{{ optionNames[0] }}</span>
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
import { Traits, TraitState, TraitIcons, isSmartPhone } from '../models/defines.js'

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
        ready: {
            cache: false, // 何故か更新されないのでキャッシュ無効化
            get() {
                return !!(this.$refs.lever);
            }
        },
        // 証拠不明
        isNeutral: {
            cache: false, // 何故か更新されないのでキャッシュ無効化
            get() {
                const stateUnknown = this.selected == TraitState.Unknown;
                const center = this.ready &&
                    (this.touchLeverX <= this.slideWidth * 2 / 3) &&
                    (this.touchLeverX >= this.slideWidth / 3);
                return (!(this.touching) && stateUnknown) || (this.touching && center);
            }
        },
        // 証拠有り
        isWith: {
            cache: false, // 何故か更新されないのでキャッシュ無効化
            get() {
                const stateWith = this.selected == TraitState.With;
                const left = this.ready && this.touchLeverX < this.slideWidth / 3;
                return (!(this.touching) && stateWith) || (this.touching && left);
            }
        },
        // 証拠無し
        isWithout: {
            cache: false, // 何故か更新されないのでキャッシュ無効化
            get() {
                const stateWithout = this.selected == TraitState.Without;
                const right = this.ready && this.touchLeverX > this.slideWidth * 2 / 3;
                return (!(this.touching) && stateWithout) || (this.touching && right);
            }
        },
        // レバー幅
        leverWidth() {
            return this.$refs.lever.getBoundingClientRect().width;
        },
        // ミドルフレーム幅
        middleFrameWidth() {
            return this.$refs.middle.getBoundingClientRect().width;
        },
        // スライド幅
        slideWidth() {
            return this.middleFrameWidth - this.leverWidth;
        },
        // レバー座標
        leverX() {
            return this.touchLeverX + 'px';
        }
    },
    methods: {
        ...mapMutations('TraitStatus', [
            'setTraitState',
        ]),
        onClickAction: function() {
            // スマホでスライド操作時普通のタップも反応してしまうのでスマホでのみタップ操作を無しに
            if (isSmartPhone()) return;

            const before = this.selected;
            this.advance();
            console.log(this.text, before + ' -> ' + this.selected);
            this.emitChanged();
        },
        advance: function() {
            this.selectedIndex = (this.selectedIndex + 2) % this.options.length; // ※有→無の順にする為逆順にしている
            this.selected = this.options[this.selectedIndex];
            this.nextSelect = (this.selectedIndex + 2) % this.options.length;
        },
        reset: function() {
            this.selectedIndex = 0;
            this.selected = TraitState.Unknown;
            this.nextSelect = 1;
        },
        setSelected: function(state) {
            this.selected = state;
            this.selectedIndex = this.options.indexOf(state);
        },
        emitChanged: function() {
            this.$emit('changed', { selected: this.selected });
        },

        // マウスホバー検知
        onMouseEnter: function() {
            this.hover = true;
        },
        onMouseLeave: function() {
            this.hover = false;
        },

        // タッチ操作によるスライド検知
        setCurrentStatusPos: function(x) {
            console.log('setCurrentStatusPos', this.selectedIndex, x, this.touchLeverX);
            this.touchStartX = x;
            const width = this.slideWidth / 2;
            this.touchLeverX = width * this.selectedIndex;
            console.log('setCurrentStatusPos', this.touchLeverX);
        },
        onTouchStart: function(e) {
            this.touching = true;
            this.setCurrentStatusPos(e.touches[0].clientX);
        },
        onTouchEnd: function() {
            // デフォルトは「不明」
            let newSelected = TraitState.Unknown;
            // 左寄りなら「有り」へ
            if (this.touchLeverX < this.slideWidth / 3) {
                newSelected = TraitState.With;
            }
            // 右寄りなら「無し」へ
            else if (this.touchLeverX > this.slideWidth * 2 / 3) {
                newSelected = TraitState.Without;
            }
            // 変化したら値変更
            if (this.selected != newSelected) {
                this.setSelected(newSelected);
                this.emitChanged();
            }
            this.touching = false;
        },
        onTouchMove: function(e) {
            // レバー移動
            const diffX = e.touches[0].clientX - this.touchStartX;
            const base = this.selectedIndex * (this.slideWidth / 2)
            this.touchLeverX = base + diffX;
            // 移動範囲制限
            if (this.touchLeverX < 0) {
                this.touchLeverX = 0;
            }
            else if (this.touchLeverX > this.slideWidth) {
                this.touchLeverX = this.slideWidth;
            }
            console.log('onTouchMove', e.touches[0].clientX, diffX, this.touchLeverX);
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
            options: [TraitState.With, TraitState.Unknown, TraitState.Without],
            optionNames: ['有', '', '無'],
            // 選択中の値
            selected: TraitState.Unknown,
            selectedIndex: 1,
            // クリックしたら選択状態になる値
            nextSelect: 1,
            hover: false,
            // 証拠キー
            traitIcon: '',
            // タッチスライド操作
            touching: false, // タッチしているか
            touchStartX: 0, // タッチ開始x位置
            touchLeverX: 0, // レバーのx位置(フレーム左端を 0 とする)
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
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}
.right {
    flex: 1;
    text-align: right;
    border: 1px solid red;
    background: tomato;
    padding-right: 8px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
}
.middle {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    padding: 0px 4px;
}
.middle-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}
.lever {
    width: 75%;
    background: white;
    border: 1px solid black;
    border-width: 2px;
    text-align: center;
}
.lever.touching {
    position: absolute !important;
    margin-left: initial;
    margin-right: initial;
    top: 50%;
    transform: translateY(-50%);
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
    justify-content: center;
    line-height: 1rem;
    text-align: center;
    padding: 0px 4px;
}

.front-icon {
    color: lightgray;
    height: 1rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.front-icon:nth-child(2) {
    color: gray;
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