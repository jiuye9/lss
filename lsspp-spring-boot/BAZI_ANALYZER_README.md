# BaziAnalyzer - 八字综合分析器

## 📚 理论来源

本分析器综合了中华传统命理学三大经典著作：

1. **《渊海子平》** (宋·徐大升)
   - 子平法理论基础
   - 十神系统（比劫、食伤、财、官杀、印）
   - 格局理论（正格八格）

2. **《三命通会》** (明·万民英)
   - 神煞系统（天乙贵人、桃花、羊刃等20种）
   - 纳音五行
   - 十二长生运程

3. **《子平真诠》** (清·沈孝瞻)
   - 用神精论
   - 调候用神（寒暖燥湿）
   - 通关用神
   - 格局真义

## 🎯 核心功能

### 1. 格局判断系统

#### 正格八格（以月令十神定格）
- **正官格** / **七杀格** - 克我者
- **正印格** / **偏印格** - 生我者
- **正财格** / **偏财格** - 我克者
- **食神格** / **伤官格** - 我生者

#### 特殊格局
- **从格**：从儿格、从财格、从杀格、从势格
- **化格**：化气格（甲己化土、乙庚化金、丙辛化水、丁壬化木、戊癸化火）
- **专旺格**：曲直格(木)、炎上格(火)、稼穑格(土)、从革格(金)、润下格(水)

**判断标准**（源自《子平真诠》）：
> "何谓格局？八字用神，专求月令"

- 月令透干，以透干十神定格
- 月令未透，取他干定格
- 日主无根，满局一气，可成从格或专旺格

### 2. 十神系统（《渊海子平》核心）

```
日主为中心，天干相见论十神：

生我者 → 印（正印、偏印/枭神）
同我者 → 比劫（比肩、劫财）
我生者 → 食伤（食神、伤官）
我克者 → 财（正财、偏财）
克我者 → 官杀（正官、七杀/偏官）

阴阳同性为"偏"，异性为"正"
```

**十神性质**：
- **比肩劫财**：兄弟朋友，竞争合作
- **食神伤官**：才华表现，泄秀智慧
- **正财偏财**：妻财物质，钱财收入
- **正官七杀**：事业名誉，管制压力
- **正印偏印**：母亲长辈，学业智慧

### 3. 神煞系统（《三命通会》记载）

#### 重要吉星
1. **天乙贵人** - 最吉之神，遇事有贵人相助
2. **天德贵人** / **月德贵人** - 福德之星，化险为夷
3. **文昌贵人** - 主聪明好学，利文途功名
4. **禄神** - 福禄之星，衣食无忧
5. **金舆** - 富贵之星，财富丰厚
6. **华盖** - 艺术之星，擅长艺术玄学
7. **驿马** - 主奔走变动，利远行迁移

#### 特殊神煞
1. **桃花**（咸池）- 异性缘佳，魅力十足
2. **红艳** - 容貌姣好，风流多情

#### 凶神
1. **羊刃** - 刚烈之神，性格刚强，易有刑伤

**查法**：
```
天乙贵人: 以日干查地支
  甲戊庚牛羊(丑未)，乙己鼠猴乡(子申)
  丙丁猪鸡位(亥酉)，壬癸兔蛇藏(卯巳)
  六辛逢虎马(寅午)，此是贵人方

文昌贵人: 以日干查地支
  甲乙巳午报君知，丙戊申宫丁己鸡
  庚猪辛鼠壬逢虎，癸人见卯入云梯

桃花: 以年支或日支查
  寅午戌见卯，申子辰见酉
  巳酉丑见午，亥卯未见子
```

### 4. 调候用神（《子平真诠》要义）

**核心原则**：
> "春木向阳，冬水喜暖，秋金遇火炼成器，夏火得水不焦枯"

**四季调候**：
- **春季** (寅卯辰)：木旺需金修剪，土培根基
- **夏季** (巳午未)：火炎需水润泽，土泄火气
- **秋季** (申酉戌)：金寒需火锻炼，水洗洁净
- **冬季** (亥子丑)：水冷需火温暖，土制水患

**调候用神选择**：
```java
寒命 → 丙丁火暖局
热命 → 壬癸水润局
燥命 → 壬癸水润泽
湿命 → 丙丁火烘干
```

### 5. 十二长生运程

```
长生 → 沐浴 → 冠带 → 临官 → 帝旺 → 衰 → 病 → 死 → 墓 → 绝 → 胎 → 养
  ↑                                                               ↓
  ←←←←←←←←←←←←←← 循环 ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

**十二状态含义**：
- **长生**：初生，开始，生机勃勃
- **沐浴**：成长，沐浴更衣，易有桃花
- **冠带**：穿衣戴帽，开始成熟
- **临官**：走上工作岗位
- **帝旺**：最旺盛，巅峰状态
- **衰**：开始衰退
- **病**：力量虚弱
- **死**：能量枯竭
- **墓**：入库收藏
- **绝**：绝境，最弱
- **胎**：怀胎，孕育新生
- **养**：养育，休养生息

## 💻 使用示例

### 1. 综合分析

```java
import com.lsspp.util.BaziAnalyzer;

public class Example {
    public static void main(String[] args) {
        // 八字: 乙丑 庚辰 丙寅 癸巳
        String[] tiangan = {"乙", "庚", "丙", "癸"};
        String[] dizhi = {"丑", "辰", "寅", "巳"};
        String gender = "MALE";

        // 综合分析
        BaziAnalyzer.ComprehensiveResult result =
            BaziAnalyzer.comprehensiveAnalysis(tiangan, dizhi, gender);

        // 输出格局
        System.out.println("格局: " + result.geju.mainGeju);
        System.out.println("用神: " + result.geju.yongshen);
        System.out.println("忌神: " + result.geju.jishen);

        // 输出神煞
        System.out.println("吉星: " + String.join(", ", result.shensha.jixing));

        // 输出调候
        System.out.println("调候: " + result.tiaohou.tiaohou);

        // 输出性格
        System.out.println("性格: " + result.xingge);
        System.out.println("事业: " + result.shiye);
        System.out.println("财运: " + result.caiyun);
    }
}
```

### 2. 单独功能调用

#### 十神计算
```java
String rizhu = "丙";  // 日主
String target = "壬"; // 目标天干

String shishen = BaziAnalyzer.getShishen(rizhu, target);
System.out.println(shishen);  // 输出: 七杀
```

#### 格局判断
```java
String[] tiangan = {"甲", "辛", "丙", "癸"};
String[] dizhi = {"子", "亥", "午", "巳"};

BaziAnalyzer.GeJuResult geju = BaziAnalyzer.analyzeGeju(tiangan, dizhi);
System.out.println(geju.mainGeju);  // 输出格局名称
```

#### 神煞分析
```java
String[] tiangan = {"甲", "丙", "庚", "壬"};
String[] dizhi = {"子", "寅", "丑", "午"};

BaziAnalyzer.ShenshaResult shensha = BaziAnalyzer.analyzeShensha(tiangan, dizhi);
shensha.jixing.forEach(System.out::println);  // 输出吉星列表
```

#### 调候分析
```java
String[] tiangan = {"乙", "己", "丙", "庚"};
String[] dizhi = {"丑", "丑", "午", "子"};

BaziAnalyzer.TiaohouResult tiaohou = BaziAnalyzer.analyzeTiaohou(tiangan, dizhi);
System.out.println(tiaohou.climate);   // 气候: 寒
System.out.println(tiaohou.tiaohou);   // 调候用神: 丙丁火
```

## 📊 分析结果结构

### ComprehensiveResult（综合分析结果）
```java
public class ComprehensiveResult {
    public GeJuResult geju;              // 格局分析
    public ShenshaResult shensha;        // 神煞分析
    public TiaohouResult tiaohou;        // 调候分析
    public Map<String, String> shishenMap; // 十神分布
    public String xingge;                // 性格分析
    public String shiye;                 // 事业分析
    public String caiyun;                // 财运分析
    public String hunyin;                // 婚姻分析
    public String jiankang;              // 健康分析
    public List<String> suggestions;     // 生活建议
}
```

### GeJuResult（格局结果）
```java
public class GeJuResult {
    public String mainGeju;        // 主格局名称
    public String subGeju;         // 子格局
    public boolean isZhengge;      // 是否正格
    public boolean isCongge;       // 是否从格
    public boolean isHuage;        // 是否化格
    public boolean isZhuanwang;    // 是否专旺格
    public String yongshen;        // 用神
    public String xishen;          // 喜神
    public String jishen;          // 忌神
    public List<String> analysis;  // 详细分析
    public int strength;           // 格局强度(1-10)
}
```

### ShenshaResult（神煞结果）
```java
public class ShenshaResult {
    public List<String> jixing;           // 吉星列表
    public List<String> xiongshen;        // 凶神列表
    public Map<String, String> meaning;   // 神煞含义
    public List<String> analysis;         // 分析说明
}
```

## 🧪 测试案例

项目包含完整的测试用例，位于：
```
src/test/java/com/lsspp/util/BaziAnalyzerTest.java
```

运行测试：
```bash
# 运行所有测试
mvn test -Dtest=BaziAnalyzerTest

# 运行单个测试
mvn test -Dtest=BaziAnalyzerTest#testComprehensiveAnalysis
mvn test -Dtest=BaziAnalyzerTest#testShishen
mvn test -Dtest=BaziAnalyzerTest#testGeju
mvn test -Dtest=BaziAnalyzerTest#testShensha
mvn test -Dtest=BaziAnalyzerTest#testTiaohou
```

### 测试输出示例

```
【格局分析】
日主: 丙 (火)
月令: 辰 (土)
月令透干: 乙
月令十神: 正印
格局类型: 正格
格局名称: 正印格
用神: 官杀、比劫
忌神: 财

【神煞分析】
吉星: 红艳, 华盖, 禄神
华盖: 艺术之星，主聪明好学，擅长艺术玄学
禄神: 福禄之星，主衣食无忧，事业顺遂

【调候分析】
日主: 丙 (火)
月令: 辰 (温)
调候用神: 随格局而定

【性格】
性格特征：热情开朗，富有激情，善于表达，但有时急躁冲动。
```

## 🔧 集成到服务层

可以在DivinationService中集成BaziAnalyzer：

```java
import com.lsspp.util.BaziAnalyzer;

@Service
public class DivinationService {

    public DivinationResponse calculateBazi(DivinationRequest request) {
        // ... 现有八字计算逻辑 ...

        // 添加经典命理分析
        String[] tiangan = {年干, 月干, 日干, 时干};
        String[] dizhi = {年支, 月支, 日支, 时支};

        BaziAnalyzer.ComprehensiveResult analysis =
            BaziAnalyzer.comprehensiveAnalysis(tiangan, dizhi, request.getGender());

        // 将分析结果添加到响应中
        response.setGeju(analysis.geju);
        response.setShensha(analysis.shensha);
        response.setXinggeAnalysis(analysis.xingge);
        // ... 其他字段 ...

        return response;
    }
}
```

## 📖 扩展说明

### 1. 格局强度评分

当前实现了简化的强度评分（1-10分），可以根据以下因素细化：
- 月令透干清纯度
- 格局是否成立（有无破格）
- 用神是否得力
- 大运是否顺格局

### 2. 神煞扩展

当前实现了10种常用神煞，《三命通会》记载超过100种，可继续扩展：
- 将星、攀鞍、劫煞
- 孤辰、寡宿
- 阴阳差错
- 等等...

### 3. 十二长生完整表

当前提供了基础方法，可以扩展：
- 阳干顺行，阴干逆行
- 各干支的十二长生完整映射表
- 长生在各宫位的意义

### 4. 大运流年分析

可以扩展加入：
- 大运起运时间计算
- 流年吉凶判断
- 大运流年与命局的生克关系
- 喜用忌仇神的流年表现

## 🎓 学习资源

- 《渊海子平》- 子平命理入门必读
- 《三命通会》- 神煞系统百科全书
- 《子平真诠》- 用神理论巅峰之作
- 《滴天髓》- 命理哲学高度总结
- 《穷通宝鉴》- 调候用神详论

## ⚠️ 使用说明

1. 本分析器基于传统命理学理论，仅供学习研究使用
2. 算法综合了经典著作理论，但具体应用需要结合实际命局灵活分析
3. 命理学是概率性的统计学，不能作为绝对的预测依据
4. 建议结合多种分析方法，综合判断

## 📝 版本历史

- **v1.0.0** (2025-10-22)
  - 初始版本
  - 实现格局判断（正格、从格、化格、专旺格）
  - 实现十神系统
  - 实现神煞系统（10种）
  - 实现调候用神
  - 实现十二长生基础
  - 综合性格、事业、财运、婚姻、健康分析

## 🤝 贡献

欢迎提交Issue和Pull Request来完善算法和功能！

## 📄 许可

本项目遵循项目整体许可协议。
