# 六神算派 - 专业占卜系统前端

## 项目简介

六神算派是一个现代化的占卜系统，融合中华传统数术智慧与现代科技，为用户提供专业的命理占卜服务。本项目是该系统的前端部分，采用 React 18 + TypeScript + Vite 技术栈开发。

## 主要功能

### 三大核心功能模块

1. **八字排盘** 📅
   - 基于传统八字理论，精准排出四柱八字
   - 分析五行生克、十神关系、用神喜忌
   - 提供全面的命理分析和大运流年预测

2. **六爻起卦** ⚡
   - 采用正宗的六爻理论
   - 支持时间起卦、数字起卦、铜钱起卦等多种方式
   - 提供专业的断卦指导和分析

3. **占星排盘** ⭐
   - 结合西方占星学精华
   - 精准计算星盘位置，分析行星相位、宫位含义
   - 提供深入的性格和运势分析

### 用户功能

- 用户注册登录系统
- 个人资料管理
- 历史记录查看
- 结果分享功能
- 响应式设计，支持多设备访问

## 技术栈

### 核心技术

- **React 18** - 现代化 React 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的构建工具
- **Ant Design** - 企业级 UI 组件库

### 状态管理

- **React Query** - 服务器状态管理
- **Zustand** - 轻量级客户端状态管理

### 样式方案

- **Styled Components** - CSS-in-JS 解决方案
- **Framer Motion** - 动画库

### 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Husky** - Git hooks

## 项目结构

```
src/
├── api/                 # API 接口
│   ├── auth.ts         # 认证相关
│   ├── bazi.ts         # 八字排盘
│   ├── liuyao.ts       # 六爻起卦
│   ├── astrology.ts    # 占星排盘
│   └── config.ts       # API 配置
├── components/          # 组件
│   ├── common/         # 通用组件
│   ├── layout/         # 布局组件
│   ├── charts/         # 图表组件
│   └── forms/          # 表单组件
├── pages/              # 页面
│   ├── home/           # 首页
│   ├── bazi/           # 八字排盘
│   ├── liuyao/         # 六爻起卦
│   ├── astrology/      # 占星排盘
│   ├── user/           # 用户中心
│   └── auth/           # 认证页面
├── hooks/              # 自定义 Hooks
├── utils/              # 工具函数
├── types/              # TypeScript 类型定义
├── styles/             # 样式文件
├── assets/             # 静态资源
└── store/              # 状态管理
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

开发服务器将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 代码检查

```bash
npm run lint
# 或
yarn lint
```

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
```

## 环境配置

项目支持多环境配置，通过环境变量文件进行管理：

- `.env` - 通用配置
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

### 主要环境变量

```bash
# API 基础地址
VITE_API_BASE_URL=http://localhost:8080

# 应用标题
VITE_APP_TITLE=六神算派 - 专业占卜系统

# 应用版本
VITE_APP_VERSION=1.0.0

# 调试模式
VITE_APP_DEBUG=true
```

## 设计特色

### 中国传统文化元素

- 采用中国传统色彩搭配（金、红、绿等）
- 使用传统字体（思源宋体、思源黑体）
- 融入传统图案和纹样
- 遵循传统文化的视觉表达

### 现代化用户体验

- 响应式设计，适配各种设备
- 流畅的动画效果
- 直观的交互反馈
- 无障碍访问支持

### 性能优化

- 代码分割和懒加载
- 图片优化和压缩
- 缓存策略优化
- Core Web Vitals 优化

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 部署说明

### 构建命令

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 部署到 Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://your-backend-server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 开发规范

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 配置
- 组件采用函数式写法
- 优先使用 Hooks

### 命名规范

- 组件名使用 PascalCase
- 文件名使用 PascalCase（组件）或 camelCase（工具函数）
- 常量使用 UPPER_SNAKE_CASE
- CSS 类名使用 kebab-case

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 邮箱：contact@lsspp.com
- 网站：https://lsspp.com
- 微信：lsspp-service

## 更新日志

### v1.0.0 (2024-01-01)

- 🎉 初始版本发布
- ✨ 实现三大核心功能模块
- 🎨 完成 UI 设计和主题系统
- 📱 实现响应式设计
- 🔐 完成用户认证系统

---

**六神算派** - 传承千年智慧，拥抱数字未来 🌟