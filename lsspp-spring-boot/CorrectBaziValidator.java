/**
 * 基于已知正确答案反向工程正确的八字算法
 */
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.*;

public class CorrectBaziValidator {

    private static final String[] TIANGAN = {
        "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"
    };

    private static final String[] DIZHI = {
        "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"
    };

    public static void main(String[] args) {
        System.out.println("=== 反向工程正确的日柱算法 ===\n");

        // 已知的正确答案
        LocalDateTime testDate = LocalDateTime.of(1987, 3, 24, 11, 35);
        String correctRiZhu = "壬申";

        System.out.println("已知正确答案: 1987年3月24日 = " + correctRiZhu);

        // 尝试不同的基准日期
        testDifferentBaselines(testDate, correctRiZhu);

        // 测试其他已知答案
        System.out.println("\n=== 验证其他已知答案 ===");

        // 根据搜索到的信息，尝试1583年1月1日为壬辰日的算法
        testWithNewBaseline();
    }

    private static void testDifferentBaselines(LocalDateTime testDate, String correctRiZhu) {
        LocalDate date = testDate.toLocalDate();

        // 尝试几个可能的基准日期
        LocalDate[] baseDates = {
            LocalDate.of(1900, 1, 1),    // 甲戌日？
            LocalDate.of(1583, 1, 1),    // 壬辰日？
            LocalDate.of(1900, 2, 18),   // 可能的甲子日
            LocalDate.of(1901, 1, 1)     // 另一个可能基准
        };

        String[] baseGanZhi = {
            "甲戌", "壬辰", "甲子", "辛卯"
        };

        for (int i = 0; i < baseDates.length; i++) {
            long daysDiff = java.time.temporal.ChronoUnit.DAYS.between(baseDates[i], date);

            // 计算基准干支在六十甲子中的位置
            String baseGZ = baseGanZhi[i];
            int baseGanIndex = Arrays.asList(TIANGAN).indexOf(baseGZ.substring(0, 1));
            int baseZhiIndex = Arrays.asList(DIZHI).indexOf(baseGZ.substring(1, 2));
            int baseCycle = baseGanIndex * 12 + baseZhiIndex;

            // 修正六十甲子位置计算
            baseCycle = (baseGanIndex * 6 + baseZhiIndex) % 60;

            long totalCycle = baseCycle + daysDiff;
            int ganIndex = (int)(totalCycle % 10);
            int zhiIndex = (int)(totalCycle % 12);

            if (ganIndex < 0) ganIndex += 10;
            if (zhiIndex < 0) zhiIndex += 12;

            String result = TIANGAN[ganIndex] + DIZHI[zhiIndex];

            System.out.printf("基准: %s %s, 相差%d天, 计算结果: %s %s\n",
                baseDates[i], baseGZ, daysDiff, result,
                result.equals(correctRiZhu) ? "✓" : "✗");
        }
    }

    private static void testWithNewBaseline() {
        // 使用1583年1月1日为壬辰日的算法
        LocalDate baseDate = LocalDate.of(1583, 1, 1); // 壬辰日

        LocalDateTime[] testDates = {
            LocalDateTime.of(1987, 3, 24, 11, 35),
            LocalDateTime.of(1985, 4, 7, 10, 15),
            LocalDateTime.of(1988, 11, 26, 7, 45),
            LocalDateTime.of(1990, 1, 21, 1, 17)
        };

        String[] expectedResults = {
            "壬申", "丙午", "乙卯", "丙辰"  // 根据已知答案
        };

        // 壬辰 = 壬(8) + 辰(4) = 在60甲子中的位置需要计算
        // 壬(8), 辰(4) -> 在60甲子循环中的位置
        int basePos = findPositionInSixtyJiazi("壬", "辰");

        System.out.println("壬辰在六十甲子中的位置: " + basePos);

        for (int i = 0; i < testDates.length; i++) {
            LocalDate date = testDates[i].toLocalDate();
            long daysDiff = java.time.temporal.ChronoUnit.DAYS.between(baseDate, date);

            long totalPos = (basePos + daysDiff) % 60;
            if (totalPos < 0) totalPos += 60;

            String result = getSixtyJiaziByPosition((int)totalPos);

            System.out.printf("%s: 期望=%s, 计算=%s %s\n",
                testDates[i].toLocalDate(), expectedResults[i], result,
                result.equals(expectedResults[i]) ? "✓" : "✗");
        }
    }

    private static int findPositionInSixtyJiazi(String gan, String zhi) {
        int ganIndex = Arrays.asList(TIANGAN).indexOf(gan);
        int zhiIndex = Arrays.asList(DIZHI).indexOf(zhi);

        // 六十甲子的正确计算方法
        for (int i = 0; i < 60; i++) {
            if (i % 10 == ganIndex && i % 12 == zhiIndex) {
                return i;
            }
        }
        return -1;
    }

    private static String getSixtyJiaziByPosition(int pos) {
        int ganIndex = pos % 10;
        int zhiIndex = pos % 12;
        return TIANGAN[ganIndex] + DIZHI[zhiIndex];
    }
}