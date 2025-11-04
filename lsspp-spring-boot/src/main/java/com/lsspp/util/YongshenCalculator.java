package com.lsspp.util;

import java.util.*;

/**
 * 用神计算器 - 基于百分制五行权重算法
 *
 * 算法来源: 《八字旺衰精算法》和《可量化的五行组态》
 * 核心思路: 将天干地支藏干全部折算成百分制分数,计算日主强弱,自动取用神
 */
public class YongshenCalculator {

    // ==================== 一、固定基准分值 ====================

    /** 天干固定分值: 年5、月6、日8、时6 */
    private static final int[] TIANGAN_BASE = {5, 6, 8, 6};

    /** 地支固定分值: 年7、月50、日10、时8 */
    private static final int[] DIZHI_BASE = {7, 50, 10, 8};

    // ==================== 二、地支藏干表及比例 ====================

    /** 地支藏干映射表 */
    private static final Map<String, List<CangganInfo>> CANGGAN_MAP = new HashMap<>();

    static {
        // 三藏干: 本气65%、中气20%、余气15%
        CANGGAN_MAP.put("寅", Arrays.asList(
            new CangganInfo("甲", "木", 0.65),
            new CangganInfo("丙", "火", 0.20),
            new CangganInfo("戊", "土", 0.15)
        ));
        CANGGAN_MAP.put("申", Arrays.asList(
            new CangganInfo("庚", "金", 0.65),
            new CangganInfo("壬", "水", 0.20),
            new CangganInfo("戊", "土", 0.15)
        ));
        CANGGAN_MAP.put("巳", Arrays.asList(
            new CangganInfo("丙", "火", 0.65),
            new CangganInfo("庚", "金", 0.20),
            new CangganInfo("戊", "土", 0.15)
        ));
        CANGGAN_MAP.put("亥", Arrays.asList(
            new CangganInfo("壬", "水", 0.65),
            new CangganInfo("甲", "木", 0.20),
            new CangganInfo("戊", "土", 0.15)
        ));

        // 两藏干: 本气70%、余气30%
        CANGGAN_MAP.put("子", Arrays.asList(
            new CangganInfo("癸", "水", 0.70),
            new CangganInfo("辛", "金", 0.30)
        ));
        CANGGAN_MAP.put("午", Arrays.asList(
            new CangganInfo("丁", "火", 0.70),
            new CangganInfo("己", "土", 0.30)
        ));
        CANGGAN_MAP.put("卯", Arrays.asList(
            new CangganInfo("乙", "木", 0.70),
            new CangganInfo("甲", "木", 0.30)
        ));
        CANGGAN_MAP.put("酉", Arrays.asList(
            new CangganInfo("辛", "金", 0.70),
            new CangganInfo("庚", "金", 0.30)
        ));
        CANGGAN_MAP.put("辰", Arrays.asList(
            new CangganInfo("戊", "土", 0.70),
            new CangganInfo("乙", "木", 0.30)
        ));
        CANGGAN_MAP.put("戌", Arrays.asList(
            new CangganInfo("戊", "土", 0.70),
            new CangganInfo("辛", "金", 0.30)
        ));
        CANGGAN_MAP.put("丑", Arrays.asList(
            new CangganInfo("己", "土", 0.70),
            new CangganInfo("癸", "水", 0.30)
        ));
        CANGGAN_MAP.put("未", Arrays.asList(
            new CangganInfo("己", "土", 0.70),
            new CangganInfo("丁", "火", 0.30)
        ));
    }

    // ==================== 三、月令旺衰系数 ====================

    /** 月令旺衰系数: 旺1.0、相0.8、休0.6、囚0.4、死0.2 */
    private static final Map<String, Map<String, Double>> WANGSHUAI_COEFF = new HashMap<>();

    static {
        // 春季(寅卯辰)
        Map<String, Double> spring = new HashMap<>();
        spring.put("木", 1.0);  // 旺
        spring.put("火", 0.8);  // 相
        spring.put("水", 0.6);  // 休
        spring.put("金", 0.4);  // 囚
        spring.put("土", 0.2);  // 死
        WANGSHUAI_COEFF.put("寅", spring);
        WANGSHUAI_COEFF.put("卯", spring);
        WANGSHUAI_COEFF.put("辰", spring);

        // 夏季(巳午未)
        Map<String, Double> summer = new HashMap<>();
        summer.put("火", 1.0);  // 旺
        summer.put("土", 1.0);  // 旺
        summer.put("木", 0.6);  // 休
        summer.put("水", 0.4);  // 囚
        summer.put("金", 0.2);  // 死
        WANGSHUAI_COEFF.put("巳", summer);
        WANGSHUAI_COEFF.put("午", summer);
        WANGSHUAI_COEFF.put("未", summer);

        // 秋季(申酉戌)
        Map<String, Double> autumn = new HashMap<>();
        autumn.put("金", 1.0);  // 旺
        autumn.put("水", 0.8);  // 相
        autumn.put("土", 0.6);  // 休
        autumn.put("火", 0.4);  // 囚
        autumn.put("木", 0.2);  // 死
        WANGSHUAI_COEFF.put("申", autumn);
        WANGSHUAI_COEFF.put("酉", autumn);
        WANGSHUAI_COEFF.put("戌", autumn);

        // 冬季(亥子丑)
        Map<String, Double> winter = new HashMap<>();
        winter.put("水", 1.0);  // 旺
        winter.put("木", 0.8);  // 相
        winter.put("金", 0.6);  // 休
        winter.put("土", 0.4);  // 囚
        winter.put("火", 0.2);  // 死
        WANGSHUAI_COEFF.put("亥", winter);
        WANGSHUAI_COEFF.put("子", winter);
        WANGSHUAI_COEFF.put("丑", winter);
    }

    // ==================== 四、天干地支五行映射 ====================

    private static final Map<String, String> GAN_WUXING = new HashMap<>();
    private static final Map<String, String> ZHI_WUXING = new HashMap<>();

    static {
        GAN_WUXING.put("甲", "木"); GAN_WUXING.put("乙", "木");
        GAN_WUXING.put("丙", "火"); GAN_WUXING.put("丁", "火");
        GAN_WUXING.put("戊", "土"); GAN_WUXING.put("己", "土");
        GAN_WUXING.put("庚", "金"); GAN_WUXING.put("辛", "金");
        GAN_WUXING.put("壬", "水"); GAN_WUXING.put("癸", "水");

        ZHI_WUXING.put("寅", "木"); ZHI_WUXING.put("卯", "木");
        ZHI_WUXING.put("巳", "火"); ZHI_WUXING.put("午", "火");
        ZHI_WUXING.put("申", "金"); ZHI_WUXING.put("酉", "金");
        ZHI_WUXING.put("亥", "水"); ZHI_WUXING.put("子", "水");
        ZHI_WUXING.put("辰", "土"); ZHI_WUXING.put("戌", "土");
        ZHI_WUXING.put("丑", "土"); ZHI_WUXING.put("未", "土");
    }

    // ==================== 五、阴阳属性 ====================

    private static final Set<String> YANG_GAN = new HashSet<>(Arrays.asList("甲", "丙", "戊", "庚", "壬"));
    private static final Set<String> YANG_ZHI = new HashSet<>(Arrays.asList("子", "寅", "辰", "午", "申", "戌"));

    // ==================== 数据结构 ====================

    /** 藏干信息 */
    static class CangganInfo {
        String gan;      // 藏干
        String wuxing;   // 五行
        double ratio;    // 比例

        CangganInfo(String gan, String wuxing, double ratio) {
            this.gan = gan;
            this.wuxing = wuxing;
            this.ratio = ratio;
        }
    }

    /** 输入: 四柱八字 */
    public static class BaziInput {
        public String[] tiangan = new String[4];  // 年月日时天干
        public String[] dizhi = new String[4];    // 年月日时地支

        public BaziInput(String[] tiangan, String[] dizhi) {
            this.tiangan = tiangan;
            this.dizhi = dizhi;
        }
    }

    /** 输出: 用神分析结果 */
    public static class YongshenResult {
        // 五行得分
        public Map<String, Double> wuxingScores = new LinkedHashMap<>();

        // 日主得分(比劫+印)
        public double rizhuScore;

        // 日主状态
        public String rizhuStatus;  // 从强、身强、中和、身弱、从弱

        // 用神
        public String yongshen;

        // 喜神
        public String xishen;

        // 忌神
        public String jishen;

        // 仇神
        public String chousen;

        // 详细计算过程
        public List<String> calculationDetails = new ArrayList<>();
    }

    // ==================== 主计算方法 ====================

    /**
     * 计算用神
     * @param bazi 四柱八字
     * @return 用神分析结果
     */
    public static YongshenResult calculateYongshen(BaziInput bazi) {
        YongshenResult result = new YongshenResult();

        // 初始化五行得分
        Map<String, Double> scores = new LinkedHashMap<>();
        scores.put("木", 0.0);
        scores.put("火", 0.0);
        scores.put("土", 0.0);
        scores.put("金", 0.0);
        scores.put("水", 0.0);

        result.calculationDetails.add("========== 用神计算开始 ==========");
        result.calculationDetails.add(String.format("八字: %s %s %s %s",
            bazi.tiangan[0] + bazi.dizhi[0],
            bazi.tiangan[1] + bazi.dizhi[1],
            bazi.tiangan[2] + bazi.dizhi[2],
            bazi.tiangan[3] + bazi.dizhi[3]));
        result.calculationDetails.add("");

        // 月令(月支)
        String yueling = bazi.dizhi[1];
        result.calculationDetails.add("月令: " + yueling);
        result.calculationDetails.add("");

        // 日主
        String rizhu = bazi.tiangan[2];
        String rizhuWuxing = GAN_WUXING.get(rizhu);
        result.calculationDetails.add("日主: " + rizhu + " (" + rizhuWuxing + ")");
        result.calculationDetails.add("");

        // 1. 计算天干得分
        result.calculationDetails.add("---------- 天干得分 ----------");
        for (int i = 0; i < 4; i++) {
            String gan = bazi.tiangan[i];
            String wuxing = GAN_WUXING.get(gan);
            double baseScore = TIANGAN_BASE[i];
            double wangshuaiCoeff = WANGSHUAI_COEFF.get(yueling).get(wuxing);
            double score = baseScore * wangshuaiCoeff;

            scores.put(wuxing, scores.get(wuxing) + score);

            String pillarName = getPillarName(i);
            result.calculationDetails.add(String.format("%s天干%s(%s): %.2f × %.1f = %.2f",
                pillarName, gan, wuxing, baseScore, wangshuaiCoeff, score));
        }
        result.calculationDetails.add("");

        // 2. 计算地支藏干得分
        result.calculationDetails.add("---------- 地支藏干得分 ----------");
        for (int i = 0; i < 4; i++) {
            String zhi = bazi.dizhi[i];
            List<CangganInfo> canggans = CANGGAN_MAP.get(zhi);
            double zhiBase = DIZHI_BASE[i];

            String pillarName = getPillarName(i);
            result.calculationDetails.add(pillarName + "地支" + zhi + " (基础分:" + zhiBase + ")");

            if (canggans != null) {
                for (CangganInfo cg : canggans) {
                    double wangshuaiCoeff = WANGSHUAI_COEFF.get(yueling).get(cg.wuxing);
                    double score = zhiBase * cg.ratio * wangshuaiCoeff;

                    scores.put(cg.wuxing, scores.get(cg.wuxing) + score);

                    result.calculationDetails.add(String.format("  藏干%s(%s): %.2f × %.0f%% × %.1f = %.2f",
                        cg.gan, cg.wuxing, zhiBase, cg.ratio * 100, wangshuaiCoeff, score));
                }
            }
        }
        result.calculationDetails.add("");

        // 3. 汇总五行得分
        result.calculationDetails.add("---------- 五行总分 ----------");
        for (Map.Entry<String, Double> entry : scores.entrySet()) {
            result.calculationDetails.add(String.format("%s: %.2f", entry.getKey(), entry.getValue()));
        }
        result.calculationDetails.add("");

        // 4. 计算日主得分(比劫+印)
        String rizhiBenqi = ZHI_WUXING.get(bazi.dizhi[2]);
        double bijieScore = scores.get(rizhuWuxing);  // 比劫
        double yinxingScore = scores.get(getShengWuxing(rizhuWuxing));  // 印
        double rizhuTotal = bijieScore + yinxingScore;

        result.rizhuScore = rizhuTotal;
        result.calculationDetails.add("---------- 日主强弱 ----------");
        result.calculationDetails.add(String.format("比劫(%s): %.2f", rizhuWuxing, bijieScore));
        result.calculationDetails.add(String.format("印星(%s): %.2f", getShengWuxing(rizhuWuxing), yinxingScore));
        result.calculationDetails.add(String.format("日主总分: %.2f", rizhuTotal));
        result.calculationDetails.add("");

        // 5. 判定日主状态
        if (rizhuTotal > 90) {
            result.rizhuStatus = "从强";
            result.yongshen = mergeWuxing(getXieWuxing(rizhuWuxing), getKeWuxing(rizhuWuxing));  // 食伤、财
            result.jishen = mergeWuxing(rizhuWuxing, getShengWuxing(rizhuWuxing));  // 比劫、印
            result.chousen = getShengWuxing(rizhuWuxing);  // 帮助忌神的,生印
        } else if (rizhuTotal >= 52) {
            result.rizhuStatus = "身强";
            result.yongshen = getKeMyWuxing(rizhuWuxing);  // 官杀
            result.xishen = mergeWuxing(getXieWuxing(rizhuWuxing), getKeWuxing(rizhuWuxing));  // 食伤、财
            result.jishen = mergeWuxing(rizhuWuxing, getShengWuxing(rizhuWuxing));  // 比劫、印
            result.chousen = getShengWuxing(rizhuWuxing);  // 帮助忌神的,生印
        } else if (rizhuTotal >= 48) {
            result.rizhuStatus = "中和";
            result.yongshen = "随大运";
            result.xishen = "扶抑兼顾";
            result.jishen = "过旺过弱";
            result.chousen = "见机行事";
        } else if (rizhuTotal >= 10) {
            result.rizhuStatus = "身弱";
            result.yongshen = getShengWuxing(rizhuWuxing);  // 印
            result.xishen = rizhuWuxing;  // 比劫
            result.jishen = mergeWuxing(getKeMyWuxing(rizhuWuxing), getXieWuxing(rizhuWuxing), getKeWuxing(rizhuWuxing));  // 官杀、食伤、财(去重)
            result.chousen = getKeMyWuxing(rizhuWuxing);  // 克喜神(比劫)的五行,即官杀
        } else {
            result.rizhuStatus = "从弱";
            result.yongshen = mergeWuxing(getKeMyWuxing(rizhuWuxing), getXieWuxing(rizhuWuxing), getKeWuxing(rizhuWuxing));  // 官杀、食伤、财
            result.jishen = mergeWuxing(rizhuWuxing, getShengWuxing(rizhuWuxing));  // 比劫、印
            result.chousen = getShengWuxing(rizhuWuxing);  // 帮助忌神的,生印
        }

        result.calculationDetails.add("---------- 结论 ----------");
        result.calculationDetails.add("日主状态: " + result.rizhuStatus);
        result.calculationDetails.add("用神: " + result.yongshen);
        if (result.xishen != null) {
            result.calculationDetails.add("喜神: " + result.xishen);
        }
        result.calculationDetails.add("忌神: " + result.jishen);
        if (result.chousen != null) {
            result.calculationDetails.add("仇神: " + result.chousen);
        }
        result.calculationDetails.add("");

        result.wuxingScores = scores;
        return result;
    }

    // ==================== 辅助方法 ====================

    private static String getPillarName(int index) {
        return new String[]{"年柱", "月柱", "日柱", "时柱"}[index];
    }

    /** 合并五行并去重 */
    private static String mergeWuxing(String... wuxings) {
        Set<String> uniqueWuxing = new LinkedHashSet<>();
        for (String wuxing : wuxings) {
            if (wuxing != null && !wuxing.isEmpty()) {
                uniqueWuxing.add(wuxing);
            }
        }
        return String.join("、", uniqueWuxing);
    }

    /** 获取生我的五行(印) */
    private static String getShengWuxing(String wuxing) {
        Map<String, String> sheng = new HashMap<>();
        sheng.put("木", "水");
        sheng.put("火", "木");
        sheng.put("土", "火");
        sheng.put("金", "土");
        sheng.put("水", "金");
        return sheng.get(wuxing);
    }

    /** 获取我克的五行(财) */
    private static String getKeWuxing(String wuxing) {
        Map<String, String> ke = new HashMap<>();
        ke.put("木", "土");
        ke.put("火", "金");
        ke.put("土", "水");
        ke.put("金", "木");
        ke.put("水", "火");
        return ke.get(wuxing);
    }

    /** 获取我生的五行(食伤) */
    private static String getXieWuxing(String wuxing) {
        Map<String, String> xie = new HashMap<>();
        xie.put("木", "火");
        xie.put("火", "土");
        xie.put("土", "金");
        xie.put("金", "水");
        xie.put("水", "木");
        return xie.get(wuxing);
    }

    /** 获取克我的五行(官杀) */
    private static String getKeMyWuxing(String wuxing) {
        Map<String, String> keMy = new HashMap<>();
        keMy.put("木", "金");  // 金克木
        keMy.put("火", "水");  // 水克火
        keMy.put("土", "木");  // 木克土
        keMy.put("金", "火");  // 火克金
        keMy.put("水", "土");  // 土克水
        return keMy.get(wuxing);
    }

    // ==================== 测试方法 ====================

    public static void main(String[] args) {
        // 测试案例: 请用户提供
        System.out.println("用神计算器已就绪,等待输入测试案例...");
    }
}
