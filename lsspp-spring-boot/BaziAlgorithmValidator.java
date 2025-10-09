/**
 * 八字算法严格验证器
 * 基于权威万年历算法，重新校验和修正八字排盘计算
 */
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.*;

public class BaziAlgorithmValidator {

    // 天干地支数组
    private static final String[] TIANGAN = {
        "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"
    };

    private static final String[] DIZHI = {
        "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"
    };

    /**
     * 严格的年柱计算算法
     * 基于六十甲子循环，以甲子年为第1年（公元4年）
     */
    public static String calculateAccurateNianZhu(LocalDateTime dateTime) {
        int year = dateTime.getYear();
        int month = dateTime.getMonthValue();
        int day = dateTime.getDayOfMonth();

        // 判断是否过立春，未过立春算上一年
        if (month < 2 || (month == 2 && day < 4)) {
            year = year - 1;
        }

        // 六十甲子计算：以公元4年为甲子年（第1年）
        // 公式：(年份 - 4) % 60
        int cycle = (year - 4) % 60;
        if (cycle < 0) cycle += 60;

        int ganIndex = cycle % 10;
        int zhiIndex = cycle % 12;

        return TIANGAN[ganIndex] + DIZHI[zhiIndex];
    }

    /**
     * 严格的月柱计算算法
     * 基于年上起月口诀和节气
     */
    public static String calculateAccurateYueZhu(LocalDateTime dateTime) {
        String nianGan = calculateAccurateNianZhu(dateTime).substring(0, 1);
        int nianGanIndex = Arrays.asList(TIANGAN).indexOf(nianGan);

        // 确定节气月份
        int jieqiMonth = getJieqiMonth(dateTime);

        // 年上起月口诀：甲己之年丙作首
        int yueGanStartIndex;
        switch (nianGanIndex) {
            case 0: case 5: yueGanStartIndex = 2; break; // 甲、己年丙作首
            case 1: case 6: yueGanStartIndex = 4; break; // 乙、庚年戊为头
            case 2: case 7: yueGanStartIndex = 6; break; // 丙、辛年庚起头
            case 3: case 8: yueGanStartIndex = 8; break; // 丁、壬年壬为首
            case 4: case 9: yueGanStartIndex = 0; break; // 戊、癸年甲领头
            default: yueGanStartIndex = 0;
        }

        int yueGanIndex = (yueGanStartIndex + jieqiMonth - 1) % 10;
        int yueZhiIndex = (jieqiMonth - 1 + 2) % 12; // 正月建寅

        return TIANGAN[yueGanIndex] + DIZHI[yueZhiIndex];
    }

    /**
     * 严格的日柱计算算法
     * 基于儒略日算法，以1900年1月31日为甲戌日为基准
     */
    public static String calculateAccurateRiZhu(LocalDateTime dateTime) {
        LocalDate date = dateTime.toLocalDate();

        // 1900年1月31日是甲戌日，作为基准日
        LocalDate baseDate = LocalDate.of(1900, 1, 31);
        long daysDiff = java.time.temporal.ChronoUnit.DAYS.between(baseDate, date);

        // 甲戌在六十甲子中的位置：甲(0)戌(10) = 第11位（索引10）
        int baseCycle = 10;

        long totalCycle = baseCycle + daysDiff;
        int ganIndex = (int)(totalCycle % 10);
        int zhiIndex = (int)(totalCycle % 12);

        if (ganIndex < 0) ganIndex += 10;
        if (zhiIndex < 0) zhiIndex += 12;

        return TIANGAN[ganIndex] + DIZHI[zhiIndex];
    }

    /**
     * 严格的时柱计算算法
     * 基于日上起时口诀
     */
    public static String calculateAccurateShiZhu(LocalDateTime dateTime) {
        String riGan = calculateAccurateRiZhu(dateTime).substring(0, 1);
        int riGanIndex = Arrays.asList(TIANGAN).indexOf(riGan);
        int hour = dateTime.getHour();

        // 确定时辰
        int shiZhiIndex;
        if (hour >= 23 || hour < 1) shiZhiIndex = 0;      // 子时
        else if (hour < 3) shiZhiIndex = 1;               // 丑时
        else if (hour < 5) shiZhiIndex = 2;               // 寅时
        else if (hour < 7) shiZhiIndex = 3;               // 卯时
        else if (hour < 9) shiZhiIndex = 4;               // 辰时
        else if (hour < 11) shiZhiIndex = 5;              // 巳时
        else if (hour < 13) shiZhiIndex = 6;              // 午时
        else if (hour < 15) shiZhiIndex = 7;              // 未时
        else if (hour < 17) shiZhiIndex = 8;              // 申时
        else if (hour < 19) shiZhiIndex = 9;              // 酉时
        else if (hour < 21) shiZhiIndex = 10;             // 戌时
        else shiZhiIndex = 11;                            // 亥时

        // 日上起时口诀：甲己还加甲
        int shiGanStartIndex;
        switch (riGanIndex) {
            case 0: case 5: shiGanStartIndex = 0; break;  // 甲、己日甲为首
            case 1: case 6: shiGanStartIndex = 2; break;  // 乙、庚日丙为头
            case 2: case 7: shiGanStartIndex = 4; break;  // 丙、辛日戊起头
            case 3: case 8: shiGanStartIndex = 6; break;  // 丁、壬日庚为首
            case 4: case 9: shiGanStartIndex = 8; break;  // 戊、癸日壬领头
            default: shiGanStartIndex = 0;
        }

        int shiGanIndex = (shiGanStartIndex + shiZhiIndex) % 10;
        return TIANGAN[shiGanIndex] + DIZHI[shiZhiIndex];
    }

    /**
     * 获取节气月份
     */
    private static int getJieqiMonth(LocalDateTime dateTime) {
        int month = dateTime.getMonthValue();
        int day = dateTime.getDayOfMonth();

        // 简化的节气划分（精确版需要考虑具体节气时间）
        if (month == 1) return 12; // 小寒、大寒
        if (month == 2 && day < 4) return 12; // 立春前
        return month - 1; // 立春后，月份顺延
    }

    /**
     * 完整八字验证
     */
    public static String getCompleteBazi(LocalDateTime dateTime) {
        String nianZhu = calculateAccurateNianZhu(dateTime);
        String yueZhu = calculateAccurateYueZhu(dateTime);
        String riZhu = calculateAccurateRiZhu(dateTime);
        String shiZhu = calculateAccurateShiZhu(dateTime);

        return String.format("%s %s %s %s", nianZhu, yueZhu, riZhu, shiZhu);
    }

    /**
     * 主验证方法
     */
    public static void main(String[] args) {
        System.out.println("=== 八字算法严格验证 ===\n");

        // 测试案例
        LocalDateTime[] testDates = {
            LocalDateTime.of(1985, 4, 7, 10, 15),
            LocalDateTime.of(1988, 11, 26, 7, 45),
            LocalDateTime.of(1990, 1, 21, 1, 17),
            LocalDateTime.of(1987, 3, 24, 11, 35)
        };

        String[] descriptions = {
            "1985年4月7日 10:15",
            "1988年11月26日 7:45",
            "1990年1月21日 1:17",
            "1987年3月24日 11:35"
        };

        for (int i = 0; i < testDates.length; i++) {
            System.out.printf("测试 %d: %s\n", i + 1, descriptions[i]);

            String nianZhu = calculateAccurateNianZhu(testDates[i]);
            String yueZhu = calculateAccurateYueZhu(testDates[i]);
            String riZhu = calculateAccurateRiZhu(testDates[i]);
            String shiZhu = calculateAccurateShiZhu(testDates[i]);

            System.out.printf("年柱: %s (基于六十甲子循环)\n", nianZhu);
            System.out.printf("月柱: %s (基于节气划分)\n", yueZhu);
            System.out.printf("日柱: %s (基于万年历)\n", riZhu);
            System.out.printf("时柱: %s (基于时辰)\n", shiZhu);
            System.out.printf("完整八字: %s\n", getCompleteBazi(testDates[i]));
            System.out.println("─────────────────────────────────────");
        }

        // 验证六十甲子循环正确性
        System.out.println("\n=== 六十甲子循环验证 ===");
        System.out.println("1984年(甲子年): " + calculateAccurateNianZhu(LocalDateTime.of(1984, 6, 1, 0, 0)));
        System.out.println("1985年(乙丑年): " + calculateAccurateNianZhu(LocalDateTime.of(1985, 6, 1, 0, 0)));
        System.out.println("1990年(庚午年): " + calculateAccurateNianZhu(LocalDateTime.of(1990, 6, 1, 0, 0)));
        System.out.println("2044年(甲子年): " + calculateAccurateNianZhu(LocalDateTime.of(2044, 6, 1, 0, 0)));
    }
}