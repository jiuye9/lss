# 尊想世家 Logo 使用说明

## 📐 Logo设计元素

### 完整Logo组成（从杯子图片提取）

```
┌─────────────────────────┐
│    🛡️ 盾牌徽章          │
│   (金色边框 + 四图标)   │
│                         │
│      尊想世家           │
│  —全球限量定制发行网—   │
└─────────────────────────┘
```

**盾牌徽章内含图标：**
- 左上：AI（人工智能）
- 右上：❤️（爱心/服务）
- 左下：🛒（购物车/电商）
- 右下：👥（社交/用户）

## 🎨 Logo显示方案

### 导航栏Logo（Navbar）

**规格：**
- 容器尺寸：56x56px（w-14 h-14）
- 背景：白色半透明（bg-white/95）
- 圆角：8px（rounded-lg）
- 阴影：subtle（shadow-sm）
- 内边距：6px（p-1.5）

**图片处理：**
- 放大：150%（scale-150）
- 定位：center 45%（只显示Logo核心区域）
- 效果：裁剪掉杯子边缘，只显示盾牌+文字

**文字搭配：**
```
尊想世家             (18px, bold, 金色hover)
全球限量定制发行网    (9px, 灰色)
```

### 页脚Logo（Footer）

**规格：**
- 容器尺寸：64x64px（w-16 h-16）
- 背景：白色半透明（bg-white/95）
- 圆角：8px（rounded-lg）
- 阴影：medium（shadow-md）
- 内边距：8px（p-2）

**图片处理：**
- 放大：150%（scale-150）
- 定位：center 45%

**文字搭配：**
```
尊想世家                (20px, bold)
LUXE DREAM HOME         (10px, 灰色)
全球限量定制发行网       (9px, 更淡灰色)
```

## 💻 代码实现

### Navbar组件

```tsx
<Link href="/" className="flex items-center space-x-3 group">
  {/* Logo图标 */}
  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white/95 p-1.5 shadow-sm">
    <Image
      src="/images/logo.jpg"
      alt="尊想世家"
      fill
      className="object-contain scale-150"
      style={{ objectPosition: 'center 45%' }}
      priority
    />
  </div>

  {/* 文字信息 */}
  <div className="flex flex-col leading-tight">
    <span className="text-lg font-bold tracking-wider group-hover:text-accent-gold transition-colors"
          style={{ fontFamily: 'serif' }}>
      尊想世家
    </span>
    <span className="text-[9px] tracking-[0.15em] text-foreground/60 mt-0.5"
          style={{ fontFamily: 'serif' }}>
      全球限量定制发行网
    </span>
  </div>
</Link>
```

### Footer组件

```tsx
<div className="flex items-center space-x-3 mb-6">
  {/* Logo图标 */}
  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/95 p-2 shadow-md">
    <Image
      src="/images/logo.jpg"
      alt="尊想世家"
      fill
      className="object-contain scale-150"
      style={{ objectPosition: 'center 45%' }}
    />
  </div>

  {/* 文字信息 */}
  <div className="flex flex-col leading-tight">
    <span className="text-xl font-bold tracking-wider"
          style={{ fontFamily: 'serif' }}>
      尊想世家
    </span>
    <span className="text-[10px] tracking-[0.15em] text-foreground/60 mt-1"
          style={{ fontFamily: 'serif' }}>
      LUXE DREAM HOME
    </span>
    <span className="text-[9px] tracking-wider text-foreground/50 mt-0.5"
          style={{ fontFamily: 'serif' }}>
      全球限量定制发行网
    </span>
  </div>
</div>
```

## 🎯 关键技术要点

### 1. 图片裁剪技术

由于Logo来自杯子产品图，使用CSS实现智能裁剪：

```css
/* 放大图片，只显示中心Logo区域 */
scale-150

/* 调整对象位置，向上偏移到Logo区域 */
objectPosition: 'center 45%'

/* 容器溢出隐藏，裁剪掉杯子边缘 */
overflow-hidden
```

**效果：**
- ✅ 隐藏杯子的白色边缘
- ✅ 只显示盾牌徽章 + 文字
- ✅ 保持Logo清晰度

### 2. 背景处理

```css
/* 白色半透明背景 */
bg-white/95

/* 在深色主题下形成对比 */
/* 让Logo图案更清晰可见 */
```

### 3. 字体选择

```css
fontFamily: 'serif'
```

**原因：**
- Logo原图使用衬线字体（serif）
- 与"尊想世家"的传统气质匹配
- 保持品牌视觉统一性

## 📱 响应式适配

### 移动端（<768px）

```tsx
{/* 导航栏Logo缩小 */}
<div className="relative w-12 h-12 sm:w-14 sm:h-14 ...">

{/* 文字可选隐藏 */}
<div className="hidden sm:flex flex-col ...">
  尊想世家
</div>
```

### 平板/桌面（≥768px）

完整显示Logo + 文字

## 🎨 配色规范

### Logo颜色识别

从杯子图片提取的品牌色：

```css
--logo-gold: #D4AF37      /* 盾牌边框金色 */
--logo-brown: #8B7355     /* "尊想世家"文字棕金色 */
--logo-red: #E74C3C       /* 爱心红色 */
--logo-green: #27AE60     /* 购物车绿色 */
--logo-blue: #3498DB      /* 社交蓝色 */
--logo-purple: #9B59B6    /* AI紫色 */
```

**已在网站中应用：**
- `--accent-gold: #D4AF37`（与Logo金色一致）
- Hover效果使用金色
- 滚动条使用金色

## 🔄 Logo替换指南

### 如果需要更高清的Logo

**方案1：使用PS/AI抠图**

1. 打开 `/public/images/logo.jpg`
2. 使用魔棒工具选中白色背景
3. 删除背景（保存为PNG透明底）
4. 只保留盾牌+文字部分
5. 导出为 `logo-transparent.png`

**方案2：重新设计SVG版本**

创建 `public/images/logo.svg`：

```svg
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- 盾牌路径 -->
  <path d="..." fill="#D4AF37" />
  <!-- 内部图标 -->
  <text>AI ❤️ 🛒 👥</text>
  <!-- 品牌名称 -->
  <text>尊想世家</text>
  <text>全球限量定制发行网</text>
</svg>
```

然后更新引用：
```tsx
src="/images/logo.svg"
```

**方案3：使用AI图标生成**

使用Midjourney/DALL-E提示词：
```
luxury brand logo, shield emblem with crown,
gold and brown colors, traditional Chinese style,
text "尊想世家 LUXE DREAM HOME",
high-end e-commerce, minimalist design,
white background, 4k resolution
```

## ✅ 品牌一致性检查清单

- [x] Logo在导航栏清晰显示
- [x] Logo在页脚清晰显示
- [x] 品牌名称统一："尊想世家"
- [x] 副标题统一："全球限量定制发行网"
- [x] 英文名统一："LUXE DREAM HOME"
- [x] 金色主题色统一：#D4AF37
- [x] Hover效果使用品牌金色
- [x] 字体使用serif衬线字体

## 📊 Logo性能优化

### 当前实现

- ✅ 使用Next.js Image组件（自动优化）
- ✅ 导航栏Logo使用`priority`（优先加载）
- ✅ 白色背景容器（避免加载闪烁）
- ✅ 固定尺寸容器（避免布局偏移）

### 加载性能

```
初始加载：~50KB（杯子完整图片）
优化建议：裁剪为纯Logo PNG（预计<10KB）
```

## 🎯 未来优化建议

1. **获取透明底Logo**：
   - 联系设计师提供PNG/SVG透明底版本
   - 删除杯子背景，减小文件体积

2. **创建多尺寸Logo**：
   - `logo-small.png` (128x128) - 导航栏用
   - `logo-medium.png` (256x256) - 页脚用
   - `logo-large.png` (512x512) - 高清展示用

3. **Dark/Light模式适配**：
   - 创建两套Logo配色
   - 根据主题自动切换

4. **添加favicon**：
   ```tsx
   // app/layout.tsx
   <link rel="icon" href="/images/logo-favicon.png" />
   ```

---

**文档版本**：v1.1
**更新时间**：2024-10-12
**维护者**：尊想世家技术团队
