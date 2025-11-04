/**
 * 测试API是否返回完整的分析数据
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

console.log('测试完整分析数据返回...\n');

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

    // 检查关键字段
    const checks = [
      { field: 'gejuAnalysis', name: '格局分析' },
      { field: 'shenshaAnalysis', name: '神煞分析' },
      { field: 'analysisByClassic', name: '经典命理分析' },
      { field: 'yongshenAnalysis', name: '用神分析' },
      { field: 'dayunAnalysis', name: '大运分析' }
    ];

    console.log('📊 数据完整性检查:\n');
    checks.forEach(check => {
      if (data[check.field]) {
        console.log(`✅ ${check.name}: 存在`);
      } else {
        console.log(`❌ ${check.name}: 缺失`);
      }
    });

    console.log('\n📖 格局分析详情:');
    if (data.gejuAnalysis) {
      console.log('  格局:', data.gejuAnalysis.mainGeju);
      console.log('  强度:', data.gejuAnalysis.strength, '/10');
      console.log('  用神:', data.gejuAnalysis.yongshen);
      console.log('  分析:', data.gejuAnalysis.analysis);
    }

    console.log('\n🌟 神煞分析详情:');
    if (data.shenshaAnalysis) {
      console.log('  吉星:', data.shenshaAnalysis.jixing.join('、'));
      console.log('  凶煞:', data.shenshaAnalysis.xiongsha.join('、') || '无');
      console.log('  说明:', data.shenshaAnalysis.description);
    }

    console.log('\n📚 经典命理分析详情:');
    if (data.analysisByClassic) {
      console.log('  性格:', data.analysisByClassic.personality);
      console.log('  事业:', data.analysisByClassic.career);
      console.log('  财运:', data.analysisByClassic.wealth);
      console.log('  婚姻:', data.analysisByClassic.marriage);
      console.log('  健康:', data.analysisByClassic.health);
    }

    console.log('\n🎉 数据结构完整，前端应该能正常显示了！');
  })
  .catch(error => {
    console.error('❌ API请求失败:', error);
  });
