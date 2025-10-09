package com.lsspp.common.exception;

/**
 * 资源未找到异常类
 *
 * 当请求的资源不存在时抛出
 *
 * @author 六算盘开发团队
 * @version 1.0.0
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public static ResourceNotFoundException of(String resourceType, Object id) {
        return new ResourceNotFoundException(String.format("%s with id '%s' not found", resourceType, id));
    }
}