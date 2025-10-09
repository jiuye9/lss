/**
 * 独立八字验证工具
 * 用于对比不同算法和权威来源
 */

console.log('=== 独立八字验证工具 ===\n');

// 测试日期：1987年3月24日11:35
const testDate = new Date(1987, 2, 24, 11, 35);
console.log('测试日期:', testDate.toISOString());
console.log('本地时间:', testDate.toLocaleString('zh-CN'));

console.log('\n=== 基础信息验证 ===');
console.log('年份:', testDate.getFullYear());
console.log('月份:', testDate.getMonth() + 1);
console.log('日期:', testDate.getDate());
console.log('小时:', testDate.getHours());
console.log('分钟:', testDate.getMinutes());

// 验证JavaScript Date对象是否正确
console.log('\n=== Date对象验证 ===');
console.log('预期: 1987年3月24日11:35');
console.log('实际:', `${testDate.getFullYear()}年${testDate.getMonth() + 1}月${testDate.getDate()}日${testDate.getHours()}:${testDate.getMinutes()}`);

// 尝试用不同的Date构造方式
console.log('\n=== 不同构造方式对比 ===');
const date1 = new Date(1987, 2, 24, 11, 35); // 月份从0开始
const date2 = new Date('1987-03-24T11:35:00');
const date3 = new Date('March 24, 1987 11:35:00');

console.log('方式1 (年,月-1,日,时,分):', date1.toLocaleString('zh-CN'));
console.log('方式2 (ISO字符串):', date2.toLocaleString('zh-CN'));
console.log('方式3 (英文字符串):', date3.toLocaleString('zh-CN'));

console.log('\n=== 时间戳对比 ===');
console.log('时间戳1:', date1.getTime());
console.log('时间戳2:', date2.getTime());
console.log('时间戳3:', date3.getTime());
console.log('是否相同:', date1.getTime() === date2.getTime() && date2.getTime() === date3.getTime());

// 手工计算验证
console.log('\n=== 手工八字计算验证 ===');
console.log('这里我们需要找到真正权威的计算方法...');

// 检查Lunar.js的直接输出
try {
    const { Lunar, Solar } = require('lunar-javascript');

    console.log('\n=== Lunar.js原始输出 ===');
    const solar = Solar.fromDate(testDate);
    const lunar = solar.getLunar();

    console.log('阳历:', solar.toString());
    console.log('农历:', lunar.toString());

    // 检查不同的方法
    console.log('\n=== 不同精度方法对比 ===');
    console.log('年柱 (普通):', lunar.getYearInGanZhi());
    console.log('年柱 (立春):', lunar.getYearInGanZhiByLiChun());
    console.log('年柱 (精确):', lunar.getYearInGanZhiExact());

    console.log('月柱 (普通):', lunar.getMonthInGanZhi());
    console.log('月柱 (精确):', lunar.getMonthInGanZhiExact());

    console.log('日柱 (普通):', lunar.getDayInGanZhi());
    console.log('日柱 (精确):', lunar.getDayInGanZhiExact());
    console.log('日柱 (精确2):', lunar.getDayInGanZhiExact2());

    console.log('时柱:', lunar.getTimeInGanZhi());

    // 获取八字对象
    const eightChar = lunar.getEightChar();
    console.log('\n=== EightChar对象输出 ===');
    console.log('年柱:', eightChar.getYear());
    console.log('月柱:', eightChar.getMonth());
    console.log('日柱:', eightChar.getDay());
    console.log('时柱:', eightChar.getTime());

} catch (e) {
    console.log('Lunar.js测试失败:', e.message);
}

console.log('\n=== 结论 ===');
console.log('我们需要找到一个权威的、独立的八字计算来源进行验证。');
console.log('目前的算法可能存在系统性偏差，需要重新校准。');