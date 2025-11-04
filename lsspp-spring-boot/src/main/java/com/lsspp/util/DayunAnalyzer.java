package com.lsspp.util;

import java.util.*;

/**
 * 大运分析工具类
 * 根据大运干支分析每一步大运的吉凶及详细信息
 */
public class DayunAnalyzer {

    // 天干对照表
    private static final String[] TIANGAN = {"甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"};

    // 地支对照表
    private static final String[] DIZHI = {"子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"};

    // 五行对照表
    private static final Map<String, String> WUXING_MAP = new HashMap<>() {{
        put("甲", "木"); put("乙", "木"); put("丙", "火"); put("丁", "火");
        put("戊", "土"); put("己", "土"); put("庚", "金"); put("辛", "金");
        put("壬", "水"); put("癸", "水");
        put("子", "水"); put("丑", "土"); put("寅", "木"); put("卯", "木");
        put("辰", "土"); put("巳", "火"); put("午", "火"); put("未", "土");
        put("申", "金"); put("酉", "金"); put("戌", "土"); put("亥", "水");
    }};

    /**
     * 分析单个大运
     * @param dayunGanZhi 大运干支（如"甲辰"）
     * @param rizhu 日主天干
     * @param yongshen 用神
     * @param xishen 喜神
     * @param jishen 忌神
     * @return 大运分析结果
     */
    public static Map<String, Object> analyzeDayun(
            String dayunGanZhi,
            String rizhu,
            String yongshen,
            String xishen,
            String jishen) {

        if (dayunGanZhi == null || dayunGanZhi.length() != 2) {
            return createEmptyAnalysis();
        }

        String gan = dayunGanZhi.substring(0, 1);
        String zhi = dayunGanZhi.substring(1, 2);

        String ganWuxing = WUXING_MAP.get(gan);
        String zhiWuxing = WUXING_MAP.get(zhi);
        String rizhuWuxing = WUXING_MAP.get(rizhu);

        // 计算吉凶评分（0-100分）
        int score = calculateDayunScore(gan, zhi, rizhu, yongshen, xishen, jishen);

        // 判断吉凶等级
        String jiXiong = determineJiXiong(score);

        // 生成详细分析
        String analysis = generateDetailedAnalysis(
            gan, zhi, ganWuxing, zhiWuxing, rizhu, rizhuWuxing,
            yongshen, xishen, jishen, score
        );

        // 生成运势特点
        List<String> features = generateFeatures(gan, zhi, ganWuxing, zhiWuxing, yongshen, xishen);

        // 生成建议
        List<String> suggestions = generateSuggestions(jiXiong, ganWuxing, zhiWuxing, yongshen);

        Map<String, Object> result = new HashMap<>();
        result.put("ganZhi", dayunGanZhi);
        result.put("gan", gan);
        result.put("zhi", zhi);
        result.put("ganWuxing", ganWuxing);
        result.put("zhiWuxing", zhiWuxing);
        result.put("score", score);
        result.put("jiXiong", jiXiong);
        result.put("analysis", analysis);
        result.put("features", features);
        result.put("suggestions", suggestions);

        return result;
    }

    /**
     * 计算大运评分（0-100）
     */
    private static int calculateDayunScore(
            String gan, String zhi, String rizhu,
            String yongshen, String xishen, String jishen) {

        int score = 50; // 基础分数

        String ganWuxing = WUXING_MAP.get(gan);
        String zhiWuxing = WUXING_MAP.get(zhi);

        // 天干与用神的关系（30分）
        if (ganWuxing.equals(yongshen)) {
            score += 30;
        } else if (ganWuxing.equals(xishen)) {
            score += 20;
        } else if (ganWuxing.equals(jishen)) {
            score -= 30;
        } else if (isShengGuan(ganWuxing, yongshen)) {
            score += 15;
        } else if (isKeGuan(ganWuxing, yongshen)) {
            score -= 15;
        }

        // 地支与用神的关系（30分）
        if (zhiWuxing.equals(yongshen)) {
            score += 30;
        } else if (zhiWuxing.equals(xishen)) {
            score += 20;
        } else if (zhiWuxing.equals(jishen)) {
            score -= 30;
        } else if (isShengGuan(zhiWuxing, yongshen)) {
            score += 15;
        } else if (isKeGuan(zhiWuxing, yongshen)) {
            score -= 15;
        }

        // 天干地支同气（10分）
        if (ganWuxing.equals(zhiWuxing)) {
            score += 10;
        }

        // 确保分数在0-100之间
        return Math.max(0, Math.min(100, score));
    }

    /**
     * 判断五行生克关系 - 是否相生
     */
    private static boolean isShengGuan(String from, String to) {
        Map<String, String> shengMap = Map.of(
            "木", "火",
            "火", "土",
            "土", "金",
            "金", "水",
            "水", "木"
        );
        return shengMap.getOrDefault(from, "").equals(to);
    }

    /**
     * 判断五行生克关系 - 是否相克
     */
    private static boolean isKeGuan(String from, String to) {
        Map<String, String> keMap = Map.of(
            "木", "土",
            "土", "水",
            "水", "火",
            "火", "金",
            "金", "木"
        );
        return keMap.getOrDefault(from, "").equals(to);
    }

    /**
     * 判断吉凶等级
     */
    private static String determineJiXiong(int score) {
        if (score >= 85) return "大吉";
        if (score >= 70) return "吉";
        if (score >= 55) return "平吉";
        if (score >= 45) return "平";
        if (score >= 30) return "平凶";
        if (score >= 15) return "凶";
        return "大凶";
    }

    /**
     * 生成详细分析
     */
    private static String generateDetailedAnalysis(
            String gan, String zhi, String ganWuxing, String zhiWuxing,
            String rizhu, String rizhuWuxing,
            String yongshen, String xishen, String jishen,
            int score) {

        StringBuilder sb = new StringBuilder();

        sb.append(String.format("此大运天干%s（%s），地支%s（%s）。",
            gan, ganWuxing, zhi, zhiWuxing));

        // 分析天干
        if (ganWuxing.equals(yongshen)) {
            sb.append(String.format("天干%s为用神%s，大利运势，", gan, yongshen));
        } else if (ganWuxing.equals(xishen)) {
            sb.append(String.format("天干%s为喜神%s，有利运势，", gan, xishen));
        } else if (ganWuxing.equals(jishen)) {
            sb.append(String.format("天干%s为忌神%s，不利运势，", gan, jishen));
        }

        // 分析地支
        if (zhiWuxing.equals(yongshen)) {
            sb.append(String.format("地支%s为用神%s，根基稳固。", zhi, yongshen));
        } else if (zhiWuxing.equals(xishen)) {
            sb.append(String.format("地支%s为喜神%s，根基尚可。", zhi, xishen));
        } else if (zhiWuxing.equals(jishen)) {
            sb.append(String.format("地支%s为忌神%s，根基不稳。", zhi, jishen));
        }

        // 综合评价
        if (score >= 70) {
            sb.append("此运整体顺遂，事业财运均有发展，宜积极进取。");
        } else if (score >= 50) {
            sb.append("此运平稳，虽无大起伏，仍需谨慎行事。");
        } else {
            sb.append("此运多有波折，需谨慎低调，待时而动。");
        }

        return sb.toString();
    }

    /**
     * 生成运势特点
     */
    private static List<String> generateFeatures(
            String gan, String zhi, String ganWuxing, String zhiWuxing,
            String yongshen, String xishen) {

        List<String> features = new ArrayList<>();

        // 根据天干特点
        if (ganWuxing.equals(yongshen) || ganWuxing.equals(xishen)) {
            features.add("事业运势强劲，适合开拓发展");
            features.add("贵人运旺，容易得到他人帮助");
        }

        // 根据地支特点
        if (zhiWuxing.equals(yongshen) || zhiWuxing.equals(xishen)) {
            features.add("财运稳定，收入有所增长");
            features.add("家庭和睦，生活安定");
        }

        // 根据干支关系
        if (ganWuxing.equals(zhiWuxing)) {
            features.add("干支同气，表里如一，运势稳定");
        }

        // 特殊组合分析
        if (gan.equals("甲") && zhi.equals("寅") || gan.equals("乙") && zhi.equals("卯")) {
            features.add("干支通根，力量集中，发展迅速");
        }

        if (features.isEmpty()) {
            features.add("运势平平，需把握机会");
            features.add("注意稳健发展，避免冒进");
        }

        return features;
    }

    /**
     * 生成建议
     */
    private static List<String> generateSuggestions(
            String jiXiong, String ganWuxing, String zhiWuxing, String yongshen) {

        List<String> suggestions = new ArrayList<>();

        if (jiXiong.contains("吉")) {
            suggestions.add("此运为吉，宜积极进取，开拓事业");
            suggestions.add("可考虑投资理财，但仍需谨慎评估");
            suggestions.add("多结交贵人，扩展人脉资源");
            suggestions.add("保持良好心态，抓住发展机遇");
        } else if (jiXiong.equals("平")) {
            suggestions.add("此运平稳，宜保持现状，稳步发展");
            suggestions.add("不宜大举投资，守成为主");
            suggestions.add("多学习充电，提升自身能力");
            suggestions.add("注意身体健康，保持作息规律");
        } else {
            suggestions.add("此运不顺，宜低调行事，避免冲突");
            suggestions.add("不宜投资创业，保守为上");
            suggestions.add("注意人际关系，避免是非口舌");
            suggestions.add("多行善事，积累福德，静待时机");
        }

        // 根据五行添加具体建议
        if (ganWuxing.equals(yongshen) || zhiWuxing.equals(yongshen)) {
            suggestions.add(String.format("多接触%s属性的事物，如%s",
                yongshen, getWuxingItems(yongshen)));
        }

        return suggestions;
    }

    /**
     * 获取五行对应的事物
     */
    private static String getWuxingItems(String wuxing) {
        Map<String, String> itemsMap = Map.of(
            "金", "金属制品、白色物品、西方方位",
            "木", "植物花卉、绿色物品、东方方位",
            "水", "流水景观、黑色物品、北方方位",
            "火", "光明温暖、红色物品、南方方位",
            "土", "陶瓷器皿、黄色物品、中央方位"
        );
        return itemsMap.getOrDefault(wuxing, "相关物品");
    }

    /**
     * 创建空分析结果
     */
    private static Map<String, Object> createEmptyAnalysis() {
        Map<String, Object> result = new HashMap<>();
        result.put("ganZhi", "起运前");
        result.put("score", 50);
        result.put("jiXiong", "平");
        result.put("analysis", "起运前，运势尚未开始，一切平稳过渡。");
        result.put("features", List.of("运势平稳", "顺其自然"));
        result.put("suggestions", List.of("保持平常心", "做好准备迎接大运"));
        return result;
    }

    /**
     * 批量分析大运列表
     */
    public static List<Map<String, Object>> analyzeDayunList(
            List<String> dayunGanZhiList,
            String rizhu,
            String yongshen,
            String xishen,
            String jishen) {

        List<Map<String, Object>> results = new ArrayList<>();

        for (String ganZhi : dayunGanZhiList) {
            Map<String, Object> analysis = analyzeDayun(
                ganZhi, rizhu, yongshen, xishen, jishen
            );
            results.add(analysis);
        }

        return results;
    }
}
