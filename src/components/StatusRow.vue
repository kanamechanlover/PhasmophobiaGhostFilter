<template>
    <b-tr>
        <b-td class="text-center">
            <b-button v-if="false" @click="clear">クリア⇒</b-button>
        </b-td>
        <b-td v-for="(trait, tIndex) in traitsObj" :key="tIndex" class="text-center p-0">
            <div class="text-center b-flex b-flex-column p-0">
                <b-button-group size="sm">
                    <b-button
                        v-for="state in status[tIndex]"
                        :key="state.value"
                        :variant="(state.selected ? '' : 'outline-') + state.variant"
                        @click="statusChanged(tIndex, state.value)">
                        {{ state.text }}
                    </b-button>
                </b-button-group>
            </div>
        </b-td>
    </b-tr>
</template>

<script>
export default {
    props: {
        traits: String, // 特徴(json string)
    },
    methods: {
        statusChanged: function(index, value) {
            console.log([index, this.selected[index], value]);
            if (this.selected[index] === value) return;

            this.selected[index] = value;
            for (let i = 0; i < this.status[index].length; i++) {
                const selected = (this.status[index][i] === value);
                this.status[index][i].selected = selected;
            }
            this.$emit('changed', {
                key: this.traitsObj[index].key,
                status: (value !== 'none') ? value : undefined,
            });
        },
        clear: function() {
            this.selected.fill('none');
            this.status.forEach((t,index) => {
                this.status[index].forEach((s,i) => {
                    this.status[index][i].selected = (s.value === 'none');
                });
            });
        }
    },
    data() {
        const traitsObj = JSON.parse(this.traits);
        return {
            // 特徴(key:name)
            traitsObj: traitsObj,
            // 判明した状況
            selected: (new Array(traitsObj.length)).fill('none'),
            status: (new Array(traitsObj.length)).fill([
                {
                    text: '有',
                    value: 'with',
                    variant: "success",
                    selected: false,
                },
                {
                    text: '不明',
                    value: 'none',
                    variant: "secondary",
                    selected: true,
                },
                {
                    text: '無',
                    value: 'without',
                    variant: "danger",
                    selected: false,
                },
            ]),
        };
    },
}
</script>

<style>
    *:focus {
        outline: none !important;
        box-shadow:none !important;
    }
</style>