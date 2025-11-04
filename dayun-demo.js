/**
 * 八字大运排法演示
 * 使用 lunar-javascript v1.7.5 库
 *
 * 大运理论：
 * - 大运为10年一步运程
 * - 男顺女逆的起运方式（阳年生男/阴年生女顺排，反之逆排）
 * - 从月柱开始，顺行或逆行排列天干地支
 */

const { Lunar, Solar } = require('lunar-javascript');

/**
 * 计算八字大运
 * @param {number} year - 出生年
 * @param {number} month - 出生月
 * @param {number} day - 出生日
 * @param {number} hour - 出生时
 * @param {number} gender - 性别 (1=男, 0=女)
 */
function calculateDayun(year, month, day, hour, gender) {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    八字大运排法演示                          ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // 第一步：创建日期对象并获取八字
  const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
  const lunar = solar.getLunar();

  console.log('📅 出生信息:');
  console.log(`   公历: ${year}年${month}月${day}日 ${hour}时`);
  console.log(`   农历: ${lunar.toString()}`);
  console.log(`   性别: ${gender === 1 ? '男' : '女'}\n`);

  // 第二步：获取八字
  const eightChar = lunar.getEightChar();
  const yearGan = eightChar.getYearGan();
  const yearZhi = eightChar.getYearZhi();
  const monthGan = eightChar.getMonthGan();
  const monthZhi = eightChar.getMonthZhi();
  const dayGan = eightChar.getDayGan();
  const dayZhi = eightChar.getDayZhi();
  const timeGan = eightChar.getTimeGan();
  const timeZhi = eightChar.getTimeZhi();

  console.log('🔮 八字四柱:');
  console.log(`   年柱: ${yearGan}${yearZhi}`);
  console.log(`   月柱: ${monthGan}${monthZhi}`);
  console.log(`   日柱: ${dayGan}${dayZhi} (日主: ${dayGan})`);
  console.log(`   时柱: ${timeGan}${timeZhi}\n`);

  // 第三步：获取运势（大运）
  // gender: 1=男, 0=女
  const yun = eightChar.getYun(gender);

  console.log('⚡ 起运信息:');
  console.log(`   起运年龄: ${yun.getStartYear()}岁 ${yun.getStartMonth()}月 ${yun.getStartDay()}天`);
  console.log(`   起运时间: ${yun.getStartSolar().toYmd()}\n`);

  // 第四步：获取大运列表（默认返回10步大运）
  const daYunList = yun.getDaYun();

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                        十步大运详解                            ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  daYunList.forEach((daYun, index) => {
    const ganZhi = daYun.getGanZhi();
    const startAge = daYun.getStartAge();
    const endAge = daYun.getEndAge();
    const startYear = daYun.getStartYear();
    const endYear = daYun.getEndYear();

    console.log(`【第${index + 1}步大运】 ${ganZhi}`);
    console.log(`   年龄范围: ${startAge}岁 - ${endAge}岁`);
    console.log(`   年份范围: ${startYear}年 - ${endYear}年`);

    // 获取大运的天干地支详情
    const gan = daYun.getGan();
    const zhi = daYun.getZhi();

    // 获取五行
    const ganWuxing = gan.getWuXing();
    const zhiWuxing = zhi.getWuXing();

    console.log(`   天干: ${gan} (${ganWuxing})`);
    console.log(`   地支: ${zhi} (${zhiWuxing})`);

    // 获取纳音
    const nayin = daYun.getNaYin();
    console.log(`   纳音: ${nayin}`);

    // 获取十神（相对于日主）
    const shishen = gan.getShiShen(dayGan);
    console.log(`   十神: ${shishen}`);

    console.log('');
  });

  console.log('═══════════════════════════════════════════════════════════════\n');

  // 第五步：流年分析（可选）
  console.log('📊 当前大运与流年:');
  const currentDaYun = yun.getDaYun(10)[0]; // 获取当前大运
  if (currentDaYun) {
    console.log(`   当前大运: ${currentDaYun.getGanZhi()}`);

    // 获取当前流年
    const currentYear = new Date().getFullYear();
    const currentSolar = Solar.fromYmd(currentYear, 1, 1);
    const currentLunar = currentSolar.getLunar();
    const currentYearGanZhi = currentLunar.getYearInGanZhi();

    console.log(`   ${currentYear}年流年: ${currentYearGanZhi}`);
  }

  console.log('\n');

  return {
    bazi: `${yearGan}${yearZhi} ${monthGan}${monthZhi} ${dayGan}${dayZhi} ${timeGan}${timeZhi}`,
    dayMaster: dayGan,
    startAge: yun.getStartYear(),
    daYunList: daYunList.map(daYun => ({
      ganZhi: daYun.getGanZhi(),
      startAge: daYun.getStartAge(),
      endAge: daYun.getEndAge(),
      startYear: daYun.getStartYear(),
      endYear: daYun.getEndYear(),
      gan: daYun.getGan().toString(),
      zhi: daYun.getZhi().toString(),
      nayin: daYun.getNaYin(),
      shishen: daYun.getGan().getShiShen(dayGan)
    }))
  };
}

// ==================== 大运排法原理说明 ====================

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║                    大运排法原理详解                          ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

console.log('📚 什么是大运？');
console.log('   大运是指人生中每隔10年的运程周期，从月柱开始推算。\n');

console.log('📐 大运起法规则：');
console.log('   1. 【阳年生男、阴年生女】：顺排大运');
console.log('      - 从月柱开始，天干地支依次顺推');
console.log('      - 例如：月柱癸卯 → 甲辰 → 乙巳 → 丙午...\n');

console.log('   2. 【阴年生男、阳年生女】：逆排大运');
console.log('      - 从月柱开始，天干地支依次逆推');
console.log('      - 例如：月柱癸卯 → 壬寅 → 辛丑 → 庚子...\n');

console.log('   3. 阳年判断：年干为甲丙戊庚壬的年份');
console.log('   4. 阴年判断：年干为乙丁己辛癸的年份\n');

console.log('⏰ 起运时间计算：');
console.log('   - 顺排：从出生日到下一个节气的天数 ÷ 3 = 起运岁数');
console.log('   - 逆排：从出生日到上一个节气的天数 ÷ 3 = 起运岁数');
console.log('   - 每3天折算1年（约4个月）\n');

console.log('═══════════════════════════════════════════════════════════════\n');

// ==================== 示例演示 ====================

// 示例1：男命，丁卯年出生（阴年生男，逆排）
console.log('【示例1】1987年3月24日11时生，男性\n');
const result1 = calculateDayun(1987, 3, 24, 11, 1);

console.log('💡 解析：');
console.log(`   - 八字：${result1.bazi}`);
console.log(`   - 1987年为丁卯年（丁为阴干），男命，逆排大运`);
console.log(`   - ${result1.startAge}岁起运`);
console.log(`   - 从月柱开始逆推：癸卯 → 壬寅 → 辛丑 → 庚子...\n`);

console.log('───────────────────────────────────────────────────────────────\n');

// 示例2：女命，庚子年出生（阳年生女，逆排）
console.log('【示例2】1990年1月21日13时生，女性\n');
const result2 = calculateDayun(1990, 1, 21, 13, 0);

console.log('💡 解析：');
console.log(`   - 八字：${result2.bazi}`);
console.log(`   - 1990年为庚午年（庚为阳干），女命，逆排大运`);
console.log(`   - ${result2.startAge}岁起运`);
console.log(`   - 从月柱开始逆推\n`);

console.log('───────────────────────────────────────────────────────────────\n');

// 示例3：男命，戊辰年出生（阳年生男，顺排）
console.log('【示例3】1988年11月26日7时生，男性\n');
const result3 = calculateDayun(1988, 11, 26, 7, 1);

console.log('💡 解析：');
console.log(`   - 八字：${result3.bazi}`);
console.log(`   - 1988年为戊辰年（戊为阳干），男命，顺排大运`);
console.log(`   - ${result3.startAge}岁起运`);
console.log(`   - 从月柱开始顺推\n`);

console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📖 大运吉凶判断要点：\n');
console.log('   1. 【生扶日主】：大运天干地支生扶日主的五行，为吉运');
console.log('   2. 【克泄耗日主】：大运克泄耗日主的五行，为凶运');
console.log('   3. 【喜用神】：大运遇到命局喜用神，事业财运顺利');
console.log('   4. 【忌神】：大运遇到命局忌神，容易遭遇挫折');
console.log('   5. 【十神分析】：');
console.log('      - 正官大运：事业提升，名誉增加');
console.log('      - 正财大运：财运亨通，收入增加');
console.log('      - 正印大运：学业进步，贵人相助');
console.log('      - 食神大运：享受安逸，生活舒适');
console.log('      - 伤官大运：创新突破，但易有变动');
console.log('      - 七杀大运：压力增大，但可成大事');
console.log('      - 劫财大运：竞争激烈，易有破财');

console.log('\n✅ 演示完成！\n');
