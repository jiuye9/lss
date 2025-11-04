package com.lsspp.util;

import com.lsspp.util.SolarTermsCalendar.*;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 节气日历工具类测试
 */
class SolarTermsCalendarTest {

    /**
     * 测试公历转农历
     */
    @Test
    void testSolarToLunar() {
        LocalDateTime solar = LocalDateTime.of(2016, 12, 10, 10, 0);
        LunarDate lunar = SolarTermsCalendar.solarToLunar(solar);

        assertNotNull(lunar);
        assertEquals(2016, lunar.getYear());
        assertEquals(11, lunar.getMonth());
        assertEquals(12, lunar.getDay());
        assertFalse(lunar.isLeapMonth());

        System.out.println("========================================");
        System.out.println("公历转农历测试:");
        System.out.println("公历: 2016年12月10日");
        System.out.println("农历: " + lunar);
        System.out.println("========================================");
    }

    /**
     * 测试农历转公历
     */
    @Test
    void testLunarToSolar() {
        LocalDateTime solar = SolarTermsCalendar.lunarToSolar(
            2016, 11, 12, 10, 0);

        assertNotNull(solar);
        assertEquals(2016, solar.getYear());
        assertEquals(12, solar.getMonthValue());
        assertEquals(10, solar.getDayOfMonth());

        System.out.println("========================================");
        System.out.println("农历转公历测试:");
        System.out.println("农历: 2016年11月12日");
        System.out.println("公历: " + solar);
        System.out.println("========================================");
    }

    /**
     * 测试完整四柱计算 - 1978年2月5日15:52
     * 预期: 戊午 甲寅 戊戌 庚申
     */
    @Test
    void testCalculateFourPillars_1978() {
        LocalDateTime dateTime = LocalDateTime.of(1978, 2, 5, 15, 52);
        FourPillars fourPillars = SolarTermsCalendar.calculateFourPillars(dateTime);

        assertNotNull(fourPillars);

        // 验证年柱
        assertEquals("戊", fourPillars.getYearPillar().getGan());
        assertEquals("午", fourPillars.getYearPillar().getZhi());

        // 验证月柱
        assertEquals("甲", fourPillars.getMonthPillar().getGan());
        assertEquals("寅", fourPillars.getMonthPillar().getZhi());

        // 验证日柱
        assertEquals("戊", fourPillars.getDayPillar().getGan());
        assertEquals("戌", fourPillars.getDayPillar().getZhi());

        // 验证时柱
        assertEquals("庚", fourPillars.getHourPillar().getGan());
        assertEquals("申", fourPillars.getHourPillar().getZhi());

        // 验证季节
        assertEquals("春", fourPillars.getSeason());

        System.out.println("========================================");
        System.out.println("四柱计算测试 - 1978年2月5日15:52");
        System.out.println(SolarTermsCalendar.formatFourPillars(fourPillars));
        System.out.println("========================================");
    }

    /**
     * 测试完整四柱计算 - 1987年3月24日11:35
     * 预期: 丁卯 癸卯 壬申 丙午
     */
    @Test
    void testCalculateFourPillars_1987() {
        LocalDateTime dateTime = LocalDateTime.of(1987, 3, 24, 11, 35);
        FourPillars fourPillars = SolarTermsCalendar.calculateFourPillars(dateTime);

        assertEquals("丁", fourPillars.getYearPillar().getGan());
        assertEquals("卯", fourPillars.getYearPillar().getZhi());
        assertEquals("癸", fourPillars.getMonthPillar().getGan());
        assertEquals("卯", fourPillars.getMonthPillar().getZhi());
        assertEquals("壬", fourPillars.getDayPillar().getGan());
        assertEquals("申", fourPillars.getDayPillar().getZhi());
        assertEquals("丙", fourPillars.getHourPillar().getGan());
        assertEquals("午", fourPillars.getHourPillar().getZhi());

        assertEquals("丁卯 癸卯 壬申 丙午", fourPillars.getBaziString());

        System.out.println("========================================");
        System.out.println("四柱计算测试 - 1987年3月24日11:35");
        System.out.println(SolarTermsCalendar.formatFourPillars(fourPillars));
        System.out.println("========================================");
    }

    /**
     * 测试从农历计算四柱
     */
    @Test
    void testCalculateFourPillarsFromLunar() {
        FourPillars fourPillars = SolarTermsCalendar.calculateFourPillarsFromLunar(
            2016, 11, 12, 10, 0);

        assertNotNull(fourPillars);

        System.out.println("========================================");
        System.out.println("农历四柱计算测试 - 农历2016年11月12日10时");
        System.out.println(SolarTermsCalendar.formatFourPillars(fourPillars));
        System.out.println("========================================");
    }

    /**
     * 测试立春换年边界
     */
    @Test
    void testLichunBoundary() {
        // 立春前
        LocalDateTime beforeLichun = LocalDateTime.of(1978, 2, 4, 6, 0);
        FourPillars before = SolarTermsCalendar.calculateFourPillars(beforeLichun);

        // 立春后
        LocalDateTime afterLichun = LocalDateTime.of(1978, 2, 4, 18, 0);
        FourPillars after = SolarTermsCalendar.calculateFourPillars(afterLichun);

        System.out.println("========================================");
        System.out.println("立春换年边界测试:");
        System.out.println("\n立春前(6:00):");
        System.out.println("年柱: " + before.getYearPillar());
        System.out.println("月柱: " + before.getMonthPillar());
        System.out.println("季节: " + before.getSeason());

        System.out.println("\n立春后(18:00):");
        System.out.println("年柱: " + after.getYearPillar());
        System.out.println("月柱: " + after.getMonthPillar());
        System.out.println("季节: " + after.getSeason());
        System.out.println("========================================");

        // 验证月柱变化
        assertNotEquals(before.getMonthPillar().getZhi(),
                       after.getMonthPillar().getZhi(),
                       "立春前后月柱应该不同");

        // 验证季节变化
        assertNotEquals(before.getSeason(), after.getSeason(),
                       "立春前后季节应该不同");
    }

    /**
     * 测试年柱单独计算
     */
    @Test
    void testCalculateYearPillar() {
        LocalDateTime dateTime = LocalDateTime.of(1978, 2, 5, 15, 52);
        GanZhiPillar yearPillar = SolarTermsCalendar.calculateYearPillar(dateTime);

        assertEquals("戊", yearPillar.getGan());
        assertEquals("午", yearPillar.getZhi());
        assertEquals("土", yearPillar.getWuxing());
        assertNotNull(yearPillar.getNayin());

        System.out.println("========================================");
        System.out.println("年柱计算: " + SolarTermsCalendar.formatPillar(yearPillar));
        System.out.println("========================================");
    }

    /**
     * 测试节气查询
     */
    @Test
    void testGetSolarTermsOfYear() {
        List<SolarTermInfo> terms = SolarTermsCalendar.getSolarTermsOfYear(2024);

        assertNotNull(terms);
        assertFalse(terms.isEmpty());

        System.out.println("========================================");
        System.out.println("2024年节气列表:");
        for (SolarTermInfo term : terms) {
            System.out.printf("%s: %s (%s)\n",
                term.getName(),
                term.getDateTime(),
                term.isMonthStartTerm() ? "月令节气" : "中气");
        }
        System.out.println("========================================");
    }

    /**
     * 测试当前节气查询
     */
    @Test
    void testGetCurrentSolarTerm() {
        LocalDateTime dateTime = LocalDateTime.of(2024, 2, 10, 12, 0);
        SolarTermInfo term = SolarTermsCalendar.getCurrentSolarTerm(dateTime);

        assertNotNull(term);
        assertNotNull(term.getName());

        System.out.println("========================================");
        System.out.println("2024年2月10日所处节气: " + term.getName());
        System.out.println("========================================");
    }

    /**
     * 测试是否在立春前
     */
    @Test
    void testIsBeforeLichun() {
        LocalDateTime before = LocalDateTime.of(2024, 1, 15, 12, 0);
        LocalDateTime after = LocalDateTime.of(2024, 3, 15, 12, 0);

        boolean beforeResult = SolarTermsCalendar.isBeforeLichun(before);
        boolean afterResult = SolarTermsCalendar.isBeforeLichun(after);

        System.out.println("========================================");
        System.out.println("2024年1月15日在立春前? " + beforeResult);
        System.out.println("2024年3月15日在立春前? " + afterResult);
        System.out.println("========================================");
    }

    /**
     * 测试季节判断
     */
    @Test
    void testGetSeason() {
        assertEquals("春", SolarTermsCalendar.getSeason("寅"));
        assertEquals("春", SolarTermsCalendar.getSeason("卯"));
        assertEquals("春", SolarTermsCalendar.getSeason("辰"));

        assertEquals("夏", SolarTermsCalendar.getSeason("巳"));
        assertEquals("夏", SolarTermsCalendar.getSeason("午"));
        assertEquals("夏", SolarTermsCalendar.getSeason("未"));

        assertEquals("秋", SolarTermsCalendar.getSeason("申"));
        assertEquals("秋", SolarTermsCalendar.getSeason("酉"));
        assertEquals("秋", SolarTermsCalendar.getSeason("戌"));

        assertEquals("冬", SolarTermsCalendar.getSeason("亥"));
        assertEquals("冬", SolarTermsCalendar.getSeason("子"));
        assertEquals("冬", SolarTermsCalendar.getSeason("丑"));
    }

    /**
     * 测试五行查询
     */
    @Test
    void testGetWuxing() {
        assertEquals("木", SolarTermsCalendar.getWuxing("甲"));
        assertEquals("木", SolarTermsCalendar.getWuxing("乙"));
        assertEquals("火", SolarTermsCalendar.getWuxing("丙"));
        assertEquals("火", SolarTermsCalendar.getWuxing("丁"));
        assertEquals("土", SolarTermsCalendar.getWuxing("戊"));
        assertEquals("土", SolarTermsCalendar.getWuxing("己"));
        assertEquals("金", SolarTermsCalendar.getWuxing("庚"));
        assertEquals("金", SolarTermsCalendar.getWuxing("辛"));
        assertEquals("水", SolarTermsCalendar.getWuxing("壬"));
        assertEquals("水", SolarTermsCalendar.getWuxing("癸"));
    }

    /**
     * 测试时辰地支查询
     */
    @Test
    void testGetHourZhi() {
        assertEquals("子", SolarTermsCalendar.getHourZhi(23));
        assertEquals("子", SolarTermsCalendar.getHourZhi(0));
        assertEquals("丑", SolarTermsCalendar.getHourZhi(1));
        assertEquals("寅", SolarTermsCalendar.getHourZhi(3));
        assertEquals("卯", SolarTermsCalendar.getHourZhi(5));
        assertEquals("辰", SolarTermsCalendar.getHourZhi(7));
        assertEquals("巳", SolarTermsCalendar.getHourZhi(9));
        assertEquals("午", SolarTermsCalendar.getHourZhi(11));
        assertEquals("未", SolarTermsCalendar.getHourZhi(13));
        assertEquals("申", SolarTermsCalendar.getHourZhi(15));
        assertEquals("酉", SolarTermsCalendar.getHourZhi(17));
        assertEquals("戌", SolarTermsCalendar.getHourZhi(19));
        assertEquals("亥", SolarTermsCalendar.getHourZhi(21));
    }

    /**
     * 批量验证经典案例
     */
    @Test
    void testMultipleCases() {
        // 案例1: 1978年2月5日15:52
        testCase(1978, 2, 5, 15, 52, "戊午 甲寅 戊戌 庚申");

        // 案例2: 1987年3月24日11:35
        testCase(1987, 3, 24, 11, 35, "丁卯 癸卯 壬申 丙午");

        // 案例3: 1985年4月7日9:0
        testCase(1985, 4, 7, 9, 0, "乙丑 庚辰 丙子 癸巳");

        // 案例4: 1990年1月21日13:0
        testCase(1990, 1, 21, 13, 0, "己巳 丁丑 丙戌 乙未");
    }

    /**
     * 辅助测试方法
     */
    private void testCase(int year, int month, int day, int hour, int minute,
                         String expected) {
        LocalDateTime dateTime = LocalDateTime.of(year, month, day, hour, minute);
        FourPillars fourPillars = SolarTermsCalendar.calculateFourPillars(dateTime);

        String actual = fourPillars.getBaziString();

        System.out.println("========================================");
        System.out.printf("测试用例: %d年%d月%d日%d时%d分\n",
            year, month, day, hour, minute);
        System.out.println("预期八字: " + expected);
        System.out.println("实际八字: " + actual);
        System.out.println("结果: " + (expected.equals(actual) ? "✅ 通过" : "❌ 失败"));
        System.out.println("========================================");

        assertEquals(expected, actual, "八字计算结果应该匹配");
    }
}
