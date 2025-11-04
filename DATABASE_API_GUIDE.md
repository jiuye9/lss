# 八字排盘数据库API使用指南

## 📋 功能概述

本系统提供完整的八字排盘记录存储功能，使用SQLite数据库存储用户的八字分析结果，支持保存、查询、搜索、更新和删除操作。

## 🗄️ 数据库结构

### 表名：`bazi_records`

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| id | INTEGER | 主键，自动递增 | 1 |
| name | TEXT | 姓名（主题） | 张三 |
| birth_date_lunar | TEXT | 农历出生日期 | 1987-02-25 |
| birth_date_solar | TEXT | 公历出生日期 | 1987-03-24 |
| birth_hour | INTEGER | 出生时辰（0-23） | 11 |
| gender | TEXT | 性别 | MALE/FEMALE |
| bazi | TEXT | 八字数据（JSON） | {"yearColumn":{...},...} |
| analysis | TEXT | 分析结果（JSON） | {"yongshenAnalysis":{...},...} |
| created_at | DATETIME | 创建时间 | 2025-10-31 16:55:40 |
| updated_at | DATETIME | 更新时间 | 2025-10-31 16:55:41 |

### 存储设计说明

1. **姓名字段（name）**：存储用户输入的姓名，可用作主题
2. **农历日期（birth_date_lunar）**：自动将公历转换为农历存储（YYYY-MM-DD格式）
3. **八字字段（bazi）**：存储核心八字数据，包括年月日时四柱
4. **分析字段（analysis）**：存储完整的分析结果，包括用神、神煞、经典分析、大运等

## 🔌 API端点

### 基础URL
```
http://localhost:8080
```

---

### 1. 保存八字记录

**端点**: `POST /api/bazi/save`

**请求头**:
```
Content-Type: application/json
```

**请求体**:
```json
{
  "name": "张三",
  "birthYear": 1987,
  "birthMonth": 3,
  "birthDay": 24,
  "birthHour": 11,
  "gender": "MALE",
  "baziResult": {
    // 从 /api/divination/calculate 返回的完整八字结果
  }
}
```

**必填参数**:
- `name`: 姓名
- `baziResult`: 八字计算结果（从八字排盘API获取）

**可选参数**:
- `birthYear`, `birthMonth`, `birthDay`, `birthHour`: 出生信息（用于农历转换）
- `gender`: 性别，默认"MALE"

**响应示例**:
```json
{
  "success": true,
  "id": 1,
  "message": "保存成功",
  "lunarInfo": {
    "lunarYear": 1987,
    "lunarMonth": 2,
    "lunarDay": 25,
    "lunarDateString": "1987-02-25",
    "lunarChinese": "一九八七年二月廿五"
  }
}
```

**使用示例**:
```bash
# 1. 先计算八字
BAZI_RESULT=$(curl -X POST http://localhost:8080/api/divination/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "divinationType": "BAZI",
    "birthYear": 1987,
    "birthMonth": 3,
    "birthDay": 24,
    "birthHour": 11,
    "gender": "MALE",
    "lunarCalendar": false
  }')

# 2. 保存记录
curl -X POST http://localhost:8080/api/bazi/save \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"张三\",
    \"birthYear\": 1987,
    \"birthMonth\": 3,
    \"birthDay\": 24,
    \"birthHour\": 11,
    \"gender\": \"MALE\",
    \"baziResult\": $BAZI_RESULT
  }"
```

---

### 2. 查询所有记录（分页）

**端点**: `GET /api/bazi/records?page=1&pageSize=20`

**查询参数**:
- `page`: 页码，默认1
- `pageSize`: 每页记录数，默认20

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "birthDateLunar": "1987-02-25",
      "birthDateSolar": "1987-03-24",
      "birthHour": 11,
      "gender": "MALE",
      "bazi": {
        "yearColumn": {"gan": "丁", "zhi": "卯", "wuxing": "火"},
        "monthColumn": {"gan": "癸", "zhi": "卯", "wuxing": "水"},
        "dayColumn": {"gan": "壬", "zhi": "申", "wuxing": "水"},
        "hourColumn": {"gan": "丙", "zhi": "午", "wuxing": "火"},
        "dayMaster": "壬",
        "dayMasterWuxing": "水"
      },
      "createdAt": "2025-10-31 16:55:40",
      "updatedAt": "2025-10-31 16:55:40"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 10,
    "totalPages": 1
  }
}
```

**使用示例**:
```bash
# 查询第1页，每页10条
curl "http://localhost:8080/api/bazi/records?page=1&pageSize=10"
```

---

### 3. 根据ID查询记录

**端点**: `GET /api/bazi/record/:id`

**路径参数**:
- `id`: 记录ID

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "birthDateLunar": "1987-02-25",
    "birthDateSolar": "1987-03-24",
    "birthHour": 11,
    "gender": "MALE",
    "bazi": {...},
    "analysis": {
      "yongshenAnalysis": {...},
      "gejuAnalysis": {...},
      "shenshaAnalysis": {...},
      "classicalAnalysis": {...},
      "dayunAnalysis": {...},
      "wuxingAnalysis": {...}
    },
    "createdAt": "2025-10-31 16:55:40",
    "updatedAt": "2025-10-31 16:55:40"
  }
}
```

**使用示例**:
```bash
curl "http://localhost:8080/api/bazi/record/1"
```

---

### 4. 根据姓名搜索记录

**端点**: `GET /api/bazi/search?name=姓名`

**查询参数**:
- `name`: 姓名关键字（支持模糊匹配）

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "birthDateLunar": "1987-02-25",
      "birthDateSolar": "1987-03-24",
      "birthHour": 11,
      "gender": "MALE",
      "bazi": {...},
      "createdAt": "2025-10-31 16:55:40",
      "updatedAt": "2025-10-31 16:55:40"
    }
  ],
  "count": 1
}
```

**使用示例**:
```bash
# 搜索名字包含"张"的所有记录
curl "http://localhost:8080/api/bazi/search?name=张"
```

---

### 5. 删除记录

**端点**: `DELETE /api/bazi/record/:id`

**路径参数**:
- `id`: 记录ID

**响应示例**:
```json
{
  "success": true,
  "message": "删除成功"
}
```

**使用示例**:
```bash
curl -X DELETE "http://localhost:8080/api/bazi/record/1"
```

---

### 6. 更新记录

**端点**: `PUT /api/bazi/record/:id`

**路径参数**:
- `id`: 记录ID

**请求体**:
```json
{
  "name": "新姓名"
}
```

**响应示例**:
```json
{
  "success": true,
  "message": "更新成功"
}
```

**使用示例**:
```bash
curl -X PUT "http://localhost:8080/api/bazi/record/1" \
  -H "Content-Type: application/json" \
  -d '{"name": "张三丰"}'
```

---

## 📊 数据结构说明

### 八字数据（bazi字段）

存储格式：
```json
{
  "yearColumn": {
    "gan": "丁",
    "zhi": "卯",
    "wuxing": "火"
  },
  "monthColumn": {
    "gan": "癸",
    "zhi": "卯",
    "wuxing": "水"
  },
  "dayColumn": {
    "gan": "壬",
    "zhi": "申",
    "wuxing": "水"
  },
  "hourColumn": {
    "gan": "丙",
    "zhi": "午",
    "wuxing": "火"
  },
  "dayMaster": "壬",
  "dayMasterWuxing": "水"
}
```

### 分析数据（analysis字段）

存储格式：
```json
{
  "yongshenAnalysis": {
    "yongshen": "金",
    "xishen": "水",
    "jishen": "火",
    "chousen": "土",
    "analysis": "...",
    "rizhuStatus": "身旺"
  },
  "gejuAnalysis": {
    "mainGeju": "身旺格",
    "strength": 8,
    "yongshen": "金",
    "analysis": "...",
    "suggestions": [...]
  },
  "shenshaAnalysis": {
    "jixing": ["天乙贵人", "文昌贵人"],
    "xiongshen": [],
    "meaning": {...}
  },
  "classicalAnalysis": {
    "xingge": {...},  // 性格分析对象
    "shiye": "...",
    "caiyun": {...},  // 财运分析对象
    "hunyin": {...},  // 婚姻分析对象
    "jiankang": "...",
    "suggestions": [...]
  },
  "dayunAnalysis": {
    "qiyunAge": 4,
    "isForward": true,
    "dayunList": [...]
  },
  "wuxingAnalysis": {
    "金": 1,
    "木": 2,
    "水": 2,
    "火": 2,
    "土": 1
  }
}
```

---

## 🔍 使用SQLite工具查看数据库

### 安装SQLite（如未安装）
```bash
# macOS
brew install sqlite

# Ubuntu/Debian
sudo apt-get install sqlite3

# Windows
下载 https://www.sqlite.org/download.html
```

### 查看数据库内容
```bash
# 打开数据库
sqlite3 /Users/lee/project/bazi_records.db

# 查看所有表
.tables

# 查看表结构
.schema bazi_records

# 查询所有记录
SELECT id, name, birth_date_lunar, birth_date_solar, gender, created_at
FROM bazi_records;

# 查询特定记录
SELECT * FROM bazi_records WHERE name LIKE '%张%';

# 查看记录数量
SELECT COUNT(*) FROM bazi_records;

# 退出
.quit
```

---

## 💡 集成示例

### 前端集成（React）

```jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// 1. 计算并保存八字
async function calculateAndSaveBazi(name, birthInfo) {
  try {
    // 计算八字
    const baziResult = await axios.post(`${API_BASE_URL}/api/divination/calculate`, {
      divinationType: 'BAZI',
      ...birthInfo
    });

    // 保存到数据库
    const saveResult = await axios.post(`${API_BASE_URL}/api/bazi/save`, {
      name: name,
      ...birthInfo,
      baziResult: baziResult.data
    });

    console.log('保存成功，记录ID:', saveResult.data.id);
    return saveResult.data;
  } catch (error) {
    console.error('保存失败:', error);
  }
}

// 2. 查询记录列表
async function getBaziRecords(page = 1, pageSize = 10) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/bazi/records`, {
      params: { page, pageSize }
    });
    return response.data;
  } catch (error) {
    console.error('查询失败:', error);
  }
}

// 3. 搜索记录
async function searchBaziRecords(name) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/bazi/search`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('搜索失败:', error);
  }
}

// 使用示例
calculateAndSaveBazi('张三', {
  birthYear: 1987,
  birthMonth: 3,
  birthDay: 24,
  birthHour: 11,
  gender: 'MALE',
  lunarCalendar: false
});

getBaziRecords(1, 20).then(result => {
  console.log('记录列表:', result.data);
});

searchBaziRecords('张').then(result => {
  console.log('搜索结果:', result.data);
});
```

---

## 🛡️ 错误处理

### 常见错误码

| HTTP状态码 | 说明 | 解决方案 |
|-----------|------|---------|
| 400 | 请求参数错误 | 检查必填参数是否完整 |
| 404 | 记录不存在 | 确认记录ID是否正确 |
| 500 | 服务器内部错误 | 查看服务器日志 |

### 错误响应格式
```json
{
  "success": false,
  "message": "错误描述"
}
```

---

## 📝 注意事项

1. **农历自动转换**: 系统会自动将公历日期转换为农历并存储，无需手动转换
2. **数据完整性**: 保存记录前请确保已调用八字排盘API获取完整的分析结果
3. **数据备份**: 定期备份`bazi_records.db`文件以防数据丢失
4. **并发访问**: SQLite支持多读单写，生产环境建议使用MySQL/PostgreSQL
5. **数据量**: SQLite适合中小规模数据（百万级以下），超大数据量建议迁移到专业数据库

---

## 🚀 后续扩展

1. **用户系统**: 添加用户认证，每个用户只能查看自己的记录
2. **标签系统**: 为记录添加标签（如"家人"、"朋友"、"客户"）
3. **统计分析**: 统计常见命格、五行分布等数据
4. **导出功能**: 支持导出PDF、Excel格式的分析报告
5. **历史对比**: 比较不同记录的命理特点

---

## 📞 技术支持

如有问题，请查看：
- Express服务器日志：查看控制台输出
- 数据库文件：`/Users/lee/project/bazi_records.db`
- 测试脚本：`./test-database-api.sh`

---

**文档版本**: v1.0.0
**最后更新**: 2025-10-31
**作者**: Claude Code
