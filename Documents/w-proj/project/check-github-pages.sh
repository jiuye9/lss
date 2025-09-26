#!/bin/bash

echo "🔍 GitHub Pages 状态检查工具"
echo "================================"

REPO_OWNER="jiuye9"
REPO_NAME="lss"
REPO_URL="https://github.com/$REPO_OWNER/$REPO_NAME"

echo "📋 仓库信息："
echo "   仓库: $REPO_URL"
echo "   分支: main"
echo ""

echo "🌐 可能的GitHub Pages地址："
echo "   https://$REPO_OWNER.github.io/$REPO_NAME"
echo ""

echo "🔧 如果GitHub Pages不可用，请使用以下备用方案："
echo ""

echo "📦 方案1 - Netlify (推荐)："
echo "   1. 访问: https://netlify.com"
echo "   2. 使用GitHub登录"
echo "   3. 选择 'New site from Git'"
echo "   4. 选择仓库: $REPO_OWNER/$REPO_NAME"
echo "   5. 保持默认设置，点击Deploy"
echo "   6. 2-3分钟后获得访问地址"
echo ""

echo "⚡ 方案2 - Vercel："
echo "   1. 访问: https://vercel.com"
echo "   2. 使用GitHub登录"
echo "   3. 点击 'New Project'"
echo "   4. 选择仓库: $REPO_OWNER/$REPO_NAME"
echo "   5. 点击Deploy"
echo "   6. 1-2分钟后获得访问地址"
echo ""

echo "🔐 GitHub Pages故障排除："
echo "   1. 检查仓库是否为公开（私有仓库无法使用免费GitHub Pages）"
echo "   2. 进入仓库Settings > Pages"
echo "   3. 确保Source选择了'Deploy from a branch'"
echo "   4. 选择main分支和root目录"
echo "   5. 等待5-10分钟让GitHub处理"
echo ""

echo "✅ 验证部署："
echo "   访问以下路径确认功能正常："
echo "   - /index.html (主页)"
echo "   - /liuyao-calculator.html (六爻排盘)"
echo "   - /enhanced-bazi-calculator.html (八字排盘)"
echo "   - /mobile-bazi-calculator.html (手机版)"
echo ""

echo "🎯 完成！选择任一方案即可立即访问六爻排盘系统"