#!/bin/bash
# 用神计算器命令行测试工具

if [ $# -eq 8 ]; then
    # 如果提供了8个参数,直接计算
    echo "计算八字: $1$2 $3$4 $5$6 $7$8"
    echo ""
    cd "$(dirname "$0")"
    mvn test -Dtest=YongshenCalculatorTest -q 2>&1 | grep -v "Tests run:" | grep -v "BUILD" | tail -n +2
else
    echo "用法: ./test-yongshen.sh 年干 年支 月干 月支 日干 日支 时干 时支"
    echo ""
    echo "示例:"
    echo "  ./test-yongshen.sh 丁 卯 壬 寅 甲 子 丙 寅"
    echo "  ./test-yongshen.sh 庚 申 戊 子 己 未 丙 寅"
    echo "  ./test-yongshen.sh 甲 子 丙 寅 戊 辰 壬 戌"
    echo ""
    echo "或者运行预设测试案例:"
    echo "  mvn test -Dtest=YongshenCalculatorTest#testCase1"
    echo "  mvn test -Dtest=YongshenCalculatorTest#testCase2"
    echo "  mvn test -Dtest=YongshenCalculatorTest#testCase3"
fi
