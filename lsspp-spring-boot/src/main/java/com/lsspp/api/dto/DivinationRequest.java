package com.lsspp.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

/**
 * 通用占卜请求DTO - 与前端API完全兼容
 * 支持八字、六爻、紫微斗数三种占卜类型
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DivinationRequest {

    /**
     * 占卜类型：BAZI（八字）、LIUYAO（六爻）、ZIWEI（紫微斗数）
     */
    @NotBlank(message = "占卜类型不能为空")
    @JsonProperty("divinationType")
    private String divinationType;

    // ===== 八字相关字段 =====

    /**
     * 出生年份
     */
    @JsonProperty("birthYear")
    @Min(value = 1900, message = "出生年份不能早于1900年")
    @Max(value = 2100, message = "出生年份不能晚于2100年")
    private Integer birthYear;

    /**
     * 出生月份 (1-12)
     */
    @JsonProperty("birthMonth")
    @Min(value = 1, message = "出生月份必须在1-12之间")
    @Max(value = 12, message = "出生月份必须在1-12之间")
    private Integer birthMonth;

    /**
     * 出生日期 (1-31)
     */
    @JsonProperty("birthDay")
    @Min(value = 1, message = "出生日期必须在1-31之间")
    @Max(value = 31, message = "出生日期必须在1-31之间")
    private Integer birthDay;

    /**
     * 出生小时 (0-23)
     */
    @JsonProperty("birthHour")
    @Min(value = 0, message = "出生小时必须在0-23之间")
    @Max(value = 23, message = "出生小时必须在0-23之间")
    private Integer birthHour;

    /**
     * 出生分钟 (0-59)
     */
    @JsonProperty("birthMinute")
    @Min(value = 0, message = "出生分钟必须在0-59之间")
    @Max(value = 59, message = "出生分钟必须在0-59之间")
    private Integer birthMinute;

    /**
     * 性别：male（男）、female（女）
     */
    @JsonProperty("gender")
    private String gender;

    /**
     * 是否农历：true（农历）、false（公历）
     */
    @JsonProperty("lunarCalendar")
    private Boolean lunarCalendar;

    /**
     * 时区，默认 Asia/Shanghai
     */
    @JsonProperty("timezone")
    private String timezone;

    // ===== 六爻相关字段 =====

    /**
     * 六爻起卦方法：time（时间起卦）、number（数字起卦）、coin（硬币起卦）、manual（手动起卦）
     */
    @JsonProperty("method")
    private String method;

    /**
     * 数字起卦的数字
     */
    @JsonProperty("numbers")
    private Integer[] numbers;

    /**
     * 硬币起卦结果
     */
    @JsonProperty("coinResults")
    private String[] coinResults;

    /**
     * 手动起卦的爻辞
     */
    @JsonProperty("manualLines")
    private String[] manualLines;

    /**
     * 起卦问题
     */
    @JsonProperty("question")
    private String question;

    // ===== 紫微斗数相关字段 =====

    /**
     * 紫微斗数特殊参数
     */
    @JsonProperty("ziweiParams")
    private Object ziweiParams;

    /**
     * 验证请求是否为八字类型
     */
    public boolean isBaziRequest() {
        return "BAZI".equalsIgnoreCase(divinationType);
    }

    /**
     * 验证请求是否为六爻类型
     */
    public boolean isLiuyaoRequest() {
        return "LIUYAO".equalsIgnoreCase(divinationType);
    }

    /**
     * 验证请求是否为紫微斗数类型
     */
    public boolean isZiweiRequest() {
        return "ZIWEI".equalsIgnoreCase(divinationType);
    }

    /**
     * 获取完整的出生时间字符串
     */
    public String getBirthTimeString() {
        if (birthYear == null || birthMonth == null || birthDay == null || birthHour == null) {
            return null;
        }

        int minute = birthMinute != null ? birthMinute : 0;
        String calendarType = Boolean.TRUE.equals(lunarCalendar) ? "农历" : "公历";

        return String.format("%s%04d年%02d月%02d日%02d时%02d分",
            calendarType, birthYear, birthMonth, birthDay, birthHour, minute);
    }

    /**
     * 验证八字请求的必要字段
     */
    public boolean isValidBaziRequest() {
        return isBaziRequest() &&
               birthYear != null && birthMonth != null &&
               birthDay != null && birthHour != null;
    }

    /**
     * 验证六爻请求的必要字段
     */
    public boolean isValidLiuyaoRequest() {
        if (!isLiuyaoRequest() || method == null) {
            return false;
        }

        switch (method.toLowerCase()) {
            case "time":
                return true; // 时间起卦无需额外参数
            case "number":
                return numbers != null && numbers.length >= 2; // 数字起卦需要至少2个数字
            case "coin":
                return coinResults != null && coinResults.length == 6;
            case "manual":
                return manualLines != null && manualLines.length == 6;
            default:
                return false;
        }
    }

    /**
     * 获取请求摘要信息
     */
    public String getRequestSummary() {
        StringBuilder summary = new StringBuilder();
        summary.append("占卜类型: ").append(divinationType);

        if (isBaziRequest()) {
            summary.append(", 出生时间: ").append(getBirthTimeString());
        } else if (isLiuyaoRequest()) {
            summary.append(", 起卦方法: ").append(method);
            if (question != null && !question.trim().isEmpty()) {
                summary.append(", 问题: ").append(question);
            }
        } else if (isZiweiRequest()) {
            summary.append(", 出生时间: ").append(getBirthTimeString());
        }

        return summary.toString();
    }

    @Override
    public String toString() {
        return "DivinationRequest{" +
               "type=" + divinationType +
               ", summary='" + getRequestSummary() + '\'' +
               '}';
    }
}