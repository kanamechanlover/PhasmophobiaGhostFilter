// 定数定義

// 証拠名
export const Traits = [
    { key: 'level5', name: 'レベル5' },
    { key: 'box', name: 'スピリット ボックス' },
    { key: 'finger', name: '指紋' },
    { key: 'orb', name: 'ゴースト オーブ' },
    { key: 'writing', name: 'ゴースト ライティング' },
    { key: 'freezing', name: '氷点下 の温度' },
    { key: 'dots', name: 'D.O.T.S. プロジェクター' }
];

// 証拠アイコン
export const TraitIcons = {
    level5: 'fas fa-exclamation-triangle fa-fw',
    box: 'fab fa-weixin fa-fw',
    finger: 'fas fa-fingerprint fa-fw',
    orb: 'fab fa-cloudversify fa-fw',
    writing: 'fas fa-book-open fa-fw',
    freezing: 'fas fa-temperature-low fa-fw',
    dots: 'fas fa-spray-can fa-fw',
};

// 証拠判明状態
export const TraitState = {
    Unknown: 'unknown', // 不明
    With: 'with', // 証拠有り
    Without: 'without', // 証拠無し
};

// ゴースト情報リスト
// traits: level5/box/finger/orb/writing/freezing カンマ区切り
export const GhostTraits = [
    {
        name: 'スピリット',
        traits: 'level5,box,writing',
        details: [
            'スマッジスティックの効果時間が長い。',
            '（倍になる）',
            '活動性・攻撃性はどちらかと言えば低い。',
        ]
    },
    {
        name: 'レイス',
        traits: 'level5,box,dots',
        details: [
            '足音があまりしない。',
            '（塩を崩すが足跡が残らない）',
            '塩を踏むと活動性が上昇する。',
            'ドアを透過する。',
            '（ドア1枚先のプレイヤーを発見できる）',
        ],
    },
    {
        name: 'ファントム',
        traits: 'box,finger,dots',
        details: [
            '写真を撮ることはできるが、',
            '姿は写真に写らない。',
            '直視すると、他のゴーストに比べ',
            '正気度の低下が早い。',
            '写真を撮っても、ハントモードを',
            '止めることはできない。',
            'ハントモードの（ライト点滅）時間が長い。',
        ],
    },
    {
        name: 'ポルターガイスト',
        traits: 'box,finger,writing',
        details: [
            '頻繁に物を動かし、',
            '照明や電化製品を操作する。',
            'プレイヤーの近くで物を動かすと',
            '直視していなくとも正気度が減る。',
        ],
    },
    {
        name: 'バンシー',
        traits: 'finger,orb,dots',
        details: [
            '特定の一人をずっと追跡する。',
            '（対象はランダム？）',
            '特定の一人が建物の外にいるときは',
            'ハントモードにならない。',
            '正気度に関係なくハントモードに',
            'なることがある。',
            '十字架の効果範囲が広い。（５ｍ）',
        ],
    },
    {
        name: 'ジン',
        traits: 'level5,finger,freezing',
        details: [
            '比較的電化製品の操作が多い。',
            '（電話やラジオ、テレビ、車等）',
            'プレイヤーから遠いほど',
            '移動速度が速い。',
            'ブレーカーが落ちていると',
            '通常の移動速度になる。',
        ],
    },
    {
        name: 'メア―',
        traits: 'box,orb,writing',
        details: [
            '比較的ブレーカーをよく落とす。',
            '明るい場所ではハントモードに',
            '入りにくい。',
            '暗い場所にいるプレイヤーを',
            '襲いやすい。',
        ],
    },
    {
        name: 'レヴナント',
        traits: 'orb,writing,freezing',
        details: [
            'ハントモード中の移動速度が',
            '一番速い。',
            'プレイヤーから遠い時と',
            '非ハントモード時は移動速度が',
            '極端に遅い。',
        ],
    },
    {
        name: 'シェード',
        traits: 'level5,writing,freezing',
        details: [
            'プレイヤーが複数人で',
            '行動しているとほとんど活動しない。',
            '正気度が低いと複数人で行動して',
            'いてもハントモードは始まる。',
            'プレイヤーが一人になると活発に行動する。',
        ],
    },
    {
        name: 'デーモン',
        traits: 'finger,writing,freezing',
        details: [
            'ハント頻度が一番高い。',
            '（正気度80%でも始まることがある）',
            'ウィジャ盤成功時正気度が下がらない。',
            '（失敗時は40%下がる）',
        ],
    },
    {
        name: '幽霊',
        traits: 'orb,freezing,dots',
        details: [
            '頻繁に物を動かしたり姿を見せたり',
            'して正気度を下げる。',
            '超常現象を起こした際の',
            '正気度低下量が大きい。',
            'スマッジスティックで90秒間',
            'ゴーストルームに閉じ込められる。',
        ],
    },
    {
        name: '鬼',
        traits: 'level5,freezing,dots',
        details: [
            'プレイヤーが複数人で',
            '行動していると活発になる。',
            '物を飛ばす力が強く、遠くへ飛ばす。',
        ],
    },
    {
        name: 'ハントゥ',
        traits: 'finger,orb,freezing',
        details: [
            '温度が低いほど活発化し',
            '移動速度が上がる。',
            '逆に暖かい場所では',
            '移動速度が低下する。',
        ],
    },
    {
        name: '妖怪',
        traits: 'box,orb,dots',
        details: [
            '近くでプレイヤーが会話すると',
            '活発化し、攻撃的になる。',
            'ハント中、遠くにいるプレイヤーの',
            '声には反応しない。',
        ],
    },
    {
        name: '御霊',
        traits: 'level5,finger,dots',
        details: [
            '近くに人が居ない時にカメラに',
            '映りやすい。',
            'カメラ越しでのみ視認可能。',
        ],
    },
    {
        name: 'マイリング',
        traits: 'level5,finger,writing',
        details: [
            '頻繁に怪奇音を立てる。',
            'ハントを行う際には静かになる。',
        ],
    },
];
// ゴーストの証拠を取得
export const getGhostTraits = function(name) {
    const index = GhostTraits.findIndex(ghost => {
        return ghost.name == name;
    });
    if (index < 0) return [];
    return GhostTraits[index].traits.split(',');
};
// ゴーストの詳細を取得
export const getGhostDetails = function(name) {
    const index = GhostTraits.findIndex(ghost => {
        return ghost.name == name;
    });
    if (index < 0) return [];
    return GhostTraits[index].details;
};

// スマホ（縦長）である
export const isSmartPhone = function() {
    if (window.matchMedia && window.matchMedia('(max-device-width: 480px)').matches) {
        return true;
    } else {
        return false;
    }
}