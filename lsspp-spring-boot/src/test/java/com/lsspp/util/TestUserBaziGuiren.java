package com.lsspp.util;

import org.junit.jupiter.api.Test;

/**
 * 详细分析八字贵人情况：乙丑 庚辰 丙子 癸巳
 */
public class TestUserBaziGuiren {

    @Test
    public void testGuirenAnalysis() {
        System.out.println("========================================");
        System.out.println("贵人星详细分析");
        System.out.println("八字：乙丑 庚辰 丙子 癸巳");
        System.out.println("========================================");
        System.out.println();

        String[] tiangan = {"乙", "庚", "丙", "癸"};
        String[] dizhi = {"丑", "辰", "子", "巳"};
        String rizhu = tiangan[2];  // 丙
        String nianzhi = dizhi[0];  // 丑
        String yuezhi = dizhi[1];   // 辰
        String rizhi = dizhi[2];    // 子

        System.out.println("【基本信息】");
        System.out.println("日主：" + rizhu + "火");
        System.out.println("年支：" + nianzhi);
        System.out.println("月支：" + yuezhi);
        System.out.println("日支：" + rizhi);
        System.out.println("时支：" + dizhi[3]);
        System.out.println();

        System.out.println("========================================");
        System.out.println("【逐一检查各类贵人】");
        System.out.println("========================================");
        System.out.println();

        // 1. 天乙贵人
        System.out.println("1. 天乙贵人（最重要的贵人星）");
        System.out.println("   查法：丙丁猪鸡位（亥酉）");
        System.out.println("   日主丙火，应见：亥、酉");
        System.out.println("   四柱地支：丑、辰、子、巳");
        System.out.println("   结论：❌ 无天乙贵人");
        System.out.println();

        // 2. 天德贵人
        System.out.println("2. 天德贵人");
        System.out.println("   查法：看月令");
        System.out.println("   月支辰月（三月），天德贵人为壬");
        System.out.println("   四柱天干：乙、庚、丙、癸");
        System.out.println("   结论：❌ 无天德贵人");
        System.out.println();

        // 3. 月德贵人
        System.out.println("3. 月德贵人");
        System.out.println("   查法：申子辰月见壬");
        System.out.println("   月支辰，月德贵人为壬");
        System.out.println("   四柱天干：乙、庚、丙、癸");
        System.out.println("   结论：❌ 无月德贵人");
        System.out.println();

        // 4. 文昌贵人
        System.out.println("4. 文昌贵人");
        System.out.println("   查法：丙戊申宫");
        System.out.println("   日主丙火，应见：申");
        System.out.println("   四柱地支：丑、辰、子、巳");
        System.out.println("   结论：❌ 无文昌贵人");
        System.out.println();

        // 5. 禄神
        System.out.println("5. 禄神（重要吉星）");
        System.out.println("   查法：丙禄在巳");
        System.out.println("   日主丙火，禄神在：巳");
        System.out.println("   四柱地支：丑、辰、子、巳");
        System.out.println("   结论：✅ 有禄神（时支巳）");
        System.out.println("   评价：⭐⭐⭐⭐⭐ 禄神在时，晚年福禄");
        System.out.println();

        // 6. 华盖
        System.out.println("6. 华盖");
        System.out.println("   查法：辰戌丑未四库，互见为华盖");
        System.out.println("   年支丑见月支辰");
        System.out.println("   结论：✅ 有华盖");
        System.out.println("   评价：⭐⭐⭐⭐ 艺术之星，聪明好学");
        System.out.println();

        // 7. 金舆
        System.out.println("7. 金舆");
        System.out.println("   查法：丙见未");
        System.out.println("   日主丙火，金舆在：未");
        System.out.println("   四柱地支：丑、辰、子、巳");
        System.out.println("   结论：❌ 无金舆");
        System.out.println();

        // 8. 驿马
        System.out.println("8. 驿马");
        System.out.println("   查法：申子辰见寅");
        System.out.println("   年支丑，应见：亥");
        System.out.println("   四柱地支：丑、辰、子、巳");
        System.out.println("   结论：❌ 无驿马");
        System.out.println();

        // 9. 将星
        System.out.println("9. 将星");
        System.out.println("   查法：申子辰见子");
        System.out.println("   年支丑，应见：丑");
        System.out.println("   四柱地支：丑、辰、子、巳");
        System.out.println("   结论：❌ 无将星");
        System.out.println();

        // 10. 天喜
        System.out.println("10. 天喜");
        System.out.println("    查法：年支丑见申");
        System.out.println("    年支丑，天喜在：申");
        System.out.println("    四柱地支：丑、辰、子、巳");
        System.out.println("    结论：❌ 无天喜");
        System.out.println();

        // 11. 红鸾
        System.out.println("11. 红鸾");
        System.out.println("    查法：年支丑见寅");
        System.out.println("    年支丑，红鸾在：寅");
        System.out.println("    四柱地支：丑、辰、子、巳");
        System.out.println("    结论：❌ 无红鸾");
        System.out.println();

        System.out.println("========================================");
        System.out.println("【贵人总结】");
        System.out.println("========================================");
        System.out.println();

        System.out.println("✅ 拥有的吉星：");
        System.out.println("   1. 禄神（时支巳）");
        System.out.println("   2. 华盖（辰丑相见）");
        System.out.println();

        System.out.println("❌ 缺少的主要贵人：");
        System.out.println("   1. 天乙贵人（最重要的贵人星）");
        System.out.println("   2. 天德月德贵人");
        System.out.println("   3. 文昌贵人");
        System.out.println("   4. 其他辅助贵人星");
        System.out.println();

        System.out.println("========================================");
        System.out.println("【贵人情况综合评价】");
        System.out.println("========================================");
        System.out.println();

        System.out.println("📊 贵人星评分：2/11 = 18.2%");
        System.out.println("📊 评级：★★☆☆☆（贵人星偏少）");
        System.out.println();

        System.out.println("📖 详细解读：");
        System.out.println();
        System.out.println("【优势】");
        System.out.println("1. 禄神在时柱：");
        System.out.println("   - 晚年福禄深厚，衣食无忧");
        System.out.println("   - 事业有成，自食其力");
        System.out.println("   - 老来安康，子孙孝顺");
        System.out.println();
        System.out.println("2. 华盖星：");
        System.out.println("   - 聪明好学，有艺术天赋");
        System.out.println("   - 适合学术研究、文化艺术");
        System.out.println("   - 精神追求高，喜欢独立思考");
        System.out.println();

        System.out.println("【劣势】");
        System.out.println("1. 缺少天乙贵人：");
        System.out.println("   - 遇事较少贵人相助");
        System.out.println("   - 需要更多依靠自己的努力");
        System.out.println("   - 人际关系需要主动经营");
        System.out.println();
        System.out.println("2. 无天德月德：");
        System.out.println("   - 化险为夷的能力稍弱");
        System.out.println("   - 需要谨慎行事，避免风险");
        System.out.println();
        System.out.println("3. 无文昌贵人：");
        System.out.println("   - 学业需要更加努力");
        System.out.println("   - 考试运相对平平");
        System.out.println();

        System.out.println("========================================");
        System.out.println("【化解建议】");
        System.out.println("========================================");
        System.out.println();

        System.out.println("💡 既然先天贵人不足，可通过后天努力弥补：");
        System.out.println();
        System.out.println("1. 人际策略：");
        System.out.println("   ✓ 主动结交有能力的朋友");
        System.out.println("   ✓ 多参加社交活动，扩展人脉");
        System.out.println("   ✓ 对他人多施恩惠，积累人情");
        System.out.println("   ✓ 保持谦逊态度，善于学习");
        System.out.println();

        System.out.println("2. 行业选择：");
        System.out.println("   ✓ 发挥华盖优势，从事文化艺术");
        System.out.println("   ✓ 选择技术专业领域，凭实力说话");
        System.out.println("   ✓ 避免过度依赖关系的行业");
        System.out.println("   ✓ 创业为佳，自己掌握命运");
        System.out.println();

        System.out.println("3. 能力提升：");
        System.out.println("   ✓ 不断学习，提升专业能力");
        System.out.println("   ✓ 培养多项技能，增强竞争力");
        System.out.println("   ✓ 锻炼沟通表达能力");
        System.out.println("   ✓ 建立个人品牌和影响力");
        System.out.println();

        System.out.println("4. 心态调整：");
        System.out.println("   ✓ 接受先天不足，不怨天尤人");
        System.out.println("   ✓ 相信后天努力可以改命");
        System.out.println("   ✓ 遇事靠己，培养独立能力");
        System.out.println("   ✓ 积累人品，贵人自然来");
        System.out.println();

        System.out.println("5. 风水补救：");
        System.out.println("   ✓ 办公桌或家中西北方位放置金属摆件");
        System.out.println("   ✓ 多接触属金属性的人（庚辛申酉）");
        System.out.println("   ✓ 可佩戴金银饰品增强贵人运");
        System.out.println("   ✓ 结交生肖属猴、鸡的朋友");
        System.out.println();

        System.out.println("========================================");
        System.out.println("【正能量总结】");
        System.out.println("========================================");
        System.out.println();
        System.out.println("🌟 贵人虽少，但有禄神护身，说明：");
        System.out.println("   • 靠自己的能力获得成功");
        System.out.println("   • 不需要依赖他人，独立自主");
        System.out.println("   • 白手起家的命格，成就感更强");
        System.out.println("   • 华盖配禄神，清贵之命");
        System.out.println();
        System.out.println("🌟 缺少外部贵人，意味着：");
        System.out.println("   • 自己就是自己最大的贵人");
        System.out.println("   • 一切靠实力，不靠关系");
        System.out.println("   • 脚踏实地，根基更稳固");
        System.out.println("   • 不欠人情，活得更自在");
        System.out.println();
        System.out.println("💪 命由己造，福自己求！");
        System.out.println("    贵人不足靠努力，品德修养是根本！");
        System.out.println();
    }
}
