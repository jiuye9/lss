package com.lsspp.util;

/**
 * 自定义用神测试
 */
public class YongshenTestCustom {

    public static void main(String[] args) {
        // 测试八字: 乙丑 庚辰 丙子 癸巳
        System.out.println("\n========== 测试八字: 乙丑 庚辰 丙子 癸巳 ==========\n");

        String[] tiangan = {"乙", "庚", "丙", "癸"};
        String[] dizhi = {"丑", "辰", "子", "巳"};

        YongshenCalculator.BaziInput bazi = new YongshenCalculator.BaziInput(tiangan, dizhi);
        YongshenCalculator.YongshenResult result = YongshenCalculator.calculateYongshen(bazi);

        // 输出详细过程
        for (String line : result.calculationDetails) {
            System.out.println(line);
        }
    }
}
