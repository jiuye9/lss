/**
 * 测试案例：1987年3月24日 11:30 女性
 * 八字排盘 + 大运分析
 */

const { Lunar, Solar } = require('lunar-javascript');

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║              八字排盘与大运分析 - 详细报告                  ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

// 出生信息
const birthYear = 1987;
const birthMonth = 3;
const birthDay = 24;
const birthHour = 11;
const birthMinute = 30;
const gender = 0; // 0=女，1=男

console.log('📋 基本信息');
console.log('─────────────────────────────────────────────────────────────');
console.log(`   出生时间: ${birthYear}年${birthMonth}月${birthDay}日 ${birthHour}:${birthMinute}`);
console.log(`   性别: 女`);
console.log('');

// 创建日期对象
const solar = Solar.fromYmdHms(birthYear, birthMonth, birthDay, birthHour, birthMinute, 0);
const lunar = solar.getLunar();

console.log('📅 公历与农历');
console.log('─────────────────────────────────────────────────────────────');
console.log(`   公历: ${solar.toYmd()} ${solar.getHour()}:${solar.getMinute()}`);
console.log(`   农历: ${lunar.toString()}`);
console.log(`   星期: ${solar.getWeekInChinese()}`);
console.log(`   生肖: ${lunar.getYearShengXiaoByLiChun()}`);
console.log('');

// 获取八字
const eightChar = lunar.getEightChar();

// 使用立春换年和节气精确的方法
const yearGan = lunar.getYearGanByLiChun();
const yearZhi = lunar.getYearZhiByLiChun();
const monthGan = lunar.getMonthGanExact();
const monthZhi = lunar.getMonthZhiExact();
const dayGan = lunar.getDayGanExact();
const dayZhi = lunar.getDayZhiExact();
const timeGan = lunar.getTimeGan();
const timeZhi = lunar.getTimeZhi();

console.log('🔮 八字四柱（立春换年、节气精确）');
console.log('═════════════════════════════════════════════════════════════');
console.log('');
console.log('        年柱      月柱      日柱      时柱');
console.log('      ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐');
console.log(`      │  ${yearGan}  │  │  ${monthGan}  │  │  ${dayGan}  │  │  ${timeGan}  │  天干`);
console.log('      ├─────┤  ├─────┤  ├─────┤  ├─────┤');
console.log(`      │  ${yearZhi}  │  │  ${monthZhi}  │  │  ${dayZhi}  │  │  ${timeZhi}  │  地支`);
console.log('      └─────┘  └─────┘  └─────┘  └─────┘');
console.log('');
console.log(`   完整八字: ${yearGan}${yearZhi} ${monthGan}${monthZhi} ${dayGan}${dayZhi} ${timeGan}${timeZhi}`);
console.log(`   日主: ${dayGan}（${getWuxing(dayGan)}）`);
console.log('');

// 五行对照
function getWuxing(gan) {
  const wuxingMap = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
    '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
    '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
    '戌': '土', '亥': '水'
  };
  return wuxingMap[gan] || '未知';
}

// 纳音
console.log('🎵 纳音五行');
console.log('─────────────────────────────────────────────────────────────');
console.log(`   年柱纳音: ${lunar.getYearNaYin()}`);
console.log(`   月柱纳音: ${lunar.getMonthNaYin()}`);
console.log(`   日柱纳音: ${lunar.getDayNaYin()}`);
console.log(`   时柱纳音: ${lunar.getTimeNaYin()}`);
console.log('');

// 五行分析
console.log('🌟 五行统计');
console.log('─────────────────────────────────────────────────────────────');
const wuxingCount = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
const ganZhiList = [yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, timeGan, timeZhi];

ganZhiList.forEach(item => {
  const wx = getWuxing(item);
  if (wuxingCount.hasOwnProperty(wx)) {
    wuxingCount[wx]++;
  }
});

console.log(`   木: ${wuxingCount['木']}个 ${'★'.repeat(wuxingCount['木'])}`);
console.log(`   火: ${wuxingCount['火']}个 ${'★'.repeat(wuxingCount['火'])}`);
console.log(`   土: ${wuxingCount['土']}个 ${'★'.repeat(wuxingCount['土'])}`);
console.log(`   金: ${wuxingCount['金']}个 ${'★'.repeat(wuxingCount['金'])}`);
console.log(`   水: ${wuxingCount['水']}个 ${'★'.repeat(wuxingCount['水'])}`);
console.log('');

// 找出最旺和最弱的五行
const sortedWuxing = Object.entries(wuxingCount).sort((a, b) => b[1] - a[1]);
console.log(`   最旺五行: ${sortedWuxing[0][0]}（${sortedWuxing[0][1]}个）`);
console.log(`   最弱五行: ${sortedWuxing[sortedWuxing.length - 1][0]}（${sortedWuxing[sortedWuxing.length - 1][1]}个）`);
console.log('');

// 节气信息
console.log('🌸 节气信息');
console.log('─────────────────────────────────────────────────────────────');
const currentJieQi = lunar.getCurrentJieQi();
const prevJieQi = lunar.getPrevJieQi();
const nextJieQi = lunar.getNextJieQi();
console.log(`   当前节气: ${currentJieQi ? currentJieQi.getName() : '未知'}`);
console.log(`   上一节气: ${prevJieQi.getName()} (${prevJieQi.getSolar().toYmd()})`);
console.log(`   下一节气: ${nextJieQi.getName()} (${nextJieQi.getSolar().toYmd()})`);
console.log('');

// === 大运分析 ===
console.log('═════════════════════════════════════════════════════════════');
console.log('                        大运分析                              ');
console.log('═════════════════════════════════════════════════════════════');
console.log('');

const yun = eightChar.getYun(gender);

// 判断顺逆
const isForward = yun.isForward();
const yearGanType = ['甲', '丙', '戊', '庚', '壬'].includes(yearGan) ? '阳年' : '阴年';

console.log('⚡ 起运信息');
console.log('─────────────────────────────────────────────────────────────');
console.log(`   年干性质: ${yearGan}（${yearGanType}）`);
console.log(`   性别: 女`);
console.log(`   排运方向: ${isForward ? '顺排（阳年生男/阴年生女）' : '逆排（阴年生男/阳年生女）'}`);
console.log(`   月柱: ${monthGan}${monthZhi}`);
console.log('');
console.log(`   起运年龄: ${yun.getStartYear()}岁 ${yun.getStartMonth()}月 ${yun.getStartDay()}天`);
console.log(`   起运时间: ${yun.getStartSolar().toYmd()}`);
console.log('');

// 获取大运列表
const daYunList = yun.getDaYun(10);

console.log('📊 十步大运详解');
console.log('═════════════════════════════════════════════════════════════');
console.log('');

daYunList.forEach((daYun, index) => {
  const ganZhi = daYun.getGanZhi();
  const startAge = daYun.getStartAge();
  const endAge = daYun.getEndAge();
  const startYear = daYun.getStartYear();
  const endYear = daYun.getEndYear();

  // 判断是否是当前大运
  const currentYear = new Date().getFullYear();
  const isCurrent = currentYear >= startYear && currentYear <= endYear;

  let displayGanZhi = ganZhi;
  if (!displayGanZhi || displayGanZhi === '') {
    displayGanZhi = index === 0 ? '起运前' : '未知';
  }

  console.log(`┌${'─'.repeat(60)}┐`);
  console.log(`│ 第${index + 1}步大运: ${displayGanZhi}${isCurrent ? ' ⭐ 当前大运' : ''}${' '.repeat(Math.max(0, 45 - displayGanZhi.length - (isCurrent ? 9 : 0)))}│`);
  console.log(`├${'─'.repeat(60)}┤`);
  console.log(`│ 年龄范围: ${startAge}-${endAge}岁${' '.repeat(Math.max(0, 49 - String(startAge).length - String(endAge).length))}│`);
  console.log(`│ 年份范围: ${startYear}-${endYear}年${' '.repeat(Math.max(0, 47 - String(startYear).length - String(endYear).length))}│`);

  if (displayGanZhi !== '起运前' && displayGanZhi !== '未知') {
    const gan = displayGanZhi[0];
    const zhi = displayGanZhi[1];
    const ganWuxing = getWuxing(gan);
    const zhiWuxing = getWuxing(zhi);

    console.log(`│ 天干: ${gan}（${ganWuxing}）  地支: ${zhi}（${zhiWuxing}）${' '.repeat(Math.max(0, 35 - gan.length - zhi.length - ganWuxing.length - zhiWuxing.length))}│`);

    // 获取流年
    const liuNianList = daYun.getLiuNian();
    if (liuNianList && liuNianList.length > 0) {
      const firstLiuNian = liuNianList[0];
      const lastLiuNian = liuNianList[liuNianList.length - 1];
      console.log(`│ 流年: ${firstLiuNian.getYear()}年${firstLiuNian.getGanZhi()} ~ ${lastLiuNian.getYear()}年${lastLiuNian.getGanZhi()}${' '.repeat(Math.max(0, 28 - String(firstLiuNian.getYear()).length - firstLiuNian.getGanZhi().length - String(lastLiuNian.getYear()).length - lastLiuNian.getGanZhi().length))}│`);
    }
  }

  console.log(`└${'─'.repeat(60)}┘`);
  console.log('');
});

console.log('═════════════════════════════════════════════════════════════');
console.log('');

console.log('💡 简要分析');
console.log('─────────────────────────────────────────────────────────────');
console.log(`   日主: ${dayGan}${getWuxing(dayGan)}`);
console.log(`   年份: ${yearGan}${yearZhi}年（${yearGanType}）`);
console.log(`   性别: 女`);
console.log(`   因此: ${yearGanType}生女 → ${isForward ? '顺排大运' : '逆排大运'}`);
console.log(`   月柱: ${monthGan}${monthZhi}`);
console.log(`   大运: 从${monthGan}${monthZhi}开始${isForward ? '顺推' : '逆推'}`);
console.log('');

console.log('✅ 分析完成！\n');
