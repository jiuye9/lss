package com.lsspp.util;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * BaziAnalyzer 测试类
 * 验证《三命通会》《子平真诠》《渊海子平》综合算法
 */
public class BaziAnalyzerTest {

    /**
     * 测试案例: 农历1985年2月18日10时  (公历1985年4月7日)
     * 八字: 乙丑 庚辰 丙寅 癸巳
     */
    @Test
    public void testComprehensiveAnalysis() {
        System.out.println("\n========================================");
        System.out.println("测试综合八字分析");
        System.out.println("========================================\n");

        String[] tiangan = {"乙", "庚", "丙", "癸"};
        String[] dizhi = {"丑", "辰", "寅", "巳"};
        String gender = "MALE";

        BaziAnalyzer.ComprehensiveResult result =
            BaziAnalyzer.comprehensiveAnalysis(tiangan, dizhi, gender);

        // 输出格局分析
        System.out.println("\n【格局分析】");
        result.geju.analysis.forEach(System.out::println);
        System.out.println("格局: " + result.geju.mainGeju);
        System.out.println("用神: " + result.geju.yongshen);
        System.out.println("忌神: " + result.geju.jishen);

        // 输出神煞分析
        System.out.println("\n【神煞分析】");
        System.out.println("吉星: " + String.join(", ", result.shensha.jixing));
        System.out.println("凶神: " + String.join(", ", result.shensha.xiongshen));
        result.shensha.meaning.forEach((k, v) ->
            System.out.println(k + ": " + v));

        // 输出调候分析
        System.out.println("\n【调候分析】");
        result.tiaohou.analysis.forEach(System.out::println);

        // 输出十神分布
        System.out.println("\n【十神分布】");
        result.shishenMap.forEach((k, v) ->
            System.out.println(k + ": " + v));

        // 输出综合分析
        System.out.println("\n【综合分析】");
        System.out.println(result.xingge);
        System.out.println(result.shiye);
        System.out.println(result.caiyun);
        System.out.println(result.hunyin);
        System.out.println(result.jiankang);

        // 输出建议
        System.out.println("\n【生活建议】");
        result.suggestions.forEach(System.out::println);

        // 断言验证
        assertNotNull(result.geju.mainGeju);
        assertTrue(result.geju.mainGeju.length() > 0);
    }

    /**
     * 测试十神计算
     */
    @Test
    public void testShishen() {
        System.out.println("\n========================================");
        System.out.println("测试十神计算");
        System.out.println("========================================\n");

        String rizhu = "丙";  // 丙火日主

        // 测试各种十神关系
        System.out.println("丙火日主的十神关系:");
        System.out.println("甲(木) -> " + BaziAnalyzer.getShishen(rizhu, "甲") + " (生我者为印)");
        System.out.println("乙(木) -> " + BaziAnalyzer.getShishen(rizhu, "乙"));
        System.out.println("丙(火) -> " + BaziAnalyzer.getShishen(rizhu, "丙") + " (同我者为比劫)");
        System.out.println("丁(火) -> " + BaziAnalyzer.getShishen(rizhu, "丁"));
        System.out.println("戊(土) -> " + BaziAnalyzer.getShishen(rizhu, "戊") + " (我生者为食伤)");
        System.out.println("己(土) -> " + BaziAnalyzer.getShishen(rizhu, "己"));
        System.out.println("庚(金) -> " + BaziAnalyzer.getShishen(rizhu, "庚") + " (我克者为财)");
        System.out.println("辛(金) -> " + BaziAnalyzer.getShishen(rizhu, "辛"));
        System.out.println("壬(水) -> " + BaziAnalyzer.getShishen(rizhu, "壬") + " (克我者为官杀)");
        System.out.println("癸(水) -> " + BaziAnalyzer.getShishen(rizhu, "癸"));

        // 验证十神正确性
        assertEquals("偏印", BaziAnalyzer.getShishen("丙", "甲"));
        assertEquals("比肩", BaziAnalyzer.getShishen("丙", "丙"));
        assertEquals("食神", BaziAnalyzer.getShishen("丙", "戊"));
        assertEquals("偏财", BaziAnalyzer.getShishen("丙", "庚"));
        assertEquals("七杀", BaziAnalyzer.getShishen("丙", "壬"));
    }

    /**
     * 测试格局判断
     */
    @Test
    public void testGeju() {
        System.out.println("\n========================================");
        System.out.println("测试格局判断");
        System.out.println("========================================\n");

        // 测试案例1: 正官格
        System.out.println("【案例1: 正官格测试】");
        String[] tg1 = {"甲", "辛", "丙", "癸"};
        String[] dz1 = {"子", "亥", "午", "巳"};
        BaziAnalyzer.GeJuResult geju1 = BaziAnalyzer.analyzeGeju(tg1, dz1);
        geju1.analysis.forEach(System.out::println);

        // 测试案例2: 从格测试
        System.out.println("\n【案例2: 从格测试】");
        String[] tg2 = {"庚", "戊", "癸", "甲"};
        String[] dz2 = {"申", "辰", "巳", "寅"};
        BaziAnalyzer.GeJuResult geju2 = BaziAnalyzer.analyzeGeju(tg2, dz2);
        geju2.analysis.forEach(System.out::println);

        assertNotNull(geju1.mainGeju);
        assertNotNull(geju2.mainGeju);
    }

    /**
     * 测试神煞系统
     */
    @Test
    public void testShensha() {
        System.out.println("\n========================================");
        System.out.println("测试神煞系统");
        System.out.println("========================================\n");

        // 测试案例: 包含多种神煞的八字
        String[] tiangan = {"甲", "丙", "庚", "壬"};
        String[] dizhi = {"子", "寅", "丑", "午"};

        BaziAnalyzer.ShenshaResult shensha = BaziAnalyzer.analyzeShensha(tiangan, dizhi);

        System.out.println("吉星:");
        shensha.jixing.forEach(s -> System.out.println("  - " + s));

        System.out.println("\n凶神:");
        shensha.xiongshen.forEach(s -> System.out.println("  - " + s));

        System.out.println("\n神煞含义:");
        shensha.meaning.forEach((k, v) -> System.out.println("  " + k + ": " + v));

        // 验证神煞不为空
        assertTrue(shensha.jixing.size() > 0 || shensha.xiongshen.size() > 0);
    }

    /**
     * 测试调候用神
     */
    @Test
    public void testTiaohou() {
        System.out.println("\n========================================");
        System.out.println("测试调候用神");
        System.out.println("========================================\n");

        // 测试案例1: 冬季生人(寒)
        System.out.println("【案例1: 冬季生人(丙火)】");
        String[] tg1 = {"乙", "己", "丙", "庚"};
        String[] dz1 = {"丑", "丑", "午", "子"};
        BaziAnalyzer.TiaohouResult th1 = BaziAnalyzer.analyzeTiaohou(tg1, dz1);
        th1.analysis.forEach(System.out::println);

        // 测试案例2: 夏季生人(热)
        System.out.println("\n【案例2: 夏季生人(壬水)】");
        String[] tg2 = {"甲", "辛", "壬", "丙"};
        String[] dz2 = {"申", "巳", "子", "午"};
        BaziAnalyzer.TiaohouResult th2 = BaziAnalyzer.analyzeTiaohou(tg2, dz2);
        th2.analysis.forEach(System.out::println);

        assertNotNull(th1.climate);
        assertNotNull(th1.tiaohou);
        assertNotNull(th2.climate);
        assertNotNull(th2.tiaohou);
    }

    /**
     * 测试十二长生
     */
    @Test
    public void testShiErChangsheng() {
        System.out.println("\n========================================");
        System.out.println("测试十二长生");
        System.out.println("========================================\n");

        String rizhu = "甲";
        System.out.println("甲木日主的十二长生状态:");

        String[] dizhi = {"子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"};
        for (String zhi : dizhi) {
            String changsheng = BaziAnalyzer.getShiErChangsheng(rizhu, zhi);
            System.out.println(zhi + " 支: " + changsheng);
        }
    }

    /**
     * 测试特殊格局 - 从财格
     */
    @Test
    public void testCongcaiGeju() {
        System.out.println("\n========================================");
        System.out.println("测试从财格");
        System.out.println("========================================\n");

        // 构造从财格八字: 日主无根，满局财星
        String[] tiangan = {"庚", "戊", "甲", "辛"};
        String[] dizhi = {"申", "辰", "申", "酉"};

        BaziAnalyzer.GeJuResult geju = BaziAnalyzer.analyzeGeju(tiangan, dizhi);
        geju.analysis.forEach(System.out::println);

        System.out.println("\n格局: " + geju.mainGeju);
        System.out.println("是否从格: " + geju.isCongge);
    }

    /**
     * 综合案例: 2016年12月10日18时 (丙申 庚子 丙寅 丁酉)
     */
    @Test
    public void testRealCase2016() {
        System.out.println("\n========================================");
        System.out.println("测试真实案例: 2016-12-10 18:00");
        System.out.println("========================================\n");

        String[] tiangan = {"丙", "庚", "丙", "丁"};
        String[] dizhi = {"申", "子", "寅", "酉"};
        String gender = "MALE";

        BaziAnalyzer.ComprehensiveResult result =
            BaziAnalyzer.comprehensiveAnalysis(tiangan, dizhi, gender);

        // 完整输出
        System.out.println("\n【格局】");
        result.geju.analysis.forEach(System.out::println);

        System.out.println("\n【神煞】");
        System.out.println("吉星: " + String.join(", ", result.shensha.jixing));
        System.out.println("凶神: " + String.join(", ", result.shensha.xiongshen));

        System.out.println("\n【调候】");
        result.tiaohou.analysis.forEach(System.out::println);

        System.out.println("\n【十神】");
        result.shishenMap.forEach((k, v) -> System.out.println(k + ": " + v));

        System.out.println("\n【性格】" + result.xingge);
        System.out.println("【事业】" + result.shiye);
        System.out.println("【财运】" + result.caiyun);
        System.out.println("【婚姻】" + result.hunyin);
        System.out.println("【健康】" + result.jiankang);

        System.out.println("\n【建议】");
        result.suggestions.forEach(System.out::println);

        assertNotNull(result.geju);
        assertNotNull(result.shensha);
        assertNotNull(result.tiaohou);
    }
}
