/**
 * 高精度八字排盘算法
 * 基于Lunar.js库 + 《三命通会》《渊海子平》权威理论
 * 特别优化：节气边界精确计算、立春换年、月柱精确定位
 *
 * @author LSSPP算法团队
 * @version 4.0.0 (高精度版)
 */

const { Lunar, Solar } = require('lunar-javascript');

class PrecisionBaziCalculator {

    // 五行对照表 (基于传统理论)
    static WUXING_MAP = {
        '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
        '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
        '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
        '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
        '戌': '土', '亥': '水'
    };

    /**
     * 核心方法：计算高精度八字
     * 特别处理节气边界和立春换年
     */
    static calculatePrecisionBazi(date) {
        const startTime = Date.now();

        // 使用Lunar.js获取精确八字
        const solar = Solar.fromDate(date);
        const lunar = solar.getLunar();

        console.log(`=== 高精度八字计算: ${solar.toYmd()} ${solar.getHour()}:${solar.getMinute()} ===`);

        // 关键：使用精确的年柱计算（考虑立春）
        const yearGanByLiChun = lunar.getYearGanByLiChun();
        const yearZhiByLiChun = lunar.getYearZhiByLiChun();
        const yearInGanZhiByLiChun = lunar.getYearInGanZhiByLiChun();

        // 关键：使用精确的月柱计算（考虑节气）
        const monthGanExact = lunar.getMonthGanExact();
        const monthZhiExact = lunar.getMonthZhiExact();
        const monthInGanZhiExact = lunar.getMonthInGanZhiExact();

        // 关键：使用精确的日柱计算
        const dayGanExact = lunar.getDayGanExact();
        const dayZhiExact = lunar.getDayZhiExact();
        const dayInGanZhiExact = lunar.getDayInGanZhiExact();

        // 时柱计算
        const timeGan = lunar.getTimeGan();
        const timeZhi = lunar.getTimeZhi();
        const timeInGanZhi = lunar.getTimeInGanZhi();

        console.log('基础计算结果:');
        console.log(`年柱: ${yearInGanZhiByLiChun} (立春精确)`);
        console.log(`月柱: ${monthInGanZhiExact} (节气精确)`);
        console.log(`日柱: ${dayInGanZhiExact} (精确)`);
        console.log(`时柱: ${timeInGanZhi}`);

        const result = {
            inputDate: date,

            // 精确四柱
            nianZhu: yearInGanZhiByLiChun,
            yueZhu: monthInGanZhiExact,
            riZhu: dayInGanZhiExact,
            shiZhu: timeInGanZhi,

            // 分解后的天干地支
            nianGan: yearGanByLiChun,
            nianZhi: yearZhiByLiChun,
            yueGan: monthGanExact,
            yueZhi: monthZhiExact,
            riGan: dayGanExact,
            riZhi: dayZhiExact,
            shiGan: timeGan,
            shiZhi: timeZhi,

            calculationTime: Date.now() - startTime,
            version: '4.0.0 (高精度版)',
            source: 'Lunar.js精确API + 立春换年 + 节气月柱',

            // 详细调试信息
            debugInfo: {
                solarDate: solar.toYmd(),
                lunarDate: `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
                useExactMethods: true,
                useLiChunForYear: true,
                useJieQiForMonth: true
            }
        };

        // 五行和命理分析
        result.wuxing = this.analyzeWuxing(result);
        result.shishen = this.analyzeShishen(result);
        result.yongshen = this.analyzeYongshen(result);
        result.nayin = this.analyzeNayin(result);

        return result;
    }

    /**
     * 五行分析 (基于传统五行理论)
     */
    static analyzeWuxing(result) {
        const ganZhiList = [
            result.nianGan, result.nianZhi, result.yueGan, result.yueZhi,
            result.riGan, result.riZhi, result.shiGan, result.shiZhi
        ];

        const count = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };

        ganZhiList.forEach(item => {
            const wuxing = this.WUXING_MAP[item];
            if (wuxing) count[wuxing]++;
        });

        const maxCount = Math.max(...Object.values(count));
        const minCount = Math.min(...Object.values(count));

        let balance;
        if (maxCount - minCount <= 1) balance = '平衡';
        else if (maxCount >= 4) balance = '偏旺';
        else if (minCount === 0) balance = '缺失';
        else balance = '不平衡';

        return { count, balance,
            details: {
                日主五行: this.WUXING_MAP[result.riGan],
                最多五行: Object.keys(count).find(key => count[key] === maxCount),
                最少五行: Object.keys(count).find(key => count[key] === minCount)
            }
        };
    }

    /**
     * 十神关系分析 (基于《渊海子平》)
     */
    static analyzeShishen(result) {
        const riGan = result.riGan;
        const riWuxing = this.WUXING_MAP[riGan];

        return {
            年干: this.getShishen(riGan, riWuxing, result.nianGan),
            月干: this.getShishen(riGan, riWuxing, result.yueGan),
            日干: '日主',
            时干: this.getShishen(riGan, riWuxing, result.shiGan),

            // 地支藏干分析（简化版）
            年支十神: this.getZhiShishen(riWuxing, result.nianZhi),
            月支十神: this.getZhiShishen(riWuxing, result.yueZhi),
            日支十神: this.getZhiShishen(riWuxing, result.riZhi),
            时支十神: this.getZhiShishen(riWuxing, result.shiZhi)
        };
    }

    /**
     * 十神关系计算（精确阴阳区分）
     */
    static getShishen(riGan, riWuxing, targetGan) {
        if (riGan === targetGan) return '比肩';

        const targetWuxing = this.WUXING_MAP[targetGan];
        if (riWuxing === targetWuxing) {
            // 同五行，判断阴阳
            return this.isYinYang(riGan, targetGan) ? '比肩' : '劫财';
        }

        const shengMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
        const keMap = { '木': '土', '火': '金', '土': '水', '金': '木', '水': '火' };

        const isYinYangSame = this.isYinYang(riGan, targetGan);

        if (shengMap[riWuxing] === targetWuxing) {
            return isYinYangSame ? '食神' : '伤官';
        }
        if (shengMap[targetWuxing] === riWuxing) {
            return isYinYangSame ? '正印' : '偏印';
        }
        if (keMap[riWuxing] === targetWuxing) {
            return isYinYangSame ? '正财' : '偏财';
        }
        if (keMap[targetWuxing] === riWuxing) {
            return isYinYangSame ? '正官' : '七杀';
        }

        return '其他';
    }

    /**
     * 地支十神关系（基于主气）
     */
    static getZhiShishen(riWuxing, zhi) {
        const zhiWuxing = this.WUXING_MAP[zhi];
        if (riWuxing === zhiWuxing) return '比劫库';

        const shengMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
        const keMap = { '木': '土', '火': '金', '土': '水', '金': '木', '水': '火' };

        if (shengMap[riWuxing] === zhiWuxing) return '食伤库';
        if (shengMap[zhiWuxing] === riWuxing) return '印库';
        if (keMap[riWuxing] === zhiWuxing) return '财库';
        if (keMap[zhiWuxing] === riWuxing) return '官杀库';

        return '他库';
    }

    /**
     * 用神分析 (基于《三命通会》)
     */
    static analyzeYongshen(result) {
        const riWuxing = this.WUXING_MAP[result.riGan];
        const count = result.wuxing.count;
        const riCount = count[riWuxing];

        // 分析四柱中对日主的扶抑
        const supportCount = this.calculateSupportCount(result, riWuxing);
        const weakenCount = this.calculateWeakenCount(result, riWuxing);

        let yongshen, xishen, jishen, strength;

        if (supportCount > weakenCount + 1) {
            // 日主偏旺，用泄耗
            strength = '偏旺';
            const xieMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
            const haoMap = { '木': '土', '火': '金', '土': '水', '金': '木', '水': '火' };
            yongshen = count[xieMap[riWuxing]] > count[haoMap[riWuxing]] ? haoMap[riWuxing] : xieMap[riWuxing];
        } else if (supportCount < weakenCount - 1) {
            // 日主偏弱，用生扶
            strength = '偏弱';
            const shengMap = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' };
            yongshen = count[riWuxing] > count[shengMap[riWuxing]] ? riWuxing : shengMap[riWuxing];
        } else {
            // 日主中和
            strength = '中和';
            yongshen = this.analyzeSeasonalYongshen(result);
        }

        // 喜神生用神，忌神克用神
        const shengMap = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' };
        const keMap = { '木': '金', '火': '水', '土': '木', '金': '火', '水': '土' };

        xishen = shengMap[yongshen];
        jishen = keMap[yongshen];

        return {
            日主: result.riGan,
            日主五行: riWuxing,
            日主强弱: strength,
            扶助力量: supportCount,
            抑制力量: weakenCount,
            用神: yongshen,
            喜神: xishen,
            忌神: jishen,
            用神来源: strength === '中和' ? '调候' : (strength === '偏旺' ? '泄耗' : '生扶')
        };
    }

    /**
     * 计算对日主的扶助力量
     */
    static calculateSupportCount(result, riWuxing) {
        let count = 0;
        const ganZhiList = [result.nianGan, result.nianZhi, result.yueGan, result.yueZhi,
                           result.riZhi, result.shiGan, result.shiZhi];

        const shengMap = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' };

        ganZhiList.forEach(item => {
            const wuxing = this.WUXING_MAP[item];
            if (wuxing === riWuxing || wuxing === shengMap[riWuxing]) {
                count++;
            }
        });

        return count;
    }

    /**
     * 计算对日主的抑制力量
     */
    static calculateWeakenCount(result, riWuxing) {
        let count = 0;
        const ganZhiList = [result.nianGan, result.nianZhi, result.yueGan, result.yueZhi,
                           result.riZhi, result.shiGan, result.shiZhi];

        const xieMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
        const keMap = { '木': '金', '火': '水', '土': '木', '金': '火', '水': '土' };

        ganZhiList.forEach(item => {
            const wuxing = this.WUXING_MAP[item];
            if (wuxing === xieMap[riWuxing] || wuxing === keMap[riWuxing]) {
                count++;
            }
        });

        return count;
    }

    /**
     * 季节调候用神（中和命局）
     */
    static analyzeSeasonalYongshen(result) {
        const month = new Date(result.inputDate).getMonth() + 1;
        const riWuxing = this.WUXING_MAP[result.riGan];

        // 基于月份和日主五行的调候用神
        const seasonalMap = {
            '木': { '春': '金', '夏': '水', '秋': '水', '冬': '火' },
            '火': { '春': '土', '夏': '水', '秋': '木', '冬': '木' },
            '土': { '春': '火', '夏': '金', '秋': '火', '冬': '火' },
            '金': { '春': '土', '夏': '水', '秋': '火', '冬': '火' },
            '水': { '春': '土', '夏': '土', '秋': '金', '冬': '木' }
        };

        let season;
        if (month >= 3 && month <= 5) season = '春';
        else if (month >= 6 && month <= 8) season = '夏';
        else if (month >= 9 && month <= 11) season = '秋';
        else season = '冬';

        return seasonalMap[riWuxing][season];
    }

    /**
     * 纳音分析
     */
    static analyzeNayin(result) {
        // 简化的纳音对照表
        const nayinMap = {
            '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火',
            '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
            '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
            '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城头土', '己卯': '城头土',
            '庚辰': '白蜡金', '辛巳': '白蜡金', '壬午': '杨柳木', '癸未': '杨柳木'
        };

        return {
            年柱纳音: nayinMap[result.nianZhu] || '需查表',
            月柱纳音: nayinMap[result.yueZhu] || '需查表',
            日柱纳音: nayinMap[result.riZhu] || '需查表',
            时柱纳音: nayinMap[result.shiZhu] || '需查表'
        };
    }

    /**
     * 判断阴阳属性
     */
    static isYinYang(gan1, gan2) {
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const index1 = tianGan.indexOf(gan1);
        const index2 = tianGan.indexOf(gan2);
        return (index1 % 2) === (index2 % 2);
    }

    /**
     * 格式化八字输出
     */
    static formatBazi(result) {
        return `${result.nianZhu} ${result.yueZhu} ${result.riZhu} ${result.shiZhu}`;
    }

    /**
     * 验证高精度算法
     */
    static validatePrecisionAlgorithm() {
        console.log('=== 高精度八字排盘算法验证 ===\n');

        const testCases = [
            {
                date: new Date(1987, 2, 24, 11, 35),
                expected: '丁卯 癸卯 壬申 丙午',
                description: '1987年3月24日 11:35 (关键测试)'
            },
            {
                date: new Date(1985, 3, 7, 10, 15),
                expected: '乙丑 庚辰 丙午 癸巳',
                description: '1985年4月7日 10:15'
            },
            {
                date: new Date(1988, 10, 26, 7, 45),
                expected: '戊辰 癸亥 乙卯 庚辰',
                description: '1988年11月26日 7:45'
            },
            {
                date: new Date(1990, 0, 21, 1, 17),
                expected: '己巳 丁丑 丙辰 己丑',
                description: '1990年1月21日 1:17'
            }
        ];

        let passCount = 0;
        let successCount = 0;
        const results = [];

        testCases.forEach((testCase, index) => {
            console.log(`\n测试用例 ${index + 1}: ${testCase.description}`);
            console.log('─'.repeat(60));

            const result = this.calculatePrecisionBazi(testCase.date);
            const actual = this.formatBazi(result);
            const passed = actual === testCase.expected;

            console.log(`预期结果: ${testCase.expected}`);
            console.log(`实际结果: ${actual}`);
            console.log(`验证结果: ${passed ? '✓ 通过' : '✗ 失败'} (${result.calculationTime}ms)`);

            if (passed) {
                passCount++;
                console.log(`✓ 用神: ${result.yongshen.用神} | 日主: ${result.yongshen.日主强弱}`);
                console.log(`✓ 十神: 年干${result.shishen.年干} 月干${result.shishen.月干} 时干${result.shishen.时干}`);
            } else {
                console.log('✗ 详细对比:');
                const expected = testCase.expected.split(' ');
                const actualArr = actual.split(' ');

                ['年柱', '月柱', '日柱', '时柱'].forEach((pillar, i) => {
                    const match = expected[i] === actualArr[i];
                    console.log(`  ${pillar}: 期望${expected[i]} 实际${actualArr[i]} ${match ? '✓' : '✗'}`);
                });
            }

            results.push({ ...result, passed });
        });

        // 测试总结
        console.log('\n' + '='.repeat(60));
        console.log(`高精度算法验证总结:`);
        console.log(`通过率: ${passCount}/${testCases.length} (${(passCount/testCases.length*100).toFixed(1)}%)`);

        const avgTime = results.reduce((sum, r) => sum + r.calculationTime, 0) / results.length;
        console.log(`平均计算时间: ${avgTime.toFixed(1)}ms`);

        if (passCount === testCases.length) {
            console.log('🎉 高精度算法验证成功！所有测试用例通过！');
            console.log('✅ 立春换年 + 节气月柱 + 精确计算 = 100%准确率');
        } else {
            console.log(`⚠️  ${testCases.length - passCount}个测试用例需要进一步优化`);
        }

        return passCount === testCases.length;
    }
}

// 直接运行验证
if (require.main === module) {
    PrecisionBaziCalculator.validatePrecisionAlgorithm();
}

module.exports = PrecisionBaziCalculator;