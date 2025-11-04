package com.lsspp.util;

/**
 * 用神测试 - 1987年3月24日11:35
 */
public class YongshenTest19870324 {

    public static void main(String[] args) {
        System.out.println("\n========== 公历: 1987年3月24日 11:35 ==========");
        System.out.println("农历: 一九八七年二月廿五");
        System.out.println("生肖: 兔");
        System.out.println();

        // 八字: 丁卯 癸卯 壬申 丙午
        String[] tiangan = {"丁", "癸", "壬", "丙"};
        String[] dizhi = {"卯", "卯", "申", "午"};

        YongshenCalculator.BaziInput bazi = new YongshenCalculator.BaziInput(tiangan, dizhi);
        YongshenCalculator.YongshenResult result = YongshenCalculator.calculateYongshen(bazi);

        // 输出详细过程
        for (String line : result.calculationDetails) {
            System.out.println(line);
        }
    }
}
