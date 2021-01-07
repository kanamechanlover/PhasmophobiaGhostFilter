<template>
    <tr>
        <td v-for="(column, index) in columns"
            :key="index"
            :class="[remaining ? 'table-success' : 'table-light', 'text-nowrap']">
            <div v-if="typeof column === 'string'">
                {{ column }}
            </div>
            <div v-else-if="typeof column === 'boolean'">
                <b-iconstack font-scale="1">
                    <b-icon v-if="column" icon="square" scale="1"></b-icon>
                    <b-icon v-if="column && remaining" icon="check" scale="1"></b-icon>
                </b-iconstack>
            </div>
            <div v-else>
                {{ name }} {{ typeof column }} {{ typeof index }}
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        ghost: String, // ゴースト名
        traits: String, // 特徴(json string)
        myTraits: String, // 持っている特徴(カンマ区切り)
    },
    methods: {
        // 特徴判明状況変更
        // key: 特徴名
        // status: with/without
        setTrait: function(key, status) {
            if (key in this.traitStatus) {
                this.traitStatus[key].with = (status === 'with');
                this.traitStatus[key].without = (status === 'without');
            }
            this.remaining = this.isRemaining();
        },
        // このゴーストの可能性があるか
        // return: true=可能性あり
        isRemaining: function() {
            const traits = this.myTraits.split(',');
            const self = this;
            return !Object.keys(this.traitStatus).some(name => {
                const status = self.traitStatus[name];
                if (traits.includes(name) && status.without) {
                    // 自身の持つ特徴が無い場合
                    return true;
                }
                if (!(traits.includes(name)) && status.with) {
                    // 自身の持たない特徴が有る場合
                    return true;
                }
                return false;
            });
        }
    },
    data() {
        // 特徴判明状況取得
        const traitsObj = JSON.parse(this.traits);
        const traitStatus = {};
        traitsObj.forEach(trait => {
            traitStatus[trait.key] = { with: false, without: false };
        });
        const traitNames = Object.values(traitsObj).map(trait => trait.key);
        const myTraitNames = this.myTraits.split(',');
        const columns = [this.ghost].concat(traitNames.map(n => myTraitNames.indexOf(n) != -1));
        console.log(columns);
        return {
            name: () => this.ghost,
            columns: columns, // 列要素の値
            traitStatus: traitStatus, // 特徴判明状況取得
            remaining: true, // このゴーストの可能性があるか
        }
    },
}
</script>

<style>
.remaining {
    background-color: lightgreen;
    color: green;
}
.noremaining {
    background-color: silver;
    color: gray;
}
</style>