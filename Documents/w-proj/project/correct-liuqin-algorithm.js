/**
 * 正确的六爻六亲计算算法
 * 基于"地支跟卦走，卦宫定六亲"的传统理论
 */

// 八卦五行对照（卦宫五行）
const BAGUA_WUXING = {
    '乾': '金', '兑': '金',     // 乾兑属金
    '离': '火',                 // 离属火
    '震': '木', '巽': '木',     // 震巽属木
    '坎': '水',                 // 坎属水
    '艮': '土', '坤': '土'      // 艮坤属土
};

// 地支五行对照
const DIZHI_WUXING = {
    '子': '水', '亥': '水',     // 子亥属水
    '寅': '木', '卯': '木',     // 寅卯属木
    '巳': '火', '午': '火',     // 巳午属火
    '申': '金', '酉': '金',     // 申酉属金
    '丑': '土', '辰': '土', '未': '土', '戌': '土'  // 四季土
};

// 六亲关系对照表（基于五行生克关系）
const LIUQIN_RELATIONS = {
    // 我生者为子孙，生我者为父母，克我者为官鬼，我克者为妻财，比和者为兄弟
    '金': {
        '金': '兄弟',  // 金见金，比和为兄弟
        '木': '妻财',  // 金克木，我克者为妻财
        '水': '子孙',  // 金生水，我生者为子孙
        '火': '官鬼',  // 火克金，克我者为官鬼
        '土': '父母'   // 土生金，生我者为父母
    },
    '木': {
        '木': '兄弟',  // 木见木，比和为兄弟
        '土': '妻财',  // 木克土，我克者为妻财
        '火': '子孙',  // 木生火，我生者为子孙
        '金': '官鬼',  // 金克木，克我者为官鬼
        '水': '父母'   // 水生木，生我者为父母
    },
    '水': {
        '水': '兄弟',  // 水见水，比和为兄弟
        '火': '妻财',  // 水克火，我克者为妻财
        '木': '子孙',  // 水生木，我生者为子孙
        '土': '官鬼',  // 土克水，克我者为官鬼
        '金': '父母'   // 金生水，生我者为父母
    },
    '火': {
        '火': '兄弟',  // 火见火，比和为兄弟
        '金': '妻财',  // 火克金，我克者为妻财
        '土': '子孙',  // 火生土，我生者为子孙
        '水': '官鬼',  // 水克火，克我者为官鬼
        '木': '父母'   // 木生火，生我者为父母
    },
    '土': {
        '土': '兄弟',  // 土见土，比和为兄弟
        '水': '妻财',  // 土克水，我克者为妻财
        '金': '子孙',  // 土生金，我生者为子孙
        '木': '官鬼',  // 木克土，克我者为官鬼
        '火': '父母'   // 火生土，生我者为父母
    }
};

/**
 * 正确的六亲计算函数
 * @param {string} hexBinary - 卦象二进制表示
 * @param {Array} nazhiList - 纳支列表（6个地支，从初爻到上爻）
 * @returns {Array} 六亲列表（从初爻到上爻）
 */
function calculateCorrectLiuQin(hexBinary, nazhiList) {
    // 1. 获取卦宫（根据卦象查找所属卦宫）
    const hexInfo = getHexagramInfo(hexBinary);
    const guaGong = hexInfo.palace;  // 卦宫名称，如"乾"、"坤"等

    // 2. 获取卦宫五行
    const guaGongWuxing = BAGUA_WUXING[guaGong];

    // 3. 计算每一爻的六亲
    const liuqinList = [];
    for (let i = 0; i < 6; i++) {
        const nazhi = nazhiList[i];           // 该爻的纳支（地支）
        const nazhiWuxing = DIZHI_WUXING[nazhi];  // 纳支的五行

        // 根据纳支五行与卦宫五行的关系确定六亲
        const liuqin = LIUQIN_RELATIONS[guaGongWuxing][nazhiWuxing];
        liuqinList.push(liuqin);
    }

    return liuqinList;
}

/**
 * 从卦象二进制获取纳支
 * @param {string} hexBinary - 卦象二进制表示
 * @returns {Array} 纳支列表（从初爻到上爻）
 */
function getNazhiFromHexagram(hexBinary) {
    // 这里使用之前定义的NAJIA_CONFIG配置
    const najiaGanZhi = NAJIA_CONFIG[hexBinary];
    if (!najiaGanZhi) {
        throw new Error(`未找到卦象 ${hexBinary} 的纳甲配置`);
    }

    // 提取地支部分（纳支）
    return najiaGanZhi.map(ganZhi => ganZhi.charAt(1));
}

/**
 * 获取卦象信息
 * @param {string} hexBinary - 卦象二进制表示
 * @returns {Object} 卦象信息
 */
function getHexagramInfo(hexBinary) {
    return HEXAGRAMS[hexBinary];
}

// 使用示例
function demonstrateCorrectAlgorithm() {
    console.log('=== 正确的六亲计算算法演示 ===');

    // 示例：乾为天卦（111111）
    const hexBinary = '111111';  // 乾为天
    const hexInfo = getHexagramInfo(hexBinary);

    console.log('卦象：', hexInfo.name);
    console.log('卦宫：', hexInfo.palace);
    console.log('卦宫五行：', BAGUA_WUXING[hexInfo.palace]);

    // 获取纳支
    const nazhiList = getNazhiFromHexagram(hexBinary);
    console.log('纳支（初爻→上爻）：', nazhiList);

    // 计算六亲
    const liuqinList = calculateCorrectLiuQin(hexBinary, nazhiList);
    console.log('六亲（初爻→上爻）：', liuqinList);

    // 详细分析
    console.log('\\n详细分析：');
    for (let i = 0; i < 6; i++) {
        const lineName = ['初', '二', '三', '四', '五', '上'][i];
        const nazhi = nazhiList[i];
        const nazhiWuxing = DIZHI_WUXING[nazhi];
        const liuqin = liuqinList[i];

        console.log(`${lineName}爻：纳支${nazhi}(${nazhiWuxing}) → 与卦宫${hexInfo.palace}(${BAGUA_WUXING[hexInfo.palace]})的关系 → ${liuqin}`);
    }

    console.log('\\n=== 算法核心要点 ===');
    console.log('1. 地支跟卦走：每个卦的纳支是固定的，由卦象本身决定');
    console.log('2. 卦宫定六亲：六亲关系由纳支五行与卦宫五行的生克关系决定');
    console.log('3. 不依赖日干：传统六亲计算与起卦日期无关');
}

// 对比错误算法
function compareAlgorithms() {
    console.log('\\n=== 算法对比 ===');

    console.log('❌ 错误算法（当前代码）：');
    console.log('   - 基于纳甲天干与日干的关系');
    console.log('   - 需要考虑阴阳同性异性');
    console.log('   - 依赖起卦日期的日干');
    console.log('   - 违背传统"地支跟卦走，卦宫定六亲"原理');

    console.log('\\n✅ 正确算法（传统方法）：');
    console.log('   - 基于纳支（地支）与卦宫的五行关系');
    console.log('   - 纳支由卦象固定决定（地支跟卦走）');
    console.log('   - 六亲由卦宫五行决定（卦宫定六亲）');
    console.log('   - 不依赖起卦日期，只看卦象本身');

    console.log('\\n核心差异：');
    console.log('错误：纳甲天干 vs 日干 → 六亲');
    console.log('正确：纳支五行 vs 卦宫五行 → 六亲');
}

// 验证函数
function validateAlgorithm() {
    console.log('\\n=== 验证传统理论 ===');

    // 乾为天卦验证
    const qianHex = '111111';
    const qianInfo = getHexagramInfo(qianHex);
    const qianNazhi = getNazhiFromHexagram(qianHex);
    const qianLiuqin = calculateCorrectLiuQin(qianHex, qianNazhi);

    console.log('乾为天卦：');
    console.log('- 卦宫：乾宫（金）');
    console.log('- 纳支：', qianNazhi.join(' '));
    console.log('- 六亲：', qianLiuqin.join(' '));

    // 根据传统理论验证
    console.log('\\n理论验证：');
    console.log('乾宫属金，纳支与金的关系：');
    console.log('- 子（水）：金生水，为子孙');
    console.log('- 寅（木）：金克木，为妻财');
    console.log('- 辰（土）：土生金，为父母');
    console.log('- 午（火）：火克金，为官鬼');
    console.log('- 申（金）：金见金，为兄弟');
    console.log('- 戌（土）：土生金，为父母');
}

// 导出功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateCorrectLiuQin,
        getNazhiFromHexagram,
        BAGUA_WUXING,
        DIZHI_WUXING,
        LIUQIN_RELATIONS,
        demonstrateCorrectAlgorithm,
        compareAlgorithms,
        validateAlgorithm
    };
}