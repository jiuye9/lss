package com.lsspp.api.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

/**
 * 用神分析响应
 */
@Data
public class YongshenResponse {

    /**
     * 基本信息
     */
    private BaziInfo baziInfo;

    /**
     * 五行得分
     */
    private Map<String, Double> wuxingScores;

    /**
     * 日主分析
     */
    private RizhuAnalysis rizhuAnalysis;

    /**
     * 用神结论
     */
    private YongshenConclusion yongshenConclusion;

    /**
     * 详细计算过程
     */
    private List<String> calculationDetails;

    /**
     * 八字信息
     */
    @Data
    public static class BaziInfo {
        private String[] tiangan;  // 天干
        private String[] dizhi;    // 地支
        private String bazi;       // 完整八字字符串
        private String yueling;    // 月令
        private String rizhu;      // 日主
        private String rizhuWuxing; // 日主五行
    }

    /**
     * 日主分析
     */
    @Data
    public static class RizhuAnalysis {
        private Double bijieScore;    // 比劫得分
        private Double yinxingScore;  // 印星得分
        private Double rizhuScore;    // 日主总分
        private String rizhuStatus;   // 日主状态(从强/身强/中和/身弱/从弱)
    }

    /**
     * 用神结论
     */
    @Data
    public static class YongshenConclusion {
        private String yongshen;   // 用神
        private String xishen;     // 喜神
        private String jishen;     // 忌神
        private String analysis;   // 分析说明
        private List<String> suggestions;  // 建议
    }
}
