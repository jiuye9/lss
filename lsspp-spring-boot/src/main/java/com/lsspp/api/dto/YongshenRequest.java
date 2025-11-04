package com.lsspp.api.dto;

import lombok.Data;

/**
 * 用神分析请求
 */
@Data
public class YongshenRequest {

    /**
     * 八字 - 可以直接提供八字
     */
    private String[] tiangan;  // 天干数组 [年,月,日,时]
    private String[] dizhi;    // 地支数组 [年,月,日,时]

    /**
     * 或者提供出生信息自动排盘
     */
    private Integer birthYear;
    private Integer birthMonth;
    private Integer birthDay;
    private Integer birthHour;
    private Integer birthMinute;
    private Boolean lunarCalendar = false;  // 是否农历
    private String gender;  // 性别(可选)
}
