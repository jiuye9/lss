/**
 * 测试lunar-javascript大运API
 */

const { Lunar, Solar } = require('lunar-javascript');

// 测试案例：1987年3月24日11时，男性
const solar = Solar.fromYmdHms(1987, 3, 24, 11, 0, 0);
const lunar = solar.getLunar();
const eightChar = lunar.getEightChar();

console.log('八字:', eightChar.toString());

// 获取运势（1=男，0=女）
const yun = eightChar.getYun(1);

console.log('\n运势对象:', yun);
console.log('\n起运年龄:', yun.getStartYear(), '岁', yun.getStartMonth(), '月', yun.getStartDay(), '天');

// 获取大运列表
const daYunList = yun.getDaYun();

console.log('\n大运数量:', daYunList.length);
console.log('\n检查第一个大运对象:');
const firstDaYun = daYunList[0];
console.log(firstDaYun);

console.log('\n第一个大运可用方法:');
console.log('- getGanZhi():', firstDaYun.getGanZhi());
console.log('- getStartAge():', firstDaYun.getStartAge());
console.log('- getEndAge():', firstDaYun.getEndAge());
console.log('- getStartYear():', firstDaYun.getStartYear());
console.log('- getEndYear():', firstDaYun.getEndYear());

// 尝试获取其他方法
console.log('\n尝试其他可能的方法:');
console.log('- toString():', firstDaYun.toString());

// 列出所有方法
console.log('\nDaYun对象的所有属性和方法:');
for (let key in firstDaYun) {
  console.log(`  ${key}:`, typeof firstDaYun[key]);
}
