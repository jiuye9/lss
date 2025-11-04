/**
 * 测试大运详细分析功能
 */

const testData = {
  divinationType: 'BAZI',
  birthYear: 1987,
  birthMonth: 3,
  birthDay: 24,
  birthHour: 11,
  birthMinute: 30,
  gender: 'female',
  lunarCalendar: false
};

console.log('🔮 测试大运详细分析功能...\n');

fetch('http://localhost:8080/api/divination/calculate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ API响应成功！\n');

    if (data.dayunAnalysis && data.dayunAnalysis.dayunList) {
      console.log(`📊 大运列表: 共${data.dayunAnalysis.dayunList.length}步\n`);

      // 显示前3步大运的详细信息
      data.dayunAnalysis.dayunList.slice(0, 3).forEach(dayun => {
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`第${dayun.step}步: ${dayun.ganZhi} ${dayun.isCurrent ? '⭐当前' : ''}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`年龄: ${dayun.startAge}-${dayun.endAge}岁`);
        console.log(`年份: ${dayun.startYear}-${dayun.endYear}年`);

        if (dayun.gan && dayun.zhi) {
          console.log(`\n🌟 干支五行:`);
          console.log(`  天干: ${dayun.gan}（${dayun.ganWuxing}）`);
          console.log(`  地支: ${dayun.zhi}（${dayun.zhiWuxing}）`);
        }

        if (dayun.score !== undefined) {
          console.log(`\n📈 吉凶评分: ${dayun.score}/100 - ${dayun.jiXiong}`);
        }

        if (dayun.analysis) {
          console.log(`\n📝 运势分析:`);
          console.log(`  ${dayun.analysis}`);
        }

        if (dayun.features && dayun.features.length > 0) {
          console.log(`\n✨ 运势特点:`);
          dayun.features.forEach(feature => {
            console.log(`  • ${feature}`);
          });
        }

        if (dayun.suggestions && dayun.suggestions.length > 0) {
          console.log(`\n💡 开运建议:`);
          dayun.suggestions.forEach(suggestion => {
            console.log(`  • ${suggestion}`);
          });
        }

        console.log('');
      });

      console.log(`\n🎉 大运详细分析功能正常！`);
      console.log(`\n💡 提示: 前端页面最下方会显示所有${data.dayunAnalysis.dayunList.length}步大运的详细分析`);
    } else {
      console.log('❌ 未找到大运分析数据！');
    }
  })
  .catch(error => {
    console.error('❌ API请求失败:', error);
  });
