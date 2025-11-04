package com.lsspp.service;

import com.lsspp.api.dto.DivinationResponse.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 用神分析器 - 基于《三命通会》和《渊海子平》的经典算法
 *
 * 核心理论:
 * 1. 扶抑用神 - 强则泄之,弱则扶之 (占比50%)
 * 2. 调候用神 - 寒暖燥湿的调节 (占比30%)
 * 3. 通关用神 - 五行冲突的调和 (占比20%)
 *
 * 用神取用原则:
 * - 先看月令,次看格局
 * - 日主强弱是判断基础
 * - 综合四柱平衡分析
 */
@Component
@Slf4j
public class YongshenAnalyzer {

    // 天干五行属性
    private static final Map<String, String> TIANGAN_WUXING = new HashMap<>() {{
        put("甲", "木"); put("乙", "木");
        put("丙", "火"); put("丁", "火");
        put("戊", "土"); put("己", "土");
        put("庚", "金"); put("辛", "金");
        put("壬", "水"); put("癸", "水");
    }};

    // 地支五行属性
    private static final Map<String, String> DIZHI_WUXING = new HashMap<>() {{
        put("子", "水"); put("丑", "土"); put("寅", "木"); put("卯", "木");
        put("辰", "土"); put("巳", "火"); put("午", "火"); put("未", "土");
        put("申", "金"); put("酉", "金"); put("戌", "土"); put("亥", "水");
    }};

    // 地支藏干 (简化版,取主气)
    private static final Map<String, String> DIZHI_CANGGAN = new HashMap<>() {{
        put("子", "癸"); put("丑", "己"); put("寅", "甲"); put("卯", "乙");
        put("辰", "戊"); put("巳", "丙"); put("午", "丁"); put("未", "己");
        put("申", "庚"); put("酉", "辛"); put("戌", "戊"); put("亥", "壬");
    }};

    // 月令旺相休囚死 - 春木旺火相土死金囚水休
    private static final Map<String, Map<String, Integer>> SEASON_STRENGTH = new HashMap<>() {{
        // 春季(寅卯辰月): 木旺(5), 火相(4), 水休(3), 金囚(2), 土死(1)
        put("春", new HashMap<>() {{
            put("木", 5); put("火", 4); put("水", 3); put("金", 2); put("土", 1);
        }});
        // 夏季(巳午未月): 火旺(5), 土相(4), 木休(3), 水囚(2), 金死(1)
        put("夏", new HashMap<>() {{
            put("火", 5); put("土", 4); put("木", 3); put("水", 2); put("金", 1);
        }});
        // 秋季(申酉戌月): 金旺(5), 水相(4), 土休(3), 火囚(2), 木死(1)
        put("秋", new HashMap<>() {{
            put("金", 5); put("水", 4); put("土", 3); put("火", 2); put("木", 1);
        }});
        // 冬季(亥子丑月): 水旺(5), 木相(4), 金休(3), 土囚(2), 火死(1)
        put("冬", new HashMap<>() {{
            put("水", 5); put("木", 4); put("金", 3); put("土", 2); put("火", 1);
        }});
    }};

    // 五行生克关系
    private static final Map<String, String> SHENG_RELATION = new HashMap<>() {{
        put("木", "火"); put("火", "土"); put("土", "金"); put("金", "水"); put("水", "木");
    }};

    private static final Map<String, String> KE_RELATION = new HashMap<>() {{
        put("木", "土"); put("土", "水"); put("水", "火"); put("火", "金"); put("金", "木");
    }};

    /**
     * 综合分析用神 - 主入口方法
     *
     * @param yearColumn 年柱
     * @param monthColumn 月柱
     * @param dayColumn 日柱
     * @param hourColumn 时柱
     * @param birthDateTime 出生时间(用于季节判断)
     * @return 用神分析结果
     */
    public YongshenAnalysis analyze(
            ColumnInfo yearColumn,
            ColumnInfo monthColumn,
            ColumnInfo dayColumn,
            ColumnInfo hourColumn,
            LocalDateTime birthDateTime) {

        log.info("📊 开始经典用神分析...");

        // 1. 确定日主和日主五行
        String dayMaster = dayColumn.getGan();
        String dayMasterWuxing = TIANGAN_WUXING.get(dayMaster);

        log.info("日主: {} ({})", dayMaster, dayMasterWuxing);

        // 2. 判断季节
        String season = getSeason(monthColumn.getZhi());
        log.info("出生季节: {}", season);

        // 3. 分析日主强弱
        DayMasterStrength strength = analyzeDayMasterStrength(
            dayMaster, dayMasterWuxing, season,
            yearColumn, monthColumn, dayColumn, hourColumn
        );

        log.info("日主强弱: {} (得分: {})", strength.isStrong() ? "身强" : "身弱", strength.getScore());

        // 4. 五行统计
        Map<String, Integer> wuxingCount = countWuxing(yearColumn, monthColumn, dayColumn, hourColumn);

        // 5. 扶抑用神分析
        String fuyi = analyzeFuyiYongshen(dayMasterWuxing, strength, wuxingCount);
        log.info("扶抑用神: {}", fuyi);

        // 6. 调候用神分析
        String tiahou = analyzeTiahouYongshen(dayMasterWuxing, season, birthDateTime.getMonthValue());
        log.info("调候用神: {}", tiahou);

        // 7. 通关用神分析
        String tongguan = analyzeTongguanYongshen(wuxingCount);
        log.info("通关用神: {}", tongguan);

        // 8. 综合判定最终用神
        String finalYongshen = determineFinalYongshen(fuyi, tiahou, tongguan, strength, season);
        log.info("✅ 最终用神: {}", finalYongshen);

        // 9. 确定喜神、忌神、仇神
        return buildYongshenAnalysis(finalYongshen, dayMasterWuxing, strength, fuyi, tiahou);
    }

    /**
     * 判断季节
     */
    private String getSeason(String monthZhi) {
        if (monthZhi.equals("寅") || monthZhi.equals("卯") || monthZhi.equals("辰")) {
            return "春";
        } else if (monthZhi.equals("巳") || monthZhi.equals("午") || monthZhi.equals("未")) {
            return "夏";
        } else if (monthZhi.equals("申") || monthZhi.equals("酉") || monthZhi.equals("戌")) {
            return "秋";
        } else {
            return "冬";
        }
    }

    /**
     * 分析日主强弱 - 核心算法
     *
     * 判断标准:
     * 1. 得令 - 月令对日主的支持 (50分)
     * 2. 得地 - 地支通根的支持 (30分)
     * 3. 得势 - 天干帮扶的支持 (15分)
     * 4. 得生 - 被其他五行生的支持 (5分)
     *
     * 总分 >= 50 为身强, < 50 为身弱
     */
    private DayMasterStrength analyzeDayMasterStrength(
            String dayMaster,
            String dayMasterWuxing,
            String season,
            ColumnInfo yearColumn,
            ColumnInfo monthColumn,
            ColumnInfo dayColumn,
            ColumnInfo hourColumn) {

        int score = 0;
        List<String> reasons = new ArrayList<>();

        // 1. 得令 - 月令的力量最大 (50分)
        int delingScore = SEASON_STRENGTH.get(season).get(dayMasterWuxing) * 10;
        score += delingScore;
        if (delingScore >= 40) {
            reasons.add("得令于" + season + "季(+" + delingScore + ")");
        } else if (delingScore <= 20) {
            reasons.add("失令于" + season + "季(+" + delingScore + ")");
        } else {
            reasons.add("中和于" + season + "季(+" + delingScore + ")");
        }

        // 2. 得地 - 地支通根 (每个根10分,最多30分)
        int dediScore = 0;
        if (DIZHI_WUXING.get(yearColumn.getZhi()).equals(dayMasterWuxing)) {
            dediScore += 10;
            reasons.add("年支" + yearColumn.getZhi() + "通根(+10)");
        }
        if (DIZHI_WUXING.get(monthColumn.getZhi()).equals(dayMasterWuxing)) {
            dediScore += 10;
            reasons.add("月支" + monthColumn.getZhi() + "通根(+10)");
        }
        if (DIZHI_WUXING.get(hourColumn.getZhi()).equals(dayMasterWuxing)) {
            dediScore += 10;
            reasons.add("时支" + hourColumn.getZhi() + "通根(+10)");
        }
        score += Math.min(dediScore, 30);

        // 3. 得势 - 天干帮扶 (每个帮扶5分,最多15分)
        int deshiScore = 0;
        if (TIANGAN_WUXING.get(yearColumn.getGan()).equals(dayMasterWuxing)) {
            deshiScore += 5;
            reasons.add("年干" + yearColumn.getGan() + "帮扶(+5)");
        }
        if (TIANGAN_WUXING.get(monthColumn.getGan()).equals(dayMasterWuxing)) {
            deshiScore += 5;
            reasons.add("月干" + monthColumn.getGan() + "帮扶(+5)");
        }
        if (TIANGAN_WUXING.get(hourColumn.getGan()).equals(dayMasterWuxing)) {
            deshiScore += 5;
            reasons.add("时干" + hourColumn.getGan() + "帮扶(+5)");
        }
        score += Math.min(deshiScore, 15);

        // 4. 得生 - 被其他五行所生 (最多5分)
        int deshengScore = 0;
        String shengWuxing = getShengWuxing(dayMasterWuxing); // 生日主的五行

        for (ColumnInfo column : Arrays.asList(yearColumn, monthColumn, hourColumn)) {
            if (TIANGAN_WUXING.get(column.getGan()).equals(shengWuxing)) {
                deshengScore += 2;
            }
        }
        deshengScore = Math.min(deshengScore, 5);
        if (deshengScore > 0) {
            reasons.add("得" + shengWuxing + "生(+" + deshengScore + ")");
        }
        score += deshengScore;

        boolean isStrong = score >= 50;

        return new DayMasterStrength(isStrong, score, reasons);
    }

    /**
     * 获取生日主的五行
     */
    private String getShengWuxing(String wuxing) {
        for (Map.Entry<String, String> entry : SHENG_RELATION.entrySet()) {
            if (entry.getValue().equals(wuxing)) {
                return entry.getKey();
            }
        }
        return "";
    }

    /**
     * 统计五行数量
     */
    private Map<String, Integer> countWuxing(ColumnInfo... columns) {
        Map<String, Integer> count = new HashMap<>() {{
            put("金", 0); put("木", 0); put("水", 0); put("火", 0); put("土", 0);
        }};

        for (ColumnInfo column : columns) {
            String ganWuxing = TIANGAN_WUXING.get(column.getGan());
            String zhiWuxing = DIZHI_WUXING.get(column.getZhi());
            count.put(ganWuxing, count.get(ganWuxing) + 1);
            count.put(zhiWuxing, count.get(zhiWuxing) + 1);
        }

        return count;
    }

    /**
     * 扶抑用神分析
     *
     * 原则: 强则抑之,弱则扶之
     * - 日主强: 取克泄耗为用 (官杀、食伤、财星)
     * - 日主弱: 取生扶为用 (印绶、比劫)
     */
    private String analyzeFuyiYongshen(
            String dayMasterWuxing,
            DayMasterStrength strength,
            Map<String, Integer> wuxingCount) {

        if (strength.isStrong()) {
            // 身强,需要泄耗
            // 优先选择: 1.食伤(我生) 2.财星(我克) 3.官杀(克我)
            String shiShang = SHENG_RELATION.get(dayMasterWuxing); // 我生者
            String caiXing = KE_RELATION.get(dayMasterWuxing);     // 我克者
            String guanSha = getKeWuxing(dayMasterWuxing);         // 克我者

            // 选择八字中最弱的作为用神
            List<Map.Entry<String, Integer>> sorted = new ArrayList<>();
            sorted.add(new AbstractMap.SimpleEntry<>(shiShang, wuxingCount.get(shiShang)));
            sorted.add(new AbstractMap.SimpleEntry<>(caiXing, wuxingCount.get(caiXing)));
            sorted.add(new AbstractMap.SimpleEntry<>(guanSha, wuxingCount.get(guanSha)));

            sorted.sort(Comparator.comparingInt(Map.Entry::getValue));

            return sorted.get(0).getKey(); // 取最弱的作为用神

        } else {
            // 身弱,需要扶助
            // 优先选择: 1.印绶(生我) 2.比劫(同我)
            String yinShou = getShengWuxing(dayMasterWuxing); // 生我者

            // 印绶和比劫选择更需要的
            if (wuxingCount.get(yinShou) < wuxingCount.get(dayMasterWuxing)) {
                return yinShou; // 印绶少,优先用印
            } else {
                return dayMasterWuxing; // 否则用比劫
            }
        }
    }

    /**
     * 获取克日主的五行
     */
    private String getKeWuxing(String wuxing) {
        for (Map.Entry<String, String> entry : KE_RELATION.entrySet()) {
            if (entry.getValue().equals(wuxing)) {
                return entry.getKey();
            }
        }
        return "";
    }

    /**
     * 调候用神分析
     *
     * 原则: 寒暖燥湿的调节
     * - 冬季寒冷: 需要火来暖局
     * - 夏季炎热: 需要水来润局
     * - 春秋季节: 根据具体情况调候
     */
    private String analyzeTiahouYongshen(String dayMasterWuxing, String season, int month) {

        switch (season) {
            case "冬":
                // 冬季寒冷,必用火暖
                return "火";

            case "夏":
                // 夏季炎热,必用水润
                return "水";

            case "春":
                // 春季木旺,根据日主调候
                if (dayMasterWuxing.equals("金")) {
                    return "火"; // 金需火炼
                } else if (dayMasterWuxing.equals("水")) {
                    return "火"; // 水需火暖
                } else {
                    return "水"; // 木火土需水润
                }

            case "秋":
                // 秋季金旺,根据日主调候
                if (dayMasterWuxing.equals("木")) {
                    return "水"; // 木需水生
                } else if (dayMasterWuxing.equals("火")) {
                    return "木"; // 火需木生
                } else {
                    return "水"; // 金土需水润
                }

            default:
                return "水";
        }
    }

    /**
     * 通关用神分析
     *
     * 原则: 当五行出现严重冲突时,需要通关
     * - 木克土: 用火通关
     * - 土克水: 用金通关
     * - 水克火: 用木通关
     * - 火克金: 用土通关
     * - 金克木: 用水通关
     */
    private String analyzeTongguanYongshen(Map<String, Integer> wuxingCount) {

        // 找出最强和次强的两个五行
        List<Map.Entry<String, Integer>> sorted = new ArrayList<>(wuxingCount.entrySet());
        sorted.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        if (sorted.size() < 2) {
            return ""; // 没有冲突
        }

        String strongest = sorted.get(0).getKey();
        String secondStrongest = sorted.get(1).getKey();

        // 判断是否存在相克关系
        if (KE_RELATION.get(strongest).equals(secondStrongest)) {
            // strongest克secondStrongest,需要通关
            return SHENG_RELATION.get(strongest); // strongest生的五行作为通关
        }

        return ""; // 无需通关
    }

    /**
     * 确定最终用神
     *
     * 综合权重:
     * - 扶抑用神: 50%
     * - 调候用神: 30%
     * - 通关用神: 20%
     */
    private String determineFinalYongshen(
            String fuyi,
            String tiahou,
            String tongguan,
            DayMasterStrength strength,
            String season) {

        // 优先级1: 冬夏季节,调候优先
        if (season.equals("冬") || season.equals("夏")) {
            if (!tiahou.isEmpty()) {
                log.info("冬夏季节,调候用神优先: {}", tiahou);
                return tiahou;
            }
        }

        // 优先级2: 存在明显通关需求
        if (!tongguan.isEmpty()) {
            log.info("存在五行冲突,通关用神优先: {}", tongguan);
            return tongguan;
        }

        // 优先级3: 扶抑用神为主
        log.info("正常情况,扶抑用神为主: {}", fuyi);
        return fuyi;
    }

    /**
     * 构建完整的用神分析结果
     */
    private YongshenAnalysis buildYongshenAnalysis(
            String yongshen,
            String dayMasterWuxing,
            DayMasterStrength strength,
            String fuyiYongshen,
            String tiahouYongshen) {

        // 用神
        String finalYongshen = yongshen;

        // 喜神: 生用神的五行
        String xishen = getShengWuxing(yongshen);

        // 忌神: 克用神的五行,或对日主不利的五行
        String jishen;
        if (strength.isStrong()) {
            // 身强,忌印绶和比劫
            jishen = dayMasterWuxing;
        } else {
            // 身弱,忌官杀和财星
            jishen = getKeWuxing(dayMasterWuxing);
        }

        // 仇神: 克制用神的五行
        String chousen = getKeWuxing(yongshen);

        return YongshenAnalysis.builder()
            .yongshen(finalYongshen)
            .xishen(xishen)
            .jishen(jishen)
            .chousen(chousen)
            .build();
    }

    /**
     * 日主强弱分析结果
     */
    private static class DayMasterStrength {
        private final boolean strong;
        private final int score;
        private final List<String> reasons;

        public DayMasterStrength(boolean strong, int score, List<String> reasons) {
            this.strong = strong;
            this.score = score;
            this.reasons = reasons;
        }

        public boolean isStrong() {
            return strong;
        }

        public int getScore() {
            return score;
        }

        public List<String> getReasons() {
            return reasons;
        }
    }
}
