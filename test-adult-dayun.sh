#!/bin/bash

echo "=========================================="
echo "测试成年人八字大运分析（验证事业财运）"
echo "=========================================="
echo ""

echo "【测试用例】1985年4月7日11时 男命"
echo "当前年龄：约39岁（中年事业期）"
echo "应该看到：事业财运相关的分析"
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
    dayunAnalysis: .dayunAnalysis | {
      qiyunAge: .qiyunAge,
      currentDayun: .dayunList[] | select(.startAge <= 39 and .endAge >= 39) | {
        ganZhi: .ganZhi,
        startAge: .startAge,
        endAge: .endAge,
        jiXiong: .jiXiong,
        analysis: .analysis,
        features: .features[0:3],
        suggestions: .suggestions[0:3]
      }
    }
  }'
