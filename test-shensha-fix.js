/**
 * 测试神煞分析的meaning字段是否存在
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

console.log('测试神煞分析修复...\n');

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

    if (data.shenshaAnalysis) {
      console.log('🌟 神煞分析数据:');
      console.log('  吉星:', data.shenshaAnalysis.jixing);
      console.log('  凶煞:', data.shenshaAnalysis.xiongsha);
      console.log('  说明:', data.shenshaAnalysis.description);

      if (data.shenshaAnalysis.meaning) {
        console.log('\n✅ meaning字段存在！');
        console.log('  含义详解:');
        Object.entries(data.shenshaAnalysis.meaning).forEach(([name, desc]) => {
          console.log(`    ${name}: ${desc}`);
        });
        console.log('\n🎉 修复成功！前端应该不会再报错了！');
      } else {
        console.log('\n❌ meaning字段缺失！');
      }
    } else {
      console.log('❌ 未找到shenshaAnalysis数据！');
    }
  })
  .catch(error => {
    console.error('❌ API请求失败:', error);
  });
