# SolarTermsCalendar 工具类API文档

## 概述

`SolarTermsCalendar` 是六神算派(LSSPP)项目的核心节气日历工具类,提供统一的农历阳历转换和节气计算功能,适用于八字排盘、六爻起卦、紫微斗数、占星等多种占卜应用。

**位置:** `com.lsspp.util.SolarTermsCalendar`

**依赖:** lunar-java (https://github.com/6tail/lunar-java)

**特性:**
- ✅ 公历↔农历双向转换
- ✅ 精确的立春换年计算
- ✅ 节气边界精确判断
- ✅ 六十甲子干支计算
- ✅ 二十四节气查询
- ✅ 季节判断

---

## 快速开始

### 1. 计算完整四柱(最常用)

```java
import com.lsspp.util.SolarTermsCalendar;
import com.lsspp.util.SolarTermsCalendar.FourPillars;
import java.time.LocalDateTime;

// 公历时间
LocalDateTime dateTime = LocalDateTime.of(1978, 2, 5, 15, 52);

// 计算四柱
FourPillars fourPillars = SolarTermsCalendar.calculateFourPillars(dateTime);

// 输出结果
System.out.println("八字: " + fourPillars.getBaziString());
// 输出: 八字: 戊午 甲寅 戊戌 庚申

System.out.println("年柱: " + fourPillars.getYearPillar());
System.out.println("月柱: " + fourPillars.getMonthPillar());
System.out.println("日柱: " + fourPillars.getDayPillar());
System.out.println("时柱: " + hourPillars.getHourPillar());
System.out.println("季节: " + fourPillars.getSeason());
```

### 2. 从农历计算四柱

```java
// 农历2016年11月12日10时
FourPillars fourPillars = SolarTermsCalendar.calculateFourPillarsFromLunar(
    2016,  // 农历年
    11,    // 农历月
    12,    // 农历日
    10,    // 时
    0      // 分
);

System.out.println("八字: " + fourPillars.getBaziString());
System.out.println("公历: " + fourPillars.getSolarDateTime());
System.out.println("农历: " + fourPillars.getLunarDate());
```

### 3. 公历农历互转

```java
// 公历转农历
LocalDateTime solar = LocalDateTime.of(2016, 12, 10, 10, 0);
LunarDate lunar = SolarTermsCalendar.solarToLunar(solar);
System.out.println("农历: " + lunar); // 农历: 二〇一六年冬月十二

// 农历转公历
LocalDateTime converted = SolarTermsCalendar.lunarToSolar(2016, 11, 12, 10, 0);
System.out.println("公历: " + converted); // 公历: 2016-12-10T10:00
```

---

## 核心数据模型

### 1. FourPillars (四柱信息)

完整的四柱八字信息,包含年月日时四柱及相关数据。

```java
public class FourPillars {
    private GanZhiPillar yearPillar;   // 年柱
    private GanZhiPillar monthPillar;  // 月柱
    private GanZhiPillar dayPillar;    // 日柱
    private GanZhiPillar hourPillar;   // 时柱
    private String season;             // 季节(春/夏/秋/冬)
    private LocalDateTime solarDateTime; // 公历日期时间
    private LunarDate lunarDate;       // 对应农历日期

    // 获取完整八字字符串
    public String getBaziString()      // 例如: "戊午 甲寅 戊戌 庚申"
}
```

**使用示例:**
```java
FourPillars pillars = SolarTermsCalendar.calculateFourPillars(dateTime);

// 获取各柱信息
String yearGan = pillars.getYearPillar().getGan();     // "戊"
String yearZhi = pillars.getYearPillar().getZhi();     // "午"
String yearWuxing = pillars.getYearPillar().getWuxing(); // "土"

// 获取完整八字
String bazi = pillars.getBaziString();  // "戊午 甲寅 戊戌 庚申"

// 获取季节
String season = pillars.getSeason();    // "春"
```

### 2. GanZhiPillar (干支柱)

单个干支柱的信息(年柱/月柱/日柱/时柱)。

```java
public class GanZhiPillar {
    private String gan;      // 天干(甲乙丙丁...)
    private String zhi;      // 地支(子丑寅卯...)
    private String wuxing;   // 五行(金木水火土)
    private String nayin;    // 纳音(海中金、炉中火...)

    @Override
    public String toString() {
        return gan + zhi;    // 例如: "戊午"
    }
}
```

**使用示例:**
```java
GanZhiPillar yearPillar = SolarTermsCalendar.calculateYearPillar(dateTime);

System.out.println("年柱: " + yearPillar);              // "戊午"
System.out.println("天干: " + yearPillar.getGan());      // "戊"
System.out.println("地支: " + yearPillar.getZhi());      // "午"
System.out.println("五行: " + yearPillar.getWuxing());   // "土"
System.out.println("纳音: " + yearPillar.getNayin());    // "天上火"
```

### 3. LunarDate (农历日期)

农历日期信息。

```java
public class LunarDate {
    private int year;              // 农历年
    private int month;             // 农历月
    private int day;               // 农历日
    private boolean leapMonth;     // 是否闰月
    private String yearInChinese;  // 农历年中文
    private String monthInChinese; // 农历月中文
    private String dayInChinese;   // 农历日中文

    @Override
    public String toString() {     // 例如: "二〇一六年冬月十二"
        return String.format("%s年%s%s%s",
            yearInChinese, leapMonth ? "闰" : "", monthInChinese, dayInChinese);
    }
}
```

### 4. SolarTermInfo (节气信息)

二十四节气的详细信息。

```java
public class SolarTermInfo {
    private String name;             // 节气名称(立春、雨水...)
    private int index;               // 节气索引(0-23)
    private LocalDateTime dateTime;  // 节气时间
    private int month;               // 所属月份
    private boolean isMonthStartTerm; // 是否为月令节气
}
```

---

## API详细说明

### 一、四柱计算(核心功能)

#### 1. calculateFourPillars() - 计算完整四柱

```java
public static FourPillars calculateFourPillars(LocalDateTime dateTime)
```

**功能:** 从公历日期时间计算完整的年月日时四柱

**算法:**
- 年柱: 立春精确换年 (`getYearGanByLiChun`)
- 月柱: 节气精确边界 (`getMonthGanExact`)
- 日柱: 六十甲子轮转 (`getDayGanExact`)
- 时柱: 日上起时口诀 (`getTimeGan`)

**参数:**
- `dateTime` - 公历日期时间

**返回:** `FourPillars` 对象,包含完整四柱及相关信息

**示例:**
```java
LocalDateTime dt = LocalDateTime.of(1978, 2, 5, 15, 52);
FourPillars pillars = SolarTermsCalendar.calculateFourPillars(dt);
System.out.println(pillars.getBaziString()); // "戊午 甲寅 戊戌 庚申"
```

#### 2. calculateFourPillarsFromLunar() - 从农历计算四柱

```java
public static FourPillars calculateFourPillarsFromLunar(
    int lunarYear,
    int lunarMonth,
    int lunarDay,
    int hour,
    int minute)
```

**功能:** 从农历日期计算四柱(先转公历再计算)

**参数:**
- `lunarYear` - 农历年
- `lunarMonth` - 农历月
- `lunarDay` - 农历日
- `hour` - 时
- `minute` - 分

**返回:** `FourPillars` 对象

**示例:**
```java
// 农历2016年11月12日10时
FourPillars pillars = SolarTermsCalendar.calculateFourPillarsFromLunar(
    2016, 11, 12, 10, 0);
```

### 二、单柱计算

#### 1. calculateYearPillar() - 计算年柱

```java
public static GanZhiPillar calculateYearPillar(LocalDateTime dateTime)
```

**功能:** 立春精确换年的年柱计算

**算法依据:** 《三命通会》"立春换年柱"原则

**示例:**
```java
GanZhiPillar yearPillar = SolarTermsCalendar.calculateYearPillar(dateTime);
System.out.println("年柱: " + yearPillar); // "戊午"
```

#### 2. calculateMonthPillar() - 计算月柱

```java
public static GanZhiPillar calculateMonthPillar(LocalDateTime dateTime)
```

**功能:** 节气精确边界的月柱计算

**算法依据:** 《渊海子平》"月以节为界"原则

#### 3. calculateDayPillar() - 计算日柱

```java
public static GanZhiPillar calculateDayPillar(LocalDateTime dateTime)
```

**功能:** 六十甲子轮转的日柱计算

#### 4. calculateHourPillar() - 计算时柱

```java
public static GanZhiPillar calculateHourPillar(LocalDateTime dateTime)
```

**功能:** 日上起时口诀的时柱计算

**口诀:**
```
甲己还加甲,乙庚丙作初
丙辛从戊起,丁壬庚子居
戊癸何方发,壬子是真途
```

### 三、农历公历转换

#### 1. solarToLunar() - 公历转农历

```java
public static LunarDate solarToLunar(LocalDateTime dateTime)
```

**功能:** 将公历日期转换为农历日期

**参数:** `dateTime` - 公历日期时间

**返回:** `LunarDate` 对象

**示例:**
```java
LocalDateTime solar = LocalDateTime.of(2016, 12, 10, 10, 0);
LunarDate lunar = SolarTermsCalendar.solarToLunar(solar);
System.out.println(lunar);  // "二〇一六年冬月十二"
```

#### 2. lunarToSolar() - 农历转公历

```java
public static LocalDateTime lunarToSolar(
    int lunarYear,
    int lunarMonth,
    int lunarDay,
    int hour,
    int minute)
```

**功能:** 将农历日期转换为公历日期

**参数:**
- `lunarYear` - 农历年
- `lunarMonth` - 农历月
- `lunarDay` - 农历日
- `hour` - 时
- `minute` - 分

**返回:** 公历 `LocalDateTime`

**示例:**
```java
LocalDateTime solar = SolarTermsCalendar.lunarToSolar(2016, 11, 12, 10, 0);
System.out.println(solar); // "2016-12-10T10:00"
```

### 四、节气查询

#### 1. getSolarTermsOfYear() - 获取年度节气列表

```java
public static List<SolarTermInfo> getSolarTermsOfYear(int year)
```

**功能:** 获取指定年份的24个节气信息

**参数:** `year` - 公历年份

**返回:** 24个节气的列表

**示例:**
```java
List<SolarTermInfo> terms = SolarTermsCalendar.getSolarTermsOfYear(2024);
for (SolarTermInfo term : terms) {
    System.out.println(term.getName() + ": 第" + term.getMonth() + "月");
}
```

#### 2. getCurrentSolarTerm() - 获取当前节气

```java
public static SolarTermInfo getCurrentSolarTerm(LocalDateTime dateTime)
```

**功能:** 获取指定日期所处的节气

**参数:** `dateTime` - 公历日期时间

**返回:** 当前节气信息

**示例:**
```java
LocalDateTime dt = LocalDateTime.of(2024, 2, 10, 12, 0);
SolarTermInfo term = SolarTermsCalendar.getCurrentSolarTerm(dt);
System.out.println("当前节气: " + term.getName());
```

#### 3. isBeforeLichun() - 判断是否在立春前

```java
public static boolean isBeforeLichun(LocalDateTime dateTime)
```

**功能:** 判断指定日期是否在立春之前

**参数:** `dateTime` - 公历日期时间

**返回:** `true`表示立春前, `false`表示立春后

**用途:** 验证年柱是否需要按立春换年

**示例:**
```java
LocalDateTime dt1 = LocalDateTime.of(2024, 1, 15, 12, 0);
LocalDateTime dt2 = LocalDateTime.of(2024, 3, 15, 12, 0);

boolean before1 = SolarTermsCalendar.isBeforeLichun(dt1); // true
boolean before2 = SolarTermsCalendar.isBeforeLichun(dt2); // false
```

### 五、辅助工具方法

#### 1. getSeason() - 获取季节

```java
public static String getSeason(String monthZhi)
```

**功能:** 根据月支判断季节

**参数:** `monthZhi` - 月支(寅卯辰巳午未申酉戌亥子丑)

**返回:** 季节(春/夏/秋/冬)

**对照表:**
- 春: 寅卯辰(正月二月三月)
- 夏: 巳午未(四月五月六月)
- 秋: 申酉戌(七月八月九月)
- 冬: 亥子丑(十月十一月十二月)

**示例:**
```java
String season1 = SolarTermsCalendar.getSeason("寅"); // "春"
String season2 = SolarTermsCalendar.getSeason("午"); // "夏"
```

#### 2. getWuxing() - 获取天干五行

```java
public static String getWuxing(String gan)
```

**功能:** 获取天干的五行属性

**参数:** `gan` - 天干(甲乙丙丁戊己庚辛壬癸)

**返回:** 五行(金/木/水/火/土)

**对照表:**
- 木: 甲乙
- 火: 丙丁
- 土: 戊己
- 金: 庚辛
- 水: 壬癸

**示例:**
```java
String wx1 = SolarTermsCalendar.getWuxing("甲"); // "木"
String wx2 = SolarTermsCalendar.getWuxing("丙"); // "火"
```

#### 3. getWuxingByZhi() - 获取地支五行

```java
public static String getWuxingByZhi(String zhi)
```

**功能:** 获取地支的五行属性

**参数:** `zhi` - 地支(子丑寅卯辰巳午未申酉戌亥)

**返回:** 五行(金/木/水/火/土)

**对照表:**
- 木: 寅卯
- 火: 巳午
- 土: 辰戌丑未
- 金: 申酉
- 水: 亥子

#### 4. getHourZhi() - 获取时辰地支

```java
public static String getHourZhi(int hour)
```

**功能:** 根据小时数获取对应的时辰地支

**参数:** `hour` - 小时(0-23)

**返回:** 时辰地支

**时辰对照:**
```
23-01时 → 子时    01-03时 → 丑时
03-05时 → 寅时    05-07时 → 卯时
07-09时 → 辰时    09-11时 → 巳时
11-13时 → 午时    13-15时 → 未时
15-17时 → 申时    17-19时 → 酉时
19-21时 → 戌时    21-23时 → 亥时
```

**示例:**
```java
String hourZhi1 = SolarTermsCalendar.getHourZhi(9);  // "巳"
String hourZhi2 = SolarTermsCalendar.getHourZhi(15); // "申"
```

#### 5. getTianganByIndex() - 索引转天干

```java
public static String getTianganByIndex(int index)
```

**功能:** 根据索引获取天干

**参数:** `index` - 索引(0-9,支持大于9会自动取模)

**返回:** 天干

#### 6. getDizhiByIndex() - 索引转地支

```java
public static String getDizhiByIndex(int index)
```

**功能:** 根据索引获取地支

**参数:** `index` - 索引(0-11,支持大于11会自动取模)

**返回:** 地支

---

## 格式化输出

### 1. formatFourPillars() - 格式化四柱信息

```java
public static String formatFourPillars(FourPillars fourPillars)
```

**功能:** 将四柱对象格式化为易读的字符串

**返回格式:**
```
公历: 1978-02-05T15:52
农历: 一九七七年腊廿八
八字: 戊午 甲寅 戊戌 庚申
季节: 春
```

**示例:**
```java
FourPillars pillars = SolarTermsCalendar.calculateFourPillars(dateTime);
String formatted = SolarTermsCalendar.formatFourPillars(pillars);
System.out.println(formatted);
```

### 2. formatPillar() - 格式化单柱信息

```java
public static String formatPillar(GanZhiPillar pillar)
```

**功能:** 格式化单个干支柱的详细信息

**返回格式:** `戊午(土, 天上火)`

**示例:**
```java
GanZhiPillar pillar = SolarTermsCalendar.calculateYearPillar(dateTime);
String formatted = SolarTermsCalendar.formatPillar(pillar);
System.out.println(formatted); // "戊午(土, 天上火)"
```

---

## 应用场景示例

### 场景1: 八字排盘

```java
public class BaziCalculator {

    public BaziResult calculate(LocalDateTime birthDateTime) {
        // 使用工具类计算四柱
        FourPillars pillars = SolarTermsCalendar.calculateFourPillars(birthDateTime);

        // 提取日主
        String dayMaster = pillars.getDayPillar().getGan();

        // 分析五行
        Map<String, Integer> wuxingCount = new HashMap<>();
        countWuxing(pillars.getYearPillar(), wuxingCount);
        countWuxing(pillars.getMonthPillar(), wuxingCount);
        countWuxing(pillars.getDayPillar(), wuxingCount);
        countWuxing(pillars.getHourPillar(), wuxingCount);

        // 判断用神(简化版)
        String yongshen = analyzeYongshen(dayMaster, pillars.getSeason(), wuxingCount);

        return new BaziResult(pillars, dayMaster, wuxingCount, yongshen);
    }
}
```

### 场景2: 六爻起卦(时间起卦)

```java
public class LiuyaoTimeMethod {

    public Hexagram generate(LocalDateTime questionTime) {
        // 计算四柱获取干支
        FourPillars pillars = SolarTermsCalendar.calculateFourPillars(questionTime);

        // 提取年月日时的地支数值
        int yearNum = getZhiIndex(pillars.getYearPillar().getZhi());
        int monthNum = getZhiIndex(pillars.getMonthPillar().getZhi());
        int dayNum = getZhiIndex(pillars.getDayPillar().getZhi());
        int hourNum = getZhiIndex(pillars.getHourPillar().getZhi());

        // 起上卦和下卦
        int upperGua = (yearNum + monthNum + dayNum) % 8;
        int lowerGua = (yearNum + monthNum + dayNum + hourNum) % 8;
        int changingLine = (yearNum + monthNum + dayNum + hourNum) % 6;

        return new Hexagram(upperGua, lowerGua, changingLine);
    }
}
```

### 场景3: 紫微斗数(农历输入)

```java
public class ZiweiCalculator {

    public ZiweiResult calculate(int lunarYear, int lunarMonth, int lunarDay, int hour) {
        // 从农历计算四柱
        FourPillars pillars = SolarTermsCalendar.calculateFourPillarsFromLunar(
            lunarYear, lunarMonth, lunarDay, hour, 0);

        // 提取年干支用于定命盘
        String yearGan = pillars.getYearPillar().getGan();
        String yearZhi = pillars.getYearPillar().getZhi();

        // 计算命宫
        int mingGongIndex = calculateMingGong(lunarMonth, hour);

        // 安星(简化版)
        List<Palace> palaces = arrangePalaces(yearGan, yearZhi, mingGongIndex);

        return new ZiweiResult(pillars, palaces);
    }
}
```

### 场景4: 择吉日历

```java
public class AuspiciousDateSelector {

    public List<LocalDateTime> findGoodDates(LocalDateTime start, LocalDateTime end) {
        List<LocalDateTime> goodDates = new ArrayList<>();

        LocalDateTime current = start;
        while (current.isBefore(end)) {
            // 计算当日四柱
            FourPillars pillars = SolarTermsCalendar.calculateFourPillars(current);

            // 判断是否为吉日(简化判断)
            if (isAuspicious(pillars)) {
                goodDates.add(current);
            }

            current = current.plusDays(1);
        }

        return goodDates;
    }

    private boolean isAuspicious(FourPillars pillars) {
        // 简化示例: 避开立春、清明等节气当日
        SolarTermInfo term = SolarTermsCalendar.getCurrentSolarTerm(
            pillars.getSolarDateTime());
        return !term.isMonthStartTerm();
    }
}
```

---

## 注意事项

### 1. 时区问题

工具类使用系统默认时区,如需处理不同时区的时间,请先转换为北京时间(UTC+8)。

```java
// 示例: 将UTC时间转换为北京时间
ZonedDateTime utc = ZonedDateTime.now(ZoneOffset.UTC);
ZonedDateTime beijing = utc.withZoneSameInstant(ZoneId.of("Asia/Shanghai"));
LocalDateTime localTime = beijing.toLocalDateTime();

FourPillars pillars = SolarTermsCalendar.calculateFourPillars(localTime);
```

### 2. 立春换年边界

立春通常在每年2月3-5日,在立春前后几小时内计算八字时要特别注意:

```java
// 立春前后对比
LocalDateTime beforeLichun = LocalDateTime.of(2024, 2, 4, 6, 0);
LocalDateTime afterLichun = LocalDateTime.of(2024, 2, 4, 18, 0);

FourPillars before = SolarTermsCalendar.calculateFourPillars(beforeLichun);
FourPillars after = SolarTermsCalendar.calculateFourPillars(afterLichun);

// 年柱和月柱可能不同
System.out.println("立春前年柱: " + before.getYearPillar()); // 可能是癸卯
System.out.println("立春后年柱: " + after.getYearPillar());  // 可能是甲辰
```

### 3. 闰月处理

农历闰月在lunar-java中用负数表示,例如闰四月=-4。工具类已自动处理,无需特殊操作。

### 4. 性能优化

批量计算时可以复用Solar/Lunar对象,但工具类已对常用场景进行优化,通常无需担心性能问题。

---

## 测试验证

工具类提供完整的单元测试覆盖:

```bash
# 运行工具类测试
mvn test -Dtest=SolarTermsCalendarTest

# 运行所有测试
mvn test
```

**测试覆盖:**
- ✅ 公历农历互转
- ✅ 完整四柱计算
- ✅ 立春换年边界
- ✅ 节气查询
- ✅ 经典案例验证

---

## 错误处理

工具类在遇到错误时会抛出 `RuntimeException`,建议在业务层进行捕获处理:

```java
try {
    FourPillars pillars = SolarTermsCalendar.calculateFourPillars(dateTime);
    // 正常处理
} catch (RuntimeException e) {
    log.error("四柱计算失败: {}", e.getMessage());
    // 返回错误提示或使用备用方案
}
```

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|-----|------|---------|
| 1.0.0 | 2025-10-10 | 初始版本,提供完整的节气日历功能 |

---

## 参考资料

### 经典文献
- 《三命通会》- 万明英 (明代)
- 《渊海子平》- 徐大升 (宋代)
- 《滴天髓》- 刘伯温 (明代)
- 《穷通宝鉴》- (清代)

### 开源库
- lunar-java: https://github.com/6tail/lunar-java
- lunar-javascript: https://github.com/6tail/lunar-javascript

---

## 联系方式

**项目:** LSSPP六神算派占卜系统

**开发团队:** LSSPP Team

**文档更新:** 2025-10-10
