package com.lsspp.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * LSSPP占卜系统统一后端应用启动类
 *
 * 整合八字、六爻、紫微斗数三大占卜系统的统一Spring Boot应用
 *
 * 主要功能：
 * 1. 八字排盘系统 - 基于传统八字理论的命理分析
 * 2. 六爻起卦系统 - 包含四种起卦方法的完整六爻占卜
 * 3. 紫微斗数系统 - 基于传统紫微斗数的排盘分析
 * 4. 用户管理系统 - JWT认证和RBAC权限管理
 * 5. 统一API网关 - 提供一致的REST API接口
 *
 * 技术栈：
 * - Spring Boot 3.2 + Java 21
 * - PostgreSQL 数据库
 * - Redis 缓存
 * - JWT 认证
 * - Swagger/OpenAPI 文档
 * - Docker 容器化部署
 *
 * @author LSSPP开发团队
 * @version 1.0.0
 * @since 2025-10-01
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.lsspp")
@EnableCaching
@EnableAsync
public class LssppApplication {

    public static void main(String[] args) {
        // 设置系统属性
        System.setProperty("spring.application.name", "lsspp-unified");
        System.setProperty("file.encoding", "UTF-8");

        // 启动Spring Boot应用
        SpringApplication application = new SpringApplication(LssppApplication.class);

        // 设置默认配置文件
        application.setAdditionalProfiles("default");

        // 启动应用
        var context = application.run(args);

        // 输出启动信息
        printStartupInfo(context.getEnvironment().getProperty("server.port", "8082"));
    }


    /**
     * 打印应用启动信息
     */
    private static void printStartupInfo(String port) {
        String banner = """

            ╔═══════════════════════════════════════════════════════════════╗
            ║                    六算盘统一占卜系统                          ║
            ║                  LSSPP Unified Divination System             ║
            ╠═══════════════════════════════════════════════════════════════╣
            ║  🎯 服务端口: http://localhost:%s                           ║
            ║  📚 API文档: http://localhost:%s/swagger-ui.html            ║
            ║  💚 健康检查: http://localhost:%s/actuator/health            ║
            ║  📊 监控面板: http://localhost:%s/actuator                   ║
            ╠═══════════════════════════════════════════════════════════════╣
            ║  🔮 支持的占卜系统:                                           ║
            ║    • 八字排盘 (/api/v1/bazi)                                 ║
            ║    • 六爻起卦 (/api/v1/liuyao)                               ║
            ║    • 紫微斗数 (/api/v1/ziwei)                                ║
            ║  👤 用户管理 (/api/v1/auth)                                  ║
            ║  🔧 系统管理 (/api/v1/admin)                                 ║
            ╚═══════════════════════════════════════════════════════════════╝
            """.formatted(port, port, port, port);

        System.out.println(banner);

        // 输出环境信息
        System.out.println("🚀 应用启动成功！");
        System.out.println("📋 启动时间: " + java.time.LocalDateTime.now());
        System.out.println("☕ Java版本: " + System.getProperty("java.version"));
        System.out.println("📁 工作目录: " + System.getProperty("user.dir"));
        System.out.println("💾 最大内存: " + Runtime.getRuntime().maxMemory() / 1024 / 1024 + "MB");
        System.out.println("⚡ 可用处理器: " + Runtime.getRuntime().availableProcessors() + "核");
        System.out.println();
    }
}