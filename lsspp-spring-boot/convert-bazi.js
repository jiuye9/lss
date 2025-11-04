// 公历转八字工具
const { Solar } = require('lunar-javascript');

// 输入公历日期时间
const year = 1985;
const month = 4;
const day = 7;
const hour = 10;
const minute = 15;

console.log(`\n========== 公历转八字 ==========`);
console.log(`公历: ${year}年${month}月${day}日 ${hour}:${minute}`);
console.log();

// 创建Solar对象
const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
const lunar = solar.getLunar();

// 获取八字
const yearGan = lunar.getYearGanByLiChun();  // 立春换年
const yearZhi = lunar.getYearZhiByLiChun();
const monthGan = lunar.getMonthGanExact();   // 节气边界
const monthZhi = lunar.getMonthZhiExact();
const dayGan = lunar.getDayGanExact();
const dayZhi = lunar.getDayZhiExact();
const timeGan = lunar.getTimeGan();
const timeZhi = lunar.getTimeZhi();

console.log('========== 八字排盘 ==========');
console.log(`年柱: ${yearGan}${yearZhi}`);
console.log(`月柱: ${monthGan}${monthZhi}`);
console.log(`日柱: ${dayGan}${dayZhi}`);
console.log(`时柱: ${timeGan}${timeZhi}`);
console.log();

console.log('========== 用于测试 ==========');
console.log(`八字: ${yearGan} ${yearZhi} ${monthGan} ${monthZhi} ${dayGan} ${dayZhi} ${timeGan} ${timeZhi}`);
console.log();

// 农历信息
console.log('========== 农历信息 ==========');
console.log(`农历: ${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`);
console.log(`生肖: ${lunar.getYearShengXiao()}`);
console.log(`纳音: 年柱${lunar.getYearNaYin()} 月柱${lunar.getMonthNaYin()} 日柱${lunar.getDayNaYin()} 时柱${lunar.getTimeNaYin()}`);
console.log();

// 节气信息
const jieQi = lunar.getPrevJieQi();
const nextJieQi = lunar.getNextJieQi();
console.log('========== 节气信息 ==========');
console.log(`上一节气: ${jieQi.getName()} (${jieQi.getSolar().toYmd()})`);
console.log(`下一节气: ${nextJieQi.getName()} (${nextJieQi.getSolar().toYmd()})`);
console.log();
