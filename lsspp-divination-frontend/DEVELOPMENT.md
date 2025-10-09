# 开发指南

## 项目概述

六神算派占卜系统前端项目已经创建完成，采用现代化的 React 18 + TypeScript + Vite 技术栈。项目结构清晰，功能模块化，支持响应式设计和多端适配。

## 已完成功能

### ✅ 基础架构

1. **项目初始化**
   - Vite + React + TypeScript 项目架构
   - 路径别名配置
   - 环境变量配置
   - 构建优化配置

2. **开发工具配置**
   - TypeScript 严格模式配置
   - ESLint 和 Prettier 配置
   - Git 忽略文件配置
   - 开发/生产环境区分

### ✅ 设计系统和组件库

1. **主题系统**
   - 中国传统文化色彩搭配
   - 明暗主题切换支持
   - 响应式断点配置
   - Ant Design 主题定制

2. **通用组件**
   - Button 组件（多种变体，支持渐变和传统样式）
   - Card 组件（统计卡片、特性卡片、传统卡片）
   - 全局样式系统
   - 动画效果集成

### ✅ 布局和导航

1. **应用布局**
   - 顶部导航栏（Logo、主题切换、用户菜单）
   - 侧边栏导航（可折叠，移动端抽屉式）
   - 底部信息栏
   - 响应式布局适配

2. **路由系统**
   - React Router v6 配置
   - 路由懒加载
   - 页面切换动画
   - 404 页面处理

### ✅ 核心页面

1. **首页**
   - 英雄区域（品牌介绍）
   - 功能特色展示
   - 统计数据展示
   - 快速操作入口
   - 精美的动画效果

2. **占位页面**
   - 八字排盘页面
   - 六爻起卦页面
   - 占星排盘页面
   - 用户中心页面
   - 登录注册页面

### ✅ API 集成

1. **API 配置**
   - Axios 实例配置
   - 请求/响应拦截器
   - 错误处理机制
   - Token 管理

2. **API 模块**
   - 认证相关 API
   - 八字排盘 API
   - 其他模块 API 结构

### ✅ 工具和 Hooks

1. **自定义 Hooks**
   - useTheme（主题管理）
   - useResponsive（响应式）
   - 设备类型检测

2. **TypeScript 类型定义**
   - 完整的数据类型定义
   - API 响应类型
   - 组件 Props 类型

## 下一步开发计划

### 🚧 待开发功能（按优先级排序）

#### 1. 八字排盘功能模块 [高优先级]

```typescript
// 需要实现的组件和页面：
src/pages/bazi/
├── BaziCalculator.tsx      // 八字计算器
├── BaziForm.tsx           // 输入表单
├── BaziResult.tsx         // 结果展示
├── BaziChart.tsx          // 八字排盘图
├── WuxingAnalysis.tsx     // 五行分析
├── ShishenAnalysis.tsx    // 十神分析
└── DayunAnalysis.tsx      // 大运分析
```

**功能要点：**
- 出生信息输入（日期、时间、地点）
- 阳历/农历转换
- 四柱八字计算
- 五行分析雷达图
- 十神关系可视化
- 用神分析
- 大运流年预测

#### 2. 六爻起卦功能模块 [高优先级]

```typescript
// 需要实现的组件和页面：
src/pages/liuyao/
├── LiuyaoMethods.tsx      // 起卦方式选择
├── TimeMethod.tsx         // 时间起卦
├── NumberMethod.tsx       // 数字起卦
├── CoinMethod.tsx         // 铜钱起卦
├── ManualMethod.tsx       // 手动起卦
├── HexagramDisplay.tsx    // 卦象展示
├── YaoAnalysis.tsx        // 爻位分析
└── DivinationResult.tsx   // 占卜结果
```

**功能要点：**
- 四种起卦方式
- 本卦/变卦显示
- 纳甲配地支
- 六亲六神分析
- 世应位置标识
- 动爻静爻分析

#### 3. 占星排盘功能模块 [中优先级]

```typescript
// 需要实现的组件和页面：
src/pages/astrology/
├── AstrologyCalculator.tsx  // 占星计算器
├── StarChart.tsx           // 星盘图
├── PlanetPositions.tsx     // 行星位置
├── HouseAnalysis.tsx       // 宫位分析
├── AspectAnalysis.tsx      // 相位分析
└── AstrologyReport.tsx     // 占星报告
```

**功能要点：**
- 出生信息和地理位置输入
- 圆形星盘绘制
- 行星位置计算
- 宫位系统
- 相位分析
- 性格特征分析

#### 4. 用户系统和个人中心 [中优先级]

```typescript
// 需要实现的组件和页面：
src/pages/user/
├── LoginForm.tsx          // 登录表单
├── RegisterForm.tsx       // 注册表单
├── ProfilePage.tsx        // 个人资料
├── HistoryPage.tsx        // 历史记录
├── FavoritesPage.tsx      // 收藏夹
└── SettingsPage.tsx       // 设置页面

src/pages/auth/
├── LoginPage.tsx          // 登录页面
├── RegisterPage.tsx       // 注册页面
├── ForgotPassword.tsx     // 忘记密码
└── ResetPassword.tsx      // 重置密码
```

**功能要点：**
- 用户注册登录
- 个人资料管理
- 占卜历史记录
- 结果收藏功能
- 账户设置
- 密码重置

#### 5. 数据可视化组件 [中优先级]

```typescript
// 需要实现的组件：
src/components/charts/
├── WuxingRadar.tsx        // 五行雷达图
├── ShishenPie.tsx         // 十神饼图
├── LiuyaoHexagram.tsx     // 六爻卦象图
├── AstrologyWheel.tsx     // 占星轮盘
├── TimelineChart.tsx      // 时间线图表
└── StatisticsChart.tsx    // 统计图表
```

#### 6. 辅助功能模块 [低优先级]

```typescript
// 需要实现的功能：
src/pages/tools/
├── Calendar.tsx           // 万年历
├── Converter.tsx          // 历法转换
├── Calculator.tsx         // 数理计算
└── Reference.tsx          // 参考资料

src/pages/help/
├── Tutorial.tsx           // 使用教程
├── FAQ.tsx               // 常见问题
├── Glossary.tsx          // 术语解释
└── Contact.tsx           // 联系我们
```

## 开发建议

### 1. 开发顺序

建议按以下顺序进行开发：

1. **完善现有基础组件**
   - 添加 Loading 组件
   - 添加 Modal 组件
   - 添加 Form 组件
   - 完善错误边界处理

2. **实现八字排盘功能**（最核心功能）
   - 先实现基础的输入和计算
   - 再添加可视化图表
   - 最后完善高级分析功能

3. **实现六爻起卦功能**
   - 从时间起卦开始
   - 逐步添加其他起卦方式
   - 完善卦象展示和分析

4. **其他功能模块**
   - 并行开发用户系统和占星功能
   - 最后添加辅助工具和帮助页面

### 2. 技术要点

#### 八字算法集成

```typescript
// 建议创建单独的算法库
src/utils/algorithms/
├── bazi/
│   ├── calendar.ts        // 历法转换
│   ├── ganzhi.ts         // 干支计算
│   ├── wuxing.ts         // 五行分析
│   ├── shishen.ts        // 十神计算
│   └── dayun.ts          // 大运计算
├── liuyao/
│   ├── hexagram.ts       // 卦象生成
│   ├── najia.ts          // 纳甲系统
│   ├── liuqin.ts         // 六亲关系
│   └── analysis.ts       // 卦象分析
└── astrology/
    ├── ephemeris.ts      // 星历计算
    ├── houses.ts         // 宫位系统
    ├── aspects.ts        // 相位计算
    └── interpretation.ts // 解释系统
```

#### 图表可视化

建议使用以下技术栈：
- Chart.js + react-chartjs-2（基础图表）
- D3.js（复杂的自定义图表）
- Canvas API（八字排盘表格）
- SVG（六爻卦象图）

#### 数据管理

建议使用以下方案：
- React Query（服务器状态）
- Zustand（客户端状态）
- LocalStorage（本地缓存）

### 3. 性能优化

- 使用 React.memo 优化组件渲染
- 实现虚拟滚动（历史记录列表）
- 图片懒加载
- 代码分割和懒加载
- PWA 支持（离线使用）

### 4. 测试策略

```typescript
// 建议的测试结构
__tests__/
├── components/           // 组件测试
├── pages/               // 页面测试
├── utils/               // 工具函数测试
├── algorithms/          // 算法测试
└── integration/         // 集成测试
```

- 单元测试：算法函数、工具函数
- 组件测试：React Testing Library
- 集成测试：用户交互流程
- E2E 测试：关键业务流程

## 部署和发布

### 1. 构建配置

- 生产环境优化
- CDN 资源配置
- Gzip 压缩
- 浏览器缓存策略

### 2. CI/CD 流程

```yaml
# 建议的 GitHub Actions 配置
.github/workflows/
├── ci.yml              // 持续集成
├── deploy-staging.yml  // 测试环境部署
└── deploy-prod.yml     // 生产环境部署
```

### 3. 监控和分析

- 错误监控（Sentry）
- 性能监控（Web Vitals）
- 用户行为分析
- SEO 优化

## 联系和支持

如有开发问题或需要技术支持，请通过以下方式联系：

- 邮箱：dev@lsspp.com
- 项目 Issues：GitHub Issues
- 技术交流群：加入开发者群组

---

**开发愉快！** 🚀