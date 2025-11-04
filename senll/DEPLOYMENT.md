# 🚀 部署指南

## 快速部署到Vercel (推荐方式 - 3分钟完成)

### 步骤1: 准备Git仓库

```bash
cd senll
git init
git add .
git commit -m "Initial commit: Senll Wooden Puzzles Store"
```

### 步骤2: 推送到GitHub

1. 在GitHub创建新仓库
2. 推送代码:

```bash
git remote add origin https://github.com/your-username/senll.git
git branch -M main
git push -u origin main
```

### 步骤3: 部署到Vercel

1. 访问 https://vercel.com
2. 点击 "New Project"
3. 导入你的GitHub仓库
4. Vercel会自动检测Next.js配置
5. 点击 "Deploy"
6. 等待1-2分钟,完成!

**你将获得**:
- 免费的 `https://senll.vercel.app` 域名
- 自动HTTPS/SSL证书
- 全球CDN加速
- 每次git push自动部署

### 步骤4: 绑定自定义域名 (可选)

1. 在Vercel项目设置中添加域名
2. 在域名DNS添加CNAME记录指向 `cname.vercel-dns.com`
3. 等待DNS生效(通常几分钟)

---

## 部署到Netlify

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 构建项目
npm run build

# 部署
netlify deploy --prod
```

---

## 部署到云服务器 (VPS)

### 使用PM2 (适用于阿里云/腾讯云/AWS EC2/DigitalOcean)

```bash
# 1. 在服务器上安装Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 克隆项目
git clone https://github.com/your-username/senll.git
cd senll

# 3. 安装依赖并构建
npm install
npm run build

# 4. 安装PM2
sudo npm install -g pm2

# 5. 启动应用
pm2 start npm --name "senll-store" -- start

# 6. 设置开机自启
pm2 startup
pm2 save

# 7. 查看状态
pm2 status
pm2 logs senll-store
```

### 配置Nginx反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 配置SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Docker部署

### 本地测试

```bash
# 构建镜像
docker build -t senll-store .

# 运行容器
docker run -p 3000:3000 senll-store

# 访问 http://localhost:3000
```

### 部署到Docker Hub

```bash
# 登录Docker Hub
docker login

# 构建并推送
docker build -t your-username/senll-store:latest .
docker push your-username/senll-store:latest
```

### 在服务器上运行

```bash
docker pull your-username/senll-store:latest
docker run -d -p 3000:3000 --name senll --restart unless-stopped your-username/senll-store:latest
```

---

## 部署检查清单

部署前请确认:

- [ ] 环境变量已配置 (如有需要)
- [ ] 产品图片和资源已准备
- [ ] 域名DNS已配置
- [ ] SSL证书已启用
- [ ] SEO metadata已自定义
- [ ] Google Analytics已集成 (如需要)
- [ ] 404/500错误页面已测试
- [ ] 移动端响应式已测试
- [ ] 购物车功能已测试
- [ ] 结账流程已测试

---

## 性能优化建议

部署后优化:

1. **启用CDN**: Vercel自带,其他平台可使用Cloudflare
2. **图片优化**: 已使用Next.js Image自动优化
3. **代码分割**: Next.js自动处理
4. **Gzip压缩**: 大多数平台默认启用
5. **缓存策略**: 配置浏览器缓存头

---

## 监控和维护

推荐工具:

- **性能监控**: Vercel Analytics, Google Lighthouse
- **错误追踪**: Sentry
- **正常运行时间监控**: UptimeRobot, Pingdom
- **日志管理**: Vercel Logs, Logtail

---

## 成本估算

| 平台 | 免费额度 | 付费起步 |
|------|---------|---------|
| Vercel | 100GB带宽/月 | $20/月 |
| Netlify | 100GB带宽/月 | $19/月 |
| 阿里云ECS | 无 | ¥100/月 |
| DigitalOcean | 无 | $6/月 |

**推荐**: 初期使用Vercel免费版,流量增长后升级或迁移到VPS。

---

需要帮助? 查看 [README.md](./README.md) 了解更多信息。
