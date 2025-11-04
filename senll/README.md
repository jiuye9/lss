# 🧩 Senll Wooden Puzzles - 外贸独立站

一个现代化的木制拼图电商独立站,专为国际市场设计,采用Next.js 14 + TypeScript + Tailwind CSS构建。

## ✨ 特性

- 🎨 **现代UI设计**: 简洁优雅的界面,完美适配移动端和桌面端
- 🛒 **购物车系统**: 完整的购物车功能,支持本地存储持久化
- 💳 **结账流程**: 简洁的结账页面,收集必要的配送信息
- 🌍 **SEO优化**: 服务端渲染(SSR)确保Google搜索引擎友好
- 🚀 **零配置部署**: 支持一键部署到Vercel、Netlify等云平台
- 📱 **响应式设计**: 完美支持手机、平板和桌面设备
- ⚡ **性能优化**: 自动图片优化、代码分割、懒加载

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Context API
- **图片**: Next.js Image优化
- **部署**: Vercel / Docker

## 📦 项目结构

```
senll/
├── app/                      # Next.js App Router
│   ├── components/          # React组件
│   │   └── Header.tsx       # 导航栏和购物车
│   ├── context/             # Context状态管理
│   │   └── CartContext.tsx  # 购物车Context
│   ├── products/            # 产品列表页
│   ├── checkout/            # 结账页
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   └── globals.css          # 全局样式
├── public/                   # 静态资源
├── package.json             # 项目依赖
├── next.config.js           # Next.js配置
├── tailwind.config.ts       # Tailwind配置
├── tsconfig.json            # TypeScript配置
├── Dockerfile               # Docker部署配置
└── vercel.json              # Vercel部署配置
```

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 8.0 或更高版本

### 安装依赖

```bash
cd senll
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:3000` 查看网站。

### 生产构建

```bash
npm run build
npm start
```

## 🌐 部署指南

### 部署到Vercel (推荐)

1. 将代码推送到GitHub仓库
2. 访问 [Vercel](https://vercel.com) 并导入项目
3. Vercel会自动检测Next.js并配置构建设置
4. 点击Deploy即可完成部署
5. 获得免费的 `https://your-project.vercel.app` 域名

**优势**:
- 免费托管
- 自动SSL证书
- 全球CDN加速
- 自动Git集成
- 零配置部署

### 部署到Netlify

```bash
npm run build
```

将 `.next` 目录部署到Netlify。

### Docker部署

```bash
# 构建镜像
docker build -t senll-store .

# 运行容器
docker run -p 3000:3000 senll-store
```

### 云服务器部署 (阿里云/AWS/DigitalOcean)

```bash
# 安装Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 克隆项目并安装依赖
git clone <your-repo>
cd senll
npm install
npm run build

# 使用PM2运行
npm install -g pm2
pm2 start npm --name "senll" -- start
pm2 startup
pm2 save
```

## 📄 核心功能说明

### 购物车系统

- 使用React Context API进行全局状态管理
- LocalStorage持久化存储
- 支持添加、删除、修改数量
- 实时计算总价
- 侧边栏弹出式购物车

### 产品展示

- 8款木制拼图产品
- 产品图片使用Unsplash高质量图片
- 产品分类标签(儿童、教育、成人)
- 适龄范围显示
- 拼图块数标注

### 结账流程

- 收集配送信息(姓名、地址、邮箱、电话)
- 订单摘要展示
- 表单验证
- Demo模式(不实际处理支付)

## 🔧 自定义配置

### 修改主题颜色

编辑 `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#fef6ee',
    500: '#f97316',  // 主色调
    600: '#ea580c',
    700: '#c2410c',
  },
}
```

### 添加产品

编辑 `app/page.tsx` 或 `app/products/page.tsx`,在 `products` 数组中添加:

```typescript
{
  id: 9,
  name: '新产品名称',
  price: 29.99,
  image: 'https://images.unsplash.com/...',
  description: '产品描述',
  category: 'kids',
  ageRange: '3-6 years',
  pieces: 36
}
```

### 集成支付网关

在 `app/checkout/page.tsx` 的 `handleSubmit` 函数中集成支付API:

```typescript
// 示例: Stripe集成
const response = await fetch('/api/create-payment-intent', {
  method: 'POST',
  body: JSON.stringify({ amount: cartTotal * 100 })
})
```

## 🌍 国际化 (i18n)

项目已配置多语言支持框架,可在 `next.config.js` 中添加更多语言:

```javascript
i18n: {
  locales: ['en', 'zh', 'es', 'fr'],
  defaultLocale: 'en',
}
```

## 📈 SEO优化

- 每个页面都有独立的metadata配置
- OpenGraph标签支持社交媒体分享
- 语义化HTML标签
- 服务端渲染确保搜索引擎可爬取

## 🔒 安全性

- 环境变量管理(.env.local)
- 表单输入验证
- XSS防护(Next.js内置)
- HTTPS强制(Vercel自动配置)

## 📞 技术支持

如需帮助或有问题,请通过以下方式联系:

- GitHub Issues
- Email: support@senll.com (示例)

## 📝 许可证

MIT License - 可自由用于商业项目

## 🎯 下一步优化建议

1. **集成真实支付网关**: Stripe、PayPal、支付宝国际版
2. **添加后端API**: 使用Next.js API Routes或独立后端
3. **数据库集成**: Supabase、MongoDB、PostgreSQL
4. **用户认证**: NextAuth.js
5. **订单管理系统**: 后台管理面板
6. **邮件通知**: 订单确认邮件
7. **多语言内容**: i18n完整实现
8. **分析工具**: Google Analytics、Facebook Pixel
9. **客服系统**: Intercom、Zendesk
10. **评论系统**: 产品评价和评分

---

**立即开始销售你的木制拼图产品!** 🚀
