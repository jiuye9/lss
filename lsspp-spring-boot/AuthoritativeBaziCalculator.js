/**
 * 权威八字排盘算法
 * 基于Lunar.js万年历库和《三命通会》、《渊海子平》典籍
 *
 * @author LSSPP算法团队
 * @version 3.0.0 (权威版)
 */

const { Lunar, Solar } = require('lunar-javascript');

class AuthoritativeBaziCalculator {

    /**
     * 主要计算方法：根据阳历日期时间计算完整八字
     * @param {Date} solarDate 阳历日期时间
     * @returns {Object} 完整八字信息
     */
    static calculateBazi(solarDate) {
        const startTime = Date.now();

        // 使用Lunar.js进行精确转换
        const solar = Solar.fromDate(solarDate);
        const lunar = solar.getLunar();

        // 获取精确的八字四柱
        const eightChar = lunar.getEightChar();

        const result = {
            // 输入信息
            inputDate: solarDate,
            inputYear: solarDate.getFullYear(),
            inputMonth: solarDate.getMonth() + 1,
            inputDay: solarDate.getDate(),
            inputHour: solarDate.getHours(),
            inputMinute: solarDate.getMinutes(),

            // 农历信息
            lunarYear: lunar.getYear(),
            lunarMonth: lunar.getMonth(),
            lunarDay: lunar.getDay(),
            lunarMonthName: lunar.getMonthInChinese(),
            lunarDayName: lunar.getDayInChinese(),

            // 八字四柱 (Lunar.js的标准输出)
            nianZhu: eightChar.getYear(),      // 年柱
            yueZhu: eightChar.getMonth(),      // 月柱
            riZhu: eightChar.getDay(),         // 日柱
            shiZhu: eightChar.getTime(),       // 时柱

            // 分解后的天干地支
            nianGan: eightChar.getYearGan(),
            nianZhi: eightChar.getYearZhi(),
            yueGan: eightChar.getMonthGan(),
            yueZhi: eightChar.getMonthZhi(),
            riGan: eightChar.getDayGan(),
            riZhi: eightChar.getDayZhi(),
            shiGan: eightChar.getTimeGan(),
            shiZhi: eightChar.getTimeZhi(),

            // 五行分析
            wuxingAnalysis: this.analyzeWuxing(eightChar),

            // 十神关系 (基于《渊海子平》)
            shishenAnalysis: this.analyzeShishen(eightChar),

            // 用神分析 (基于《三命通会》)
            yongshenAnalysis: this.analyzeYongshen(eightChar),

            // 性能信息
            calculationTime: Date.now() - startTime,
            algorithmVersion: '3.0.0 (权威版)',
            source: 'Lunar.js + 三命通会 + 渊海子平'
        };

        return result;
    }

    /**
     * 五行分析 (基于传统五行理论)
     */
    static analyzeWuxing(eightChar) {
        const ganZhiList = [
            eightChar.getYearGan(), eightChar.getYearZhi(),
            eightChar.getMonthGan(), eightChar.getMonthZhi(),
            eightChar.getDayGan(), eightChar.getDayZhi(),
            eightChar.getTimeGan(), eightChar.getTimeZhi()
        ];

        const wuxingCount = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };
        const wuxingDetails = {};

        ganZhiList.forEach((item, index) => {
            const wuxing = item.getWuXing().getName();
            wuxingCount[wuxing]++;

            const position = ['年干', '年支', '月干', '月支', '日干', '日支', '时干', '时支'][index];
            wuxingDetails[position] = {
                ganZhi: item.getName(),
                wuxing: wuxing
            };
        });

        // 五行平衡分析
        const maxCount = Math.max(...Object.values(wuxingCount));
        const minCount = Math.min(...Object.values(wuxingCount));
        let balance;
        if (maxCount - minCount <= 1) balance = '五行平衡';
        else if (maxCount >= 4) balance = '五行偏旺';
        else if (minCount === 0) balance = '五行缺失';
        else balance = '五行不平衡';

        return {
            count: wuxingCount,
            details: wuxingDetails,
            balance: balance
        };
    }

    /**
     * 十神关系分析 (基于《渊海子平》)
     */
    static analyzeShishen(eightChar) {
        const riGan = eightChar.getDayGan();

        return {
            年干: this.getShishenRelation(riGan, eightChar.getYearGan()),
            月干: this.getShishenRelation(riGan, eightChar.getMonthGan()),
            日干: '日主',
            时干: this.getShishenRelation(riGan, eightChar.getTimeGan())
        };
    }

    /**
     * 获取十神关系
     */
    static getShishenRelation(riGan, targetGan) {
        if (riGan.getName() === targetGan.getName()) {
            return '比肩';
        }

        const riWuxing = riGan.getWuXing().getName();
        const targetWuxing = targetGan.getWuXing().getName();

        // 简化的十神关系判断 (完整版需要考虑阴阳)
        if (riWuxing === targetWuxing) return '劫财';

        const shengMap = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
        const keMap = { 木: '土', 火: '金', 土: '水', 金: '木', 水: '火' };

        if (shengMap[riWuxing] === targetWuxing) return '食神';
        if (shengMap[targetWuxing] === riWuxing) return '正印';
        if (keMap[riWuxing] === targetWuxing) return '正财';
        if (keMap[targetWuxing] === riWuxing) return '正官';

        return '未知';
    }

    /**
     * 用神分析 (基于《三命通会》理论)
     */
    static analyzeYongshen(eightChar) {
        const riGan = eightChar.getDayGan();
        const riWuxing = riGan.getWuXing().getName();

        // 简化的用神分析
        const yongshen = this.determineYongshen(riWuxing, eightChar);

        return {
            日主: riGan.getName(),
            日主五行: riWuxing,
            用神: yongshen,
            喜神: this.getXishen(yongshen),
            忌神: this.getJishen(yongshen)
        };
    }

    static determineYongshen(riWuxing, eightChar) {
        // 根据日主强弱确定用神 (简化版)
        const wuxingAnalysis = this.analyzeWuxing(eightChar);
        const riCount = wuxingAnalysis.count[riWuxing];

        if (riCount >= 3) {
            // 日主偏旺，需要泄耗
            const xieMap = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
            return xieMap[riWuxing];
        } else {
            // 日主偏弱，需要生扶
            const shengMap = { 木: '水', 火: '木', 土: '火', 金: '土', 水: '金' };
            return shengMap[riWuxing];
        }
    }

    static getXishen(yongshen) {
        const shengMap = { 木: '水', 火: '木', 土: '火', 金: '土', 水: '金' };
        return shengMap[yongshen] || yongshen;
    }

    static getJishen(yongshen) {
        const keMap = { 木: '金', 火: '水', 土: '木', 金: '火', 水: '土' };
        return keMap[yongshen] || '土';
    }

    /**
     * 格式化输出完整八字
     */
    static formatBazi(result) {
        return `${result.nianZhu} ${result.yueZhu} ${result.riZhu} ${result.shiZhu}`;
    }

    /**
     * 验证标准测试用例
     */
    static validateStandardCases() {
        console.log('=== 权威八字排盘算法验证 ===\n');

        const testCases = [
            {
                date: new Date(1987, 2, 24, 11, 35), // 3月24日11:35 (月份从0开始)
                expected: '丁卯 癸卯 壬申 丙午',
                description: '1987年3月24日 11:35'
            },
            {
                date: new Date(1985, 3, 7, 10, 15), // 4月7日10:15
                expected: '乙丑 庚辰 丙午 癸巳',
                description: '1985年4月7日 10:15'
            },
            {
                date: new Date(1988, 10, 26, 7, 45), // 11月26日7:45
                expected: '戊辰 癸亥 乙卯 庚辰',
                description: '1988年11月26日 7:45'
            },
            {
                date: new Date(1990, 0, 21, 1, 17), // 1月21日1:17
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

            console.log(`预期结果: ${testCase.expected}`);
            console.log(`实际结果: ${actual}`);
            console.log(`计算耗时: ${result.calculationTime}ms`);
            console.log(`验证结果: ${passed ? '✓ 通过' : '✗ 失败'}`);

            if (passed) {
                passCount++;
                console.log(`用神: ${result.yongshenAnalysis.用神}`);
            } else {
                console.log('详细信息:');
                console.log(`年柱: ${result.nianZhu} (${result.nianGan}${result.nianZhi})`);
                console.log(`月柱: ${result.yueZhu} (${result.yueGan}${result.yueZhi})`);
                console.log(`日柱: ${result.riZhu} (${result.riGan}${result.riZhi})`);
                console.log(`时柱: ${result.shiZhu} (${result.shiGan}${result.shiZhi})`);
            }

            console.log('─'.repeat(60));
        });

        console.log(`\n=== 验证总结 ===`);
        console.log(`总测试用例: ${testCases.length}`);
        console.log(`通过用例: ${passCount}`);
        console.log(`失败用例: ${testCases.length - passCount}`);
        console.log(`通过率: ${(passCount / testCases.length * 100).toFixed(1)}%`);

        if (passCount === testCases.length) {
            console.log('🎉 所有测试用例均通过！权威八字排盘算法验证成功！');
        } else {
            console.log('⚠️ 部分测试用例失败，需要进一步调试。');
        }

        return passCount === testCases.length;
    }
}

// 如果直接运行此文件，执行验证
if (require.main === module) {
    AuthoritativeBaziCalculator.validateStandardCases();
}

module.exports = AuthoritativeBaziCalculator;