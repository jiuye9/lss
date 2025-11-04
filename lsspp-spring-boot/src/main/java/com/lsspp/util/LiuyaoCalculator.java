package com.lsspp.util;

import com.lsspp.util.SolarTermsCalendar.FourPillars;
import com.lsspp.util.SolarTermsCalendar.LunarDate;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 六爻起卦工具类
 * 基于《梅花易数》、《增删卜易》、《卜筮正宗》经典理论
 *
 * 功能特性:
 * 1. 时间起卦法(梅花易数农历时间法)
 * 2. 数字起卦法
 * 3. 指定卦起卦法
 * 4. 纳甲装卦
 * 5. 六亲配置
 * 6. 六神配置
 * 7. 世应定位
 *
 * @author LSSPP Team
 * @version 1.0.0
 * @since 2025-10-10
 */
@Slf4j
public class LiuyaoCalculator {

    // ==================== 常量定义 ====================

    /**
     * 八卦数值对应(1-8)
     * 《梅花易数》标准:
     * 1=乾(天) 2=兑(泽) 3=离(火) 4=震(雷)
     * 5=巽(风) 6=坎(水) 7=艮(山) 8=坤(地)
     */
    private static final Map<Integer, String> BAGUA_MAP = new HashMap<>() {{
        put(1, "乾"); put(2, "兑"); put(3, "离"); put(4, "震");
        put(5, "巽"); put(6, "坎"); put(7, "艮"); put(8, "坤");
    }};

    /**
     * 八卦名称到数值的反向映射
     */
    private static final Map<String, Integer> BAGUA_REVERSE = new HashMap<>() {{
        put("乾", 1); put("兑", 2); put("离", 3); put("震", 4);
        put("巽", 5); put("坎", 6); put("艮", 7); put("坤", 8);
    }};

    /**
     * 地支数值对应
     */
    private static final Map<String, Integer> DIZHI_VALUES = new HashMap<>() {{
        put("子", 1); put("丑", 2); put("寅", 3); put("卯", 4);
        put("辰", 5); put("巳", 6); put("午", 7); put("未", 8);
        put("申", 9); put("酉", 10); put("戌", 11); put("亥", 12);
    }};

    /**
     * 六十四卦名称表
     * key格式: "上卦数下卦数" (如"11"表示乾上乾下)
     */
    private static final Map<String, String> LIUSHISI_GUA = new HashMap<>() {{
        put("11", "乾为天"); put("12", "天泽履"); put("13", "天火同人"); put("14", "天雷无妄");
        put("15", "天风姤"); put("16", "天水讼"); put("17", "天山遁"); put("18", "天地否");
        put("21", "泽天夬"); put("22", "兑为泽"); put("23", "泽火革"); put("24", "泽雷随");
        put("25", "泽风大过"); put("26", "泽水困"); put("27", "泽山咸"); put("28", "泽地萃");
        put("31", "火天大有"); put("32", "火泽睽"); put("33", "离为火"); put("34", "火雷噬嗑");
        put("35", "火风鼎"); put("36", "火水未济"); put("37", "火山旅"); put("38", "火地晋");
        put("41", "雷天大壮"); put("42", "雷泽归妹"); put("43", "雷火丰"); put("44", "震为雷");
        put("45", "雷风恒"); put("46", "雷水解"); put("47", "雷山小过"); put("48", "雷地豫");
        put("51", "风天小畜"); put("52", "风泽中孚"); put("53", "风火家人"); put("54", "风雷益");
        put("55", "巽为风"); put("56", "风水涣"); put("57", "风山渐"); put("58", "风地观");
        put("61", "水天需"); put("62", "水泽节"); put("63", "水火既济"); put("64", "水雷屯");
        put("65", "水风井"); put("66", "坎为水"); put("67", "水山蹇"); put("68", "水地比");
        put("71", "山天大畜"); put("72", "山泽损"); put("73", "山火贲"); put("74", "山雷颐");
        put("75", "山风蛊"); put("76", "山水蒙"); put("77", "艮为山"); put("78", "山地剥");
        put("81", "地天泰"); put("82", "地泽临"); put("83", "地火明夷"); put("84", "地雷复");
        put("85", "地风升"); put("86", "地水师"); put("87", "地山谦"); put("88", "坤为地");
    }};

    /**
     * 八卦二进制表示(阴爻0,阳爻1)
     * 从下往上: 初爻、中爻、上爻
     */
    private static final Map<Integer, String> BAGUA_BINARY = new HashMap<>() {{
        put(1, "111"); // 乾(三阳)
        put(2, "110"); // 兑(上阳中阳下阴)
        put(3, "101"); // 离(上阳中阴下阳)
        put(4, "100"); // 震(上阳中阴下阴)
        put(5, "011"); // 巽(上阴中阳下阳)
        put(6, "010"); // 坎(上阴中阳下阴)
        put(7, "001"); // 艮(上阴中阴下阳)
        put(8, "000"); // 坤(三阴)
    }};

    /**
     * 六神配置
     */
    private static final String[] LIUSHEN = {"青龙", "朱雀", "勾陈", "腾蛇", "白虎", "玄武"};

    /**
     * 六亲名称
     */
    private static final String[] LIUQIN = {"兄弟", "子孙", "妻财", "官鬼", "父母"};

    /**
     * 八宫卦世应定位表
     * 基于《卜筮正宗》八宫卦序理论
     * key: 卦名, value: [世爻位置, 应爻位置, 宫位名称]
     */
    private static final Map<String, int[]> BAGONG_SHIYING = new HashMap<>() {{
        // 乾宫八卦
        put("乾为天", new int[]{6, 3, 1}); // 本宫卦,世在上爻
        put("天风姤", new int[]{1, 4, 1}); // 一世卦,世在初爻
        put("天山遁", new int[]{2, 5, 1}); // 二世卦,世在二爻
        put("天地否", new int[]{3, 6, 1}); // 三世卦,世在三爻
        put("风地观", new int[]{4, 1, 1}); // 四世卦,世在四爻
        put("山地剥", new int[]{5, 2, 1}); // 五世卦,世在五爻
        put("火地晋", new int[]{4, 1, 1}); // 游魂卦,世在四爻
        put("火天大有", new int[]{3, 6, 1}); // 归魂卦,世在三爻

        // 兑宫八卦
        put("兑为泽", new int[]{6, 3, 2});
        put("泽水困", new int[]{1, 4, 2});
        put("泽地萃", new int[]{2, 5, 2});
        put("泽山咸", new int[]{3, 6, 2});
        put("水山蹇", new int[]{4, 1, 2});
        put("地山谦", new int[]{5, 2, 2});
        put("雷山小过", new int[]{4, 1, 2});
        put("雷泽归妹", new int[]{3, 6, 2});

        // 离宫八卦
        put("离为火", new int[]{6, 3, 3});
        put("火山旅", new int[]{1, 4, 3});
        put("火风鼎", new int[]{2, 5, 3});
        put("火水未济", new int[]{3, 6, 3});
        put("山水蒙", new int[]{4, 1, 3});
        put("风水涣", new int[]{5, 2, 3});
        put("天水讼", new int[]{4, 1, 3});
        put("天火同人", new int[]{3, 6, 3});

        // 震宫八卦
        put("震为雷", new int[]{6, 3, 4});
        put("雷地豫", new int[]{1, 4, 4});
        put("雷水解", new int[]{2, 5, 4});
        put("雷风恒", new int[]{3, 6, 4});
        put("地风升", new int[]{4, 1, 4});
        put("水风井", new int[]{5, 2, 4});
        put("泽风大过", new int[]{4, 1, 4});
        put("泽雷随", new int[]{3, 6, 4});

        // 巽宫八卦
        put("巽为风", new int[]{6, 3, 5});
        put("风天小畜", new int[]{1, 4, 5});
        put("风火家人", new int[]{2, 5, 5});
        put("风雷益", new int[]{3, 6, 5});
        put("天雷无妄", new int[]{4, 1, 5});
        put("火雷噬嗑", new int[]{5, 2, 5});
        put("山雷颐", new int[]{4, 1, 5});
        put("山风蛊", new int[]{3, 6, 5});

        // 坎宫八卦
        put("坎为水", new int[]{6, 3, 6});
        put("水泽节", new int[]{1, 4, 6});
        put("水雷屯", new int[]{2, 5, 6});
        put("水火既济", new int[]{3, 6, 6});
        put("泽火革", new int[]{4, 1, 6});
        put("雷火丰", new int[]{5, 2, 6});
        put("地火明夷", new int[]{4, 1, 6});
        put("地水师", new int[]{3, 6, 6});

        // 艮宫八卦
        put("艮为山", new int[]{6, 3, 7});
        put("山火贲", new int[]{1, 4, 7});
        put("山天大畜", new int[]{2, 5, 7});
        put("山泽损", new int[]{3, 6, 7});
        put("火泽睽", new int[]{4, 1, 7});
        put("天泽履", new int[]{5, 2, 7});
        put("风泽中孚", new int[]{4, 1, 7});
        put("风山渐", new int[]{3, 6, 7});

        // 坤宫八卦
        put("坤为地", new int[]{6, 3, 8});
        put("地雷复", new int[]{1, 4, 8});
        put("地泽临", new int[]{2, 5, 8});
        put("地天泰", new int[]{3, 6, 8});
        put("雷天大壮", new int[]{4, 1, 8});
        put("泽天夬", new int[]{5, 2, 8});
        put("水天需", new int[]{4, 1, 8});
        put("水地比", new int[]{3, 6, 8});
    }};

    /**
     * 八卦五行属性
     */
    private static final Map<String, String> BAGUA_WUXING = new HashMap<>() {{
        put("乾", "金"); put("兑", "金");
        put("离", "火"); put("震", "木");
        put("巽", "木"); put("坎", "水");
        put("艮", "土"); put("坤", "土");
    }};

    /**
     * 纳甲装卦表 - 六爻纳地支
     * 基于《增删卜易》纳甲理论
     * key: 卦名(八卦), value: [初爻地支, 二爻地支, 三爻地支, 四爻地支, 五爻地支, 上爻地支]
     */
    private static final Map<String, String[]> NAJIA_DIZHI = new HashMap<>() {{
        // 乾纳甲壬,兑纳丁己
        put("乾", new String[]{"子", "寅", "辰", "午", "申", "戌"});
        put("兑", new String[]{"巳", "卯", "丑", "亥", "酉", "未"});
        // 离纳己,震纳庚
        put("离", new String[]{"卯", "丑", "亥", "酉", "未", "巳"});
        put("震", new String[]{"子", "寅", "辰", "午", "申", "戌"});
        // 巽纳辛,坎纳戊
        put("巽", new String[]{"丑", "亥", "酉", "未", "巳", "卯"});
        put("坎", new String[]{"寅", "辰", "午", "申", "戌", "子"});
        // 艮纳丙,坤纳乙癸
        put("艮", new String[]{"辰", "午", "申", "戌", "子", "寅"});
        put("坤", new String[]{"未", "巳", "卯", "丑", "亥", "酉"});
    }};

    /**
     * 地支五行属性
     */
    private static final Map<String, String> DIZHI_WUXING = new HashMap<>() {{
        put("子", "水"); put("丑", "土"); put("寅", "木"); put("卯", "木");
        put("辰", "土"); put("巳", "火"); put("午", "火"); put("未", "土");
        put("申", "金"); put("酉", "金"); put("戌", "土"); put("亥", "水");
    }};

    /**
     * 天干五行属性
     */
    private static final Map<String, String> TIANGAN_WUXING = new HashMap<>() {{
        put("甲", "木"); put("乙", "木");
        put("丙", "火"); put("丁", "火");
        put("戊", "土"); put("己", "土");
        put("庚", "金"); put("辛", "金");
        put("壬", "水"); put("癸", "水");
    }};

    // ==================== 数据模型 ====================

    /**
     * 六爻卦象结果
     */
    @Data
    @Builder
    public static class LiuyaoResult {
        /** 本卦名称 */
        private String originalHexagramName;
        /** 本卦爻辞(6个,从下往上) */
        private List<String> originalLines;
        /** 本卦解释 */
        private String originalInterpretation;

        /** 变卦名称 */
        private String changedHexagramName;
        /** 变卦爻辞 */
        private List<String> changedLines;
        /** 变卦解释 */
        private String changedInterpretation;

        /** 动爻位置(1-6) */
        private int changingLine;
        /** 世爻位置(1-6) */
        private int worldLine;
        /** 应爻位置(1-6) */
        private int responseLine;

        /** 主卦六亲配置(6个) */
        private List<String> sixRelatives;
        /** 六神配置(6个,主卦和变卦共用) */
        private List<String> sixAnimals;
        /** 主卦五行配置(6个) */
        private List<String> elements;
        /** 主卦纳甲地支(6个) */
        private List<String> najiaDizhi;

        /** 变卦六亲配置(6个) */
        private List<String> changedSixRelatives;
        /** 变卦五行配置(6个) */
        private List<String> changedElements;
        /** 变卦纳甲地支(6个) */
        private List<String> changedNajiaDizhi;

        /** 计算过程说明 */
        private String calculation;
        /** 占卜预测 */
        private String prediction;
    }

    // ==================== 核心起卦方法 ====================

    /**
     * 时间起卦法(梅花易数农历时间法)
     *
     * 算法:
     * 1. 年支取数(地支数值)
     * 2. 月日数 = 农历月 + 农历日
     * 3. 时支取数(地支数值)
     * 4. 上卦 = (年支数 + 月日数) % 8
     * 5. 下卦 = (年支数 + 月日数 + 时支数) % 8
     * 6. 动爻 = (年支数 + 月日数 + 时支数) % 6
     *
     * @param dateTime 公历日期时间
     * @return 六爻卦象结果
     */
    public static LiuyaoResult timeQigua(LocalDateTime dateTime) {
        log.info("🔮 时间起卦: {}", dateTime);

        StringBuilder calc = new StringBuilder();
        calc.append("=== 梅花易数时间起卦法 ===\n");
        calc.append(String.format("公历: %s\n", dateTime));

        try {
            // 1. 转换为农历,获取干支
            FourPillars pillars = SolarTermsCalendar.calculateFourPillars(dateTime);
            LunarDate lunar = pillars.getLunarDate();

            String yearZhi = pillars.getYearPillar().getZhi();
            String timeZhi = pillars.getHourPillar().getZhi();

            calc.append(String.format("农历: %d年%d月%d日\n",
                lunar.getYear(), lunar.getMonth(), lunar.getDay()));
            calc.append(String.format("干支: %s年 %s时\n", yearZhi, timeZhi));

            // 2. 年支取数
            int yearNum = DIZHI_VALUES.get(yearZhi);
            calc.append(String.format("年支%s取%d数\n", yearZhi, yearNum));

            // 3. 月日数
            int monthDayNum = lunar.getMonth() + lunar.getDay();
            calc.append(String.format("月日数: %d+%d=%d\n",
                lunar.getMonth(), lunar.getDay(), monthDayNum));

            // 4. 时支取数
            int hourNum = DIZHI_VALUES.get(timeZhi);
            calc.append(String.format("时支%s取%d数\n", timeZhi, hourNum));

            // 5. 计算上卦
            int totalYearMonthDay = yearNum + monthDayNum;
            int shangGuaNum = totalYearMonthDay % 8;
            if (shangGuaNum == 0) shangGuaNum = 8;
            String shangGua = BAGUA_MAP.get(shangGuaNum);

            calc.append(String.format("\n上卦: (%d+%d)=%d, %d÷8余%d → %s\n",
                yearNum, monthDayNum, totalYearMonthDay,
                totalYearMonthDay, shangGuaNum, shangGua));

            // 6. 计算下卦
            int totalAll = totalYearMonthDay + hourNum;
            int xiaGuaNum = totalAll % 8;
            if (xiaGuaNum == 0) xiaGuaNum = 8;
            String xiaGua = BAGUA_MAP.get(xiaGuaNum);

            calc.append(String.format("下卦: (%d+%d)=%d, %d÷8余%d → %s\n",
                totalYearMonthDay, hourNum, totalAll,
                totalAll, xiaGuaNum, xiaGua));

            // 7. 计算动爻
            int dongYao = totalAll % 6;
            if (dongYao == 0) dongYao = 6;

            calc.append(String.format("动爻: %d÷6余%d → 第%d爻动\n",
                totalAll, dongYao, dongYao));

            // 8. 获取日干用于六神配置
            String dayGan = pillars.getDayPillar().getGan();

            // 9. 生成完整卦象
            LiuyaoResult result = generateCompleteGua(shangGuaNum, xiaGuaNum, dongYao, dayGan);
            result.setCalculation(calc.toString());

            log.info("✅ 时间起卦完成: {}之{}", result.getOriginalHexagramName(),
                result.getChangedHexagramName());

            return result;

        } catch (Exception e) {
            log.error("❌ 时间起卦失败", e);
            throw new RuntimeException("时间起卦失败: " + e.getMessage(), e);
        }
    }

    /**
     * 数字起卦法
     *
     * 算法:
     * 1. 上卦 = 第一个数字 % 8
     * 2. 下卦 = 第二个数字 % 8
     * 3. 动爻 = (第一个数字 + 第二个数字) % 6
     *
     * @param num1 第一个数字
     * @param num2 第二个数字
     * @return 六爻卦象结果
     */
    public static LiuyaoResult numberQigua(int num1, int num2) {
        log.info("🔮 数字起卦: {}, {}", num1, num2);

        StringBuilder calc = new StringBuilder();
        calc.append("=== 数字起卦法 ===\n");
        calc.append(String.format("输入数字: %d, %d\n", num1, num2));

        try {
            // 1. 上卦计算
            int shangGuaNum = num1 % 8;
            if (shangGuaNum == 0) shangGuaNum = 8;
            String shangGua = BAGUA_MAP.get(shangGuaNum);

            calc.append(String.format("上卦: %d÷8余%d → %s\n", num1, shangGuaNum, shangGua));

            // 2. 下卦计算
            int xiaGuaNum = num2 % 8;
            if (xiaGuaNum == 0) xiaGuaNum = 8;
            String xiaGua = BAGUA_MAP.get(xiaGuaNum);

            calc.append(String.format("下卦: %d÷8余%d → %s\n", num2, xiaGuaNum, xiaGua));

            // 3. 动爻计算
            int total = num1 + num2;
            int dongYao = total % 6;
            if (dongYao == 0) dongYao = 6;

            calc.append(String.format("动爻: (%d+%d)=%d, %d÷6余%d → 第%d爻动\n",
                num1, num2, total, total, dongYao, dongYao));

            // 4. 使用当前日期的日干
            String dayGan = SolarTermsCalendar.calculateFourPillars(LocalDateTime.now())
                .getDayPillar().getGan();

            // 5. 生成完整卦象
            LiuyaoResult result = generateCompleteGua(shangGuaNum, xiaGuaNum, dongYao, dayGan);
            result.setCalculation(calc.toString());

            log.info("✅ 数字起卦完成: {}之{}", result.getOriginalHexagramName(),
                result.getChangedHexagramName());

            return result;

        } catch (Exception e) {
            log.error("❌ 数字起卦失败", e);
            throw new RuntimeException("数字起卦失败: " + e.getMessage(), e);
        }
    }

    /**
     * 指定卦起卦法
     *
     * @param shangGua 上卦名称(乾/兑/离/震/巽/坎/艮/坤)
     * @param xiaGua 下卦名称
     * @param dongYao 动爻位置(1-6)
     * @return 六爻卦象结果
     */
    public static LiuyaoResult designatedQigua(String shangGua, String xiaGua, int dongYao) {
        log.info("🔮 指定卦起卦: 上卦{}, 下卦{}, 动爻{}", shangGua, xiaGua, dongYao);

        StringBuilder calc = new StringBuilder();
        calc.append("=== 指定卦起卦法 ===\n");
        calc.append(String.format("指定上卦: %s\n", shangGua));
        calc.append(String.format("指定下卦: %s\n", xiaGua));
        calc.append(String.format("指定动爻: 第%d爻\n", dongYao));

        try {
            Integer shangGuaNum = BAGUA_REVERSE.get(shangGua);
            Integer xiaGuaNum = BAGUA_REVERSE.get(xiaGua);

            if (shangGuaNum == null || xiaGuaNum == null) {
                throw new IllegalArgumentException("无效的卦名: " + shangGua + "/" + xiaGua);
            }

            if (dongYao < 1 || dongYao > 6) {
                throw new IllegalArgumentException("动爻位置必须在1-6之间");
            }

            // 使用当前日期的日干
            String dayGan = SolarTermsCalendar.calculateFourPillars(LocalDateTime.now())
                .getDayPillar().getGan();

            LiuyaoResult result = generateCompleteGua(shangGuaNum, xiaGuaNum, dongYao, dayGan);
            result.setCalculation(calc.toString());

            log.info("✅ 指定卦起卦完成: {}之{}", result.getOriginalHexagramName(),
                result.getChangedHexagramName());

            return result;

        } catch (Exception e) {
            log.error("❌ 指定卦起卦失败", e);
            throw new RuntimeException("指定卦起卦失败: " + e.getMessage(), e);
        }
    }

    // ==================== 辅助方法 ====================

    /**
     * 生成完整卦象信息
     * @param dayGan 日干,用于确定六神起始位置
     */
    private static LiuyaoResult generateCompleteGua(int shangGuaNum, int xiaGuaNum, int dongYao, String dayGan) {
        // 1. 确定本卦
        String guaKey = String.format("%d%d", shangGuaNum, xiaGuaNum);
        String benGua = LIUSHISI_GUA.get(guaKey);

        // 2. 生成本卦爻辞
        List<String> benGuaLines = generateLines(shangGuaNum, xiaGuaNum);

        // 3. 生成变卦
        int[] bianGuaNums = calculateBianGua(shangGuaNum, xiaGuaNum, dongYao);
        String bianGuaKey = String.format("%d%d", bianGuaNums[0], bianGuaNums[1]);
        String bianGua = LIUSHISI_GUA.get(bianGuaKey);
        List<String> bianGuaLines = generateLines(bianGuaNums[0], bianGuaNums[1]);

        // 4. 使用八宫卦系统计算世应(基于《卜筮正宗》)
        int[] shiyingInfo = BAGONG_SHIYING.getOrDefault(benGua, new int[]{3, 6, 1});
        int shiYao = shiyingInfo[0];  // 世爻位置
        int yingYao = shiyingInfo[1]; // 应爻位置
        int gongWei = shiyingInfo[2]; // 宫位(1-8对应乾兑离震巽坎艮坤)

        // 5. 主卦纳甲装卦 - 获取每一爻的地支
        String shangGuaName = BAGUA_MAP.get(shangGuaNum);
        String xiaGuaName = BAGUA_MAP.get(xiaGuaNum);
        List<String> najiaDizhi = calculateNajiaDizhi(shangGuaName, xiaGuaName);

        // 6. 计算主卦每一爻的五行
        List<String> elements = new ArrayList<>();
        for (String dizhi : najiaDizhi) {
            elements.add(DIZHI_WUXING.get(dizhi));
        }

        // 7. 计算主卦六亲(基于宫位五行)
        String gongWuxing = BAGUA_WUXING.get(BAGUA_MAP.get(gongWei));
        List<String> sixRelatives = calculateLiuqin(gongWuxing, elements);

        // 8. 变卦纳甲装卦 - 重新计算变卦的纳甲地支
        String bianShangGuaName = BAGUA_MAP.get(bianGuaNums[0]);
        String bianXiaGuaName = BAGUA_MAP.get(bianGuaNums[1]);
        List<String> changedNajiaDizhi = calculateNajiaDizhi(bianShangGuaName, bianXiaGuaName);

        // 9. 计算变卦每一爻的五行
        List<String> changedElements = new ArrayList<>();
        for (String dizhi : changedNajiaDizhi) {
            changedElements.add(DIZHI_WUXING.get(dizhi));
        }

        // 10. 计算变卦六亲(变卦仍属于同一宫位,宫位五行不变)
        List<String> changedSixRelatives = calculateLiuqin(gongWuxing, changedElements);

        // 11. 计算六神(基于日干起青龙,主卦和变卦共用)
        List<String> sixAnimals = calculateLiushen(dayGan);

        // 12. 生成解释和预测
        String benGuaExplanation = getHexagramExplanation(benGua);
        String bianGuaExplanation = getHexagramExplanation(bianGua);
        String prediction = generatePrediction(benGua, bianGua, dongYao);

        return LiuyaoResult.builder()
            .originalHexagramName(benGua)
            .originalLines(benGuaLines)
            .originalInterpretation(benGuaExplanation)
            .changedHexagramName(bianGua)
            .changedLines(bianGuaLines)
            .changedInterpretation(bianGuaExplanation)
            .changingLine(dongYao)
            .worldLine(shiYao)
            .responseLine(yingYao)
            // 主卦信息
            .sixRelatives(sixRelatives)
            .sixAnimals(sixAnimals)
            .elements(elements)
            .najiaDizhi(najiaDizhi)
            // 变卦信息
            .changedSixRelatives(changedSixRelatives)
            .changedElements(changedElements)
            .changedNajiaDizhi(changedNajiaDizhi)
            .prediction(prediction)
            .build();
    }

    /**
     * 纳甲装卦 - 计算六爻地支
     */
    private static List<String> calculateNajiaDizhi(String shangGuaName, String xiaGuaName) {
        String[] xiaGuaDizhi = NAJIA_DIZHI.get(xiaGuaName);  // 下卦(初爻、二爻、三爻)
        String[] shangGuaDizhi = NAJIA_DIZHI.get(shangGuaName);  // 上卦(四爻、五爻、上爻)

        List<String> result = new ArrayList<>();
        // 下卦三爻
        result.add(xiaGuaDizhi[0]);
        result.add(xiaGuaDizhi[1]);
        result.add(xiaGuaDizhi[2]);
        // 上卦三爻
        result.add(shangGuaDizhi[3]);
        result.add(shangGuaDizhi[4]);
        result.add(shangGuaDizhi[5]);

        return result;
    }

    /**
     * 计算六亲
     * 基于宫位五行与爻位五行的生克关系
     */
    private static List<String> calculateLiuqin(String gongWuxing, List<String> yaoWuxing) {
        List<String> liuqin = new ArrayList<>();

        for (String yaoWux : yaoWuxing) {
            if (yaoWux.equals(gongWuxing)) {
                liuqin.add("兄弟");  // 比和
            } else if (isSheng(gongWuxing, yaoWux)) {
                liuqin.add("子孙");  // 我生者
            } else if (isKe(gongWuxing, yaoWux)) {
                liuqin.add("妻财");  // 我克者
            } else if (isSheng(yaoWux, gongWuxing)) {
                liuqin.add("父母");  // 生我者
            } else if (isKe(yaoWux, gongWuxing)) {
                liuqin.add("官鬼");  // 克我者
            } else {
                liuqin.add("兄弟");  // 默认
            }
        }

        return liuqin;
    }

    /**
     * 计算六神配置
     * 基于日干起青龙法则
     * 甲乙日起青龙,丙丁日起朱雀,戊日起勾陈,己日起腾蛇,庚辛日起白虎,壬癸日起玄武
     */
    private static List<String> calculateLiushen(String dayGan) {
        // 确定起始六神
        int startIndex;
        switch (dayGan) {
            case "甲": case "乙":
                startIndex = 0; // 青龙
                break;
            case "丙": case "丁":
                startIndex = 1; // 朱雀
                break;
            case "戊":
                startIndex = 2; // 勾陈
                break;
            case "己":
                startIndex = 3; // 腾蛇
                break;
            case "庚": case "辛":
                startIndex = 4; // 白虎
                break;
            case "壬": case "癸":
                startIndex = 5; // 玄武
                break;
            default:
                startIndex = 0; // 默认青龙
        }

        // 从初爻往上配置六神
        List<String> liushen = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            liushen.add(LIUSHEN[(startIndex + i) % 6]);
        }

        return liushen;
    }

    /**
     * 判断五行相生关系
     */
    private static boolean isSheng(String wuxing1, String wuxing2) {
        Map<String, String> shengMap = new HashMap<>() {{
            put("木", "火"); put("火", "土"); put("土", "金");
            put("金", "水"); put("水", "木");
        }};
        return wuxing2.equals(shengMap.get(wuxing1));
    }

    /**
     * 判断五行相克关系
     */
    private static boolean isKe(String wuxing1, String wuxing2) {
        Map<String, String> keMap = new HashMap<>() {{
            put("木", "土"); put("土", "水"); put("水", "火");
            put("火", "金"); put("金", "木");
        }};
        return wuxing2.equals(keMap.get(wuxing1));
    }

    /**
     * 生成爻辞
     */
    private static List<String> generateLines(int shangGuaNum, int xiaGuaNum) {
        String shangBinary = BAGUA_BINARY.get(shangGuaNum);
        String xiaBinary = BAGUA_BINARY.get(xiaGuaNum);

        List<String> lines = new ArrayList<>();
        // 下卦(初爻、二爻、三爻)
        for (int i = 0; i < 3; i++) {
            lines.add(xiaBinary.charAt(i) == '1' ? "——" : "○");
        }
        // 上卦(四爻、五爻、上爻)
        for (int i = 0; i < 3; i++) {
            lines.add(shangBinary.charAt(i) == '1' ? "——" : "○");
        }

        return lines;
    }

    /**
     * 计算变卦
     */
    private static int[] calculateBianGua(int shangGuaNum, int xiaGuaNum, int dongYao) {
        String shangBinary = BAGUA_BINARY.get(shangGuaNum);
        String xiaBinary = BAGUA_BINARY.get(xiaGuaNum);

        // 合并为六爻(从下往上)
        String fullBinary = xiaBinary + shangBinary;
        char[] bianBinary = fullBinary.toCharArray();

        // 变动指定爻(1-6对应索引0-5)
        int yaoIndex = dongYao - 1;
        bianBinary[yaoIndex] = (bianBinary[yaoIndex] == '0') ? '1' : '0';

        // 分离上下卦
        String bianXiaBinary = new String(bianBinary, 0, 3);
        String bianShangBinary = new String(bianBinary, 3, 3);

        // 查找变卦数值
        int bianXiaNum = findGuaNum(bianXiaBinary);
        int bianShangNum = findGuaNum(bianShangBinary);

        return new int[]{bianShangNum, bianXiaNum};
    }

    /**
     * 根据二进制查找八卦数值
     */
    private static int findGuaNum(String binary) {
        for (Map.Entry<Integer, String> entry : BAGUA_BINARY.entrySet()) {
            if (entry.getValue().equals(binary)) {
                return entry.getKey();
            }
        }
        return 1; // 默认返回乾
    }

    /**
     * 获取卦象解释(简化版)
     */
    private static String getHexagramExplanation(String guaName) {
        // 简化实现,返回基本解释
        Map<String, String> explanations = new HashMap<>() {{
            put("乾为天", "此卦主刚健中正,君子以自强不息,大吉大利。");
            put("坤为地", "此卦主柔顺承载,厚德载物,利于守成。");
            put("火天大有", "此卦主大有收获,君子德盛位尊,事业兴旺,财富充盈。");
            put("天地否", "此卦主阻塞不通,天地不交,君子宜退避待时,不可强行。");
            // ... 可以添加更多卦象解释
        }};

        return explanations.getOrDefault(guaName,
            String.format("此卦为%s,需结合具体情况分析。", guaName));
    }

    /**
     * 生成占卜预测
     */
    private static String generatePrediction(String benGua, String bianGua, int dongYao) {
        return String.format("根据%s卦象分析,第%d爻发动变为%s卦。" +
                "建议您综合考虑本卦和变卦的含义,把握当前形势,顺势而为。",
            benGua, dongYao, bianGua);
    }
}
