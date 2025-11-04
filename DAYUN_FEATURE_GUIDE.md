# 🌊 大运排布功能使用指南

## ✅ 功能已完成集成

大运排布功能已成功添加到LSSPP六神算派占卜系统的八字排盘页面中，位置在**用神分析板块下方**，**经典命理分析板块上方**。

---

## 📍 访问方式

### 前端地址
```
http://localhost:3000/bazi
```

### API地址
```
POST http://localhost:8080/api/divination/calculate
或
POST http://localhost:8082/api/divination/calculate
```

---

## 🎨 前端展示效果

### 1. 大运排布板块结构

```
┌─────────────────────────────────────────────────┐
│  🌊 十步大运排布                                │
├─────────────────────────────────────────────────┤
│  【起运信息】                                   │
│  • 起运年龄：4岁 0月 20天                       │
│  • 排运方向：顺排 / 逆排                        │
│  • 月柱：癸卯                                   │
├─────────────────────────────────────────────────┤
│  【大运详解】                                   │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐      │
│  │ 起运前│ │ 甲辰  │ │ 乙巳  │ │ 丙午 ⭐│      │
│  │ 1-4岁 │ │ 5-14岁│ │15-24岁│ │25-34岁│      │
│  │1987-  │ │1991-  │ │2001-  │ │2011-  │      │
│  │ 1990  │ │ 2000  │ │ 2010  │ │ 2020  │      │
│  └───────┘ └───────┘ └───────┘ └───────┘      │
│  ...（共10步大运）                              │
├─────────────────────────────────────────────────┤
│  💡 大运说明                                    │
│  • 大运每步管10年，从月柱开始顺/逆推            │
│  • 顺排规则：阳年生男或阴年生女                 │
│  • 逆排规则：阴年生男或阳年生女                 │
│  • 起运年龄：出生到下一个节气的天数÷3           │
│  • ⭐标记为当前大运，代表现阶段运程             │
└─────────────────────────────────────────────────┘
```

### 2. 当前大运高亮显示

- **渐变紫色背景**：当前大运卡片使用紫色渐变背景
- **金色边框**：2px金色边框突出显示
- **星标徽章**：右上角金色星标⭐标记

### 3. 响应式布局

- 使用Ant Design的Grid系统
- 每行显示4个大运卡片
- 移动端自动适配

---

## 📊 数据结构

### API返回的大运数据格式

```json
{
  "dayunAnalysis": {
    "qiyunAge": 4,
    "qiyunMonth": 0,
    "qiyunDay": 20,
    "isForward": true,
    "dayunList": [
      {
        "step": 1,
        "ganZhi": "起运前",
        "startAge": 1,
        "endAge": 4,
        "startYear": 1987,
        "endYear": 1990,
        "isCurrent": false
      },
      {
        "step": 2,
        "ganZhi": "甲辰",
        "startAge": 5,
        "endAge": 14,
        "startYear": 1991,
        "endYear": 2000,
        "isCurrent": false
      },
      {
        "step": 5,
        "ganZhi": "丁未",
        "startAge": 35,
        "endAge": 44,
        "startYear": 2021,
        "endYear": 2030,
        "isCurrent": true
      }
      // ... 共10步大运
    ]
  }
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `qiyunAge` | Integer | 起运年龄（岁） |
| `qiyunMonth` | Integer | 起运月份（0-11） |
| `qiyunDay` | Integer | 起运天数 |
| `isForward` | Boolean | 是否顺排（true=顺排，false=逆排） |
| `dayunList` | Array | 大运列表（10步） |
| `step` | Integer | 第几步大运（1-10） |
| `ganZhi` | String | 大运干支（如"甲辰"） |
| `startAge` | Integer | 起始年龄 |
| `endAge` | Integer | 结束年龄 |
| `startYear` | Integer | 起始年份 |
| `endYear` | Integer | 结束年份 |
| `isCurrent` | Boolean | 是否为当前大运 |

---

## 🧪 测试案例

### 案例1：1987年3月24日11:30，女性

```bash
curl -X POST http://localhost:8080/api/divination/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "divinationType": "BAZI",
    "birthYear": 1987,
    "birthMonth": 3,
    "birthDay": 24,
    "birthHour": 11,
    "birthMinute": 30,
    "gender": "female",
    "lunarCalendar": false
  }'
```

**预期结果**：
- 八字：丁卯 癸卯 壬申 丙午
- 年份：丁卯年（阴年）
- 性别：女
- 大运方向：顺排（阴年生女）
- 起运：4岁0月20天
- 当前大运：丁未（35-44岁，2021-2030）

### 案例2：1987年3月24日11:30，男性

```bash
curl -X POST http://localhost:8080/api/divination/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "divinationType": "BAZI",
    "birthYear": 1987,
    "birthMonth": 3,
    "birthDay": 24,
    "birthHour": 11,
    "gender": "male",
    "lunarCalendar": false
  }'
```

**预期结果**：
- 八字：丁卯 癸卯 壬申 丙午
- 年份：丁卯年（阴年）
- 性别：男
- 大运方向：逆排（阴年生男）
- 起运：6岁0月10天
- 当前大运：己亥（37-46岁，2023-2032）

---

## 💻 代码实现位置

### 前端代码

| 文件 | 位置 | 说明 |
|------|------|------|
| `/lsspp-divination-frontend/src/pages/bazi/BaziPage.tsx` | 第138-207行 | BaziResult接口定义（添加dayunAnalysis字段） |
| 同上 | 第359-475行 | 大运排布展示组件 |

### 后端代码

| 文件 | 位置 | 说明 |
|------|------|------|
| `/production-api-server-fixed.js` | 第138-169行 | 大运计算逻辑 |
| 同上 | 第201行 | 返回对象中添加dayunAnalysis |

---

## 🎯 核心算法说明

### 1. 顺逆判断规则

```javascript
// 阳年干：甲、丙、戊、庚、壬
// 阴年干：乙、丁、己、辛、癸

阳年生男 → 顺排
阴年生女 → 顺排
阴年生男 → 逆排
阳年生女 → 逆排
```

### 2. 起运时间计算

```javascript
起运年龄 = 到下一个节气的天数 ÷ 3（顺排）
起运年龄 = 到上一个节气的天数 ÷ 3（逆排）
```

### 3. 大运推算

```javascript
顺排：月柱 → 甲辰 → 乙巳 → 丙午 → 丁未 → ...
逆排：月柱 → 壬寅 → 辛丑 → 庚子 → 己亥 → ...
```

### 4. 当前大运判断

```javascript
if (当前年份 >= 大运起始年份 && 当前年份 <= 大运结束年份) {
  isCurrent = true;
}
```

---

## 🚀 使用流程

### 步骤1：启动服务

```bash
# 启动Express网关（端口8080）
node production-api-server-fixed.js

# 启动Spring Boot后端（端口8082）
cd lsspp-spring-boot && mvn spring-boot:run

# 启动React前端（端口3000）
cd lsspp-divination-frontend && npm run dev
```

### 步骤2：访问前端

打开浏览器访问：
```
http://localhost:3000/bazi
```

### 步骤3：输入信息

1. 选择出生日期
2. 选择出生时间
3. 选择性别（男/女）
4. 选择历法（公历/农历）
5. 点击"开始排盘"

### 步骤4：查看结果

排盘完成后，页面会显示：
1. 八字四柱
2. 五行分析
3. 用神分析
4. **🌊 十步大运排布**（新功能）
5. 经典命理分析

---

## 📖 相关文档

- [大运算法文档](/Users/lee/project/lsspp-spring-boot/DAYUN_ALGORITHM.md)
- [大运演示程序](/Users/lee/project/dayun-complete-demo.js)
- [八字算法文档](/Users/lee/project/lsspp-spring-boot/BAZI_ALGORITHM_QUICK_REFERENCE.md)

---

## 🎨 UI展示特点

### 1. 颜色系统

- **起运前**：灰色背景（#f5f5f5）
- **普通大运**：白色背景（#fafafa）
- **当前大运**：紫色渐变（#667eea → #764ba2）+ 金色边框

### 2. 信息层次

```
第N步（小字，浅色）
  ↓
大运干支（大字，粗体）
  ↓
年龄范围（中字）
  ↓
年份范围（小字）
```

### 3. 交互提示

- 鼠标悬停卡片会有微妙效果
- 当前大运带星标徽章
- Info提示说明大运规则

---

## ⚠️ 注意事项

1. **性别参数**：必须传入正确的性别参数（male/female或MALE/FEMALE），影响顺逆判断
2. **历法选择**：支持公历和农历输入，农历会先转公历再计算
3. **节气精确**：起运时间基于节气精确计算，lunar-javascript库已内置
4. **年份边界**：当前大运的判断基于服务器当前年份

---

## 🔧 故障排查

### 问题1：大运板块不显示

**原因**：后端未返回dayunAnalysis数据
**解决**：检查Express网关是否重启，确认代码修改生效

### 问题2：当前大运标记错误

**原因**：年份计算错误
**解决**：检查startYear和endYear字段，确保与实际年份匹配

### 问题3：顺逆排列错误

**原因**：性别参数传入错误
**解决**：确认gender参数为"male"/"female"或"MALE"/"FEMALE"

---

## ✅ 功能清单

- [x] 前端界面设计与实现
- [x] 后端大运计算逻辑
- [x] API接口数据格式
- [x] 当前大运高亮显示
- [x] 顺逆排列规则
- [x] 起运时间计算
- [x] 响应式布局
- [x] 移动端适配
- [x] 说明文档

---

**最后更新**：2025-10-24
**维护团队**：LSSPP六神算派开发团队
**版本**：v1.0.0
