package com.lsspp.common.exception;

import com.lsspp.common.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.util.stream.Collectors;

/**
 * 全局异常处理器
 *
 * 统一处理应用中的各种异常，返回标准的API响应格式
 *
 * @author 六算盘开发团队
 * @version 1.0.0
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 处理业务异常
     */
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusinessException(
            BusinessException ex, HttpServletRequest request) {
        logger.warn("业务异常: {} - {}", ex.getCode(), ex.getMessage());

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.error(ex.getCode(), ex.getMessage(), requestId);

        HttpStatus status = HttpStatus.valueOf(ex.getCode());
        return ResponseEntity.status(status).body(response);
    }

    /**
     * 处理参数验证异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining("; "));

        logger.warn("参数验证失败: {}", errorMessage);

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.badRequest("参数验证失败: " + errorMessage);
        response.setRequestId(requestId);

        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 处理绑定异常
     */
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ApiResponse<Void>> handleBindException(
            BindException ex, HttpServletRequest request) {

        String errorMessage = ex.getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining("; "));

        logger.warn("参数绑定失败: {}", errorMessage);

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.badRequest("参数绑定失败: " + errorMessage);
        response.setRequestId(requestId);

        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 处理约束验证异常
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleConstraintViolationException(
            ConstraintViolationException ex, HttpServletRequest request) {

        String errorMessage = ex.getConstraintViolations().stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining("; "));

        logger.warn("约束验证失败: {}", errorMessage);

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.badRequest("约束验证失败: " + errorMessage);
        response.setRequestId(requestId);

        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 处理缺少请求参数异常
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiResponse<Void>> handleMissingServletRequestParameterException(
            MissingServletRequestParameterException ex, HttpServletRequest request) {

        logger.warn("缺少请求参数: {}", ex.getParameterName());

        String requestId = getRequestId(request);
        String message = String.format("缺少必需的请求参数: %s", ex.getParameterName());
        ApiResponse<Void> response = ApiResponse.badRequest(message);
        response.setRequestId(requestId);

        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 处理参数类型不匹配异常
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException ex, HttpServletRequest request) {

        logger.warn("参数类型不匹配: {} 应为 {}", ex.getName(), ex.getRequiredType().getSimpleName());

        String requestId = getRequestId(request);
        String message = String.format("参数 %s 类型不正确，应为 %s",
                ex.getName(), ex.getRequiredType().getSimpleName());
        ApiResponse<Void> response = ApiResponse.badRequest(message);
        response.setRequestId(requestId);

        return ResponseEntity.badRequest().body(response);
    }


    /**
     * 处理限流异常
     */
    @ExceptionHandler(RateLimitException.class)
    public ResponseEntity<ApiResponse<Void>> handleRateLimitException(
            RateLimitException ex, HttpServletRequest request) {

        logger.warn("请求限流: {}", ex.getMessage());

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.tooManyRequests(ex.getMessage());
        response.setRequestId(requestId);

        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
    }

    /**
     * 处理资源未找到异常
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(
            ResourceNotFoundException ex, HttpServletRequest request) {

        logger.warn("资源未找到: {}", ex.getMessage());

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.notFound(ex.getMessage());
        response.setRequestId(requestId);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /**
     * 处理IllegalArgumentException
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArgumentException(
            IllegalArgumentException ex, HttpServletRequest request) {

        logger.warn("非法参数: {}", ex.getMessage());

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.badRequest("参数错误: " + ex.getMessage());
        response.setRequestId(requestId);

        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 处理静态资源未找到异常（如favicon.ico等）
     */
    @ExceptionHandler(org.springframework.web.servlet.resource.NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNoResourceFoundException(
            org.springframework.web.servlet.resource.NoResourceFoundException ex, HttpServletRequest request) {

        String path = request.getRequestURI();

        // 对于常见的静态资源请求，只记录DEBUG级别日志，避免污染ERROR日志
        if (path.contains("favicon.ico") || path.contains(".well-known") || path.equals("/")) {
            logger.debug("静态资源未找到: {}", path);
        } else {
            logger.warn("资源未找到: {}", path);
        }

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.notFound("资源未找到");
        response.setRequestId(requestId);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /**
     * 处理其他所有异常
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(
            Exception ex, HttpServletRequest request) {

        logger.error("未处理的异常", ex);

        String requestId = getRequestId(request);
        ApiResponse<Void> response = ApiResponse.internalServerError("服务器内部错误，请稍后重试");
        response.setRequestId(requestId);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    /**
     * 获取请求ID
     */
    private String getRequestId(HttpServletRequest request) {
        return request.getHeader("X-Request-ID");
    }
}