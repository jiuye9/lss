package com.lsspp.util;

import org.junit.jupiter.api.Test;

/**
 * 测试用户八字：乙丑 庚辰 丙子 癸巳
 */
public class TestUserBazi {

    @Test
    public void testUserBaziShensha() {
        System.out.println("========================================");
        System.out.println("用户八字分析：乙丑 庚辰 丙子 癸巳");
        System.out.println("========================================");
        System.out.println();

        // 八字信息
        String[] tiangan = {"乙", "庚", "丙", "癸"};
        String[] dizhi = {"丑", "辰", "子", "巳"};

        System.out.println("【八字信息】");
        System.out.println("年柱: " + tiangan[0] + dizhi[0]);
        System.out.println("月柱: " + tiangan[1] + dizhi[1]);
        System.out.println("日柱: " + tiangan[2] + dizhi[2] + " (日主: " + tiangan[2] + ")");
        System.out.println("时柱: " + tiangan[3] + dizhi[3]);
        System.out.println();

        // 1. 神煞分析
        System.out.println("========================================");
        System.out.println("【神煞分析】");
        System.out.println("========================================");
        BaziAnalyzer.ShenshaResult shensha = BaziAnalyzer.analyzeShensha(tiangan, dizhi);

        System.out.println("\n✨ 吉星列表 (" + shensha.jixing.size() + "个):");
        if (shensha.jixing.isEmpty()) {
            System.out.println("  无");
        } else {
            for (String jx : shensha.jixing) {
                System.out.println("  ✅ " + jx);
            }
        }

        System.out.println("\n⚠️ 凶神列表 (" + shensha.xiongshen.size() + "个):");
        if (shensha.xiongshen.isEmpty()) {
            System.out.println("  无");
        } else {
            for (String xs : shensha.xiongshen) {
                System.out.println("  ⛔ " + xs);
            }
        }

        System.out.println("\n📖 神煞含义:");
        shensha.meaning.forEach((name, meaning) -> {
            System.out.println("  【" + name + "】");
            System.out.println("    " + meaning);
        });

        // 2. 格局分析
        System.out.println("\n========================================");
        System.out.println("【格局分析】");
        System.out.println("========================================");
        BaziAnalyzer.GeJuResult geju = BaziAnalyzer.analyzeGeju(tiangan, dizhi);

        for (String analysis : geju.analysis) {
            System.out.println(analysis);
        }

        System.out.println("\n格局强度: " + geju.strength + "/10");

        // 3. 调候分析
        System.out.println("\n========================================");
        System.out.println("【调候分析】");
        System.out.println("========================================");
        BaziAnalyzer.TiaohouResult tiaohou = BaziAnalyzer.analyzeTiaohou(tiangan, dizhi);

        for (String analysis : tiaohou.analysis) {
            System.out.println(analysis);
        }

        // 4. 综合分析
        System.out.println("\n========================================");
        System.out.println("【综合命理分析】");
        System.out.println("========================================");
        BaziAnalyzer.ComprehensiveResult comprehensive =
            BaziAnalyzer.comprehensiveAnalysis(tiangan, dizhi, "MALE");

        System.out.println("\n【性格特征】");
        System.out.println(comprehensive.xingge);

        System.out.println("\n【事业运势】");
        System.out.println(comprehensive.shiye);

        System.out.println("\n【财运状况】");
        System.out.println(comprehensive.caiyun);

        System.out.println("\n【婚姻感情】");
        System.out.println(comprehensive.hunyin);

        System.out.println("\n【健康状况】");
        System.out.println(comprehensive.jiankang);

        System.out.println("\n【生活建议】");
        for (int i = 0; i < comprehensive.suggestions.size(); i++) {
            System.out.println(comprehensive.suggestions.get(i));
        }

        System.out.println("\n========================================");
        System.out.println("分析完成！");
        System.out.println("========================================");
    }
}
