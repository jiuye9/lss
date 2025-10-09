const { Lunar, Solar } = require('lunar-javascript');

// 测试1987年3月24日11:35
const solarDate = new Date(1987, 2, 24, 11, 35); // 月份从0开始
console.log('测试日期:', solarDate);

const solar = Solar.fromDate(solarDate);
const lunar = solar.getLunar();
const eightChar = lunar.getEightChar();

console.log('\n=== Lunar.js API 测试 ===');
console.log('阳历:', solar.toString());
console.log('农历:', lunar.toString());

console.log('\n=== 八字信息 ===');
console.log('年柱:', eightChar.getYear());
console.log('月柱:', eightChar.getMonth());
console.log('日柱:', eightChar.getDay());
console.log('时柱:', eightChar.getTime());

console.log('\n=== 天干地支分解 ===');
console.log('年干:', eightChar.getYearGan());
console.log('年支:', eightChar.getYearZhi());
console.log('月干:', eightChar.getMonthGan());
console.log('月支:', eightChar.getMonthZhi());
console.log('日干:', eightChar.getDayGan());
console.log('日支:', eightChar.getDayZhi());
console.log('时干:', eightChar.getTimeGan());
console.log('时支:', eightChar.getTimeZhi());

console.log('\n=== 检查方法可用性 ===');
const yearGan = eightChar.getYearGan();
console.log('年干对象:', yearGan);
console.log('年干名称:', yearGan.getName ? yearGan.getName() : yearGan.toString());

// 检查是否有getWuXing方法
if (yearGan.getWuXing) {
    console.log('年干五行:', yearGan.getWuXing().getName());
} else {
    console.log('年干五行方法不存在，需要使用其他方式');
}

console.log('\n=== 完整八字 ===');
console.log(`${eightChar.getYear()} ${eightChar.getMonth()} ${eightChar.getDay()} ${eightChar.getTime()}`);