# 🎯 快速开始指南

欢迎使用 **Senll Wooden Puzzles** 外贸独立站!

## ⚡ 3步启动项目

### 第1步: 安装依赖

```bash
cd senll
npm install
```

*等待时间: 约2-3分钟*

### 第2步: 启动开发服务器

```bash
npm run dev
```

### 第3步: 打开浏览器

访问: **http://localhost:3000**

🎉 **完成!** 你的独立站已经运行起来了!

---

## 📂 项目核心文件说明

```
senll/
├── app/
│   ├── page.tsx              👈 首页 - 修改这里编辑首页内容
│   ├── products/page.tsx     👈 产品页 - 在这里添加/修改产品
│   ├── checkout/page.tsx     👈 结账页 - 自定义结账流程
│   ├── components/Header.tsx 👈 导航栏 - 修改网站标题和菜单
│   └── context/CartContext.tsx 👈 购物车逻辑
│
├── package.json              配置文件
├── tailwind.config.ts        主题颜色配置
└── README.md                 完整文档
```

---

## 🎨 快速自定义

### 修改网站名称

编辑 `app/components/Header.tsx`:

```tsx
<h1 className="text-2xl font-bold">🧩 你的品牌名</h1>
```

### 修改主题颜色

编辑 `tailwind.config.ts`:

```typescript
primary: {
  500: '#f97316',  // 改成你想要的颜色代码
}
```

### 添加产品

编辑 `app/products/page.tsx`,在 `products` 数组中添加:

```typescript
{
  id: 9,
  name: '新产品',
  price: 39.99,
  image: 'https://images.unsplash.com/...',
  description: '产品描述',
  category: 'kids',
  ageRange: '3-6 years',
  pieces: 48
}
```

---

## 🚀 准备部署?

最简单的方式是部署到 **Vercel** (完全免费):

1. 推送代码到GitHub
2. 访问 https://vercel.com
3. 导入项目
4. 点击部署
5. 完成! 获得免费域名

详细步骤查看: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📚 功能清单

✅ 响应式首页
✅ 产品列表页 (8款示例产品)
✅ 购物车系统 (侧边栏弹出)
✅ 结账页面
✅ 导航栏和Footer
✅ SEO优化
✅ 移动端适配
✅ 图片自动优化
✅ 一键部署配置

---

## 🆘 常见问题

**Q: 如何修改产品图片?**
A: 替换 `app/products/page.tsx` 中的 `image` URL,可使用自己的图片链接。

**Q: 购物车数据会丢失吗?**
A: 不会,数据保存在浏览器localStorage中。

**Q: 如何集成支付功能?**
A: 需要集成Stripe或PayPal API,参考README.md的"下一步优化建议"。

**Q: 可以商用吗?**
A: 完全可以! MIT许可证,自由使用。

---

## 📞 需要帮助?

- 📖 查看完整文档: [README.md](./README.md)
- 🚀 部署指南: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 💡 修改建议: 查看代码注释

---

**祝你生意兴隆!** 🎊

如有问题,随时查阅文档或搜索相关技术栈(Next.js 14, Tailwind CSS)。
