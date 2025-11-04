package com.lsspp.util;

import org.junit.jupiter.api.Test;
import java.util.Scanner;

/**
 * 用神计算器测试
 */
public class YongshenCalculatorTest {

    /**
     * 交互式测试 - 从命令行输入八字
     */
    @Test
    public void testInteractive() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("========================================");
        System.out.println("      用神计算器 - 交互式测试");
        System.out.println("========================================");
        System.out.println();

        while (true) {
            try {
                System.out.println("请输入八字 (格式: 年干 年支 月干 月支 日干 日支 时干 时支)");
                System.out.println("示例: 丁 卯 壬 寅 甲 子 丙 寅");
                System.out.print(">>> ");

                String input = scanner.nextLine().trim();

                if (input.equalsIgnoreCase("exit") || input.equalsIgnoreCase("quit")) {
                    System.out.println("退出测试");
                    break;
                }

                if (input.isEmpty()) {
                    continue;
                }

                // 解析输入
                String[] parts = input.split("\\s+");
                if (parts.length != 8) {
                    System.err.println("错误: 需要输入8个字符(年月日时的天干地支)");
                    continue;
                }

                String[] tiangan = {parts[0], parts[2], parts[4], parts[6]};
                String[] dizhi = {parts[1], parts[3], parts[5], parts[7]};

                // 创建输入
                YongshenCalculator.BaziInput bazi = new YongshenCalculator.BaziInput(tiangan, dizhi);

                // 计算
                YongshenCalculator.YongshenResult result = YongshenCalculator.calculateYongshen(bazi);

                // 输出详细过程
                System.out.println();
                for (String line : result.calculationDetails) {
                    System.out.println(line);
                }

                System.out.println("========================================");
                System.out.println();

            } catch (Exception e) {
                System.err.println("错误: " + e.getMessage());
                e.printStackTrace();
            }
        }

        scanner.close();
    }

    /**
     * 预设测试案例1: 丁卯 壬寅 甲子 丙寅
     */
    @Test
    public void testCase1() {
        System.out.println("\n========== 测试案例1 ==========");
        String[] tiangan = {"丁", "壬", "甲", "丙"};
        String[] dizhi = {"卯", "寅", "子", "寅"};

        YongshenCalculator.BaziInput bazi = new YongshenCalculator.BaziInput(tiangan, dizhi);
        YongshenCalculator.YongshenResult result = YongshenCalculator.calculateYongshen(bazi);

        printResult(result);
    }

    /**
     * 预设测试案例2: 庚申 戊子 己未 丙寅
     */
    @Test
    public void testCase2() {
        System.out.println("\n========== 测试案例2 ==========");
        String[] tiangan = {"庚", "戊", "己", "丙"};
        String[] dizhi = {"申", "子", "未", "寅"};

        YongshenCalculator.BaziInput bazi = new YongshenCalculator.BaziInput(tiangan, dizhi);
        YongshenCalculator.YongshenResult result = YongshenCalculator.calculateYongshen(bazi);

        printResult(result);
    }

    /**
     * 预设测试案例3: 甲子 丙寅 戊辰 壬戌
     */
    @Test
    public void testCase3() {
        System.out.println("\n========== 测试案例3 ==========");
        String[] tiangan = {"甲", "丙", "戊", "壬"};
        String[] dizhi = {"子", "寅", "辰", "戌"};

        YongshenCalculator.BaziInput bazi = new YongshenCalculator.BaziInput(tiangan, dizhi);
        YongshenCalculator.YongshenResult result = YongshenCalculator.calculateYongshen(bazi);

        printResult(result);
    }

    /**
     * 打印结果
     */
    private void printResult(YongshenCalculator.YongshenResult result) {
        for (String line : result.calculationDetails) {
            System.out.println(line);
        }
    }

    /**
     * 快速测试 - 单个八字
     */
    public static void main(String[] args) {
        if (args.length == 8) {
            // 从命令行参数读取
            String[] tiangan = {args[0], args[2], args[4], args[6]};
            String[] dizhi = {args[1], args[3], args[5], args[7]};

            YongshenCalculator.BaziInput bazi = new YongshenCalculator.BaziInput(tiangan, dizhi);
            YongshenCalculator.YongshenResult result = YongshenCalculator.calculateYongshen(bazi);

            for (String line : result.calculationDetails) {
                System.out.println(line);
            }
        } else {
            System.out.println("用法: java YongshenCalculatorTest 年干 年支 月干 月支 日干 日支 时干 时支");
            System.out.println("示例: java YongshenCalculatorTest 丁 卯 壬 寅 甲 子 丙 寅");
            System.out.println();
            System.out.println("或运行预设测试案例:");

            YongshenCalculatorTest test = new YongshenCalculatorTest();
            test.testCase1();
            System.out.println();
            test.testCase2();
            System.out.println();
            test.testCase3();
        }
    }
}
