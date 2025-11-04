/**
 * 测试大运API是否正常返回
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

console.log('发送测试请求...');

fetch('http://localhost:8080/api/divination/calculate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(response => response.json())
  .then(data => {
    console.log('\n✅ API响应成功！\n');

    if (data.dayunAnalysis) {
      console.log('🌊 大运数据:');
      console.log('起运年龄:', data.dayunAnalysis.qiyunAge, '岁', data.dayunAnalysis.qiyunMonth, '月', data.dayunAnalysis.qiyunDay, '天');
      console.log('排运方向:', data.dayunAnalysis.isForward ? '顺排' : '逆排');
      console.log('大运列表:', data.dayunAnalysis.dayunList.length, '步');
      console.log('\n前3步大运:');
      data.dayunAnalysis.dayunList.slice(0, 3).forEach(dayun => {
        console.log(`  第${dayun.step}步: ${dayun.ganZhi} (${dayun.startAge}-${dayun.endAge}岁, ${dayun.startYear}-${dayun.endYear}年)${dayun.isCurrent ? ' ⭐当前' : ''}`);
      });
    } else {
      console.log('❌ 未找到dayunAnalysis数据！');
      console.log('\n返回的数据结构:');
      console.log(Object.keys(data));
    }

    console.log('\n完整响应:');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error('❌ API请求失败:', error);
  });
