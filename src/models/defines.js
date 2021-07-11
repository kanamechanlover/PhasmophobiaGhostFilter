// 定数定義

// 証拠名
export const Traits = [
    { key: 'level5', name: 'レベル5' },
    { key: 'box', name: 'スピリット ボックス' },
    { key: 'finger', name: '指紋' },
    { key: 'orb', name: 'ゴースト オーブ' },
    { key: 'writing', name: 'ゴースト ライティング' },
    { key: 'freezing', name: '氷点下の温度' },
];

// 証拠アイコン
export const TraitIcons = {
    level5: 'fas fa-exclamation-triangle fa-fw',
    box: 'fab fa-weixin fa-fw',
    finger: 'fas fa-fingerprint fa-fw',
    orb: 'fab fa-cloudversify fa-fw',
    writing: 'fas fa-book-open fa-fw',
    freezing: 'fas fa-temperature-low fa-fw',
};

// 証拠判明状態
export const TraitState = {
    Unknown: 'unknown', // 不明
    With: 'with', // 証拠有り
    Without: 'without', // 証拠無し
};

// ゴースト・証拠リスト
// traits: level5/box/finger/orb/writing/freezing カンマ区切り
export const GhostTraits = [
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
    {
        name: 'ハントゥ',
        traits: 'finger,orb,writing',
    },
    {
        name: '妖怪',
        traits: 'box,orb,writing',
    },
];
export const getGhostTraits = function(name) {
    const index = GhostTraits.findIndex(ghost => {
        return ghost.name == name;
    });
    if (index < 0) return [];
    return GhostTraits[index].traits.split(',');
};