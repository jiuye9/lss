package com.lsspp.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;
import java.util.Map;

/**
 * 通用占卜响应DTO - 与前端期望的数据结构完全兼容
 * 基于production-api-server-fixed.js的响应格式设计
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DivinationResponse {

    // ===== 八字响应字段 =====

    /**
     * 年柱信息
     */
    @JsonProperty("yearColumn")
    private ColumnInfo yearColumn;

    /**
     * 月柱信息
     */
    @JsonProperty("monthColumn")
    private ColumnInfo monthColumn;

    /**
     * 日柱信息
     */
    @JsonProperty("dayColumn")
    private ColumnInfo dayColumn;

    /**
     * 时柱信息
     */
    @JsonProperty("hourColumn")
    private ColumnInfo hourColumn;

    /**
     * 日主天干
     */
    @JsonProperty("dayMaster")
    private String dayMaster;

    /**
     * 日主五行
     */
    @JsonProperty("dayMasterWuxing")
    private String dayMasterWuxing;

    /**
     * 五行分析
     */
    @JsonProperty("wuxingAnalysis")
    private WuxingAnalysis wuxingAnalysis;

    /**
     * 用神分析
     */
    @JsonProperty("yongshenAnalysis")
    private YongshenAnalysis yongshenAnalysis;

    /**
     * 生活建议
     */
    @JsonProperty("suggestion")
    private Suggestion suggestion;

    // ===== 六爻响应字段 =====

    /**
     * 本卦信息
     */
    @JsonProperty("originalHexagram")
    private HexagramInfo originalHexagram;

    /**
     * 变卦信息
     */
    @JsonProperty("changedHexagram")
    private HexagramInfo changedHexagram;

    /**
     * 变爻位置
     */
    @JsonProperty("changingLine")
    private Integer changingLine;

    /**
     * 世爻位置
     */
    @JsonProperty("worldLine")
    private Integer worldLine;

    /**
     * 应爻位置
     */
    @JsonProperty("responseLine")
    private Integer responseLine;

    /**
     * 六爻分析
     */
    @JsonProperty("analysis")
    private LiuyaoAnalysis analysis;

    /**
     * 预测结果
     */
    @JsonProperty("prediction")
    private String prediction;

    // ===== 紫微斗数响应字段 =====

    /**
     * 十二宫信息
     */
    @JsonProperty("palaces")
    private List<PalaceInfo> palaces;

    /**
     * 命宫位置
     */
    @JsonProperty("mainPalacePosition")
    private Integer mainPalacePosition;

    /**
     * 身宫位置
     */
    @JsonProperty("bodyPalacePosition")
    private Integer bodyPalacePosition;

    /**
     * 紫微分析
     */
    @JsonProperty("ziweiAnalysis")
    private ZiweiAnalysis ziweiAnalysis;

    /**
     * 主要星曜位置
     */
    @JsonProperty("majorStars")
    private Map<String, Integer> majorStars;

    /**
     * 建议列表
     */
    @JsonProperty("suggestions")
    private List<String> suggestions;

    // ===== 嵌套类定义 =====

    /**
     * 干支柱信息
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ColumnInfo {
        @JsonProperty("gan")
        private String gan;

        @JsonProperty("zhi")
        private String zhi;

        @JsonProperty("wuxing")
        private String wuxing;

        @Override
        public String toString() {
            return gan + zhi;
        }
    }

    /**
     * 五行分析
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class WuxingAnalysis {
        @JsonProperty("金")
        private Integer jin;

        @JsonProperty("木")
        private Integer mu;

        @JsonProperty("水")
        private Integer shui;

        @JsonProperty("火")
        private Integer huo;

        @JsonProperty("土")
        private Integer tu;
    }

    /**
     * 用神分析
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class YongshenAnalysis {
        @JsonProperty("yongshen")
        private String yongshen;

        @JsonProperty("xishen")
        private String xishen;

        @JsonProperty("jishen")
        private String jishen;

        @JsonProperty("chousen")
        private String chousen;
    }

    /**
     * 生活建议
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Suggestion {
        @JsonProperty("favorableColors")
        private List<String> favorableColors;

        @JsonProperty("favorableDirections")
        private List<String> favorableDirections;

        @JsonProperty("favorableNumbers")
        private List<Integer> favorableNumbers;

        @JsonProperty("careerSuggestions")
        private List<String> careerSuggestions;
    }

    /**
     * 卦象信息
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class HexagramInfo {
        @JsonProperty("name")
        private String name;

        @JsonProperty("lines")
        private List<String> lines;

        @JsonProperty("interpretation")
        private String interpretation;
    }

    /**
     * 六爻分析
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LiuyaoAnalysis {
        @JsonProperty("sixRelatives")
        private List<String> sixRelatives;

        @JsonProperty("sixAnimals")
        private List<String> sixAnimals;

        @JsonProperty("elements")
        private List<String> elements;
    }

    /**
     * 宫位信息
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PalaceInfo {
        @JsonProperty("name")
        private String name;

        @JsonProperty("position")
        private Integer position;

        @JsonProperty("mainStars")
        private List<String> mainStars;

        @JsonProperty("subStars")
        private List<String> subStars;

        @JsonProperty("sihua")
        private List<String> sihua;

        @JsonProperty("isMainPalace")
        private Boolean isMainPalace;

        @JsonProperty("isBodyPalace")
        private Boolean isBodyPalace;
    }

    /**
     * 紫微分析
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ZiweiAnalysis {
        @JsonProperty("personality")
        private String personality;

        @JsonProperty("career")
        private String career;

        @JsonProperty("wealth")
        private String wealth;

        @JsonProperty("marriage")
        private String marriage;

        @JsonProperty("health")
        private String health;
    }

    /**
     * 获取八字四柱字符串
     */
    public String getBaziString() {
        if (yearColumn == null || monthColumn == null || dayColumn == null || hourColumn == null) {
            return null;
        }
        return String.format("%s %s %s %s",
            yearColumn.toString(), monthColumn.toString(),
            dayColumn.toString(), hourColumn.toString());
    }

    /**
     * 判断是否为八字响应
     */
    public boolean isBaziResponse() {
        return yearColumn != null && monthColumn != null && dayColumn != null && hourColumn != null;
    }

    /**
     * 判断是否为六爻响应
     */
    public boolean isLiuyaoResponse() {
        return originalHexagram != null;
    }

    /**
     * 判断是否为紫微斗数响应
     */
    public boolean isZiweiResponse() {
        return palaces != null && !palaces.isEmpty();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("DivinationResponse{");

        if (isBaziResponse()) {
            sb.append("八字=").append(getBaziString());
            sb.append(", 日主=").append(dayMaster).append("(").append(dayMasterWuxing).append(")");
            if (yongshenAnalysis != null) {
                sb.append(", 用神=").append(yongshenAnalysis.getYongshen());
            }
        } else if (isLiuyaoResponse()) {
            sb.append("六爻=").append(originalHexagram.getName());
            if (changedHexagram != null) {
                sb.append("→").append(changedHexagram.getName());
            }
        } else if (isZiweiResponse()) {
            sb.append("紫微斗数=").append(palaces.size()).append("宫");
            sb.append(", 命宫位置=").append(mainPalacePosition);
        }

        sb.append('}');
        return sb.toString();
    }
}