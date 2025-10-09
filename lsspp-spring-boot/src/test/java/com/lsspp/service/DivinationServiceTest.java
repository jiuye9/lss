package com.lsspp.service;

import com.lsspp.api.dto.DivinationRequest;
import com.lsspp.api.dto.DivinationResponse;
import com.lsspp.application.LssppApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 占卜服务测试类
 * 重点测试八字排盘算法的准确性
 */
@SpringBootTest(classes = LssppApplication.class)
class DivinationServiceTest {

    @Autowired
    private DivinationService divinationService;

    /**
     * 测试用例：1978年2月5日15:52
     * 预期结果：戊午 甲寅 戊戌 庚申
     */
    @Test
    void testBaziCalculation_1978_02_05_1552() {
        // 构建请求
        DivinationRequest request = DivinationRequest.builder()
            .divinationType("BAZI")
            .birthYear(1978)
            .birthMonth(2)
            .birthDay(5)
            .birthHour(15)
            .birthMinute(52)
            .gender("MALE")
            .lunarCalendar(false)
            .build();

        // 执行计算
        DivinationResponse response = divinationService.calculate(request);

        // 验证结果
        assertNotNull(response, "响应不应为空");
        assertTrue(response.isBaziResponse(), "应该返回八字响应");

        // 验证年柱：戊午
        assertEquals("戊", response.getYearColumn().getGan(), "年干应为戊");
        assertEquals("午", response.getYearColumn().getZhi(), "年支应为午");

        // 验证月柱：甲寅
        assertEquals("甲", response.getMonthColumn().getGan(), "月干应为甲");
        assertEquals("寅", response.getMonthColumn().getZhi(), "月支应为寅");

        // 验证日柱：戊戌
        assertEquals("戊", response.getDayColumn().getGan(), "日干应为戊");
        assertEquals("戌", response.getDayColumn().getZhi(), "日支应为戌");

        // 验证时柱：庚申
        assertEquals("庚", response.getHourColumn().getGan(), "时干应为庚");
        assertEquals("申", response.getHourColumn().getZhi(), "时支应为申");

        // 验证完整八字
        String bazi = response.getBaziString();
        assertEquals("戊午 甲寅 戊戌 庚申", bazi, "完整八字应为：戊午 甲寅 戊戌 庚申");

        // 输出结果
        System.out.println("========================================");
        System.out.println("测试用例：1978年2月5日15时52分");
        System.out.println("计算结果：" + bazi);
        System.out.println("预期结果：戊午 甲寅 戊戌 庚申");
        System.out.println("日主：" + response.getDayMaster() + " (" + response.getDayMasterWuxing() + ")");
        System.out.println("========================================");
    }

    /**
     * 测试已知准确的用例：1987年3月24日11时
     * 预期结果：丁卯 癸卯 壬申 丙午
     */
    @Test
    void testBaziCalculation_1987_03_24_11() {
        DivinationRequest request = DivinationRequest.builder()
            .divinationType("BAZI")
            .birthYear(1987)
            .birthMonth(3)
            .birthDay(24)
            .birthHour(11)
            .birthMinute(35)
            .gender("MALE")
            .lunarCalendar(false)
            .build();

        DivinationResponse response = divinationService.calculate(request);

        // 验证八字
        assertEquals("丁", response.getYearColumn().getGan());
        assertEquals("卯", response.getYearColumn().getZhi());
        assertEquals("癸", response.getMonthColumn().getGan());
        assertEquals("卯", response.getMonthColumn().getZhi());
        assertEquals("壬", response.getDayColumn().getGan());
        assertEquals("申", response.getDayColumn().getZhi());
        assertEquals("丙", response.getHourColumn().getGan());
        assertEquals("午", response.getHourColumn().getZhi());

        String bazi = response.getBaziString();
        assertEquals("丁卯 癸卯 壬申 丙午", bazi);

        System.out.println("========================================");
        System.out.println("测试用例：1987年3月24日11时35分");
        System.out.println("计算结果：" + bazi);
        System.out.println("预期结果：丁卯 癸卯 壬申 丙午");
        System.out.println("========================================");
    }

    /**
     * 测试农历转换：农历2016年11月12日
     * 应转换为公历2016年12月10日
     */
    @Test
    void testLunarCalendarConversion() {
        DivinationRequest request = DivinationRequest.builder()
            .divinationType("BAZI")
            .birthYear(2016)
            .birthMonth(11)
            .birthDay(12)
            .birthHour(10)
            .birthMinute(0)
            .gender("MALE")
            .lunarCalendar(true)  // 农历输入
            .build();

        DivinationResponse response = divinationService.calculate(request);

        assertNotNull(response);
        assertTrue(response.isBaziResponse());

        String bazi = response.getBaziString();
        System.out.println("========================================");
        System.out.println("测试用例：农历2016年11月12日10时");
        System.out.println("计算结果：" + bazi);
        System.out.println("日主：" + response.getDayMaster() + " (" + response.getDayMasterWuxing() + ")");
        System.out.println("========================================");
    }

    /**
     * 测试立春换年边界：1978年2月4日（立春前后）
     */
    @Test
    void testLichunBoundary_BeforeAndAfter() {
        // 立春前：应该是丁巳年
        DivinationRequest beforeLichun = DivinationRequest.builder()
            .divinationType("BAZI")
            .birthYear(1978)
            .birthMonth(2)
            .birthDay(4)
            .birthHour(6)
            .birthMinute(0)
            .gender("MALE")
            .lunarCalendar(false)
            .build();

        DivinationResponse responseBefore = divinationService.calculate(beforeLichun);
        System.out.println("========================================");
        System.out.println("立春前测试：1978年2月4日6时");
        System.out.println("计算结果：" + responseBefore.getBaziString());
        System.out.println("年柱：" + responseBefore.getYearColumn());
        System.out.println("========================================");

        // 立春后：应该是戊午年
        DivinationRequest afterLichun = DivinationRequest.builder()
            .divinationType("BAZI")
            .birthYear(1978)
            .birthMonth(2)
            .birthDay(4)
            .birthHour(18)
            .birthMinute(0)
            .gender("MALE")
            .lunarCalendar(false)
            .build();

        DivinationResponse responseAfter = divinationService.calculate(afterLichun);
        System.out.println("========================================");
        System.out.println("立春后测试：1978年2月4日18时");
        System.out.println("计算结果：" + responseAfter.getBaziString());
        System.out.println("年柱：" + responseAfter.getYearColumn());
        System.out.println("========================================");
    }

    /**
     * 测试五行分析
     */
    @Test
    void testWuxingAnalysis() {
        DivinationRequest request = DivinationRequest.builder()
            .divinationType("BAZI")
            .birthYear(1978)
            .birthMonth(2)
            .birthDay(5)
            .birthHour(15)
            .birthMinute(52)
            .gender("MALE")
            .lunarCalendar(false)
            .build();

        DivinationResponse response = divinationService.calculate(request);

        assertNotNull(response.getWuxingAnalysis(), "五行分析不应为空");

        DivinationResponse.WuxingAnalysis wuxing = response.getWuxingAnalysis();
        System.out.println("========================================");
        System.out.println("五行分析：");
        System.out.println("金：" + wuxing.getJin());
        System.out.println("木：" + wuxing.getMu());
        System.out.println("水：" + wuxing.getShui());
        System.out.println("火：" + wuxing.getHuo());
        System.out.println("土：" + wuxing.getTu());
        System.out.println("========================================");

        // 验证五行总数应该是8（4柱×2）
        int total = wuxing.getJin() + wuxing.getMu() + wuxing.getShui() +
                   wuxing.getHuo() + wuxing.getTu();
        assertEquals(8, total, "五行总数应为8");
    }
}
