// 测试保存API
const testData = {
  name: "测试用户",
  birthYear: 1990,
  birthMonth: 5,
  birthDay: 15,
  birthHour: 10,
  gender: "MALE",
  baziResult: {
    yearColumn: {gan: "庚", zhi: "午", wuxing: "金"},
    monthColumn: {gan: "辛", zhi: "巳", wuxing: "金"},
    dayColumn: {gan: "壬", zhi: "申", wuxing: "水"},
    hourColumn: {gan: "乙", zhi: "巳", wuxing: "木"},
    dayMaster: "壬",
    dayMasterWuxing: "水",
    yongshenAnalysis: {yongshen: "木", xishen: "火", summary: "测试用神分析"},
    gejuAnalysis: {geju: "测试格局", description: "格局描述"},
    shenshaAnalysis: {jixing: [], xiongshen: []},
    classicalAnalysis: {summary: "测试分析"},
    dayunAnalysis: {dayun: []},
    wuxingAnalysis: {summary: "五行分析"}
  }
};

fetch('http://localhost:8080/api/bazi/save', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(res => res.json())
.then(data => {
  console.log('保存结果:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('保存失败:', error);
});
