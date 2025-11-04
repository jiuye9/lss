// 测试加载记录功能
async function testLoadRecord(recordId) {
  try {
    const response = await fetch(`http://localhost:8080/api/bazi/record/${recordId}`);
    const result = await response.json();

    console.log('=== API响应 ===');
    console.log('success:', result.success);
    console.log('data存在:', !!result.data);

    if (!result.success || !result.data) {
      console.error('❌ 数据格式错误');
      return;
    }

    const record = result.data;
    console.log('\n=== 原始数据 ===');
    console.log('name:', record.name);
    console.log('birthDateSolar:', record.birthDateSolar);
    console.log('bazi存在:', !!record.bazi);
    console.log('analysis存在:', !!record.analysis);

    // 解析出生日期
    const [birthYear, birthMonth, birthDay] = record.birthDateSolar.split('-').map(Number);
    console.log('\n=== 解析后的日期 ===');
    console.log('birthYear:', birthYear);
    console.log('birthMonth:', birthMonth);
    console.log('birthDay:', birthDay);

    // 重组八字结果数据
    const baziResult = {
      ...record.bazi,
      ...record.analysis,
      birthYear,
      birthMonth,
      birthDay,
      birthHour: record.birthHour,
      gender: record.gender
    };

    console.log('\n=== 重组后的数据 ===');
    console.log('yearColumn存在:', !!baziResult.yearColumn);
    console.log('yongshenAnalysis存在:', !!baziResult.yongshenAnalysis);
    console.log('dayMaster:', baziResult.dayMaster);
    console.log('dayMasterWuxing:', baziResult.dayMasterWuxing);

    if (baziResult.yearColumn) {
      console.log('yearColumn.gan:', baziResult.yearColumn.gan);
      console.log('yearColumn.zhi:', baziResult.yearColumn.zhi);
      console.log('yearColumn.wuxing:', baziResult.yearColumn.wuxing);
    }

    if (baziResult.yongshenAnalysis) {
      console.log('yongshenAnalysis.yongshen:', baziResult.yongshenAnalysis.yongshen);
    }

    console.log('\n✅ 数据结构验证通过');
  } catch (error) {
    console.error('\n❌ 错误:', error.message);
  }
}

// 测试记录ID 1
testLoadRecord(1);
