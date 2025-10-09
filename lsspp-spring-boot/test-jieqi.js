const { Lunar, Solar, JieQi } = require('lunar-javascript');

console.log('=== Lunar.js 节气功能测试 ===\n');

// 测试1987年3月24日的节气信息
const testDate = new Date(1987, 2, 24, 11, 35); // 月份从0开始
console.log('测试日期:', testDate.toISOString());

const solar = Solar.fromDate(testDate);
const lunar = solar.getLunar();

console.log('\n=== 基本信息 ===');
console.log('阳历:', solar.toString());
console.log('农历:', lunar.toString());

console.log('\n=== 节气信息 ===');
// 探索可用方法
console.log('Solar对象可用方法:');
console.log(Object.getOwnPropertyNames(solar.__proto__).filter(name => typeof solar[name] === 'function'));

console.log('\nLunar对象可用方法:');
console.log(Object.getOwnPropertyNames(lunar.__proto__).filter(name => typeof lunar[name] === 'function'));

// 尝试节气相关方法
try {
    const jieQi = solar.getJieQi ? solar.getJieQi() : '方法不存在';
    console.log('当前节气:', jieQi);
} catch (e) {
    console.log('节气获取失败:', e.message);
}

console.log('\n=== 月柱计算相关 ===');
const eightChar = lunar.getEightChar();
console.log('八字月柱:', eightChar.getMonth());

console.log('\n=== EightChar对象方法探索 ===');
console.log('EightChar可用方法:');
console.log(Object.getOwnPropertyNames(eightChar.__proto__).filter(name => typeof eightChar[name] === 'function'));

console.log('\n=== 尝试节气相关计算 ===');
// 检查Solar对象的节气方法
const solarMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(solar));
console.log('Solar节气相关方法:', solarMethods.filter(m => m.toLowerCase().includes('jie')));

// 检查Lunar对象的方法
const lunarMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(lunar));
console.log('Lunar节气相关方法:', lunarMethods.filter(m => m.toLowerCase().includes('jie')));

// 尝试月份计算的详细信息
console.log('\n=== 月份计算详细分析 ===');
console.log('当前日期:', solar.toYmd());
console.log('农历月份:', lunar.getMonth());
console.log('农历月份中文:', lunar.getMonthInChinese());
console.log('八字月柱:', eightChar.getMonth());
console.log('月柱天干:', eightChar.getMonthGan().getName());
console.log('月柱地支:', eightChar.getMonthZhi().getName());