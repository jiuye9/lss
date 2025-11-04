#!/bin/bash

echo "=========================================="
echo "测试女命八字分析（验证官星算法）"
echo "=========================================="
echo ""

echo "【测试用例】1987年3月24日11时 女命"
echo "预期八字：丁卯 癸卯 壬申 丙午"
echo ""

curl -X POST http://localhost:8080/api/divination/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "divinationType": "BAZI",
    "birthYear": 1987,
    "birthMonth": 3,
    "birthDay": 24,
    "birthHour": 11,
    "gender": "FEMALE",
    "lunarCalendar": false
  }' 2>/dev/null | jq '{
    marriage: .classicalAnalysis.hunyin,
    wealth: .classicalAnalysis.caiyun.wealthLevel,
    personality: .classicalAnalysis.xingge.basicCharacter
  }'
