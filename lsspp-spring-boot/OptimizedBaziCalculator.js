/**
 * 优化的精确八字排盘算法
 * 基于Lunar.js万年历库 + 《三命通会》《渊海子平》理论
 * 删除冗余代码，专注核心功能
 *
 * @author LSSPP团队
 * @version 3.1.0 (精简版)
 */

const { Lunar, Solar } = require('lunar-javascript');

class OptimizedBaziCalculator {

    // 五行对照表 (基于传统理论)
    static WUXING_MAP = {
        '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
        '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
        '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
        '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
        '戌': '土', '亥': '水'
    };

    /**
     * 核心方法：计算完整八字
     */
    static calculateBazi(date) {
        const startTime = Date.now();

        // 使用Lunar.js获取精确八字
        const solar = Solar.fromDate(date);
        const lunar = solar.getLunar();
        const eightChar = lunar.getEightChar();

        // 基础八字信息
        const result = {
            inputDate: date,
            nianZhu: eightChar.getYear(),
            yueZhu: eightChar.getMonth(),
            riZhu: eightChar.getDay(),
            shiZhu: eightChar.getTime(),

            // 天干地支分解
            nianGan: eightChar.getYearGan().toString(),
            nianZhi: eightChar.getYearZhi().toString(),
            yueGan: eightChar.getMonthGan().toString(),
            yueZhi: eightChar.getMonthZhi().toString(),
            riGan: eightChar.getDayGan().toString(),
            riZhi: eightChar.getDayZhi().toString(),
            shiGan: eightChar.getTimeGan().toString(),
            shiZhi: eightChar.getTimeZhi().toString(),

            calculationTime: Date.now() - startTime,
            version: '3.1.0 (Lunar.js)',
            source: 'lunar-javascript'
        };

        // 五行和命理分析
        result.wuxing = this.analyzeWuxing(result);
        result.shishen = this.analyzeShishen(result);
        result.yongshen = this.analyzeYongshen(result);

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

        return { count, balance };
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
            时干: this.getShishen(riGan, riWuxing, result.shiGan)
        };
    }

    /**
     * 十神关系计算
     */
    static getShishen(riGan, riWuxing, targetGan) {
        if (riGan === targetGan) return '比肩';

        const targetWuxing = this.WUXING_MAP[targetGan];
        if (riWuxing === targetWuxing) return '劫财';

        const shengMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
        const keMap = { '木': '土', '火': '金', '土': '水', '金': '木', '水': '火' };

        if (shengMap[riWuxing] === targetWuxing) return '食神';
        if (shengMap[targetWuxing] === riWuxing) return '正印';
        if (keMap[riWuxing] === targetWuxing) return '正财';
        if (keMap[targetWuxing] === riWuxing) return '正官';

        return '其他';
    }

    /**
     * 用神分析 (基于《三命通会》)
     */
    static analyzeYongshen(result) {
        const riWuxing = this.WUXING_MAP[result.riGan];
        const count = result.wuxing.count;
        const riCount = count[riWuxing];

        let yongshen, xishen, jishen;

        if (riCount >= 3) {
            // 日主偏旺，用泄耗
            const xieMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
            yongshen = xieMap[riWuxing];
        } else {
            // 日主偏弱，用生扶
            const shengMap = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' };
            yongshen = shengMap[riWuxing];
        }

        // 喜神生用神，忌神克用神
        const shengMap = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' };
        const keMap = { '木': '金', '火': '水', '土': '木', '金': '火', '水': '土' };

        xishen = shengMap[yongshen];
        jishen = keMap[yongshen];

        return {
            日主: result.riGan,
            日主五行: riWuxing,
            日主强弱: riCount >= 3 ? '偏旺' : riCount === 2 ? '中和' : '偏弱',
            用神: yongshen,
            喜神: xishen,
            忌神: jishen
        };
    }

    /**
     * 格式化八字输出
     */
    static formatBazi(result) {
        return `${result.nianZhu} ${result.yueZhu} ${result.riZhu} ${result.shiZhu}`;
    }

    /**
     * 验证标准测试用例
     */
    static validateAll() {
        console.log('=== 优化版八字排盘算法验证 ===\n');

        const testCases = [
            {
                date: new Date(1987, 2, 24, 11, 35),
                expected: '丁卯 癸卯 壬申 丙午',
                description: '1987年3月24日 11:35'
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

        testCases.forEach((testCase, index) => {
            console.log(`测试用例 ${index + 1}: ${testCase.description}`);

            const result = this.calculateBazi(testCase.date);
            const actual = this.formatBazi(result);
            const passed = actual === testCase.expected;

            console.log(`预期: ${testCase.expected}`);
            console.log(`实际: ${actual}`);
            console.log(`结果: ${passed ? '✓ 通过' : '✗ 失败'} (${result.calculationTime}ms)`);

            if (passed) {
                passCount++;
                console.log(`用神: ${result.yongshen.用神} | 日主: ${result.yongshen.日主强弱}`);
            }

            console.log('─'.repeat(50));
        });

        const success = passCount === testCases.length;
        console.log(`\n验证结果: ${passCount}/${testCases.length} 通过 (${(passCount/testCases.length*100).toFixed(1)}%)`);

        if (success) {
            console.log('🎉 所有测试通过！算法验证成功！');
        } else {
            console.log('⚠️ 部分测试失败，需要进一步调试');
        }

        return success;
    }
}

// 直接运行验证
if (require.main === module) {
    OptimizedBaziCalculator.validateAll();
}

module.exports = OptimizedBaziCalculator;