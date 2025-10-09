package com.lsspp.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/**
 * 统一API响应包装类
 *
 * 提供一致的响应格式，包含状态码、消息、数据和时间戳
 *
 * @param <T> 响应数据类型
 * @author 六算盘开发团队
 * @version 1.0.0
 */
@Schema(description = "统一API响应格式")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    @Schema(description = "响应状态码", example = "200")
    @JsonProperty("code")
    private Integer code;

    @Schema(description = "响应消息", example = "操作成功")
    @JsonProperty("message")
    private String message;

    @Schema(description = "响应数据")
    @JsonProperty("data")
    private T data;

    @Schema(description = "响应时间戳", example = "2025-10-01T10:30:00")
    @JsonProperty("timestamp")
    private LocalDateTime timestamp;

    @Schema(description = "请求ID，用于链路追踪", example = "req_123456789")
    @JsonProperty("requestId")
    private String requestId;

    @Schema(description = "响应是否成功", example = "true")
    @JsonProperty("success")
    private Boolean success;

    // 私有构造函数
    private ApiResponse() {
        this.timestamp = LocalDateTime.now();
    }

    private ApiResponse(Integer code, String message, T data, String requestId) {
        this();
        this.code = code;
        this.message = message;
        this.data = data;
        this.requestId = requestId;
        this.success = code != null && code >= 200 && code < 300;
    }

    // ========== 成功响应静态方法 ==========

    /**
     * 成功响应（带数据）
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "操作成功", data, null);
    }

    /**
     * 成功响应（带数据和消息）
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(200, message, data, null);
    }

    /**
     * 成功响应（仅消息）
     */
    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>(200, message, null, null);
    }

    /**
     * 成功响应（带数据、消息和请求ID）
     */
    public static <T> ApiResponse<T> success(T data, String message, String requestId) {
        return new ApiResponse<>(200, message, data, requestId);
    }

    // ========== 错误响应静态方法 ==========

    /**
     * 错误响应（通用）
     */
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(500, message, null, null);
    }

    /**
     * 错误响应（带状态码）
     */
    public static <T> ApiResponse<T> error(Integer code, String message) {
        return new ApiResponse<>(code, message, null, null);
    }

    /**
     * 错误响应（带状态码和请求ID）
     */
    public static <T> ApiResponse<T> error(Integer code, String message, String requestId) {
        return new ApiResponse<>(code, message, null, requestId);
    }

    // ========== 特定状态码响应方法 ==========

    /**
     * 400 - 请求参数错误
     */
    public static <T> ApiResponse<T> badRequest(String message) {
        return new ApiResponse<>(400, message, null, null);
    }

    /**
     * 401 - 未授权
     */
    public static <T> ApiResponse<T> unauthorized(String message) {
        return new ApiResponse<>(401, message != null ? message : "未授权访问", null, null);
    }

    /**
     * 403 - 禁止访问
     */
    public static <T> ApiResponse<T> forbidden(String message) {
        return new ApiResponse<>(403, message != null ? message : "禁止访问", null, null);
    }

    /**
     * 404 - 资源不存在
     */
    public static <T> ApiResponse<T> notFound(String message) {
        return new ApiResponse<>(404, message != null ? message : "资源不存在", null, null);
    }

    /**
     * 429 - 请求过于频繁
     */
    public static <T> ApiResponse<T> tooManyRequests(String message) {
        return new ApiResponse<>(429, message != null ? message : "请求过于频繁", null, null);
    }

    /**
     * 500 - 服务器内部错误
     */
    public static <T> ApiResponse<T> internalServerError(String message) {
        return new ApiResponse<>(500, message != null ? message : "服务器内部错误", null, null);
    }

    // ========== Getter 和 Setter ==========

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
        this.success = code != null && code >= 200 && code < 300;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    // ========== 工具方法 ==========

    /**
     * 检查响应是否成功
     */
    public boolean isSuccess() {
        return Boolean.TRUE.equals(success);
    }

    /**
     * 检查响应是否失败
     */
    public boolean isError() {
        return !isSuccess();
    }

    @Override
    public String toString() {
        return "ApiResponse{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                ", timestamp=" + timestamp +
                ", requestId='" + requestId + '\'' +
                ", success=" + success +
                '}';
    }
}