# 六爻排盘系统 - 优先级Bug修复指南

## 🔴 高优先级修复（立即修复）

### 1. 时间起卦动爻计算错误

**问题描述**: 动爻计算结果范围是0-5，而传统六爻动爻位置应该是1-6

**当前代码**:
```javascript
const changingLine = (year + month + day + hour) % 6;
```

**修复代码**:
```javascript
const changingLine = ((year + month + day + hour - 1) % 6) + 1;
```

**影响**: 所有通过时间起卦的结果，动爻位置都会错误偏移

**验证方法**:
- 测试2025-09-26 13:00，应该得到第6爻而不是第5爻
- 验证多个时间点的动爻计算是否在1-6范围内

### 2. 增加基础输入验证

**问题描述**: 系统缺少输入验证，可能导致错误或程序崩溃

**修复建议**:
```javascript
function validateDateInput(dateStr, timeStr) {
    if (!dateStr || !timeStr) {
        throw new Error('请选择完整的日期和时间');
    }

    const date = new Date(`${dateStr}T${timeStr}`);
    if (isNaN(date.getTime())) {
        throw new Error('无效的日期时间格式');
    }

    const currentYear = new Date().getFullYear();
    if (date.getFullYear() < 1900 || date.getFullYear() > currentYear + 100) {
        throw new Error('请输入合理的年份范围（1900-' + (currentYear + 100) + '）');
    }

    return date;
}
```

## 🟡 中优先级修复（1-2周内）

### 3. 干支历月柱计算优化

**问题描述**: 月柱计算未考虑节气的精确交替时间

**当前逻辑问题**: 按公历月份简单映射到农历月份，没有考虑节气

**改进建议**:
```javascript
function getAccurateMonthGanzhi(year, month, day) {
    // 需要引入24节气的精确时间计算
    // 根据节气而非公历月份确定农历月份

    // 这里需要一个更复杂的节气计算函数
    const solarTerm = getSolarTermForDate(year, month, day);
    const lunarMonth = getLunarMonthFromSolarTerm(solarTerm);

    // 然后按照现有逻辑计算月干
    const yearGan = getYearGanzhi(year).charAt(0);
    const yearGanIndex = TIANGAN.indexOf(yearGan);
    const monthGanStartMap = {
        0: 2, 1: 4, 2: 6, 3: 8, 4: 0,
        5: 2, 6: 4, 7: 6, 8: 8, 9: 0
    };

    const startGanIndex = monthGanStartMap[yearGanIndex];
    const monthGanIndex = (startGanIndex + lunarMonth) % 10;
    const monthZhiIndex = (lunarMonth + 2) % 12;

    return TIANGAN[monthGanIndex] + DIZHI[monthZhiIndex];
}
```

### 4. 空亡计算验证和修复

**问题描述**: 空亡计算算法需要验证准确性

**验证测试用例**:
```javascript
function testKongWangCalculation() {
    const testCases = [
        { dayGanzhi: '甲子', expectedKongWang: ['戌', '亥'] },
        { dayGanzhi: '乙丑', expectedKongWang: ['戌', '亥'] },
        { dayGanzhi: '甲戌', expectedKongWang: ['申', '酉'] },
        { dayGanzhi: '乙亥', expectedKongWang: ['申', '酉'] }
    ];

    testCases.forEach(testCase => {
        const calculated = calculateKongWang(testCase.dayGanzhi);
        console.log(`${testCase.dayGanzhi}: 计算结果 ${calculated.join(',')}, 期望结果 ${testCase.expectedKongWang.join(',')}`);
    });
}
```

### 5. 错误处理机制完善

**添加全局错误处理**:
```javascript
function calculateHexagram() {
    try {
        // 现有的起卦逻辑
        if (currentMethod === 'time') {
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            // 添加输入验证
            validateDateInput(date, time);

            const { upperGua, lowerGua, changingLine } = timeToHexagram(date, time);
            // ... 其余逻辑
        }
        // ... 其他方法的处理

    } catch (error) {
        console.error('起卦计算错误:', error);
        showUserError(error.message);
        return;
    }
}

function showUserError(message) {
    // 创建用户友好的错误提示
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin: 10px 0; border: 1px solid #f5c6cb;">
            <strong>⚠️ 输入错误</strong><br>
            ${message}
        </div>
    `;

    // 显示错误信息
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';
    resultContainer.appendChild(errorDiv);
    resultContainer.classList.add('show');
}
```

## 🟢 低优先级改进（1个月内）

### 6. 六亲计算优化

**改进阴阳同异判断**:
```javascript
function calculateLiuQin(hexBinary, dayGan, najiaGanZhi) {
    const result = [];
    const dayGanWuxing = WUXING[dayGan];
    const dayGanIndex = TIANGAN.indexOf(dayGan);
    const dayGanYinYang = dayGanIndex % 2; // 0为阳，1为阴

    for (let i = 0; i < 6; i++) {
        const najiaStr = najiaGanZhi[i];
        const najiaGan = najiaStr.charAt(0);
        const najiaGanIndex = TIANGAN.indexOf(najiaGan);
        const najiaGanYinYang = najiaGanIndex % 2;
        const najiaGanWuxing = WUXING[najiaGan];

        // 更精确的阴阳同异判断
        const sameYinYang = dayGanYinYang === najiaGanYinYang;

        const liuQin = getLiuQinRelation(dayGanWuxing, najiaGanWuxing, sameYinYang);
        result.push(liuQin);
    }

    return result;
}

function getLiuQinRelation(dayWuxing, najiaWuxing, sameYinYang) {
    if (dayWuxing === najiaWuxing) {
        return sameYinYang ? '兄弟' : '姐妹';
    }

    // 五行生克关系判断
    const relations = {
        '木': { '火': '子孙', '土': '妻财', '金': '官鬼', '水': '父母' },
        '火': { '土': '子孙', '金': '妻财', '水': '官鬼', '木': '父母' },
        '土': { '金': '子孙', '水': '妻财', '木': '官鬼', '火': '父母' },
        '金': { '水': '子孙', '木': '妻财', '火': '官鬼', '土': '父母' },
        '水': { '木': '子孙', '火': '妻财', '土': '官鬼', '金': '父母' }
    };

    return relations[dayWuxing][najiaWuxing] || '兄弟';
}
```

### 7. 代码文档和注释完善

**添加详细的算法说明**:
```javascript
/**
 * 传统时间起卦法
 * 根据《梅花易数》的方法，使用起卦时间计算卦象
 *
 * @param {string} date - 起卦日期，格式：YYYY-MM-DD
 * @param {string} time - 起卦时间，格式：HH:MM
 * @returns {Object} 包含上卦、下卦、动爻的对象
 *
 * 计算原理：
 * 1. 上卦 = (年数 + 月数 + 日数) % 8，余数对应八卦
 * 2. 下卦 = (年数 + 月数 + 日数 + 时数) % 8，余数对应八卦
 * 3. 动爻 = (年数 + 月数 + 日数 + 时数 - 1) % 6 + 1，得1-6爻位
 *
 * 注意：八卦对应关系按照先天八卦序数
 */
function timeToHexagram(date, time) {
    const dateObj = validateDateInput(date, time);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours();

    // 按梅花易数方法计算
    const upperGua = (year + month + day) % 8;
    const lowerGua = (year + month + day + hour) % 8;

    // 修正：确保动爻在1-6范围内
    const changingLine = ((year + month + day + hour - 1) % 6) + 1;

    return { upperGua, lowerGua, changingLine };
}
```

## 🧪 测试验证方案

### 回归测试检查清单

1. **时间起卦修复验证**:
   - [ ] 测试2025-09-26 13:00，动爻应为第6爻
   - [ ] 测试多个时间点，确保动爻在1-6范围
   - [ ] 验证动爻计算的连续性和合理性

2. **输入验证测试**:
   - [ ] 测试空输入处理
   - [ ] 测试无效日期格式
   - [ ] 测试超出合理范围的年份
   - [ ] 测试非数字输入

3. **错误处理测试**:
   - [ ] 验证错误信息的友好性
   - [ ] 测试错误恢复机制
   - [ ] 确保错误不会导致页面崩溃

4. **功能回归测试**:
   - [ ] 验证数字起卦13,34案例仍然正确
   - [ ] 检查铜钱起卦功能正常
   - [ ] 确认UI交互无异常

### 自动化测试建议

```javascript
// 添加到页面中的自动化测试函数
function runRegressionTests() {
    const tests = [
        {
            name: '时间起卦动爻修复验证',
            test: () => {
                const result = timeToHexagram('2025-09-26', '13:00');
                return result.changingLine >= 1 && result.changingLine <= 6;
            }
        },
        {
            name: '数字起卦经典案例',
            test: () => {
                const result = traditionalNumberDivination(13, 34);
                return result.originalHex === '110011' && result.changedHex === '110001';
            }
        },
        {
            name: '输入验证测试',
            test: () => {
                try {
                    validateDateInput('', '');
                    return false; // 应该抛出错误
                } catch (e) {
                    return true; // 正确抛出错误
                }
            }
        }
    ];

    let passCount = 0;
    tests.forEach(test => {
        try {
            const result = test.test();
            if (result) {
                passCount++;
                console.log(`✅ ${test.name}: 通过`);
            } else {
                console.log(`❌ ${test.name}: 失败`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: 错误 - ${error.message}`);
        }
    });

    console.log(`回归测试结果: ${passCount}/${tests.length} 通过`);
    return passCount === tests.length;
}
```

## 📋 修复计划时间表

| 优先级 | 修复项目 | 预估时间 | 责任人 | 完成日期 |
|--------|----------|----------|--------|----------|
| 🔴 高 | 时间起卦动爻修复 | 0.5天 | 开发者 | 立即 |
| 🔴 高 | 输入验证机制 | 1天 | 开发者 | 2天内 |
| 🟡 中 | 错误处理完善 | 1天 | 开发者 | 1周内 |
| 🟡 中 | 月柱计算优化 | 2天 | 开发者 | 2周内 |
| 🟡 中 | 空亡计算验证 | 1天 | 开发者 | 2周内 |
| 🟢 低 | 六亲计算优化 | 2天 | 开发者 | 1月内 |
| 🟢 低 | 代码文档完善 | 1天 | 开发者 | 1月内 |

修复完成后，系统的综合评分预期可以从78.5分提升到88分以上，达到优秀水平。