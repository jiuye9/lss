# 尊享定制 - 高端定制产品官网

一个使用 Next.js 15 构建的现代化、高端的定制产品官网模板。

## ✨ 特性

- 🎨 **高端设计风格** - 深色主题 + 金色点缀,呈现奢华质感
- 📱 **完全响应式** - 适配所有设备屏幕尺寸
- ⚡ **性能优化** - 使用 Next.js 15 + Turbopack,极速加载
- 🎭 **流畅动画** - 精心设计的过渡动画和交互效果
- 🔍 **SEO 友好** - 优化的元数据和语义化 HTML
- 💎 **TypeScript** - 类型安全的代码

## 🛠️ 技术栈

- **框架**: Next.js 15.5.4 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **字体**: Geist Sans & Geist Mono
- **代码规范**: ESLint 9

## 📦 项目结构

```
zxsj/
├── app/
│   ├── components/          # React 组件
│   │   ├── Navbar.tsx      # 导航栏（固定顶部,滚动效果）
│   │   ├── HeroBanner.tsx  # 首页大Banner（轮播,3张）
│   │   ├── Features.tsx    # 品牌优势展示（4项特色）
│   │   ├── ProductShowcase.tsx  # 产品展示网格（4个系列）
│   │   ├── BrandStory.tsx  # 品牌故事时间线
│   │   └── Footer.tsx      # 页脚（链接 + 社交媒体）
│   ├── globals.css         # 全局样式（主题颜色、动画）
│   ├── layout.tsx          # 根布局（导航栏 + 页脚）
│   └── page.tsx            # 首页
├── public/                 # 静态资源目录
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 设计系统

### 配色方案

```css
--background: #0a0a0a      /* 深黑色背景 */
--foreground: #f5f5f5      /* 浅白色文字 */
--accent-gold: #d4af37     /* 金色强调色 */
--accent-silver: #c0c0c0   /* 银色辅助色 */
--muted: #171717           /* 次级背景 */
--border: #2a2a2a          /* 边框颜色 */
```

### 核心组件说明

#### 1. Navbar（导航栏）
- 固定顶部,滚动时显示毛玻璃背景
- 响应式设计,移动端汉堡菜单
- 包含7个主导航链接
- CTA按钮:"立即咨询"

#### 2. HeroBanner（首页大Banner）
- 全屏高度轮播
- 3张轮播图,自动切换（5秒间隔）
- 渐变文字标题
- 双按钮CTA:"探索作品" + "预约咨询"
- 底部导航点 + 滚动指示器

#### 3. Features（品牌优势）
- 4个特色卡片网格布局
- 图标 + 标题 + 描述
- Hover悬停效果（边框变金色、卡片阴影）
- 背景装饰性渐变球

#### 4. ProductShowcase（产品展示）
- 4个产品系列卡片
- 图片占位 + 渐变蒙版
- Hover显示详细信息和"查看详情"按钮
- "查看全部产品"按钮

#### 5. BrandStory（品牌故事）
- 左右两栏布局（图片 + 内容）
- 时间线展示4个重要里程碑
- 浮动统计卡片:"130+年品牌历史"
- 装饰性边框元素

#### 6. CTA Section（行动号召）
- 大标题 + 副标题
- 双按钮:"立即预约咨询" + "查看更多案例"
- 底部4个统计数据（满意客户、全球城市等）

#### 7. Footer（页脚）
- 5列链接（品牌介绍 + 产品/服务/公司/法律）
- 社交媒体图标（微信、微博、抖音、小红书）
- 底部版权信息 + 备案号

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3001](http://localhost:3001) 查看效果。

### 生产构建

```bash
npm run build
npm run start
```

## 📝 定制指南

### 修改配色

编辑 `app/globals.css` 中的 CSS 变量:

```css
:root {
  --accent-gold: #你的颜色;
  --accent-silver: #你的颜色;
  /* ... */
}
```

### 修改导航链接

编辑 `app/components/Navbar.tsx` 中的 `navLinks` 数组:

```typescript
const navLinks = [
  { name: '你的链接', href: '/your-path' },
  // ...
];
```

### 添加真实图片

将图片放入 `public/images/` 目录,然后更新组件中的图片路径:

```typescript
// HeroBanner.tsx
image: '/images/your-banner-image.jpg'

// ProductShowcase.tsx
image: '/images/your-product-image.jpg'
```

### 修改 SEO 信息

编辑 `app/layout.tsx` 中的 `metadata`:

```typescript
export const metadata: Metadata = {
  title: "你的网站标题",
  description: "你的网站描述",
  keywords: "你的关键词",
};
```

## 🎯 后续开发建议

### 可以添加的页面（10-15个页面）

1. **关于我们** (`/about`) - 详细品牌介绍
2. **产品中心** (`/products`) - 产品分类列表
3. **产品详情** (`/products/[id]`) - 动态路由详情页
4. **定制服务** (`/custom`) - 定制流程介绍
5. **案例展示** (`/cases`) - 作品集/案例研究
6. **新闻资讯** (`/news`) - 博客列表
7. **新闻详情** (`/news/[id]`) - 博客文章详情
8. **联系我们** (`/contact`) - 联系表单 + 地图
9. **隐私政策** (`/privacy`)
10. **服务条款** (`/terms`)
11. **退换政策** (`/returns`)
12. **招聘信息** (`/careers`)

### 推荐集成的功能

- 📧 **联系表单**: 使用 [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- 🗺️ **地图**: 集成 [高德地图](https://lbs.amap.com/) 或 Google Maps
- 📷 **图片优化**: 使用 Next.js `<Image>` 组件
- 🎬 **视频**: 添加产品/品牌视频展示
- 💬 **在线客服**: 集成客服系统（如美洽、Intercom）
- 📊 **数据分析**: Google Analytics 或百度统计
- 🔐 **用户系统**: 会员登录/注册（如需要）

### UI 组件库推荐

如果需要更多 UI 组件,可以安装:

```bash
# shadcn/ui（推荐）
npx shadcn@latest init

# 或者 Radix UI
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**创建时间**: 2024
**技术支持**: Next.js 15 + TypeScript + Tailwind CSS
