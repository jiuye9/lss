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

    // ===== 经典命理分析字段（源自《三命通会》《子平真诠》《渊海子平》） =====

    /**
     * 格局分析
     */
    @JsonProperty("gejuAnalysis")
    private GejuAnalysis gejuAnalysis;

    /**
     * 神煞分析
     */
    @JsonProperty("shenshaAnalysis")
    private ShenshaAnalysis shenshaAnalysis;

    /**
     * 调候分析
     */
    @JsonProperty("tiaohouAnalysis")
    private TiaohouAnalysis tiaohouAnalysis;

    /**
     * 十神分布
     */
    @JsonProperty("shishenMap")
    private Map<String, String> shishenMap;

    /**
     * 经典命理综合分析
     */
    @JsonProperty("classicalAnalysis")
    private ClassicalAnalysis classicalAnalysis;

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

        // 新增字段 - 百分制五行权重算法
        @JsonProperty("rizhuStatus")
        private String rizhuStatus;  // 日主状态: 从强/身强/中和/身弱/从弱

        @JsonProperty("rizhuScore")
        private Double rizhuScore;   // 日主得分

        @JsonProperty("wuxingScores")
        private Map<String, Double> wuxingScores;  // 五行得分

        @JsonProperty("calculationDetails")
        private List<String> calculationDetails;  // 计算详情
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
        /** 主卦六亲配置(6个,从初爻到上爻) */
        @JsonProperty("sixRelatives")
        private List<String> sixRelatives;

        /** 六神配置(6个,主卦和变卦共用) */
        @JsonProperty("sixAnimals")
        private List<String> sixAnimals;

        /** 主卦五行配置(6个,从初爻到上爻) */
        @JsonProperty("elements")
        private List<String> elements;

        /** 主卦纳甲地支(6个,从初爻到上爻) */
        @JsonProperty("najiaDizhi")
        private List<String> najiaDizhi;

        /** 变卦六亲配置(6个,从初爻到上爻) */
        @JsonProperty("changedSixRelatives")
        private List<String> changedSixRelatives;

        /** 变卦五行配置(6个,从初爻到上爻) */
        @JsonProperty("changedElements")
        private List<String> changedElements;

        /** 变卦纳甲地支(6个,从初爻到上爻) */
        @JsonProperty("changedNajiaDizhi")
        private List<String> changedNajiaDizhi;
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

    // ===== 经典命理分析嵌套类 =====

    /**
     * 格局分析（源自《子平真诠》）
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class GejuAnalysis {
        @JsonProperty("mainGeju")
        private String mainGeju;        // 主格局

        @JsonProperty("subGeju")
        private String subGeju;         // 子格局

        @JsonProperty("isZhengge")
        private Boolean isZhengge;      // 是否正格

        @JsonProperty("isCongge")
        private Boolean isCongge;       // 是否从格

        @JsonProperty("isHuage")
        private Boolean isHuage;        // 是否化格

        @JsonProperty("isZhuanwang")
        private Boolean isZhuanwang;    // 是否专旺格

        @JsonProperty("yongshen")
        private String yongshen;        // 格局用神

        @JsonProperty("xishen")
        private String xishen;          // 格局喜神

        @JsonProperty("jishen")
        private String jishen;          // 格局忌神

        @JsonProperty("analysis")
        private List<String> analysis;  // 格局分析

        @JsonProperty("strength")
        private Integer strength;       // 格局强度(1-10)
    }

    /**
     * 神煞分析（源自《三命通会》）
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ShenshaAnalysis {
        @JsonProperty("jixing")
        private List<String> jixing;           // 吉星列表

        @JsonProperty("xiongshen")
        private List<String> xiongshen;        // 凶神列表

        @JsonProperty("meaning")
        private Map<String, String> meaning;   // 神煞含义

        @JsonProperty("analysis")
        private List<String> analysis;         // 分析说明
    }

    /**
     * 调候分析（源自《子平真诠》）
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TiaohouAnalysis {
        @JsonProperty("climate")
        private String climate;           // 气候（寒、暖、燥、湿）

        @JsonProperty("tiaohou")
        private String tiaohou;           // 调候用神

        @JsonProperty("reason")
        private String reason;            // 理由

        @JsonProperty("analysis")
        private List<String> analysis;    // 分析
    }

    /**
     * 经典命理综合分析
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClassicalAnalysis {
        @JsonProperty("xingge")
        private String xingge;            // 性格分析

        @JsonProperty("shiye")
        private String shiye;             // 事业分析

        @JsonProperty("caiyun")
        private String caiyun;            // 财运分析

        @JsonProperty("hunyin")
        private String hunyin;            // 婚姻分析

        @JsonProperty("jiankang")
        private String jiankang;          // 健康分析

        @JsonProperty("suggestions")
        private List<String> suggestions; // 生活建议
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