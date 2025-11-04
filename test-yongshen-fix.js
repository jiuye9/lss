/**
 * 测试修复后的用神计算
 * 八字：丁卯 癸卯 壬申 丙午
 * 预期：用神=金，喜神=水（而不是错误的木、火）
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

    if (data.yongshenAnalysis) {
      console.log('🎯 用神分析:');
      console.log('用神:', data.yongshenAnalysis.yongshen);
      console.log('喜神:', data.yongshenAnalysis.xishen);
      console.log('忌神:', data.yongshenAnalysis.jishen);
      console.log('仇神:', data.yongshenAnalysis.chousen);

      if (data.yongshenAnalysis.analysis) {
        console.log('\n分析说明:', data.yongshenAnalysis.analysis);
      }

      if (data.yongshenAnalysis.rizhuStatus) {
        console.log('日主状态:', data.yongshenAnalysis.rizhuStatus);
      }

      console.log('\n验证结果:');
      const isYongshenCorrect = data.yongshenAnalysis.yongshen === '金';
      const isXishenCorrect = data.yongshenAnalysis.xishen === '水';

      console.log(isYongshenCorrect ? '✅ 用神正确 (金)' : '❌ 用神错误 (应该是金)');
      console.log(isXishenCorrect ? '✅ 喜神正确 (水)' : '❌ 喜神错误 (应该是水)');

      if (isYongshenCorrect && isXishenCorrect) {
        console.log('\n🎉 测试通过！用神计算已修复！');
      } else {
        console.log('\n⚠️ 测试失败，用神计算仍有问题');
      }
    } else {
      console.log('❌ 未找到yongshenAnalysis数据！');
      console.log('\n返回的数据结构:');
      console.log(Object.keys(data));
    }
  })
  .catch(error => {
    console.error('❌ API请求失败:', error);
  });
