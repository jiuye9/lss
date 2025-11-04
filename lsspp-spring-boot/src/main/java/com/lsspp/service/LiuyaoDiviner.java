package com.lsspp.service;

import com.lsspp.util.LiuyaoCalculator.LiuyaoResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 六爻断卦分析器
 * 基于《增删卜易》和《卜筮正宗》经典理论进行专业断卦
 *
 * 核心断卦要素:
 * 1. 用神取法 - 根据占卜问题确定用神
 * 2. 世应关系 - 分析世爻应爻的生克制化
 * 3. 动爻分析 - 判断发动爻对用神的影响
 * 4. 六亲生克 - 分析六亲之间的相互关系
 * 5. 六神吉凶 - 结合六神判断事情性质
 * 6. 月日令 - 考虑月日对卦象的影响
 *
 * @author LSSPP Team
 * @since 2025-10-10
 */
@Service
@Slf4j
public class LiuyaoDiviner {

    /**
     * 用神分类 - 根据占卜类别确定用神
     */
    private static final Map<String, String> YONGSHEN_CATEGORY = new HashMap<>() {{
        // 婚姻感情类
        put("婚姻", "妻财");
        put("感情", "妻财");
        put("恋爱", "妻财");
        put("配偶", "妻财");
        put("另一半", "妻财");

        // 事业工作类
        put("工作", "官鬼");
        put("事业", "官鬼");
        put("职位", "官鬼");
        put("升迁", "官鬼");
        put("仕途", "官鬼");

        // 财运类
        put("财运", "妻财");
        put("求财", "妻财");
        put("生意", "妻财");
        put("投资", "妻财");
        put("经商", "妻财");

        // 学业考试类
        put("考试", "父母");
        put("学业", "父母");
        put("文书", "父母");
        put("学习", "父母");

        // 健康类
        put("健康", "官鬼");
        put("疾病", "官鬼");
        put("病情", "官鬼");

        // 子女类
        put("子女", "子孙");
        put("怀孕", "子孙");
        put("生育", "子孙");

        // 父母类
        put("父母", "父母");

        // 合作类
        put("合作", "妻财");
        put("合伙", "妻财");

        // 家庭类
        put("家庭", "父母");
        put("家宅", "父母");

        // 开店经商类
        put("开店", "妻财");

        // 官司诉讼类
        put("官司", "官鬼");
        put("诉讼", "官鬼");
        put("纠纷", "官鬼");
    }};

    /**
     * 六神吉凶特性
     */
    private static final Map<String, String> LIUSHEN_NATURE = new HashMap<>() {{
        put("青龙", "吉神,主喜庆、财富、文书、婚姻");
        put("朱雀", "主口舌、文书、火灾,动则不安");
        put("勾陈", "主牢狱、田土、阻滞、慢性病");
        put("腾蛇", "主虚惊、怪异、反复、心事不安");
        put("白虎", "凶神,主丧孝、疾病、血光、道路");
        put("玄武", "主盗贼、暗昧、奸私、酒色");
    }};

    /**
     * 根据占卜问题和卦象进行专业断卦
     *
     * @param question 占卜问题
     * @param result 六爻卦象结果
     * @param currentTime 当前时间(用于判断月日令)
     * @return 专业断卦结果
     */
    public String analyzeDivination(String question, LiuyaoResult result, LocalDateTime currentTime) {
        log.info("🔮 开始专业断卦分析: 问题={}, 卦象={}之{}",
            question, result.getOriginalHexagramName(), result.getChangedHexagramName());

        StringBuilder analysis = new StringBuilder();

        try {
            // 1. 识别占卜类别和确定用神
            String category = identifyCategory(question);
            String yongshen = determineYongshen(category);

            analysis.append("【用神取法】\n");
            if (category != null) {
                analysis.append(String.format("问题类别: %s,以%s为用神。\n", category, yongshen));
            } else {
                analysis.append("问题未明确分类,需综合分析世应关系判断。\n");
            }
            analysis.append("\n");

            // 2. 分析世应关系
            analysis.append("【世应分析】\n");
            analyzeShiying(result, analysis);
            analysis.append("\n");

            // 3. 分析动爻吉凶
            analysis.append("【动爻分析】\n");
            analyzeDongYao(result, yongshen, analysis);
            analysis.append("\n");

            // 4. 分析六神
            analysis.append("【六神吉凶】\n");
            analyzeLiushen(result, analysis);
            analysis.append("\n");

            // 5. 分析用神旺衰(如果有明确用神)
            if (yongshen != null) {
                analysis.append("【用神旺衰】\n");
                analyzeYongshenStrength(result, yongshen, analysis);
                analysis.append("\n");
            }

            // 6. 综合断卦结论
            analysis.append("【断卦结论】\n");
            String conclusion = generateConclusion(result, category, yongshen);
            analysis.append(conclusion);

            log.info("✅ 断卦分析完成");
            return analysis.toString();

        } catch (Exception e) {
            log.error("❌ 断卦分析失败", e);
            return String.format("根据%s卦象分析,第%d爻发动变为%s卦。建议您综合考虑本卦和变卦的含义,把握当前形势,顺势而为。",
                result.getOriginalHexagramName(), result.getChangingLine(), result.getChangedHexagramName());
        }
    }

    /**
     * 识别问题类别
     */
    private String identifyCategory(String question) {
        if (question == null || question.trim().isEmpty()) {
            return null;
        }

        question = question.trim();
        for (Map.Entry<String, String> entry : YONGSHEN_CATEGORY.entrySet()) {
            if (question.contains(entry.getKey())) {
                return entry.getKey();
            }
        }
        return null;
    }

    /**
     * 确定用神
     */
    private String determineYongshen(String category) {
        if (category == null) {
            return null;
        }
        return YONGSHEN_CATEGORY.get(category);
    }

    /**
     * 分析世应关系
     * 《增删卜易》: 世为自己,应为他人/对方/事情
     */
    private void analyzeShiying(LiuyaoResult result, StringBuilder analysis) {
        int shiYao = result.getWorldLine();
        int yingYao = result.getResponseLine();

        // 获取世爻和应爻的六亲和五行
        String shiLiuqin = result.getSixRelatives().get(shiYao - 1);
        String shiWuxing = result.getElements().get(shiYao - 1);
        String yingLiuqin = result.getSixRelatives().get(yingYao - 1);
        String yingWuxing = result.getElements().get(yingYao - 1);

        analysis.append(String.format("世爻居第%d爻(%s%s),代表自己、我方。\n",
            shiYao, shiLiuqin, shiWuxing));
        analysis.append(String.format("应爻居第%d爻(%s%s),代表对方、他人或事情本身。\n",
            yingYao, yingLiuqin, yingWuxing));

        // 分析世应生克关系
        if (shiWuxing.equals(yingWuxing)) {
            analysis.append("世应比和,双方势均力敌,宜合作共事。\n");
        } else if (isSheng(shiWuxing, yingWuxing)) {
            analysis.append("世生应,我方付出较多,对方得利,我方不利。\n");
        } else if (isKe(shiWuxing, yingWuxing)) {
            analysis.append("世克应,我方占优,可制对方,事情主动权在我。\n");
        } else if (isSheng(yingWuxing, shiWuxing)) {
            analysis.append("应生世,对方助我,他人相帮,事情有贵人相助。\n");
        } else if (isKe(yingWuxing, shiWuxing)) {
            analysis.append("应克世,对方制我,他人阻碍,需谨慎行事。\n");
        }
    }

    /**
     * 分析动爻
     * 《卜筮正宗》: 动爻发动,变化之机
     */
    private void analyzeDongYao(LiuyaoResult result, String yongshen, StringBuilder analysis) {
        int dongYao = result.getChangingLine();
        String dongYaoLiuqin = result.getSixRelatives().get(dongYao - 1);
        String dongYaoWuxing = result.getElements().get(dongYao - 1);
        String dongYaoLiushen = result.getSixAnimals().get(dongYao - 1);

        analysis.append(String.format("第%d爻发动,为%s%s,持%s。\n",
            dongYao, dongYaoLiuqin, dongYaoWuxing, dongYaoLiushen));

        // 判断动爻与世爻关系
        int shiYao = result.getWorldLine();
        if (dongYao == shiYao) {
            analysis.append("动爻为世爻,表示自身变动,主观能动性强,宜主动求变。\n");
        }

        // 判断动爻与应爻关系
        int yingYao = result.getResponseLine();
        if (dongYao == yingYao) {
            analysis.append("动爻为应爻,表示对方或事情有变,需随机应变。\n");
        }

        // 判断动爻六亲吉凶
        switch (dongYaoLiuqin) {
            case "父母":
                analysis.append("父母爻动,利文书学业,但生官克财,不利求财和子女。\n");
                break;
            case "兄弟":
                analysis.append("兄弟爻动,克财耗财,不利求财,但利合伙和朋友。\n");
                break;
            case "子孙":
                analysis.append("子孙爻动,克官制鬼,利健康平安,但不利求官。\n");
                break;
            case "妻财":
                analysis.append("妻财爻动,利求财婚姻,但克父母,不利文书考试。\n");
                break;
            case "官鬼":
                analysis.append("官鬼爻动,利求官升迁,但为忧患之神,需防病灾和阻碍。\n");
                break;
        }

        // 变卦分析
        String bianYaoLiuqin = result.getChangedSixRelatives().get(dongYao - 1);
        String bianYaoWuxing = result.getChangedElements().get(dongYao - 1);
        analysis.append(String.format("动爻变为%s%s,", bianYaoLiuqin, bianYaoWuxing));

        if (isSheng(dongYaoWuxing, bianYaoWuxing)) {
            analysis.append("动而化进,吉神愈吉,凶神转凶。\n");
        } else if (isKe(dongYaoWuxing, bianYaoWuxing)) {
            analysis.append("动而化退,力量减弱,事情反复。\n");
        } else if (isSheng(bianYaoWuxing, dongYaoWuxing)) {
            analysis.append("化爻回头生,得助力,吉。\n");
        } else if (isKe(bianYaoWuxing, dongYaoWuxing)) {
            analysis.append("化爻回头克,自损其力,凶。\n");
        } else {
            analysis.append("变化平和,需综合判断。\n");
        }
    }

    /**
     * 分析六神
     */
    private void analyzeLiushen(LiuyaoResult result, StringBuilder analysis) {
        int dongYao = result.getChangingLine();
        String dongYaoLiushen = result.getSixAnimals().get(dongYao - 1);

        String nature = LIUSHEN_NATURE.get(dongYaoLiushen);
        analysis.append(String.format("动爻持%s,%s\n", dongYaoLiushen, nature));

        int shiYao = result.getWorldLine();
        String shiLiushen = result.getSixAnimals().get(shiYao - 1);
        analysis.append(String.format("世爻持%s,", shiLiushen));

        switch (shiLiushen) {
            case "青龙":
                analysis.append("主吉庆喜悦,心情舒畅,事情顺利。\n");
                break;
            case "朱雀":
                analysis.append("主口舌是非,需注意言辞,防文书纠纷。\n");
                break;
            case "勾陈":
                analysis.append("主迟滞牵连,事情进展缓慢,宜耐心等待。\n");
                break;
            case "腾蛇":
                analysis.append("主虚惊怪异,心事不宁,需防小人暗算。\n");
                break;
            case "白虎":
                analysis.append("主凶灾血光,需注意安全,防疾病伤灾。\n");
                break;
            case "玄武":
                analysis.append("主暗昧盗失,防失窃欺骗,宜谨慎行事。\n");
                break;
        }
    }

    /**
     * 分析用神旺衰
     */
    private void analyzeYongshenStrength(LiuyaoResult result, String yongshen, StringBuilder analysis) {
        // 查找用神所在爻位
        List<String> sixRelatives = result.getSixRelatives();
        int yongshenYao = -1;

        for (int i = 0; i < sixRelatives.size(); i++) {
            if (sixRelatives.get(i).equals(yongshen)) {
                yongshenYao = i + 1;
                break;
            }
        }

        if (yongshenYao == -1) {
            analysis.append(String.format("卦中不见%s,用神伏藏,事情暂时难成,需等时机。\n", yongshen));
            return;
        }

        String yongshenWuxing = result.getElements().get(yongshenYao - 1);
        analysis.append(String.format("用神%s现于第%d爻,五行属%s。\n",
            yongshen, yongshenYao, yongshenWuxing));

        // 判断用神是否发动
        if (yongshenYao == result.getChangingLine()) {
            analysis.append("用神发动,主事情有变化,吉凶看变爻。\n");
        } else {
            analysis.append("用神安静,事情稳定,按现状发展。\n");
        }

        // 判断用神与世爻关系
        int shiYao = result.getWorldLine();
        String shiWuxing = result.getElements().get(shiYao - 1);

        if (yongshenYao == shiYao) {
            analysis.append("用神临世,事由我掌握,主动权在我,大吉。\n");
        } else if (isSheng(yongshenWuxing, shiWuxing)) {
            analysis.append("用神生世,事情助我,顺利可成。\n");
        } else if (isKe(yongshenWuxing, shiWuxing)) {
            analysis.append("用神克世,事情对我不利,需防阻碍。\n");
        }
    }

    /**
     * 生成综合结论
     */
    private String generateConclusion(LiuyaoResult result, String category, String yongshen) {
        StringBuilder conclusion = new StringBuilder();

        String benGua = result.getOriginalHexagramName();
        String bianGua = result.getChangedHexagramName();
        int dongYao = result.getChangingLine();

        // 卦象总论
        conclusion.append(String.format("得%s卦,第%d爻发动,变为%s。\n\n", benGua, dongYao, bianGua));

        // 根据世应和动爻给出具体建议
        int shiYao = result.getWorldLine();
        String dongYaoLiuqin = result.getSixRelatives().get(dongYao - 1);

        if (category != null) {
            conclusion.append(generateSpecificAdvice(category, result, yongshen));
        } else {
            conclusion.append("综合卦象分析:\n");
            if (dongYao == shiYao) {
                conclusion.append("世爻发动,宜主动行事,把握时机。");
            } else {
                conclusion.append("应观察时局变化,审时度势而行。");
            }
        }

        return conclusion.toString();
    }

    /**
     * 根据问题类别给出具体建议
     */
    private String generateSpecificAdvice(String category, LiuyaoResult result, String yongshen) {
        StringBuilder advice = new StringBuilder();

        // 根据不同类别给出针对性建议
        switch (category) {
            case "财运":
            case "求财":
            case "生意":
            case "投资":
                advice.append("【求财建议】\n");
                advice.append(analyzeWealth(result, yongshen));
                break;

            case "工作":
            case "事业":
            case "职位":
                advice.append("【事业建议】\n");
                advice.append(analyzeCareer(result, yongshen));
                break;

            case "婚姻":
            case "感情":
            case "恋爱":
                advice.append("【感情建议】\n");
                advice.append(analyzeMarriage(result, yongshen));
                break;

            case "考试":
            case "学业":
                advice.append("【学业建议】\n");
                advice.append(analyzeStudy(result, yongshen));
                break;

            case "父母":
                advice.append("【父母运势】\n");
                advice.append(analyzeParents(result, yongshen));
                break;

            case "合作":
            case "合伙":
                advice.append("【合作建议】\n");
                advice.append(analyzeCooperation(result, yongshen));
                break;

            case "家庭":
            case "家宅":
                advice.append("【家庭运势】\n");
                advice.append(analyzeFamily(result, yongshen));
                break;

            case "开店":
                advice.append("【开店建议】\n");
                advice.append(analyzeWealth(result, yongshen)); // 开店类似求财
                break;

            default:
                advice.append("【总体建议】\n");
                advice.append("综合卦象吉凶,审慎行事,顺应天时,方能趋吉避凶。\n");
        }

        return advice.toString();
    }

    /**
     * 分析财运
     */
    private String analyzeWealth(LiuyaoResult result, String yongshen) {
        // 查找妻财爻
        List<String> sixRelatives = result.getSixRelatives();
        int caiYao = findYongshen(sixRelatives, "妻财");

        if (caiYao == -1) {
            return "卦中不现财爻,求财暂时无门路,需另寻机会。建议: 可待时机成熟再求财。\n";
        }

        StringBuilder analysis = new StringBuilder();

        if (caiYao == result.getChangingLine()) {
            analysis.append("财爻发动,有求财之机,");
            String bianLiuqin = result.getChangedSixRelatives().get(caiYao - 1);
            if (bianLiuqin.equals("兄弟")) {
                analysis.append("但化兄弟回头克,财来财去,难以积聚。\n");
            } else if (bianLiuqin.equals("父母")) {
                analysis.append("化父母,财去文书,可能需要花费在学习或手续上。\n");
            } else {
                analysis.append("财运亨通,可积极求取。\n");
            }
        } else {
            analysis.append("财爻安静,财运平稳,");

            // 看兄弟爻
            if (result.getSixRelatives().get(result.getChangingLine() - 1).equals("兄弟")) {
                analysis.append("但兄弟爻动,有劫财之象,需防破耗。\n");
            } else {
                analysis.append("可稳步求财,不宜冒进。\n");
            }
        }

        analysis.append("\n建议: ");
        if (caiYao == result.getWorldLine()) {
            analysis.append("财临世爻,财运由己掌握,宜主动求财。");
        } else {
            analysis.append("量力而行,稳健为上,切忌贪心冒进。");
        }

        return analysis.toString();
    }

    /**
     * 分析事业
     */
    private String analyzeCareer(LiuyaoResult result, String yongshen) {
        List<String> sixRelatives = result.getSixRelatives();
        int guanYao = findYongshen(sixRelatives, "官鬼");

        if (guanYao == -1) {
            return "卦中不现官爻,求职升迁暂无机会,需继续努力等待。\n";
        }

        StringBuilder analysis = new StringBuilder();

        if (guanYao == result.getChangingLine()) {
            analysis.append("官爻发动,有升迁求职之机,宜把握时机。\n");
        } else {
            analysis.append("官爻安静,职位稳定,");

            if (result.getSixRelatives().get(result.getChangingLine() - 1).equals("子孙")) {
                analysis.append("但子孙爻动克官,恐有阻碍或小人捣乱。\n");
            } else {
                analysis.append("安心工作,等待时机。\n");
            }
        }

        analysis.append("\n建议: ");
        if (guanYao == result.getWorldLine()) {
            analysis.append("官临世爻,事业在握,展现能力即可获得认可。");
        } else {
            analysis.append("踏实工作,积累经验,时机成熟自然水到渠成。");
        }

        return analysis.toString();
    }

    /**
     * 分析婚姻感情
     */
    private String analyzeMarriage(LiuyaoResult result, String yongshen) {
        List<String> sixRelatives = result.getSixRelatives();
        int caiYao = findYongshen(sixRelatives, "妻财");

        if (caiYao == -1) {
            return "卦中不现财爻,姻缘未到,需耐心等待。\n";
        }

        StringBuilder analysis = new StringBuilder();

        int shiYao = result.getWorldLine();
        int yingYao = result.getResponseLine();

        // 分析世应关系
        String shiWuxing = result.getElements().get(shiYao - 1);
        String yingWuxing = result.getElements().get(yingYao - 1);

        if (isSheng(shiWuxing, yingWuxing) && isSheng(yingWuxing, shiWuxing)) {
            analysis.append("世应相生,双方有情,感情和谐,婚姻美满。\n");
        } else if (isKe(shiWuxing, yingWuxing) || isKe(yingWuxing, shiWuxing)) {
            analysis.append("世应相克,双方易有矛盾,需多沟通理解。\n");
        } else {
            analysis.append("世应平和,关系稳定,可长久发展。\n");
        }

        // 看财爻动静
        if (caiYao == result.getChangingLine()) {
            analysis.append("财爻发动,感情有变化,");
            String bianLiuqin = result.getChangedSixRelatives().get(caiYao - 1);
            if (bianLiuqin.equals("兄弟")) {
                analysis.append("化兄弟,恐有第三者介入或钱财问题影响感情。\n");
            } else {
                analysis.append("关系进展顺利,有望开花结果。\n");
            }
        }

        analysis.append("\n建议: 真诚相待,相互包容,用心经营感情,则感情长久。");

        return analysis.toString();
    }

    /**
     * 分析学业
     */
    private String analyzeStudy(LiuyaoResult result, String yongshen) {
        List<String> sixRelatives = result.getSixRelatives();
        int fumuYao = findYongshen(sixRelatives, "父母");

        if (fumuYao == -1) {
            return "卦中不现父母爻,考运不佳,需加倍努力。\n";
        }

        StringBuilder analysis = new StringBuilder();

        if (fumuYao == result.getChangingLine()) {
            analysis.append("父母爻发动,利文书考试,用功则必有成。\n");
        } else {
            analysis.append("父母爻安静,成绩稳定,");

            if (result.getSixRelatives().get(result.getChangingLine() - 1).equals("妻财")) {
                analysis.append("但财爻动克父母,需防贪玩影响学业。\n");
            } else {
                analysis.append("按部就班学习即可。\n");
            }
        }

        analysis.append("\n建议: 勤奋学习,认真复习,凭实力取胜,切勿投机取巧。");

        return analysis.toString();
    }

    /**
     * 查找用神所在爻位
     */
    private int findYongshen(List<String> sixRelatives, String yongshen) {
        for (int i = 0; i < sixRelatives.size(); i++) {
            if (sixRelatives.get(i).equals(yongshen)) {
                return i + 1;
            }
        }
        return -1;
    }

    /**
     * 判断五行相生
     */
    private boolean isSheng(String wuxing1, String wuxing2) {
        Map<String, String> shengMap = new HashMap<>() {{
            put("木", "火"); put("火", "土"); put("土", "金");
            put("金", "水"); put("水", "木");
        }};
        return wuxing2.equals(shengMap.get(wuxing1));
    }

    /**
     * 判断五行相克
     */
    private boolean isKe(String wuxing1, String wuxing2) {
        Map<String, String> keMap = new HashMap<>() {{
            put("木", "土"); put("土", "水"); put("水", "火");
            put("火", "金"); put("金", "木");
        }};
        return wuxing2.equals(keMap.get(wuxing1));
    }

    /**
     * 分析父母运势
     */
    private String analyzeParents(LiuyaoResult result, String yongshen) {
        List<String> sixRelatives = result.getSixRelatives();
        int fumuYao = findYongshen(sixRelatives, "父母");

        if (fumuYao == -1) {
            return "卦中不现父母爻,父母运势难测,需多加关心。\n";
        }

        StringBuilder analysis = new StringBuilder();

        if (fumuYao == result.getChangingLine()) {
            analysis.append("父母爻发动,父母运势有变化,");
            String bianLiuqin = result.getChangedSixRelatives().get(fumuYao - 1);
            if (bianLiuqin.equals("官鬼")) {
                analysis.append("化官鬼,需防父母身体不适或有忧患,宜多关心。\n");
            } else if (bianLiuqin.equals("子孙")) {
                analysis.append("化子孙,父母身体健康,运势转佳。\n");
            } else {
                analysis.append("需关注父母身体健康和精神状态。\n");
            }
        } else {
            analysis.append("父母爻安静,父母运势平稳,");

            if (result.getSixRelatives().get(result.getChangingLine() - 1).equals("妻财")) {
                analysis.append("但财爻动克父母,需防钱财问题或健康隐患。\n");
            } else {
                analysis.append("无大碍,继续保持关心即可。\n");
            }
        }

        analysis.append("\n建议: 多陪伴父母,关心其身体健康,尽孝道,家庭和睦为上。");

        return analysis.toString();
    }

    /**
     * 分析合作运势
     */
    private String analyzeCooperation(LiuyaoResult result, String yongshen) {
        List<String> sixRelatives = result.getSixRelatives();
        int shiYao = result.getWorldLine();
        int yingYao = result.getResponseLine();

        StringBuilder analysis = new StringBuilder();

        // 分析世应关系(合作中的我方和对方)
        String shiWuxing = result.getElements().get(shiYao - 1);
        String yingWuxing = result.getElements().get(yingYao - 1);
        String shiLiuqin = result.getSixRelatives().get(shiYao - 1);
        String yingLiuqin = result.getSixRelatives().get(yingYao - 1);

        if (shiWuxing.equals(yingWuxing)) {
            analysis.append("世应比和,双方实力相当,适合平等合作,共同发展。\n");
        } else if (isSheng(shiWuxing, yingWuxing)) {
            analysis.append("世生应,我方多付出,对方多得利,合作中需注意利益分配。\n");
        } else if (isSheng(yingWuxing, shiWuxing)) {
            analysis.append("应生世,对方助我,贵人相助,合作有利于我方。\n");
        } else if (isKe(shiWuxing, yingWuxing)) {
            analysis.append("世克应,我方主导,但需防强势引起对方不满。\n");
        } else if (isKe(yingWuxing, shiWuxing)) {
            analysis.append("应克世,对方强势,合作中需谨慎,防被动。\n");
        }

        // 查找财爻(合作项目的利益)
        int caiYao = findYongshen(sixRelatives, "妻财");
        if (caiYao != -1) {
            if (caiYao == result.getChangingLine()) {
                analysis.append("财爻发动,合作项目有财利可图,宜积极推进。\n");
            } else {
                analysis.append("财爻安静,合作收益稳定,可长期合作。\n");
            }
        }

        // 查找兄弟爻(合作伙伴或竞争)
        int xiongdiYao = findYongshen(sixRelatives, "兄弟");
        if (xiongdiYao != -1 && xiongdiYao == result.getChangingLine()) {
            analysis.append("兄弟爻动,合作中需防利益分配不均,或有竞争者介入。\n");
        }

        analysis.append("\n建议: 明确权责,公平分配,互信互利,诚信为本,方能合作长久。");

        return analysis.toString();
    }

    /**
     * 分析家庭运势
     */
    private String analyzeFamily(LiuyaoResult result, String yongshen) {
        List<String> sixRelatives = result.getSixRelatives();
        int fumuYao = findYongshen(sixRelatives, "父母");

        if (fumuYao == -1) {
            return "卦中不现父母爻,家庭运势需综合分析,宜以和为贵。\n";
        }

        StringBuilder analysis = new StringBuilder();

        // 查看父母爻动静(代表家宅、长辈)
        if (fumuYao == result.getChangingLine()) {
            analysis.append("父母爻发动,家庭有变动,");
            String bianLiuqin = result.getChangedSixRelatives().get(fumuYao - 1);
            if (bianLiuqin.equals("子孙")) {
                analysis.append("化子孙,家庭和睦,子女孝顺,家运转佳。\n");
            } else if (bianLiuqin.equals("兄弟")) {
                analysis.append("化兄弟,需防家人之间矛盾,宜多沟通。\n");
            } else {
                analysis.append("家庭成员关系有调整,需耐心处理。\n");
            }
        } else {
            analysis.append("父母爻安静,家宅稳定,家庭关系平和。\n");
        }

        // 分析世应关系(家庭成员之间)
        int shiYao = result.getWorldLine();
        int yingYao = result.getResponseLine();
        String shiWuxing = result.getElements().get(shiYao - 1);
        String yingWuxing = result.getElements().get(yingYao - 1);

        if (shiWuxing.equals(yingWuxing) || isSheng(shiWuxing, yingWuxing) || isSheng(yingWuxing, shiWuxing)) {
            analysis.append("家人之间关系融洽,互相扶持,家庭和睦。\n");
        } else if (isKe(shiWuxing, yingWuxing) || isKe(yingWuxing, shiWuxing)) {
            analysis.append("家人之间易有分歧,需多包容理解,避免冲突。\n");
        }

        analysis.append("\n建议: 家和万事兴,多陪伴家人,互相关爱,共同营造温馨和睦的家庭氛围。");

        return analysis.toString();
    }
}
