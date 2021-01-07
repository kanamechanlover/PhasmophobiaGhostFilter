<template>
    <b-button-group size="sm">
        <b-button
            v-for="(option, index) in options"
            :key="option.value"
            :variant="variant(index)"
            @click="changed(option.value)">
            {{ option.text }}
        </b-button>
    </b-button-group>
</template>

<script>
export default {
    methods: {
        variant: function(index) {
            const prefix = (this.selected === this.options[index].value) ? '' : 'outline-';
            return prefix + this.options[index].variant;
        },
        changed: function(value) {
            console.log([this.selected, value]);
            if (this.selected === value) return;

            this.selected = value;
            this.$emit('changed', {
                selected: value,
            });
        },
        reset: function() {
            this.changed('none');
        }
    },
    data() {
        return {
            // 選択肢
            options: [
                {
                    text: '有',
                    value: 'with',
                    variant: "success"
                },
                {
                    text: '？',
                    value: 'none',
                    variant: "secondary"
                },
                {
                    text: '無',
                    value: 'without',
                    variant: "danger"
                },
            ],
            // 選択中の値
            selected: 'none',
        };
    }
}
</script>

<style>

</style>