#!/bin/bash

echo "=========================================="
echo "八字数据库API功能测试"
echo "=========================================="
echo ""

# 先计算一个八字
echo "【步骤1】计算八字..."
BAZI_RESULT=$(curl -s -X POST http://localhost:8080/api/divination/calculate \
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

echo "✅ 八字计算完成"
echo ""

# 保存八字记录
echo "【步骤2】保存八字记录（姓名：张三）..."
SAVE_RESULT=$(curl -s -X POST http://localhost:8080/api/bazi/save \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"张三\",
    \"birthYear\": 1987,
    \"birthMonth\": 3,
    \"birthDay\": 24,
    \"birthHour\": 11,
    \"gender\": \"MALE\",
    \"baziResult\": $BAZI_RESULT
  }")

echo "$SAVE_RESULT" | jq '.'
RECORD_ID=$(echo "$SAVE_RESULT" | jq -r '.id')
echo "✅ 记录已保存，ID: $RECORD_ID"
echo ""

# 再保存一个记录
echo "【步骤3】保存第二个记录（姓名：李四）..."
BAZI_RESULT2=$(curl -s -X POST http://localhost:8080/api/divination/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "divinationType": "BAZI",
    "birthYear": 1985,
    "birthMonth": 4,
    "birthDay": 7,
    "birthHour": 10,
    "gender": "FEMALE",
    "lunarCalendar": false
  }')

SAVE_RESULT2=$(curl -s -X POST http://localhost:8080/api/bazi/save \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"李四\",
    \"birthYear\": 1985,
    \"birthMonth\": 4,
    \"birthDay\": 7,
    \"birthHour\": 10,
    \"gender\": \"FEMALE\",
    \"baziResult\": $BAZI_RESULT2
  }")

echo "$SAVE_RESULT2" | jq '.'
RECORD_ID2=$(echo "$SAVE_RESULT2" | jq -r '.id')
echo "✅ 记录已保存，ID: $RECORD_ID2"
echo ""

# 查询所有记录
echo "【步骤4】查询所有记录..."
curl -s "http://localhost:8080/api/bazi/records?page=1&pageSize=10" | jq '{
  success: .success,
  count: .data | length,
  pagination: .pagination,
  records: .data | map({
    id: .id,
    name: .name,
    birthDateLunar: .birthDateLunar,
    birthDateSolar: .birthDateSolar,
    bazi: (.bazi.yearColumn.gan + .bazi.yearColumn.zhi + " " + .bazi.monthColumn.gan + .bazi.monthColumn.zhi + " " + .bazi.dayColumn.gan + .bazi.dayColumn.zhi + " " + .bazi.hourColumn.gan + .bazi.hourColumn.zhi),
    createdAt: .createdAt
  })
}'
echo ""

# 根据ID查询单个记录
echo "【步骤5】根据ID查询记录（ID: $RECORD_ID）..."
curl -s "http://localhost:8080/api/bazi/record/$RECORD_ID" | jq '{
  success: .success,
  data: {
    id: .data.id,
    name: .data.name,
    birthDateLunar: .data.birthDateLunar,
    birthDateSolar: .data.birthDateSolar,
    gender: .data.gender,
    bazi: (.data.bazi.yearColumn.gan + .data.bazi.yearColumn.zhi + " " + .data.bazi.monthColumn.gan + .data.bazi.monthColumn.zhi + " " + .data.bazi.dayColumn.gan + .data.bazi.dayColumn.zhi + " " + .data.bazi.hourColumn.gan + .data.bazi.hourColumn.zhi),
    dayMaster: .data.bazi.dayMaster,
    createdAt: .data.createdAt
  }
}'
echo ""

# 根据姓名搜索
echo "【步骤6】根据姓名搜索记录（姓名：张）..."
curl -s "http://localhost:8080/api/bazi/search?name=张" | jq '{
  success: .success,
  count: .count,
  records: .data | map({
    id: .id,
    name: .name,
    birthDateLunar: .birthDateLunar,
    bazi: (.bazi.yearColumn.gan + .bazi.yearColumn.zhi + " " + .bazi.monthColumn.gan + .bazi.monthColumn.zhi + " " + .bazi.dayColumn.gan + .bazi.dayColumn.zhi + " " + .bazi.hourColumn.gan + .bazi.hourColumn.zhi)
  })
}'
echo ""

# 更新记录
echo "【步骤7】更新记录姓名（ID: $RECORD_ID -> 张三丰）..."
curl -s -X PUT "http://localhost:8080/api/bazi/record/$RECORD_ID" \
  -H "Content-Type: application/json" \
  -d '{"name": "张三丰"}' | jq '.'
echo ""

# 再次查询确认更新
echo "【步骤8】确认更新结果..."
curl -s "http://localhost:8080/api/bazi/record/$RECORD_ID" | jq '{
  id: .data.id,
  name: .data.name,
  updatedAt: .data.updatedAt
}'
echo ""

echo "=========================================="
echo "✅ 数据库API测试完成！"
echo "=========================================="
echo ""
echo "数据库文件位置: /Users/lee/project/bazi_records.db"
echo "可使用SQLite工具查看数据库内容:"
echo "  sqlite3 bazi_records.db"
echo "  SELECT * FROM bazi_records;"
echo ""
