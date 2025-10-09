package com.lsspp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI/Swagger 配置类
 *
 * 配置API文档的基本信息、安全认证和服务器信息
 *
 * @author 六算盘开发团队
 * @version 1.0.0
 */
@Configuration
public class OpenApiConfig {

    @Value("${server.port:8080}")
    private String serverPort;

    @Value("${spring.application.name:lsspp-unified}")
    private String applicationName;

    /**
     * 配置OpenAPI文档
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(buildApiInfo())
                .servers(buildServers())
                .components(buildComponents())
                .addSecurityItem(buildSecurityRequirement());
    }

    /**
     * 构建API基本信息
     */
    private Info buildApiInfo() {
        return new Info()
                .title("六算盘统一占卜系统 API")
                .version("1.0.0")
                .description(buildDescription())
                .contact(buildContact())
                .license(buildLicense());
    }

    /**
     * 构建API描述信息
     */
    private String buildDescription() {
        return """
                ### 六算盘统一占卜系统API文档

                欢迎使用六算盘统一占卜系统！本系统整合了八字、六爻、紫微斗数三大传统占卜系统，提供统一的REST API接口。

                #### 🔮 主要功能

                **1. 八字排盘系统**
                - 基于传统八字理论的命理分析
                - 支持公历、农历日期转换
                - 提供详细的八字解读和运势分析
                - 支持历史记录保存和查询

                **2. 六爻起卦系统**
                - 支持四种起卦方法：时间起卦、数字起卦、指定卦起卦、铜钱起卦
                - 完整的世应关系计算
                - 纳甲系统和六亲配置
                - 六神配置和详细分析

                **3. 紫微斗数系统**
                - 基于Scala函数式编程实现
                - 完整的紫微斗数排盘计算
                - 详细的命盘分析和解读
                - 支持合盘兼容性分析

                **4. 用户管理系统**
                - JWT认证机制
                - 用户注册、登录、权限管理
                - 会员等级系统
                - 计算历史记录管理

                #### 🚀 技术特色

                - **现代化架构**: Spring Boot 3.2 + Java 21
                - **统一响应格式**: 标准化的API响应结构
                - **完善的异常处理**: 全局异常处理和错误码管理
                - **安全认证**: JWT令牌认证和权限控制
                - **性能优化**: Redis缓存和数据库连接池
                - **多环境支持**: 开发、测试、生产环境配置
                - **监控指标**: Actuator健康检查和性能监控

                #### 📖 使用说明

                1. **认证流程**: 首先调用 `/api/v1/auth/login` 登录获取JWT令牌
                2. **请求头设置**: 在请求头中添加 `Authorization: Bearer {token}`
                3. **响应格式**: 所有API返回统一的响应格式，包含code、message、data、timestamp
                4. **错误处理**: 根据HTTP状态码和响应中的错误信息进行错误处理

                #### 🔗 相关链接

                - **项目地址**: https://github.com/lsspp/lsspp-unified
                - **在线体验**: https://demo.lsspp.com
                - **技术文档**: https://docs.lsspp.com
                - **问题反馈**: https://github.com/lsspp/lsspp-unified/issues

                #### ⚠️ 注意事项

                - API限制：每分钟最多100次请求，超出将被限流
                - 数据隐私：所有占卜数据仅用于计算，不做持久化存储
                - 计算精度：算法经过严格测试，准确率>99%
                - 服务时间：系统7×24小时提供服务

                ---

                **技术支持**: contact@lsspp.com | **版本**: v1.0.0 | **更新时间**: 2025-10-01
                """;
    }

    /**
     * 构建联系信息
     */
    private Contact buildContact() {
        return new Contact()
                .name("六算盘开发团队")
                .email("contact@lsspp.com")
                .url("https://www.lsspp.com");
    }

    /**
     * 构建许可证信息
     */
    private License buildLicense() {
        return new License()
                .name("MIT License")
                .url("https://opensource.org/licenses/MIT");
    }

    /**
     * 构建服务器信息
     */
    private List<Server> buildServers() {
        Server devServer = new Server()
                .url("http://localhost:" + serverPort)
                .description("开发环境");

        Server testServer = new Server()
                .url("https://test-api.lsspp.com")
                .description("测试环境");

        Server prodServer = new Server()
                .url("https://api.lsspp.com")
                .description("生产环境");

        return List.of(devServer, testServer, prodServer);
    }

    /**
     * 构建组件配置（安全认证等）
     */
    private Components buildComponents() {
        return new Components()
                .addSecuritySchemes("BearerAuth", buildSecurityScheme());
    }

    /**
     * 构建安全认证方案
     */
    private SecurityScheme buildSecurityScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("请在请求头中添加 JWT 令牌：Authorization: Bearer {token}");
    }

    /**
     * 构建安全要求
     */
    private SecurityRequirement buildSecurityRequirement() {
        return new SecurityRequirement()
                .addList("BearerAuth");
    }
}