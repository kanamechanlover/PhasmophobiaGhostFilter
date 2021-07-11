import Vue from 'vue'
import { Traits, TraitState } from '../../models/defines.js'

const initTraits = function() {
    return Object.assign({}, ...Traits.map((v) => ({ [v.key]: TraitState.Unknown })));
};

const state = {
    // 証拠判明状況
    traits: initTraits(),
}

const getters = {
    getTraits: (state) => {
        return state.traits;
    },
    // 証拠判明状況取得
    // @param [in] trait 証拠名
    // @return 証拠判明状況 (証拠名が不正な場合は空文字列)
    getTraitState: (state) => (trait) => {
        if (!trait || trait in state.traits)
            return state.traits[trait];
        return '';
    }
}

const mutations = {
    // 証拠判明状況変更
    // @param [in] payload { key: 証拠名, value: 状況(TraitState) }
    setTraitState(state, payload) {
        Vue.set(state.traits, payload.key, payload.value);
        console.log('store', 'setTraitState', payload, state.traits);
    },
    resetTraitState(state) {
        state.traits = initTraits();
        console.log('store', 'resetTraitState');
    },
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}