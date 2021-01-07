<template>
    <tr>
        <td class="text-nowrap position-relative pb-2">
            <div class="w-100 h-100 text-center">
                <div class="text-center">ゴースト名</div>
                <div class="text-center position-absolute fixed-bottom" style="bottom: 8px;">
                    <button
                        class="btn btn-outline-warning btn-sm font-weight-bold"
                        @click="clear">
                        クリア⇒
                    </button>
                </div>
                <div class="invisible">
                    <button class="btn btn-sm"></button>
                </div>
            </div>
        </td>
        <td v-for="trait in traitsObj" :key="trait.key" class="position-relative pb-2">
            <div class="w-100 h-100">
                <div class="text-center">{{ trait.name }}</div>
                <div class="text-center position-absolute fixed-bottom" style="bottom: 8px;">
                    <trait-status @changed="statusChanged(trait.key, $event)" ref="status"></trait-status>
                </div>
                <div class="invisible">
                    <!-- スペース確保のためのダミー -->
                    <trait-status ></trait-status>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
import TraitStatus from './TraitStatus.vue';

export default {
    components: { TraitStatus },
    props: {
        traits: String,
    },
    methods: {
        statusChanged: function(key, result) {
            this.$emit('changed', {
                key: key,
                status: (result.selected !== 'none') ? result.selected : undefined,
            });
        },
        clear: function() {
            this.$refs['status'].forEach(item => {
                item.reset();
            });
        }
    },
    data() {
        return {
            // 特徴(key,name)
            traitsObj: JSON.parse(this.traits),
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