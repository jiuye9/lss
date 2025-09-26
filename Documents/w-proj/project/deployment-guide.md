# GitHub Pages 部署指南

## 🚀 自动部署状态

本项目已配置GitHub Actions自动部署到GitHub Pages。部署配置包括：

- ✅ 自动化部署workflow (`.github/workflows/pages.yml`)
- ✅ 禁用Jekyll处理 (`.nojekyll`)
- ✅ 项目文档和README更新
- ✅ 所有文件已推送到main分支

## 🔧 手动配置步骤

如果网站无法访问，请按照以下步骤手动配置GitHub Pages：

### 1. 进入仓库设置

1. 打开GitHub仓库：https://github.com/jiuye9/lss
2. 点击仓库顶部的 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages** 选项

### 2. 配置Pages源

在Pages设置页面中：

1. **Source** 选择：`GitHub Actions`
2. 确认workflow文件：`.github/workflows/pages.yml`
3. 保存设置

### 3. 检查Actions运行状态

1. 回到仓库主页
2. 点击 **Actions** 选项卡
3. 查看 "Deploy to GitHub Pages" workflow是否成功运行
4. 如果失败，查看错误日志并修复

### 4. 验证部署

部署成功后，访问以下地址：

- **主页**: https://jiuye9.github.io/lss/
- **六爻排盘**: https://jiuye9.github.io/lss/liuyao-calculator.html
- **八字排盘（桌面版）**: https://jiuye9.github.io/lss/enhanced-bazi-calculator.html
- **八字排盘（移动版）**: https://jiuye9.github.io/lss/mobile-bazi-calculator.html

## 🔍 故障排除

### 常见问题及解决方案

#### 1. 404错误
- 确认仓库名称为 `lss`
- 确认文件已正确推送到main分支
- 检查文件名是否正确（区分大小写）

#### 2. Actions部署失败
- 检查workflow文件语法
- 确认仓库权限设置允许Actions
- 查看Actions日志了解具体错误

#### 3. 页面加载但样式异常
- 检查相对路径引用
- 确认CSS和JavaScript文件位置正确
- 验证浏览器控制台是否有错误

#### 4. 权限问题
在仓库设置中确认：
- Actions权限已启用
- Pages权限设置为允许GitHub Actions部署

## 📋 部署检查清单

- [ ] 仓库设置中启用GitHub Pages
- [ ] 选择GitHub Actions作为源
- [ ] workflow成功运行
- [ ] 网站可以访问
- [ ] 所有页面正常加载
- [ ] 功能测试通过

## 🆘 如需帮助

如果按照上述步骤仍无法访问，请检查：

1. GitHub仓库是否为公开仓库
2. 账户是否有GitHub Pages权限
3. 网络连接是否正常
4. 浏览器缓存是否需要清理

---

## 技术说明

本项目使用以下技术栈：
- 纯静态HTML/CSS/JavaScript
- GitHub Actions自动化部署
- 响应式设计支持多设备
- 无需服务器端处理

部署完成后，用户可以：
- 直接通过浏览器访问所有功能
- 离线使用（PWA特性）
- 在任何设备上正常运行
- 享受完整的六爻和八字排盘功能