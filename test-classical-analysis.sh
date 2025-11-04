#!/bin/bash

echo "=========================================="
echo "测试八字经典分析功能（财运、婚姻、性格）"
echo "=========================================="
echo ""

echo "【测试用例】1985年4月7日11时 男命"
echo "预期八字：乙丑 庚辰 丙子 癸巳"
echo ""

curl -X POST http://localhost:8080/api/divination/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "divinationType": "BAZI",
    "birthYear": 1985,
    "birthMonth": 4,
    "birthDay": 7,
    "birthHour": 11,
    "gender": "MALE",
    "lunarCalendar": false
  }' 2>/dev/null | jq '{
    classicalAnalysis: .classicalAnalysis
  }'
