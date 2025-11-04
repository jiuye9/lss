package com.lsspp.controller;

import com.lsspp.api.dto.YongshenRequest;
import com.lsspp.api.dto.YongshenResponse;
import com.lsspp.common.dto.ApiResponse;
import com.lsspp.service.YongshenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * 用神分析API
 */
@Slf4j
@RestController
@RequestMapping("/api/yongshen")
@RequiredArgsConstructor
@Tag(name = "用神分析", description = "基于百分制五行权重的用神分析API")
public class YongshenController {

    private final YongshenService yongshenService;

    /**
     * 分析用神
     */
    @PostMapping("/analyze")
    @Operation(summary = "分析用神", description = "根据八字计算用神、喜神、忌神")
    public ApiResponse<YongshenResponse> analyzeYongshen(@RequestBody YongshenRequest request) {
        log.info("收到用神分析请求: {}", request);

        try {
            YongshenResponse response = yongshenService.analyzeYongshen(request);
            return ApiResponse.success(response);
        } catch (IllegalArgumentException e) {
            log.error("用神分析失败: {}", e.getMessage());
            return ApiResponse.error(400, e.getMessage());
        } catch (Exception e) {
            log.error("用神分析异常", e);
            return ApiResponse.error(500, "用神分析失败: " + e.getMessage());
        }
    }

    /**
     * 快速测试 - 使用预设案例
     */
    @GetMapping("/test")
    @Operation(summary = "测试用神分析", description = "使用预设八字测试用神分析功能")
    public ApiResponse<YongshenResponse> testYongshen() {
        // 测试案例: 乙丑 庚辰 丙子 癸巳
        YongshenRequest request = new YongshenRequest();
        request.setTiangan(new String[]{"乙", "庚", "丙", "癸"});
        request.setDizhi(new String[]{"丑", "辰", "子", "巳"});

        return analyzeYongshen(request);
    }
}
