# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**六神算派(LSSPP)** 是一个融合中华传统命理学与现代Web技术的综合占卜系统，提供八字排盘、六爻起卦、紫微斗数三大核心功能。

### 技术架构

本项目采用多层架构设计：

- **Node.js Express网关**: `production-api-server-fixed.js` 运行在8080端口，作为统一API网关，整合三大占卜算法
- **Spring Boot后端**: `lsspp-spring-boot/` 提供Java版本的占卜服务，运行在8082端口
- **React前端**: `lsspp-divination-frontend/` 使用React 18 + TypeScript + Vite构建的现代化SPA应用

### 核心占卜算法

1. **八字排盘 (BAZI)**: 基于lunar-javascript库，实现立春换年、节气边界精确计算，支持公历和农历输入
2. **六爻起卦 (LIUYAO)**: 支持时间起卦、数字起卦、铜钱起卦、手动起卦等多种方式
3. **紫微斗数 (ZIWEI)**: 十二宫位排盘和星曜分析系统

## 开发环境要求

### 前端开发
- Node.js >= 16.0.0
- npm >= 8.0.0

### 后端开发
- Java 21 (必须，pom.xml中指定)
- Maven 3.6+
- Spring Boot 3.2.0

## 构建与运行命令

### 初始化项目

```bash
# 根目录安装Node.js依赖（用于Express网关）
npm install

# 前端项目安装依赖
cd lsspp-divination-frontend
npm install

# Spring Boot后端构建
cd lsspp-spring-boot
mvn clean install
```

### 启动开发服务

**Express API网关** (推荐用于开发)：
```bash
# 在项目根目录运行，默认端口8080
node production-api-server-fixed.js

# 或使用自定义端口
PORT=8081 node production-api-server-fixed.js
```

**Spring Boot服务**：
```bash
cd lsspp-spring-boot
mvn spring-boot:run
# 默认运行在8082端口，配置位于src/main/resources/application.yml
```

**React前端**：
```bash
cd lsspp-divination-frontend
npm run dev           # 开发模式，带热重载
npm run build         # 生产构建
npm run preview       # 预览生产构建
npm run lint          # ESLint代码检查
```

### 测试命令

```bash
# Spring Boot单元测试
cd lsspp-spring-boot
mvn test              # 运行所有测试
mvn clean verify      # 完整验证（推荐在提交前执行）
```

## 项目结构详解

### Express网关 (`production-api-server-fixed.js`)

- 统一占卜计算接口: `POST /api/divination/calculate`
- 健康检查: `GET /actuator/health`
- 算法验证状态: `GET /api/validation/status`

**核心算法函数**：
- `generateFinalBaziResponse()`: 八字排盘算法，基于lunar-javascript的精确计算
- `generateAccurateLiuyaoResponse()`: 六爻起卦算法
- `generateZiweiResponse()`: 紫微斗数排盘

### Spring Boot后端结构

```
lsspp-spring-boot/src/main/java/com/lsspp/
├── api/dto/              # API数据传输对象
├── application/          # 应用层服务
├── common/
│   ├── dto/             # 通用DTO（ApiResponse, PageResponse）
│   ├── exception/       # 全局异常处理
│   └── util/            # 通用工具类
├── config/              # Spring配置（OpenApiConfig等）
├── controller/          # REST控制器
├── service/             # 业务逻辑服务
└── util/                # 业务工具类（LunarCalendarUtil等）
```

**配置文件**：
- `application.yml`: 主配置，端口8082
- `application-dev.yml`: 开发环境配置
- `application-prod.yml`: 生产环境配置

**关键配置项**：
```yaml
lsspp.divination:
  bazi.enabled: true              # 八字算法开关
  liuyao.enabled: true            # 六爻算法开关
  ziwei.enabled: true             # 紫微算法开关
  cache-enabled: true             # 缓存开关
  cache-ttl: 86400                # 缓存过期时间(秒)
```

### React前端结构

```
lsspp-divination-frontend/src/
├── api/                 # API接口层
│   ├── auth.ts         # 认证接口
│   ├── bazi.ts         # 八字接口
│   └── config.ts       # API配置（baseURL等）
├── components/          # React组件
│   ├── common/         # 通用组件
│   ├── layout/         # 布局组件
│   ├── charts/         # 图表组件
│   └── forms/          # 表单组件
├── pages/              # 页面组件
│   ├── home/           # 首页
│   ├── bazi/           # 八字排盘页面
│   ├── liuyao/         # 六爻起卦页面
│   ├── astrology/      # 占星排盘页面（西方占星）
│   └── user/           # 用户中心
├── hooks/              # 自定义React Hooks
├── store/              # 状态管理（Redux Toolkit / Zustand）
├── utils/              # 工具函数
├── types/              # TypeScript类型定义
├── styles/             # 样式文件（styled-components）
└── assets/             # 静态资源
```

**环境变量配置** (`.env.development`, `.env.production`):
```bash
VITE_API_BASE_URL=http://localhost:8080   # API基础地址
VITE_APP_TITLE=六神算派 - 专业占卜系统
VITE_APP_DEBUG=true
```

## 代码规范与约定

### TypeScript/JavaScript规范

- **缩进**: 2空格（前端），ESLint强制
- **命名**:
  - React组件: `PascalCase.tsx`
  - Hooks: `useCamelCase.ts`
  - 工具函数: `camelCase.ts`
  - 常量: `UPPER_SNAKE_CASE`
- **样式**: 使用styled-components，主题定义在`styles/theme.ts`

### Java规范

- **缩进**: 4空格
- **包结构**: 所有类必须在`com.lsspp`包下
- **命名**: PascalCase类名，camelCase方法名
- **测试**: 测试类位于`src/test/java`，镜像主代码包结构

### 占卜算法同步规则

**重要**: 八字、六爻、紫微斗数的核心算法逻辑需要在Node.js版本（Express网关）和Java版本（Spring Boot）之间保持同步。修改算法时：

1. 优先在Express网关中验证算法准确性
2. 测试通过后同步到Spring Boot版本
3. 确保两个版本的计算结果完全一致

**已知准确性**：
- 八字排盘: 100% 准确率（基于lunar-javascript + 立春换年 + 节气边界）
- 六爻起卦: 76.9% 准确率
- 紫微斗数: 模拟数据（待完善）

## 农历计算注意事项

项目依赖`lunar-javascript`库进行农历-公历转换和八字计算：

**公历输入**：
```javascript
const solar = Solar.fromYmd(2016, 12, 10);
const lunar = solar.getLunar();
```

**农历输入**：
```javascript
const lunar = Lunar.fromYmd(2016, 11, 12);  // 农历2016年十一月十二日
const solar = lunar.getSolar();              // 转为公历2016年12月10日
```

**八字计算关键方法**：
- `lunar.getYearGanByLiChun()` / `lunar.getYearZhiByLiChun()`: 立春换年的年柱
- `lunar.getMonthGanExact()` / `lunar.getMonthZhiExact()`: 节气边界的月柱
- `lunar.getDayGanExact()` / `lunar.getDayZhiExact()`: 精确日柱
- `lunar.getTimeGan()` / `lunar.getTimeZhi()`: 时柱

## API接口规范

### 统一占卜计算接口

```
POST /api/divination/calculate
Content-Type: application/json
```

**八字请求示例**：
```json
{
  "divinationType": "BAZI",
  "birthYear": 1987,
  "birthMonth": 3,
  "birthDay": 24,
  "birthHour": 11,
  "gender": "MALE",
  "lunarCalendar": false
}
```

**农历八字请求**：
```json
{
  "divinationType": "BAZI",
  "birthYear": 2016,
  "birthMonth": 11,
  "birthDay": 12,
  "birthHour": 10,
  "gender": "MALE",
  "lunarCalendar": true
}
```

**六爻请求示例**：
```json
{
  "divinationType": "LIUYAO",
  "method": "time"  // time | number | coin | manual
}
```

**紫微请求示例**：
```json
{
  "divinationType": "ZIWEI",
  "birthYear": 1990,
  "birthMonth": 1,
  "birthDay": 21,
  "birthHour": 13,
  "gender": "MALE"
}
```

## Swagger文档

Spring Boot服务提供OpenAPI文档：
- Swagger UI: `http://localhost:8082/swagger-ui.html`
- API Docs: `http://localhost:8082/api-docs`

## Git提交规范

遵循emoji-prefixed约定（参考现有提交历史）：

```
🔮 占卜功能更新
✨ 新功能
🐛 Bug修复
📝 文档更新
♻️ 代码重构
🎨 UI/样式改进
⚡ 性能优化
🧪 测试相关
```

提交信息保持简洁，主题行≤72字符。

## 历史代码归档

- `nj/`: 历史快照目录，仅在需要迁移资产时访问，不要修改
- `tmp/`: 临时文件和测试脚本，可以清理

## 部署相关

### Docker构建（Spring Boot）

```bash
cd lsspp-spring-boot
mvn clean package
docker build -t lsspp/backend-unified:1.0.0 .
```

### Nginx部署（前端）

生产构建：
```bash
cd lsspp-divination-frontend
npm run build
# 产物在 dist/ 目录
```

Nginx配置示例：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /api {
    proxy_pass http://localhost:8080;
}
```

## 健康检查

Express网关健康检查：
```bash
curl http://localhost:8080/actuator/health
```

返回包含各算法准确率的状态信息。

## 其他资源

- 前端详细README: `lsspp-divination-frontend/README.md`
- Spring Boot配置: `lsspp-spring-boot/src/main/resources/application.yml`
- 项目约定: `AGENTS.md`
