/**
 * 最终测试 - 验证API返回的字段名与前端期望完全匹配
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

console.log('🔍 最终结构验证...\n');

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

    // 检查前端期望的字段
    console.log('📋 字段匹配检查:\n');

    const checks = [
      { field: 'gejuAnalysis', status: !!data.gejuAnalysis },
      { field: 'gejuAnalysis.mainGeju', status: !!data.gejuAnalysis?.mainGeju },
      { field: 'shenshaAnalysis', status: !!data.shenshaAnalysis },
      { field: 'shenshaAnalysis.jixing', status: !!data.shenshaAnalysis?.jixing },
      { field: 'classicalAnalysis', status: !!data.classicalAnalysis },
      { field: 'classicalAnalysis.xingge', status: !!data.classicalAnalysis?.xingge },
      { field: 'classicalAnalysis.shiye', status: !!data.classicalAnalysis?.shiye },
      { field: 'classicalAnalysis.caiyun', status: !!data.classicalAnalysis?.caiyun },
      { field: 'classicalAnalysis.hunyin', status: !!data.classicalAnalysis?.hunyin },
      { field: 'classicalAnalysis.jiankang', status: !!data.classicalAnalysis?.jiankang },
      { field: 'classicalAnalysis.suggestions', status: !!data.classicalAnalysis?.suggestions },
      { field: 'yongshenAnalysis', status: !!data.yongshenAnalysis },
      { field: 'dayunAnalysis', status: !!data.dayunAnalysis }
    ];

    checks.forEach(check => {
      console.log(`${check.status ? '✅' : '❌'} ${check.field}`);
    });

    const allPassed = checks.every(c => c.status);

    if (allPassed) {
      console.log('\n🎉 所有字段完美匹配！前端应该可以正常显示了！');
      console.log('\n📖 预览经典分析内容:');
      if (data.classicalAnalysis) {
        console.log('性格:', data.classicalAnalysis.xingge.substring(0, 50) + '...');
        console.log('事业:', data.classicalAnalysis.shiye.substring(0, 50) + '...');
        console.log('财运:', data.classicalAnalysis.caiyun.substring(0, 50) + '...');
      }
    } else {
      console.log('\n⚠️ 还有字段不匹配，需要继续修复');
    }
  })
  .catch(error => {
    console.error('❌ API请求失败:', error);
  });
