<template>
    <table class="mx-8 w-75 table table-sm mx-auto border rounded font-weight-bold">
        <HeaderRow :traits="headers" @changed="traitStatusChanged"></HeaderRow>
        <GhostRow
            v-for="item in items"
            :key="item.name"
            :ghost="item.name"
            :traits="headers"
            :myTraits="item.traits"
            ref="ghostRows">
        </GhostRow>
    </table>
</template>

<script>
import HeaderRow from './HeaderRow.vue'
import GhostRow from './GhostRow.vue'

export default {
    components: {
        HeaderRow,
        GhostRow,
    },
    methods: {
        traitStatusChanged: function(result) {
            console.log(result);
            const index = this.fields.findIndex(v => v.key === result.key);
            if (index < 0 || !('status' in this.fields[index]))
                return;

            this.fields[index]['status'] = result.status;
            const field = this.fields[index];
            this.$refs.ghostRows.forEach(row => {
                row.setTrait(result.key, field.status)
            });
        }
    },
    data: function() {
        const headers = [
            { key: 'level5', name: 'レベル5' },
            { key: 'box', name: 'スピリットボックス' },
            { key: 'finger', name: '指紋' },
            { key: 'orb', name: 'ゴーストオーブ' },
            { key: 'writing', name: 'ゴーストライティング' },
            { key: 'freezing', name: '氷点下の温度' },
        ];
        const fields = headers.map(v => Object.assign(v, {
            changeable: true,
            status: ''
        }));
        return {
            fields: fields,
            headers: JSON.stringify(headers),
            items: [ // traits=level5/box/finger/orb/writing/freezingカンマ区切り
                {
                    name: 'スピリット',
                    traits: 'box,finger,writing',
                },
                {
                    name: 'レイス',
                    traits: 'box,finger,freezing',
                },
                {
                    name: 'ファントム',
                    traits: 'level5,orb,freezing',
                },
                {
                    name: 'ポルターガイスト',
                    traits: 'box,finger,orb',
                },
                {
                    name: 'バンシー',
                    traits: 'level5,finger,freezing',
                },
                {
                    name: 'ジン',
                    traits: 'level5,box,orb',
                },
                {
                    name: 'メア―',
                    traits: 'box,orb,freezing',
                },
                {
                    name: 'レヴナント',
                    traits: 'level5,finger,writing',
                },
                {
                    name: 'シェード',
                    traits: 'level5,orb,writing',
                },
                {
                    name: 'デーモン',
                    traits: 'box,writing,freezing',
                },
                {
                    name: '幽霊',
                    traits: 'orb,writing,freezing',
                },
                {
                    name: '鬼',
                    traits: 'level5,box,writing',
                },
            ],
            traitStatus: { // 特徴判明状況取得
                level5: { with: false, without: false }, // レベル5
                box: { with: false, without: false }, // スピリットボックス
                finger: { with: false, without: false }, // 指紋
                orb: { with: false, without: false }, // ゴーストオーブ
                writing: { with: false, without: false }, // ゴーストライティング
                freezing: { with: false, without: false }, // 氷点下の温度
            },
        };
    }
}
</script>

<style>

</style>