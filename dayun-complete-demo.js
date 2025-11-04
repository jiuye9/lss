/**
 * 八字大运排法完整演示（修正版）
 * 使用 lunar-javascript v1.7.5 库
 */

const { Lunar, Solar } = require('lunar-javascript');

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║                    八字大运排法原理详解                      ║');
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

/**
 * 计算并展示八字大运
 */
function showDayunAnalysis(year, month, day, hour, gender, name) {
  console.log(`\n【案例${name}】${year}年${month}月${day}日${hour}时生，${gender === 1 ? '男性' : '女性'}\n`);
  console.log('─────────────────────────────────────────────────────────────');

  // 创建日期对象
  const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
  const lunar = solar.getLunar();

  console.log('📅 出生信息:');
  console.log(`   公历: ${solar.toYmd()} ${hour}时`);
  console.log(`   农历: ${lunar.toString()}`);
  console.log(`   性别: ${gender === 1 ? '男' : '女'}\n`);

  // 获取八字
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
  console.log(`   年柱: ${yearGan}${yearZhi}  月柱: ${monthGan}${monthZhi}  日柱: ${dayGan}${dayZhi}  时柱: ${timeGan}${timeZhi}`);
  console.log(`   日主: ${dayGan}\n`);

  // 获取运势
  const yun = eightChar.getYun(gender);

  // 判断顺逆
  const isForward = yun.isForward();
  const direction = isForward ? '顺排（阳年生男/阴年生女）' : '逆排（阴年生男/阳年生女）';

  console.log(`⚡ 起运信息:`);
  console.log(`   排运方向: ${direction}`);
  console.log(`   起运年龄: ${yun.getStartYear()}岁 ${yun.getStartMonth()}月 ${yun.getStartDay()}天`);
  console.log(`   起运时间: ${yun.getStartSolar().toYmd()}\n`);

  // 获取大运列表
  const daYunList = yun.getDaYun(10);

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                        十步大运详解                            ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  daYunList.forEach((daYun, index) => {
    const ganZhi = daYun.getGanZhi();
    const startAge = daYun.getStartAge();
    const endAge = daYun.getEndAge();
    const startYear = daYun.getStartYear();
    const endYear = daYun.getEndYear();

    // 如果getGanZhi()为空，从lunar对象获取
    let displayGanZhi = ganZhi;
    if (!displayGanZhi || displayGanZhi === '') {
      // 第一步大运在起运前，可能显示为空
      displayGanZhi = index === 0 ? `(起运前，月柱${monthGan}${monthZhi})` : '未知';
    }

    console.log(`【第${index + 1}步大运】 ${displayGanZhi}`);
    console.log(`   年龄: ${startAge}-${endAge}岁`);
    console.log(`   年份: ${startYear}-${endYear}年`);

    // 获取流年（每步大运中的年份）
    const liuNianList = daYun.getLiuNian();
    if (liuNianList && liuNianList.length > 0) {
      const exampleLiuNian = liuNianList[0];
      console.log(`   流年示例: ${exampleLiuNian.getYear()}年 ${exampleLiuNian.getGanZhi()}`);
    }

    console.log('');
  });

  console.log('═══════════════════════════════════════════════════════════════\n');
}

// ==================== 案例演示 ====================

// 案例1：1987年3月24日11时，男性（阴年生男，逆排）
showDayunAnalysis(1987, 3, 24, 11, 1, '一');

// 案例2：1990年1月21日13时，女性（阳年生女，逆排）
showDayunAnalysis(1990, 1, 21, 13, 0, '二');

// 案例3：1988年11月26日7时，男性（阳年生男，顺排）
showDayunAnalysis(1988, 11, 26, 7, 1, '三');

// 案例4：1985年4月7日9时，女性（阴年生女，顺排）
showDayunAnalysis(1985, 4, 7, 9, 0, '四');

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║                    大运吉凶判断要点                          ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

console.log('📖 大运吉凶判断的五大要素：\n');

console.log('1. 【生扶日主】');
console.log('   - 大运天干地支生扶日主的五行 → 增强命主力量');
console.log('   - 适合身弱之命，逢之财运事业顺遂\n');

console.log('2. 【克泄耗日主】');
console.log('   - 大运克泄耗日主的五行 → 削弱命主力量');
console.log('   - 适合身旺之命，逢之反而吉利\n');

console.log('3. 【喜用神临运】');
console.log('   - 大运遇到命局喜用神 → 事业财运顺利');
console.log('   - 贵人相助，升职加薪，婚姻美满\n');

console.log('4. 【忌神临运】');
console.log('   - 大运遇到命局忌神 → 容易遭遇挫折');
console.log('   - 事业受阻，破财损耗，健康欠佳\n');

console.log('5. 【十神含义】');
console.log('   ├─ 正官大运：事业提升，名誉增加，官运亨通');
console.log('   ├─ 七杀大运：压力增大，但可成大事，适合创业');
console.log('   ├─ 正财大运：财运亨通，收入增加，投资顺利');
console.log('   ├─ 偏财大运：意外之财，横财运佳，投机获利');
console.log('   ├─ 正印大运：学业进步，贵人相助，文化发展');
console.log('   ├─ 偏印大运：偏业发达，技术提升，玄学研究');
console.log('   ├─ 食神大运：享受安逸，生活舒适，口福增加');
console.log('   ├─ 伤官大运：创新突破，但易有变动，不利官贵');
console.log('   ├─ 比肩大运：兄弟朋友助力，竞争激烈');
console.log('   └─ 劫财大运：合作机遇，但易有破财，需防小人\n');

console.log('📊 大运与流年的关系：\n');
console.log('   • 大运如大环境（10年周期）');
console.log('   • 流年如小气候（1年周期）');
console.log('   • 大运吉 + 流年吉 = 大吉之年');
console.log('   • 大运凶 + 流年凶 = 需要特别注意的年份');
console.log('   • 大运吉 + 流年凶 = 整体尚可，但需谨慎');
console.log('   • 大运凶 + 流年吉 = 有转机，但仍需稳重\n');

console.log('═══════════════════════════════════════════════════════════════\n');
console.log('✅ 演示完成！\n');
console.log('💡 提示：lunar-javascript库提供了完整的大运、流年、小运计算功能，');
console.log('   可通过 getLiuNian() 和 getXiaoYun() 方法获取更详细的流年和小运信息。\n');
