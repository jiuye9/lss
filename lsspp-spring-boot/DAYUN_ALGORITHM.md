# 八字大运排法算法文档

## 📚 理论基础

**大运**是中国传统命理学中的核心概念，代表人生中每隔10年的运程周期。大运的排法直接影响对一个人一生命运走势的判断。

### 核心原则

1. **起运基准**：从月柱开始推算
2. **周期长度**：每步大运管10年
3. **方向规则**：根据出生年份和性别决定顺排或逆排
4. **步数**：通常排10步大运（100年）

---

## 🔄 大运排法规则

### 一、顺逆判断

| 条件 | 性别 | 排列方向 | 示例 |
|------|------|----------|------|
| 阳年生 | 男 | 顺排 | 戊辰年生男 → 月柱后顺推 |
| 阳年生 | 女 | 逆排 | 戊辰年生女 → 月柱前逆推 |
| 阴年生 | 男 | 逆排 | 丁卯年生男 → 月柱前逆推 |
| 阴年生 | 女 | 顺排 | 丁卯年生女 → 月柱后顺推 |

**阳年干支**：甲、丙、戊、庚、壬
**阴年干支**：乙、丁、己、辛、癸

**口诀**：
> 阳男阴女顺排走，阴男阳女逆行求。

### 二、起运时间计算

起运时间决定了从几岁开始进入第一步大运。

**计算公式**：
```
顺排：从出生日到下一个节气的天数 ÷ 3 = 起运岁数
逆排：从出生日到上一个节气的天数 ÷ 3 = 起运岁数
```

**换算规则**：
- 每3天 = 1年
- 每1天 = 4个月
- 每2小时 = 10天

**示例**：
```
出生日期：1987年3月24日
下一个节气（清明）：1987年4月5日
距离天数：12天
起运年龄：12 ÷ 3 = 4岁
```

### 三、大运推算方法

**顺排示例**（戊辰年生男，月柱癸亥）：
```
月柱: 癸亥
第1步: 甲子 (顺推)
第2步: 乙丑
第3步: 丙寅
第4步: 丁卯
第5步: 戊辰
...以此类推
```

**逆排示例**（丁卯年生男，月柱癸卯）：
```
月柱: 癸卯
第1步: 壬寅 (逆推)
第2步: 辛丑
第3步: 庚子
第4步: 己亥
第5步: 戊戌
...以此类推
```

---

## 💻 lunar-javascript 实现

### API 调用流程

```javascript
const { Lunar, Solar } = require('lunar-javascript');

// 1. 创建日期对象
const solar = Solar.fromYmdHms(1987, 3, 24, 11, 0, 0);
const lunar = solar.getLunar();

// 2. 获取八字
const eightChar = lunar.getEightChar();

// 3. 获取运势对象（1=男，0=女）
const yun = eightChar.getYun(1);

// 4. 判断顺逆
const isForward = yun.isForward();
console.log(isForward ? '顺排' : '逆排');

// 5. 获取起运时间
const startYear = yun.getStartYear();  // 岁
const startMonth = yun.getStartMonth(); // 月
const startDay = yun.getStartDay();     // 天

// 6. 获取大运列表
const daYunList = yun.getDaYun(10); // 参数为步数

// 7. 遍历大运
daYunList.forEach((daYun, index) => {
  const ganZhi = daYun.getGanZhi();     // 干支
  const startAge = daYun.getStartAge();  // 起始年龄
  const endAge = daYun.getEndAge();      // 结束年龄
  const startYear = daYun.getStartYear(); // 起始年份
  const endYear = daYun.getEndYear();     // 结束年份

  console.log(`第${index + 1}步大运: ${ganZhi}`);
  console.log(`年龄: ${startAge}-${endAge}岁`);
  console.log(`年份: ${startYear}-${endYear}年`);
});
```

### DaYun 对象方法

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `getGanZhi()` | String | 大运干支 |
| `getStartAge()` | Integer | 起始年龄 |
| `getEndAge()` | Integer | 结束年龄 |
| `getStartYear()` | Integer | 起始年份 |
| `getEndYear()` | Integer | 结束年份 |
| `getIndex()` | Integer | 大运索引（从0开始） |
| `getLiuNian()` | Array | 该大运的流年列表 |
| `getXiaoYun()` | Array | 该大运的小运列表 |
| `getXun()` | String | 旬空 |
| `getXunKong()` | String | 空亡 |

---

## 📊 大运吉凶判断

### 一、五行生克判断

```
基本原则：
- 生扶日主 → 增强命主力量（身弱喜，身旺忌）
- 克泄耗日主 → 削弱命主力量（身旺喜，身弱忌）
```

**五行相生**：木生火、火生土、土生金、金生水、水生木
**五行相克**：木克土、土克水、水克火、火克金、金克木

### 二、喜用忌神判断

| 日主强弱 | 喜神 | 忌神 | 大运吉凶 |
|----------|------|------|----------|
| 身旺 | 官杀、财、食伤 | 印、比劫 | 逢喜神吉，逢忌神凶 |
| 身弱 | 印、比劫 | 官杀、财、食伤 | 逢喜神吉，逢忌神凶 |

### 三、十神含义与运势

| 十神 | 大运特征 | 吉凶倾向 |
|------|----------|----------|
| **正官** | 事业提升，名誉增加，官运亨通 | 吉（忌神除外） |
| **七杀** | 压力增大，但可成大事，适合创业 | 半吉半凶 |
| **正财** | 财运亨通，收入增加，投资顺利 | 吉 |
| **偏财** | 意外之财，横财运佳，投机获利 | 吉 |
| **正印** | 学业进步，贵人相助，文化发展 | 吉 |
| **偏印** | 偏业发达，技术提升，玄学研究 | 半吉半凶 |
| **食神** | 享受安逸，生活舒适，口福增加 | 吉 |
| **伤官** | 创新突破，但易有变动，不利官贵 | 半吉半凶 |
| **比肩** | 兄弟朋友助力，竞争激烈 | 中性 |
| **劫财** | 合作机遇，但易有破财，需防小人 | 凶（财旺除外） |

### 四、大运与流年的关系

```
大运 = 大环境（10年周期）
流年 = 小气候（1年周期）

组合判断：
✅ 大运吉 + 流年吉 = 大吉之年（提升运势的最佳时机）
⚠️  大运吉 + 流年凶 = 整体尚可，但需谨慎（小挫折）
⚠️  大运凶 + 流年吉 = 有转机，但仍需稳重（短暂好转）
❌ 大运凶 + 流年凶 = 最需注意的年份（可能有大挫折）
```

---

## 🧪 验证测试案例

### 案例1：阴年生男（逆排）

```
出生：1987年3月24日11时，男性
八字：丁卯 癸卯 壬申 丙午
日主：壬水
年份：丁卯年（阴年）
性别：男
排列：逆排

起运：6岁0月10天（1993年4月3日）

大运排列：
第1步（1-6岁）：起运前
第2步（7-16岁）：壬寅
第3步（17-26岁）：辛丑
第4步（27-36岁）：庚子
第5步（37-46岁）：己亥
第6步（47-56岁）：戊戌
第7步（57-66岁）：丁酉
第8步（67-76岁）：丙申
第9步（77-86岁）：乙未
第10步（87-96岁）：甲午
```

### 案例2：阴年生女（顺排）

```
出生：1990年1月21日13时，女性
八字：己巳 丁丑 丙戌 乙未
日主：丙火
年份：己巳年（阴年）
性别：女
排列：顺排

起运：4岁7月10天（1994年8月31日）

大运排列：
第1步（1-4岁）：起运前
第2步（5-14岁）：戊寅
第3步（15-24岁）：己卯
第4步（25-34岁）：庚辰
第5步（35-44岁）：辛巳
第6步（45-54岁）：壬午
第7步（55-64岁）：癸未
第8步（65-74岁）：甲申
第9步（75-84岁）：乙酉
第10步（85-94岁）：丙戌
```

### 案例3：阳年生男（顺排）

```
出生：1988年11月26日7时，男性
八字：戊辰 癸亥 乙酉 庚辰
日主：乙木
年份：戊辰年（阳年）
性别：男
排列：顺排

起运：3岁7月20天（1992年7月16日）

大运排列：
第1步（1-4岁）：起运前
第2步（5-14岁）：甲子
第3步（15-24岁）：乙丑
第4步（25-34岁）：丙寅
第5步（35-44岁）：丁卯
第6步（45-54岁）：戊辰
第7步（55-64岁）：己巳
第8步（65-74岁）：庚午
第9步（75-84岁）：辛未
第10步（85-94岁）：壬申
```

---

## 🔧 集成到LSSPP系统

### 在DivinationResponse中添加大运

```java
public class DivinationResponse {
    // ... 现有字段 ...

    // 大运分析
    private List<DayunInfo> dayunList;
    private Integer qiyunAge;  // 起运年龄
    private String qiyunDate;  // 起运日期
    private Boolean isForward; // 是否顺排

    // Getters and Setters
}

public class DayunInfo {
    private String ganZhi;      // 大运干支
    private Integer startAge;   // 起始年龄
    private Integer endAge;     // 结束年龄
    private Integer startYear;  // 起始年份
    private Integer endYear;    // 结束年份
    private String nayin;       // 纳音
    private String shishen;     // 十神
    private String wuxing;      // 五行
    private String analysis;    // 分析说明
    private String luck;        // 吉凶 (good/average/bad)
}
```

### Node.js实现示例

```javascript
// 在production-api-server-fixed.js中添加
function calculateDayunInfo(lunar, gender) {
  const eightChar = lunar.getEightChar();
  const yun = eightChar.getYun(gender === 'MALE' ? 1 : 0);
  const daYunList = yun.getDaYun(10);

  return {
    qiyunAge: yun.getStartYear(),
    qiyunMonth: yun.getStartMonth(),
    qiyunDay: yun.getStartDay(),
    isForward: yun.isForward(),
    dayunList: daYunList.map((daYun, index) => ({
      step: index + 1,
      ganZhi: daYun.getGanZhi() || '起运前',
      startAge: daYun.getStartAge(),
      endAge: daYun.getEndAge(),
      startYear: daYun.getStartYear(),
      endYear: daYun.getEndYear()
    }))
  };
}
```

---

## 📖 参考资料

### 经典著作
- 《渊海子平》- 大运理论的起源
- 《三命通会》- 大运详细论述
- 《滴天髓》- 大运与命局关系
- 《子平真诠》- 用神与大运配合

### 技术文档
- lunar-javascript: https://github.com/6tail/lunar-javascript
- API文档: https://6tail.cn/calendar/api.html

### 口诀记忆

**顺逆口诀**：
> 阳男阴女顺排走，
> 阴男阳女逆行求。
> 月柱为基起大运，
> 十年一步定乾坤。

**起运口诀**：
> 三天折一岁，
> 一天四个月。
> 节气定远近，
> 顺逆分男女。

---

## ⚠️ 注意事项

1. **节气精确性**：起运时间计算必须基于精确的节气时刻，lunar-javascript库已内置精确算法
2. **起运前**：第一步大运通常标注为"起运前"，表示尚未进入真正的大运周期
3. **大运交接**：大运交接之年（如从第2步进入第3步的那一年）称为"脱运"或"换运"，需特别注意
4. **流年配合**：大运需与流年、小运配合分析，不可单看大运吉凶

---

**最后更新**：2025-10-23
**维护团队**：LSSPP六神算派开发团队
**版本**：v1.0.0
