package com.lsspp.util;

import com.nlf.calendar.Lunar;
import com.nlf.calendar.Solar;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 节气日历工具类 - 统一的农历阳历转换和节气计算
 *
 * 功能特性:
 * 1. 公历↔农历双向转换
 * 2. 精确的立春换年计算
 * 3. 节气边界精确判断
 * 4. 六十甲子干支计算
 * 5. 二十四节气查询
 * 6. 季节判断
 *
 * 适用场景:
 * - 八字排盘(四柱计算)
 * - 六爻起卦(时间起卦)
 * - 紫微斗数(农历计算)
 * - 占星排盘(节气定位)
 * - 择吉日历(黄道吉日)
 *
 * 理论依据:
 * - 《三命通会》: "立春换年,节气换月"
 * - 《渊海子平》: "月以节为界,未入节气仍属前月"
 *
 * @author LSSPP Team
 * @version 1.0.0
 * @since 2025-10-10
 */
@Slf4j
public class SolarTermsCalendar {

    // ==================== 常量定义 ====================

    /** 天干数组 */
    private static final String[] TIANGAN = {
        "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"
    };

    /** 地支数组 */
    private static final String[] DIZHI = {
        "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"
    };

    /** 二十四节气名称 */
    private static final String[] SOLAR_TERMS = {
        "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
        "立夏", "小满", "芒种", "夏至", "小暑", "大暑",
        "立秋", "处暑", "白露", "秋分", "寒露", "霜降",
        "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"
    };

    /** 四季对应的月支 */
    private static final Map<String, String> SEASON_MAP = new HashMap<>() {{
        put("寅", "春"); put("卯", "春"); put("辰", "春");
        put("巳", "夏"); put("午", "夏"); put("未", "夏");
        put("申", "秋"); put("酉", "秋"); put("戌", "秋");
        put("亥", "冬"); put("子", "冬"); put("丑", "冬");
    }};

    // ==================== 核心数据模型 ====================

    /**
     * 干支柱信息
     */
    @Data
    @Builder
    public static class GanZhiPillar {
        /** 天干 */
        private String gan;
        /** 地支 */
        private String zhi;
        /** 五行 */
        private String wuxing;
        /** 纳音 */
        private String nayin;

        @Override
        public String toString() {
            return gan + zhi;
        }
    }

    /**
     * 完整四柱信息
     */
    @Data
    @Builder
    public static class FourPillars {
        /** 年柱 */
        private GanZhiPillar yearPillar;
        /** 月柱 */
        private GanZhiPillar monthPillar;
        /** 日柱 */
        private GanZhiPillar dayPillar;
        /** 时柱 */
        private GanZhiPillar hourPillar;
        /** 季节 */
        private String season;
        /** 原始公历日期 */
        private LocalDateTime solarDateTime;
        /** 对应农历日期 */
        private LunarDate lunarDate;

        /**
         * 获取完整八字字符串
         */
        public String getBaziString() {
            return String.format("%s %s %s %s",
                yearPillar, monthPillar, dayPillar, hourPillar);
        }
    }

    /**
     * 农历日期信息
     */
    @Data
    @Builder
    public static class LunarDate {
        /** 农历年 */
        private int year;
        /** 农历月 */
        private int month;
        /** 农历日 */
        private int day;
        /** 是否闰月 */
        private boolean leapMonth;
        /** 农历年中文 */
        private String yearInChinese;
        /** 农历月中文 */
        private String monthInChinese;
        /** 农历日中文 */
        private String dayInChinese;

        @Override
        public String toString() {
            return String.format("%s年%s%s%s",
                yearInChinese,
                leapMonth ? "闰" : "",
                monthInChinese,
                dayInChinese);
        }
    }

    /**
     * 节气信息
     */
    @Data
    @Builder
    public static class SolarTermInfo {
        /** 节气名称 */
        private String name;
        /** 节气索引(0-23) */
        private int index;
        /** 节气时间 */
        private LocalDateTime dateTime;
        /** 所属月份 */
        private int month;
        /** 是否为月令节气(立春、惊蛰等) */
        private boolean isMonthStartTerm;
    }

    // ==================== 公历农历转换 ====================

    /**
     * 公历转农历
     *
     * @param dateTime 公历日期时间
     * @return 农历日期信息
     */
    public static LunarDate solarToLunar(LocalDateTime dateTime) {
        try {
            Solar solar = Solar.fromYmdHms(
                dateTime.getYear(),
                dateTime.getMonthValue(),
                dateTime.getDayOfMonth(),
                dateTime.getHour(),
                dateTime.getMinute(),
                dateTime.getSecond()
            );

            Lunar lunar = solar.getLunar();

            return LunarDate.builder()
                .year(lunar.getYear())
                .month(lunar.getMonth())
                .day(lunar.getDay())
                .leapMonth(lunar.getMonth() < 0) // 负数表示闰月
                .yearInChinese(lunar.getYearInChinese())
                .monthInChinese(lunar.getMonthInChinese())
                .dayInChinese(lunar.getDayInChinese())
                .build();

        } catch (Exception e) {
            log.error("公历转农历失败: {}", dateTime, e);
            throw new RuntimeException("公历转农历失败: " + e.getMessage(), e);
        }
    }

    /**
     * 农历转公历
     *
     * @param lunarYear 农历年
     * @param lunarMonth 农历月
     * @param lunarDay 农历日
     * @param hour 时
     * @param minute 分
     * @return 公历日期时间
     */
    public static LocalDateTime lunarToSolar(
            int lunarYear,
            int lunarMonth,
            int lunarDay,
            int hour,
            int minute) {

        try {
            Lunar lunar = Lunar.fromYmd(lunarYear, lunarMonth, lunarDay);
            Solar solar = lunar.getSolar();

            return LocalDateTime.of(
                solar.getYear(),
                solar.getMonth(),
                solar.getDay(),
                hour,
                minute
            );

        } catch (Exception e) {
            log.error("农历转公历失败: {}年{}月{}日", lunarYear, lunarMonth, lunarDay, e);
            throw new RuntimeException("农历转公历失败: " + e.getMessage(), e);
        }
    }

    // ==================== 四柱计算(核心功能) ====================

    /**
     * 计算完整四柱
     *
     * 核心算法:
     * 1. 年柱: 立春精确换年 (getYearGanByLiChun)
     * 2. 月柱: 节气精确边界 (getMonthGanExact)
     * 3. 日柱: 六十甲子轮转 (getDayGanExact)
     * 4. 时柱: 日上起时口诀 (getTimeGan)
     *
     * @param dateTime 公历日期时间
     * @return 完整四柱信息
     */
    public static FourPillars calculateFourPillars(LocalDateTime dateTime) {
        log.debug("计算四柱: {}", dateTime);

        try {
            Solar solar = Solar.fromYmdHms(
                dateTime.getYear(),
                dateTime.getMonthValue(),
                dateTime.getDayOfMonth(),
                dateTime.getHour(),
                dateTime.getMinute(),
                dateTime.getSecond()
            );

            Lunar lunar = solar.getLunar();

            // 年柱: 立春精确换年
            GanZhiPillar yearPillar = GanZhiPillar.builder()
                .gan(lunar.getYearGanByLiChun())
                .zhi(lunar.getYearZhiByLiChun())
                .wuxing(getWuxing(lunar.getYearGanByLiChun()))
                .nayin(lunar.getYearNaYin())
                .build();

            // 月柱: 节气精确边界
            GanZhiPillar monthPillar = GanZhiPillar.builder()
                .gan(lunar.getMonthGanExact())
                .zhi(lunar.getMonthZhiExact())
                .wuxing(getWuxing(lunar.getMonthGanExact()))
                .nayin(lunar.getMonthNaYin())
                .build();

            // 日柱: 精确日干支
            GanZhiPillar dayPillar = GanZhiPillar.builder()
                .gan(lunar.getDayGanExact())
                .zhi(lunar.getDayZhiExact())
                .wuxing(getWuxing(lunar.getDayGanExact()))
                .nayin(lunar.getDayNaYin())
                .build();

            // 时柱: 时干支计算
            GanZhiPillar hourPillar = GanZhiPillar.builder()
                .gan(lunar.getTimeGan())
                .zhi(lunar.getTimeZhi())
                .wuxing(getWuxing(lunar.getTimeGan()))
                .nayin(lunar.getTimeNaYin())
                .build();

            // 季节判断
            String season = getSeason(monthPillar.getZhi());

            // 农历信息
            LunarDate lunarDate = solarToLunar(dateTime);

            log.debug("四柱计算完成: {} {} {} {}",
                yearPillar, monthPillar, dayPillar, hourPillar);

            return FourPillars.builder()
                .yearPillar(yearPillar)
                .monthPillar(monthPillar)
                .dayPillar(dayPillar)
                .hourPillar(hourPillar)
                .season(season)
                .solarDateTime(dateTime)
                .lunarDate(lunarDate)
                .build();

        } catch (Exception e) {
            log.error("四柱计算失败: {}", dateTime, e);
            throw new RuntimeException("四柱计算失败: " + e.getMessage(), e);
        }
    }

    /**
     * 从农历计算四柱
     *
     * @param lunarYear 农历年
     * @param lunarMonth 农历月
     * @param lunarDay 农历日
     * @param hour 时
     * @param minute 分
     * @return 完整四柱信息
     */
    public static FourPillars calculateFourPillarsFromLunar(
            int lunarYear,
            int lunarMonth,
            int lunarDay,
            int hour,
            int minute) {

        // 先转换为公历
        LocalDateTime solarDateTime = lunarToSolar(
            lunarYear, lunarMonth, lunarDay, hour, minute);

        // 再计算四柱
        return calculateFourPillars(solarDateTime);
    }

    // ==================== 干支计算工具 ====================

    /**
     * 计算年柱(立春精确换年)
     *
     * @param dateTime 公历日期时间
     * @return 年柱干支
     */
    public static GanZhiPillar calculateYearPillar(LocalDateTime dateTime) {
        Solar solar = createSolar(dateTime);
        Lunar lunar = solar.getLunar();

        return GanZhiPillar.builder()
            .gan(lunar.getYearGanByLiChun())
            .zhi(lunar.getYearZhiByLiChun())
            .wuxing(getWuxing(lunar.getYearGanByLiChun()))
            .nayin(lunar.getYearNaYin())
            .build();
    }

    /**
     * 计算月柱(节气精确边界)
     *
     * @param dateTime 公历日期时间
     * @return 月柱干支
     */
    public static GanZhiPillar calculateMonthPillar(LocalDateTime dateTime) {
        Solar solar = createSolar(dateTime);
        Lunar lunar = solar.getLunar();

        return GanZhiPillar.builder()
            .gan(lunar.getMonthGanExact())
            .zhi(lunar.getMonthZhiExact())
            .wuxing(getWuxing(lunar.getMonthGanExact()))
            .nayin(lunar.getMonthNaYin())
            .build();
    }

    /**
     * 计算日柱
     *
     * @param dateTime 公历日期时间
     * @return 日柱干支
     */
    public static GanZhiPillar calculateDayPillar(LocalDateTime dateTime) {
        Solar solar = createSolar(dateTime);
        Lunar lunar = solar.getLunar();

        return GanZhiPillar.builder()
            .gan(lunar.getDayGanExact())
            .zhi(lunar.getDayZhiExact())
            .wuxing(getWuxing(lunar.getDayGanExact()))
            .nayin(lunar.getDayNaYin())
            .build();
    }

    /**
     * 计算时柱
     *
     * @param dateTime 公历日期时间
     * @return 时柱干支
     */
    public static GanZhiPillar calculateHourPillar(LocalDateTime dateTime) {
        Solar solar = createSolar(dateTime);
        Lunar lunar = solar.getLunar();

        return GanZhiPillar.builder()
            .gan(lunar.getTimeGan())
            .zhi(lunar.getTimeZhi())
            .wuxing(getWuxing(lunar.getTimeGan()))
            .nayin(lunar.getTimeNaYin())
            .build();
    }

    // ==================== 节气查询 ====================

    /**
     * 获取指定年份的所有节气
     *
     * @param year 公历年份
     * @return 节气列表(24个)
     */
    public static List<SolarTermInfo> getSolarTermsOfYear(int year) {
        List<SolarTermInfo> terms = new ArrayList<>();

        // 遍历24节气
        for (int i = 0; i < SOLAR_TERMS.length; i++) {
            // 简化实现: 返回节气名称列表,具体时间可后续完善
            terms.add(SolarTermInfo.builder()
                .name(SOLAR_TERMS[i])
                .index(i)
                .dateTime(null) // 可后续完善
                .month((i / 2) + 1)
                .isMonthStartTerm(i % 2 == 0)
                .build());
        }

        return terms;
    }

    /**
     * 获取指定日期所属的节气
     *
     * @param dateTime 公历日期时间
     * @return 当前所处的节气信息
     */
    public static SolarTermInfo getCurrentSolarTerm(LocalDateTime dateTime) {
        Solar solar = createSolar(dateTime);
        Lunar lunar = solar.getLunar();

        // 获取当前节气名称
        String currentTerm = lunar.getJieQi();
        int index = Arrays.asList(SOLAR_TERMS).indexOf(currentTerm);
        if (index < 0) {
            index = 0; // 默认为立春
        }

        return SolarTermInfo.builder()
            .name(currentTerm != null ? currentTerm : "未知")
            .index(index)
            .dateTime(dateTime)
            .month(dateTime.getMonthValue())
            .isMonthStartTerm(index % 2 == 0)
            .build();
    }

    /**
     * 判断是否在立春前
     *
     * @param dateTime 公历日期时间
     * @return true表示立春前,false表示立春后
     */
    public static boolean isBeforeLichun(LocalDateTime dateTime) {
        Solar solar = createSolar(dateTime);
        Lunar lunar = solar.getLunar();

        // 比较年干支是否相同
        String yearGanNormal = lunar.getYearGan();
        String yearGanByLichun = lunar.getYearGanByLiChun();

        return !yearGanNormal.equals(yearGanByLichun);
    }

    // ==================== 辅助工具方法 ====================

    /**
     * 根据月支判断季节
     *
     * @param monthZhi 月支
     * @return 季节(春/夏/秋/冬)
     */
    public static String getSeason(String monthZhi) {
        return SEASON_MAP.getOrDefault(monthZhi, "未知");
    }

    /**
     * 获取天干五行属性
     *
     * @param gan 天干
     * @return 五行
     */
    public static String getWuxing(String gan) {
        switch (gan) {
            case "甲": case "乙": return "木";
            case "丙": case "丁": return "火";
            case "戊": case "己": return "土";
            case "庚": case "辛": return "金";
            case "壬": case "癸": return "水";
            default: return "未知";
        }
    }

    /**
     * 获取地支五行属性
     *
     * @param zhi 地支
     * @return 五行
     */
    public static String getWuxingByZhi(String zhi) {
        switch (zhi) {
            case "寅": case "卯": return "木";
            case "巳": case "午": return "火";
            case "申": case "酉": return "金";
            case "亥": case "子": return "水";
            case "辰": case "戌": case "丑": case "未": return "土";
            default: return "未知";
        }
    }

    /**
     * 天干索引转天干
     *
     * @param index 索引(0-9)
     * @return 天干
     */
    public static String getTianganByIndex(int index) {
        return TIANGAN[index % 10];
    }

    /**
     * 地支索引转地支
     *
     * @param index 索引(0-11)
     * @return 地支
     */
    public static String getDizhiByIndex(int index) {
        return DIZHI[index % 12];
    }

    /**
     * 获取时辰对应的地支
     *
     * @param hour 小时(0-23)
     * @return 时辰地支
     */
    public static String getHourZhi(int hour) {
        // 23-1点为子时, 1-3点为丑时...
        int zhiIndex = ((hour + 1) / 2) % 12;
        return DIZHI[zhiIndex];
    }

    /**
     * 创建Solar对象的辅助方法
     */
    private static Solar createSolar(LocalDateTime dateTime) {
        return Solar.fromYmdHms(
            dateTime.getYear(),
            dateTime.getMonthValue(),
            dateTime.getDayOfMonth(),
            dateTime.getHour(),
            dateTime.getMinute(),
            dateTime.getSecond()
        );
    }

    // ==================== 格式化输出 ====================

    /**
     * 格式化输出四柱信息
     *
     * @param fourPillars 四柱对象
     * @return 格式化字符串
     */
    public static String formatFourPillars(FourPillars fourPillars) {
        return String.format(
            "公历: %s\n" +
            "农历: %s\n" +
            "八字: %s\n" +
            "季节: %s",
            fourPillars.getSolarDateTime(),
            fourPillars.getLunarDate(),
            fourPillars.getBaziString(),
            fourPillars.getSeason()
        );
    }

    /**
     * 获取干支详细信息的字符串
     *
     * @param pillar 干支柱
     * @return 详细信息
     */
    public static String formatPillar(GanZhiPillar pillar) {
        return String.format("%s%s(%s, %s)",
            pillar.getGan(),
            pillar.getZhi(),
            pillar.getWuxing(),
            pillar.getNayin()
        );
    }
}
