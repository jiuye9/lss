#!/bin/bash

echo "=========================================="
echo "测试儿童八字大运分析（验证年龄段合理性）"
echo "=========================================="
echo ""

echo "【测试用例】2015年5月10日上午10时 男童"
echo "当前年龄：约9岁（小学阶段）"
echo "应该看到：学业相关的分析，而非事业财运"
echo ""

curl -X POST http://localhost:8080/api/divination/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "divinationType": "BAZI",
    "birthYear": 2015,
    "birthMonth": 5,
    "birthDay": 10,
    "birthHour": 10,
    "gender": "MALE",
    "lunarCalendar": false
  }' 2>/dev/null | jq '{
    dayunAnalysis: .dayunAnalysis | {
      qiyunAge: .qiyunAge,
      dayunList: .dayunList[0:3] | map({
        ganZhi: .ganZhi,
        startAge: .startAge,
        endAge: .endAge,
        jiXiong: .jiXiong,
        analysis: .analysis,
        features: .features,
        suggestions: .suggestions
      })
    }
  }'
