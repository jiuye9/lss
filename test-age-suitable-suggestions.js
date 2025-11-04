/**
 * 测试年龄适配建议功能
 * 展示所有10步大运的年龄适配建议
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

console.log('🔮 测试大运年龄适配建议功能...\n');
console.log('📋 测试用例: 1987年3月24日11:30，女性\n');

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
      console.log('='.repeat(80));

      // 显示所有大运的年龄适配建议
      data.dayunAnalysis.dayunList.forEach((dayun, index) => {
        console.log(`\n第${dayun.step}步大运: ${dayun.ganZhi} ${dayun.isCurrent ? '⭐[当前]' : ''}`);
        console.log('-'.repeat(80));
        console.log(`📅 年龄范围: ${dayun.startAge}-${dayun.endAge}岁`);
        console.log(`📅 年份范围: ${dayun.startYear}-${dayun.endYear}年`);

        const avgAge = Math.floor((dayun.startAge + dayun.endAge) / 2);
        let ageGroup = '';
        if (avgAge <= 10) ageGroup = '👶 儿童期';
        else if (avgAge <= 20) ageGroup = '🎓 青少年期';
        else if (avgAge <= 30) ageGroup = '💼 青年期';
        else if (avgAge <= 40) ageGroup = '🌟 壮年期';
        else if (avgAge <= 50) ageGroup = '🎯 中年期';
        else if (avgAge <= 60) ageGroup = '🌅 中老年期';
        else ageGroup = '🌺 老年期';

        console.log(`🎂 平均年龄: ${avgAge}岁 ${ageGroup}`);

        if (dayun.score !== undefined) {
          console.log(`📈 吉凶评分: ${dayun.score}/100 - ${dayun.jiXiong}`);
        }

        if (dayun.suggestions && dayun.suggestions.length > 0) {
          console.log(`\n💡 年龄适配建议:`);
          dayun.suggestions.forEach(suggestion => {
            console.log(`   • ${suggestion}`);
          });
        }

        console.log('='.repeat(80));
      });

      console.log(`\n\n✨ 年龄适配建议功能测试完成！\n`);
      console.log('📋 年龄分组规则:');
      console.log('   👶 1-10岁:   儿童期 - 健康、习惯、家长引导');
      console.log('   🎓 11-20岁:  青少年期 - 学业、技能、品格培养');
      console.log('   💼 21-30岁:  青年期 - 事业、婚姻、人脉拓展');
      console.log('   🌟 31-40岁:  壮年期 - 事业提升、家庭、投资理财');
      console.log('   🎯 41-50岁:  中年期 - 事业稳固、健康、养老规划');
      console.log('   🌅 51-60岁:  中老年期 - 退休过渡、爱好、健康维护');
      console.log('   🌺 60岁以上: 老年期 - 颐养天年、享受生活、健康第一\n');
    } else {
      console.log('❌ 未找到大运分析数据！');
    }
  })
  .catch(error => {
    console.error('❌ API请求失败:', error);
  });
