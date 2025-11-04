package com.lsspp.util;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 八字分析器 - 综合《三命通会》《子平真诠》《渊海子平》经典命理学
 *
 * 核心理论来源:
 * 1. 《渊海子平》- 子平法基础、格局论、十神系统
 * 2. 《三命通会》- 神煞系统、纳音五行、十二长生运程
 * 3. 《子平真诠》- 用神精论、调候用神、通关用神、格局真义
 *
 * 主要功能:
 * - 格局判断(正格八格、从格、化格、特殊格局)
 * - 十神分析(相生相克、组合关系)
 * - 神煞系统(天乙贵人、羊刃、桃花等)
 * - 调候用神(寒暖燥湿)
 * - 通关用神(冲克化解)
 * - 十二长生(生旺死绝)
 * - 性格分析
 * - 事业财运
 * - 婚姻感情
 */
public class BaziAnalyzer {

    // ==================== 一、天干地支基础数据 ====================

    /** 天干 */
    private static final String[] TIANGAN = {"甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"};

    /** 地支 */
    private static final String[] DIZHI = {"子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"};

    /** 天干五行 */
    private static final Map<String, String> GAN_WUXING = new HashMap<>();

    /** 地支五行 */
    private static final Map<String, String> ZHI_WUXING = new HashMap<>();

    /** 天干阴阳 */
    private static final Map<String, String> GAN_YINYANG = new HashMap<>();

    /** 地支阴阳 */
    private static final Map<String, String> ZHI_YINYANG = new HashMap<>();

    static {
        // 天干五行
        GAN_WUXING.put("甲", "木"); GAN_WUXING.put("乙", "木");
        GAN_WUXING.put("丙", "火"); GAN_WUXING.put("丁", "火");
        GAN_WUXING.put("戊", "土"); GAN_WUXING.put("己", "土");
        GAN_WUXING.put("庚", "金"); GAN_WUXING.put("辛", "金");
        GAN_WUXING.put("壬", "水"); GAN_WUXING.put("癸", "水");

        // 地支五行
        ZHI_WUXING.put("寅", "木"); ZHI_WUXING.put("卯", "木");
        ZHI_WUXING.put("巳", "火"); ZHI_WUXING.put("午", "火");
        ZHI_WUXING.put("申", "金"); ZHI_WUXING.put("酉", "金");
        ZHI_WUXING.put("亥", "水"); ZHI_WUXING.put("子", "水");
        ZHI_WUXING.put("辰", "土"); ZHI_WUXING.put("戌", "土");
        ZHI_WUXING.put("丑", "土"); ZHI_WUXING.put("未", "土");

        // 天干阴阳
        GAN_YINYANG.put("甲", "阳"); GAN_YINYANG.put("乙", "阴");
        GAN_YINYANG.put("丙", "阳"); GAN_YINYANG.put("丁", "阴");
        GAN_YINYANG.put("戊", "阳"); GAN_YINYANG.put("己", "阴");
        GAN_YINYANG.put("庚", "阳"); GAN_YINYANG.put("辛", "阴");
        GAN_YINYANG.put("壬", "阳"); GAN_YINYANG.put("癸", "阴");

        // 地支阴阳
        ZHI_YINYANG.put("子", "阳"); ZHI_YINYANG.put("丑", "阴");
        ZHI_YINYANG.put("寅", "阳"); ZHI_YINYANG.put("卯", "阴");
        ZHI_YINYANG.put("辰", "阳"); ZHI_YINYANG.put("巳", "阴");
        ZHI_YINYANG.put("午", "阳"); ZHI_YINYANG.put("未", "阴");
        ZHI_YINYANG.put("申", "阳"); ZHI_YINYANG.put("酉", "阴");
        ZHI_YINYANG.put("戌", "阳"); ZHI_YINYANG.put("亥", "阴");
    }

    // ==================== 二、十神系统 ====================

    /**
     * 计算十神
     * 十神理论源自《渊海子平》，是八字命理的核心
     *
     * 比肩、劫财 - 同我者
     * 食神、伤官 - 我生者
     * 偏财、正财 - 我克者
     * 偏官(七杀)、正官 - 克我者
     * 偏印(枭神)、正印 - 生我者
     */
    public static String getShishen(String rizhu, String target) {
        String rizhuWuxing = GAN_WUXING.get(rizhu);
        String targetWuxing = GAN_WUXING.get(target);
        String rizhuYinyang = GAN_YINYANG.get(rizhu);
        String targetYinyang = GAN_YINYANG.get(target);

        boolean sameYinyang = rizhuYinyang.equals(targetYinyang);

        // 同我者 - 比劫
        if (rizhuWuxing.equals(targetWuxing)) {
            return sameYinyang ? "比肩" : "劫财";
        }

        // 我生者 - 食伤
        if (isSheng(rizhuWuxing, targetWuxing)) {
            return sameYinyang ? "食神" : "伤官";
        }

        // 我克者 - 财
        if (isKe(rizhuWuxing, targetWuxing)) {
            return sameYinyang ? "偏财" : "正财";
        }

        // 克我者 - 官杀
        if (isKe(targetWuxing, rizhuWuxing)) {
            return sameYinyang ? "七杀" : "正官";
        }

        // 生我者 - 印
        if (isSheng(targetWuxing, rizhuWuxing)) {
            return sameYinyang ? "偏印" : "正印";
        }

        return "未知";
    }

    /**
     * 五行相生关系
     */
    private static boolean isSheng(String from, String to) {
        Map<String, String> sheng = new HashMap<>();
        sheng.put("木", "火");
        sheng.put("火", "土");
        sheng.put("土", "金");
        sheng.put("金", "水");
        sheng.put("水", "木");
        return sheng.get(from) != null && sheng.get(from).equals(to);
    }

    /**
     * 五行相克关系
     */
    private static boolean isKe(String from, String to) {
        Map<String, String> ke = new HashMap<>();
        ke.put("木", "土");
        ke.put("火", "金");
        ke.put("土", "水");
        ke.put("金", "木");
        ke.put("水", "火");
        return ke.get(from) != null && ke.get(from).equals(to);
    }

    // ==================== 三、格局判断系统 ====================

    /**
     * 格局判断 - 综合《子平真诠》格局理论
     *
     * 正格八格：
     * 1. 正官格 2. 偏官(七杀)格 3. 正印格 4. 偏印格
     * 5. 正财格 6. 偏财格 7. 食神格 8. 伤官格
     *
     * 特殊格局：
     * 1. 从格：从儿格、从财格、从杀格、从势格
     * 2. 化格：化气格
     * 3. 专旺格：曲直格、炎上格、稼穑格、从革格、润下格
     */
    public static class GeJuResult {
        public String mainGeju;           // 主格局
        public String subGeju;            // 子格局
        public boolean isZhengge;         // 是否正格
        public boolean isCongge;          // 是否从格
        public boolean isHuage;           // 是否化格
        public boolean isZhuanwang;       // 是否专旺格
        public String yongshen;           // 格局用神
        public String xishen;             // 格局喜神
        public String jishen;             // 格局忌神
        public List<String> analysis;     // 格局分析
        public int strength;              // 格局强度(1-10)

        public GeJuResult() {
            this.analysis = new ArrayList<>();
        }
    }

    /**
     * 判断格局
     */
    public static GeJuResult analyzeGeju(String[] tiangan, String[] dizhi) {
        GeJuResult result = new GeJuResult();
        result.analysis.add("========== 格局分析 ==========");

        String rizhu = tiangan[2];  // 日主天干
        String yuezhi = dizhi[1];   // 月支
        String yuegan = tiangan[1]; // 月干

        result.analysis.add("日主: " + rizhu + " (" + GAN_WUXING.get(rizhu) + ")");
        result.analysis.add("月令: " + yuezhi + " (" + ZHI_WUXING.get(yuezhi) + ")");

        // 1. 取月令藏干作为格局依据（《子平真诠》："何谓格局？八字用神，专求月令"）
        String yuezhi透干 = findTransparentGan(yuezhi, tiangan);
        String shishen = yuezhi透干 != null ? getShishen(rizhu, yuezhi透干) : "未透";

        result.analysis.add("月令透干: " + (yuezhi透干 != null ? yuezhi透干 : "未透"));
        result.analysis.add("月令十神: " + shishen);
        result.analysis.add("");

        // 2. 先判断是否为特殊格局（从格、化格、专旺格）
        if (checkCongge(tiangan, dizhi, result)) {
            return result;
        }

        if (checkHuage(tiangan, dizhi, result)) {
            return result;
        }

        if (checkZhuanwang(tiangan, dizhi, result)) {
            return result;
        }

        // 3. 正格判断 - 以月令十神定格
        if (yuezhi透干 != null) {
            result.isZhengge = true;
            result.mainGeju = shishen + "格";
            result.strength = evaluateGejuStrength(tiangan, dizhi, shishen);

            result.analysis.add("格局类型: 正格");
            result.analysis.add("格局名称: " + result.mainGeju);
            result.analysis.add("格局强度: " + result.strength + "/10");

            // 根据格局定用神
            defineYongshenByGeju(result, rizhu, shishen, tiangan, dizhi);
        } else {
            // 月令未透，取他干定格
            result.mainGeju = "普通格局";
            result.analysis.add("月令未透，格局不明显");
        }

        return result;
    }

    /**
     * 查找透干
     */
    private static String findTransparentGan(String zhi, String[] tiangan) {
        // 获取地支藏干
        Map<String, String[]> canggan = getCangganMap();
        String[] zhiCanggan = canggan.get(zhi);

        if (zhiCanggan != null) {
            // 检查天干是否有透出
            for (String cg : zhiCanggan) {
                for (int i = 0; i < 4; i++) {
                    if (i != 2 && tiangan[i].equals(cg)) {  // 排除日主
                        return cg;
                    }
                }
            }
        }
        return null;
    }

    /**
     * 地支藏干映射
     */
    private static Map<String, String[]> getCangganMap() {
        Map<String, String[]> map = new HashMap<>();
        map.put("子", new String[]{"癸"});
        map.put("丑", new String[]{"己", "癸", "辛"});
        map.put("寅", new String[]{"甲", "丙", "戊"});
        map.put("卯", new String[]{"乙"});
        map.put("辰", new String[]{"戊", "乙", "癸"});
        map.put("巳", new String[]{"丙", "庚", "戊"});
        map.put("午", new String[]{"丁", "己"});
        map.put("未", new String[]{"己", "丁", "乙"});
        map.put("申", new String[]{"庚", "壬", "戊"});
        map.put("酉", new String[]{"辛"});
        map.put("戌", new String[]{"戊", "辛", "丁"});
        map.put("亥", new String[]{"壬", "甲"});
        return map;
    }

    /**
     * 检查从格
     * 《子平真诠》："日主无根，满局皆是官杀，不得已而从之，谓之从杀格"
     */
    private static boolean checkCongge(String[] tiangan, String[] dizhi, GeJuResult result) {
        String rizhu = tiangan[2];
        String rizhuWuxing = GAN_WUXING.get(rizhu);

        // 统计比劫和印的数量
        int bijieCount = 0;
        int yinxingCount = 0;

        for (int i = 0; i < 4; i++) {
            if (i == 2) continue;
            String shishen = getShishen(rizhu, tiangan[i]);
            if (shishen.contains("比肩") || shishen.contains("劫财")) {
                bijieCount++;
            }
            if (shishen.contains("印")) {
                yinxingCount++;
            }
        }

        // 日主无根或根气极弱，才能从格
        if (bijieCount == 0 && yinxingCount <= 1) {
            // 判断从什么
            int caiwangCount = 0, guanCount = 0, shiShangCount = 0;

            for (int i = 0; i < 4; i++) {
                if (i == 2) continue;
                String shishen = getShishen(rizhu, tiangan[i]);
                if (shishen.contains("财")) caiwangCount++;
                if (shishen.contains("官") || shishen.contains("杀")) guanCount++;
                if (shishen.contains("食") || shishen.contains("伤")) shiShangCount++;
            }

            if (caiwangCount >= 2) {
                result.isCongge = true;
                result.mainGeju = "从财格";
                result.yongshen = "财、食伤";
                result.jishen = "比劫、印";
                result.analysis.add("从格成立: 日主无根，满局财星");
                return true;
            } else if (guanCount >= 2) {
                result.isCongge = true;
                result.mainGeju = "从杀格";
                result.yongshen = "官杀、财";
                result.jishen = "比劫、印、食伤";
                result.analysis.add("从格成立: 日主无根，满局官杀");
                return true;
            } else if (shiShangCount >= 2) {
                result.isCongge = true;
                result.mainGeju = "从儿格";
                result.yongshen = "食伤、财";
                result.jishen = "官杀、印";
                result.analysis.add("从格成立: 日主无根，满局食伤");
                return true;
            }
        }

        return false;
    }

    /**
     * 检查化格
     * 五合化气：甲己化土、乙庚化金、丙辛化水、丁壬化木、戊癸化火
     *
     * 成格条件：
     * 1. 日主与他干相合
     * 2. 月令或地支见化神五行
     * 3. 化神五行强旺
     * 4. 无强克制化神的五行
     */
    private static boolean checkHuage(String[] tiangan, String[] dizhi, GeJuResult result) {
        String rizhu = tiangan[2];

        // 定义天干五合化气关系
        Map<String, Map<String, String>> hehua = new HashMap<>();
        Map<String, String> jia = new HashMap<>();
        jia.put("己", "土");
        hehua.put("甲", jia);

        Map<String, String> yi = new HashMap<>();
        yi.put("庚", "金");
        hehua.put("乙", yi);

        Map<String, String> bing = new HashMap<>();
        bing.put("辛", "水");
        hehua.put("丙", bing);

        Map<String, String> ding = new HashMap<>();
        ding.put("壬", "木");
        hehua.put("丁", ding);

        Map<String, String> wu = new HashMap<>();
        wu.put("癸", "火");
        hehua.put("戊", wu);

        Map<String, String> ji = new HashMap<>();
        ji.put("甲", "土");
        hehua.put("己", ji);

        Map<String, String> geng = new HashMap<>();
        geng.put("乙", "金");
        hehua.put("庚", geng);

        Map<String, String> xin = new HashMap<>();
        xin.put("丙", "水");
        hehua.put("辛", xin);

        Map<String, String> ren = new HashMap<>();
        ren.put("丁", "木");
        hehua.put("壬", ren);

        Map<String, String> gui = new HashMap<>();
        gui.put("戊", "火");
        hehua.put("癸", gui);

        // 检查日主是否与他干相合
        Map<String, String> rizhuHehua = hehua.get(rizhu);
        if (rizhuHehua == null) {
            return false;
        }

        String huashenWuxing = null;
        String hegan = null;

        // 检查日主与年干、月干、时干的合化
        for (int i = 0; i < 4; i++) {
            if (i == 2) continue; // 跳过日主自己
            String gan = tiangan[i];
            if (rizhuHehua.containsKey(gan)) {
                huashenWuxing = rizhuHehua.get(gan);
                hegan = gan;
                break;
            }
        }

        if (huashenWuxing == null) {
            return false; // 没有合化关系
        }

        // 统计化神五行在地支中的数量
        int huashenCount = 0;
        for (String zhi : dizhi) {
            if (ZHI_WUXING.get(zhi).equals(huashenWuxing)) {
                huashenCount++;
            }
        }

        // 统计化神五行在天干中的数量（除了合化的两干）
        for (String gan : tiangan) {
            if (!gan.equals(rizhu) && !gan.equals(hegan) && GAN_WUXING.get(gan).equals(huashenWuxing)) {
                huashenCount++;
            }
        }

        // 化神五行需要较强（至少出现2次以上）
        if (huashenCount >= 2) {
            result.isHuage = true;
            result.mainGeju = getHuagenineName(rizhu, hegan, huashenWuxing);
            result.yongshen = huashenWuxing;
            result.analysis.add("化格成立: " + rizhu + hegan + "化" + huashenWuxing);
            result.analysis.add("化神五行强度: " + huashenCount);
            result.strength = Math.min(10, huashenCount + 5);
            return true;
        }

        return false;
    }

    /**
     * 获取化格名称
     */
    private static String getHuagenineName(String gan1, String gan2, String wuxing) {
        // 标准化天干顺序（甲己、乙庚、丙辛、丁壬、戊癸）
        String[] pairs = {
            "甲己", "己甲",
            "乙庚", "庚乙",
            "丙辛", "辛丙",
            "丁壬", "壬丁",
            "戊癸", "癸戊"
        };

        String pair = gan1 + gan2;
        for (int i = 0; i < pairs.length; i += 2) {
            if (pair.equals(pairs[i]) || pair.equals(pairs[i + 1])) {
                return pairs[i] + "化" + wuxing + "格";
            }
        }

        return gan1 + gan2 + "化" + wuxing + "格";
    }

    /**
     * 检查专旺格
     */
    private static boolean checkZhuanwang(String[] tiangan, String[] dizhi, GeJuResult result) {
        String rizhu = tiangan[2];
        String rizhuWuxing = GAN_WUXING.get(rizhu);

        // 统计同五行的数量
        int sameWuxingCount = 0;
        for (int i = 0; i < 4; i++) {
            if (GAN_WUXING.get(tiangan[i]).equals(rizhuWuxing)) {
                sameWuxingCount++;
            }
            if (ZHI_WUXING.get(dizhi[i]).equals(rizhuWuxing)) {
                sameWuxingCount++;
            }
        }

        // 如果同五行占5个以上，可能是专旺格
        if (sameWuxingCount >= 5) {
            result.isZhuanwang = true;
            switch (rizhuWuxing) {
                case "木": result.mainGeju = "曲直格"; break;
                case "火": result.mainGeju = "炎上格"; break;
                case "土": result.mainGeju = "稼穑格"; break;
                case "金": result.mainGeju = "从革格"; break;
                case "水": result.mainGeju = "润下格"; break;
            }
            result.yongshen = rizhuWuxing;
            result.analysis.add("专旺格成立: " + rizhuWuxing + "气专旺");
            return true;
        }

        return false;
    }

    /**
     * 评估格局强度（1-10分）
     *
     * 评分标准：
     * 基础分：5分
     * 月令透干：+2分
     * 用神得令：+1分
     * 用神有根：+1分
     * 无破格：+1分
     * 其他支持：+0-2分
     */
    private static int evaluateGejuStrength(String[] tiangan, String[] dizhi, String geju) {
        int score = 5; // 基础分

        String rizhu = tiangan[2];
        String yuegan = tiangan[1];
        String yuezhi = dizhi[1];

        // 获取格局对应的十神
        String gejuShishen = geju.replace("格", "");

        // 1. 月令透干（+2分）
        String yuezhi透干 = findTransparentGan(yuezhi, tiangan);
        if (yuezhi透干 != null) {
            String shishen = getShishen(rizhu, yuezhi透干);
            if (shishen.equals(gejuShishen)) {
                score += 2;
            }
        }

        // 2. 用神得令（+1分）- 检查格局用神五行是否在月令当旺
        String gejuWuxing = getGejuWuxing(gejuShishen, rizhu);
        String yuezhiWuxing = ZHI_WUXING.get(yuezhi);
        if (gejuWuxing != null && isWangxiang(gejuWuxing, yuezhiWuxing)) {
            score += 1;
        }

        // 3. 用神有根（+1分）- 检查格局用神天干是否在地支有根
        if (hasRoot(yuegan, dizhi)) {
            score += 1;
        }

        // 4. 无破格（+1分）- 检查是否有强势五行克制格局用神
        if (!hasPoge(tiangan, dizhi, gejuShishen, rizhu)) {
            score += 1;
        }

        // 5. 其他支持（+0-2分）- 统计支持格局的其他天干地支
        int supportCount = 0;
        for (int i = 0; i < 4; i++) {
            if (i != 2 && i != 1) { // 排除日主和月干
                String shishen = getShishen(rizhu, tiangan[i]);
                if (shishen.equals(gejuShishen)) {
                    supportCount++;
                }
            }
        }
        score += Math.min(2, supportCount);

        // 确保分数在1-10范围内
        return Math.max(1, Math.min(10, score));
    }

    /**
     * 获取格局对应的五行
     */
    private static String getGejuWuxing(String shishen, String rizhu) {
        String rizhuWuxing = GAN_WUXING.get(rizhu);

        // 根据十神关系推导格局五行
        if (shishen.contains("财")) {
            // 我克者为财
            return getKeWuxing(rizhuWuxing);
        } else if (shishen.contains("官") || shishen.contains("杀")) {
            // 克我者为官杀
            return getKeWoWuxing(rizhuWuxing);
        } else if (shishen.contains("印")) {
            // 生我者为印
            return getShengWoWuxing(rizhuWuxing);
        } else if (shishen.contains("食") || shishen.contains("伤")) {
            // 我生者为食伤
            return getWoShengWuxing(rizhuWuxing);
        } else if (shishen.contains("比") || shishen.contains("劫")) {
            // 同我者为比劫
            return rizhuWuxing;
        }

        return null;
    }

    /** 获取我克的五行 */
    private static String getKeWuxing(String wuxing) {
        Map<String, String> map = new HashMap<>();
        map.put("木", "土"); map.put("火", "金"); map.put("土", "水");
        map.put("金", "木"); map.put("水", "火");
        return map.get(wuxing);
    }

    /** 获取克我的五行 */
    private static String getKeWoWuxing(String wuxing) {
        Map<String, String> map = new HashMap<>();
        map.put("木", "金"); map.put("火", "水"); map.put("土", "木");
        map.put("金", "火"); map.put("水", "土");
        return map.get(wuxing);
    }

    /** 获取生我的五行 */
    private static String getShengWoWuxing(String wuxing) {
        Map<String, String> map = new HashMap<>();
        map.put("木", "水"); map.put("火", "木"); map.put("土", "火");
        map.put("金", "土"); map.put("水", "金");
        return map.get(wuxing);
    }

    /** 获取我生的五行 */
    private static String getWoShengWuxing(String wuxing) {
        Map<String, String> map = new HashMap<>();
        map.put("木", "火"); map.put("火", "土"); map.put("土", "金");
        map.put("金", "水"); map.put("水", "木");
        return map.get(wuxing);
    }

    /**
     * 判断五行是否旺相（当令或相令）
     */
    private static boolean isWangxiang(String wuxing, String yuezhiWuxing) {
        // 当令：同五行
        if (wuxing.equals(yuezhiWuxing)) {
            return true;
        }
        // 相令：我生的五行
        String woSheng = getWoShengWuxing(wuxing);
        return woSheng != null && woSheng.equals(yuezhiWuxing);
    }

    /**
     * 检查天干是否在地支有根
     */
    private static boolean hasRoot(String gan, String[] dizhi) {
        String ganWuxing = GAN_WUXING.get(gan);
        for (String zhi : dizhi) {
            String zhiWuxing = ZHI_WUXING.get(zhi);
            // 同五行或者生我的五行视为有根
            if (zhiWuxing.equals(ganWuxing)) {
                return true;
            }
            String shengWo = getShengWoWuxing(ganWuxing);
            if (shengWo != null && shengWo.equals(zhiWuxing)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检查是否破格
     */
    private static boolean hasPoge(String[] tiangan, String[] dizhi, String gejuShishen, String rizhu) {
        String gejuWuxing = getGejuWuxing(gejuShishen, rizhu);
        if (gejuWuxing == null) {
            return false;
        }

        String keGejuWuxing = getKeWoWuxing(gejuWuxing);
        if (keGejuWuxing == null) {
            return false;
        }

        // 统计克制格局五行的数量
        int keCount = 0;
        for (String gan : tiangan) {
            if (GAN_WUXING.get(gan).equals(keGejuWuxing)) {
                keCount++;
            }
        }
        for (String zhi : dizhi) {
            if (ZHI_WUXING.get(zhi).equals(keGejuWuxing)) {
                keCount++;
            }
        }

        // 克制力量强（3个以上）视为破格
        return keCount >= 3;
    }

    /**
     * 根据格局定用神
     */
    private static void defineYongshenByGeju(GeJuResult result, String rizhu, String shishen, String[] tiangan, String[] dizhi) {
        result.analysis.add("");
        result.analysis.add("---------- 用神分析 ----------");

        switch (shishen) {
            case "正官":
            case "七杀":
                result.yongshen = "印、食伤";
                result.xishen = "比劫";
                result.jishen = "财";
                result.analysis.add("官杀格，以印化杀为用，食伤制杀亦可");
                break;
            case "正印":
            case "偏印":
                result.yongshen = "官杀、比劫";
                result.jishen = "财";
                result.analysis.add("印格，以官杀生印为用，忌财破印");
                break;
            case "正财":
            case "偏财":
                result.yongshen = "食伤、官杀";
                result.xishen = "比劫";
                result.jishen = "印";
                result.analysis.add("财格，以食伤生财、官杀护财为用");
                break;
            case "食神":
            case "伤官":
                result.yongshen = "财、比劫";
                result.jishen = "印、官杀";
                result.analysis.add("食伤格，以财泄秀为用，忌印夺食");
                break;
        }
    }

    // ==================== 四、神煞系统（源自《三命通会》） ====================

    /**
     * 神煞分析结果
     */
    public static class ShenshaResult {
        public List<String> jixing = new ArrayList<>();      // 吉星
        public List<String> xiongshen = new ArrayList<>();   // 凶神
        public Map<String, String> meaning = new HashMap<>(); // 神煞含义
        public List<String> analysis = new ArrayList<>();    // 分析
    }

    /**
     * 分析神煞
     * 《三命通会》记载上百种神煞，这里选取最重要的20种
     */
    public static ShenshaResult analyzeShensha(String[] tiangan, String[] dizhi) {
        ShenshaResult result = new ShenshaResult();
        result.analysis.add("========== 神煞分析 ==========");

        String rizhu = tiangan[2];
        String rizhi = dizhi[2];
        String nianzhi = dizhi[0];
        String yuezhi = dizhi[1];

        // 1. 天乙贵人（最吉之神）
        checkTianyiGuiren(rizhu, dizhi, result);

        // 2. 天德贵人、月德贵人
        checkTianyueGuiren(yuezhi, tiangan, dizhi, result);

        // 3. 文昌贵人
        checkWenchangGuiren(rizhu, dizhi, result);

        // 4. 桃花（咸池）
        checkTaohua(nianzhi, rizhi, dizhi, result);

        // 5. 红艳
        checkHongyan(rizhu, dizhi, result);

        // 6. 羊刃
        checkYangren(rizhu, dizhi, result);

        // 7. 驿马
        checkYima(nianzhi, rizhi, dizhi, result);

        // 8. 华盖
        checkHuagai(nianzhi, rizhi, dizhi, result);

        // 9. 金舆
        checkJinyu(rizhu, dizhi, result);

        // 10. 禄神
        checkLushen(rizhu, dizhi, result);

        // 11. 将星
        checkJiangxing(nianzhi, rizhi, dizhi, result);

        // 12. 劫煞
        checkJiesha(nianzhi, rizhi, dizhi, result);

        // 13. 空亡
        checkKongwang(tiangan, dizhi, result);

        // 14. 孤辰寡宿
        checkGuchenGuasu(nianzhi, dizhi, result);

        // 15. 天罗地网
        checkTianluoDiwang(rizhi, result);

        // 16. 阴阳差错
        checkYingyangChacuo(tiangan, dizhi, result);

        // 17. 三奇
        checkSanqi(tiangan, result);

        // 18. 亡神
        checkWangshen(nianzhi, rizhi, dizhi, result);

        // 19. 天喜
        checkTianxi(nianzhi, dizhi, result);

        // 20. 红鸾
        checkHongluan(nianzhi, dizhi, result);

        return result;
    }

    /** 天乙贵人（优化版）- 列出所有位置并标注柱位 */
    private static void checkTianyiGuiren(String rizhu, String[] dizhi, ShenshaResult result) {
        // 天乙贵人查法：甲戊庚牛羊，乙己鼠猴乡，丙丁猪鸡位，壬癸兔蛇藏，六辛逢虎马
        Map<String, String[]> guiren = new HashMap<>();
        guiren.put("甲", new String[]{"丑", "未"});
        guiren.put("乙", new String[]{"子", "申"});
        guiren.put("丙", new String[]{"亥", "酉"});
        guiren.put("丁", new String[]{"亥", "酉"});
        guiren.put("戊", new String[]{"丑", "未"});
        guiren.put("己", new String[]{"子", "申"});
        guiren.put("庚", new String[]{"丑", "未"});
        guiren.put("辛", new String[]{"寅", "午"});
        guiren.put("壬", new String[]{"卯", "巳"});
        guiren.put("癸", new String[]{"卯", "巳"});

        String[] pillars = {"年", "月", "日", "时"};
        String[] target = guiren.get(rizhu);
        List<String> positions = new ArrayList<>();

        if (target != null) {
            for (int i = 0; i < dizhi.length; i++) {
                for (String t : target) {
                    if (dizhi[i].equals(t)) {
                        positions.add(pillars[i] + "支" + t);
                    }
                }
            }
        }

        if (!positions.isEmpty()) {
            String posStr = String.join("、", positions);
            result.jixing.add("天乙贵人(" + posStr + ")");

            // 根据位置数量和柱位给出不同的解释
            String meaning = "【五星级贵人★★★★★】最吉之神，命中遇贵人";
            if (positions.size() >= 2) {
                meaning += "，双贵人护身，遇事多贵人相助，逢凶化吉";
            } else {
                String pos = positions.get(0);
                if (pos.startsWith("年")) {
                    meaning += "，早年得长辈贵人扶持";
                } else if (pos.startsWith("月")) {
                    meaning += "，中年事业得贵人相助";
                } else if (pos.startsWith("日")) {
                    meaning += "，配偶为贵人，婚姻有助";
                } else {
                    meaning += "，晚年得贵人庇佑，子女孝顺";
                }
            }
            result.meaning.put("天乙贵人", meaning);
        }
    }

    /** 天德月德贵人（优化版）*/
    private static void checkTianyueGuiren(String yuezhi, String[] tiangan, String[] dizhi, ShenshaResult result) {
        // 天德贵人：正月丁，二月申，三月壬，四月辛，五月亥，六月甲，七月癸，八月寅，九月丙，十月乙，十一月巳，十二月庚
        Map<String, String> tiande = new HashMap<>();
        tiande.put("寅", "丁");  // 正月
        tiande.put("卯", "申");  // 二月
        tiande.put("辰", "壬");  // 三月
        tiande.put("巳", "辛");  // 四月
        tiande.put("午", "亥");  // 五月
        tiande.put("未", "甲");  // 六月
        tiande.put("申", "癸");  // 七月
        tiande.put("酉", "寅");  // 八月
        tiande.put("戌", "丙");  // 九月
        tiande.put("亥", "乙");  // 十月
        tiande.put("子", "巳");  // 十一月
        tiande.put("丑", "庚");  // 十二月

        // 月德贵人：寅午戌月丙，申子辰月壬，亥卯未月甲，巳酉丑月庚
        Map<String, String> yuede = new HashMap<>();
        yuede.put("寅", "丙"); yuede.put("午", "丙"); yuede.put("戌", "丙");
        yuede.put("申", "壬"); yuede.put("子", "壬"); yuede.put("辰", "壬");
        yuede.put("亥", "甲"); yuede.put("卯", "甲"); yuede.put("未", "甲");
        yuede.put("巳", "庚"); yuede.put("酉", "庚"); yuede.put("丑", "庚");

        String[] pillars = {"年", "月", "日", "时"};
        boolean hasTiande = false;
        boolean hasYuede = false;

        // 检查天德
        String tiandeGan = tiande.get(yuezhi);
        if (tiandeGan != null) {
            List<String> positions = new ArrayList<>();
            for (int i = 0; i < tiangan.length; i++) {
                if (tiangan[i].equals(tiandeGan)) {
                    positions.add(pillars[i] + "干" + tiandeGan);
                    hasTiande = true;
                }
            }
            // 检查地支（天德也可在地支中出现）
            for (int i = 0; i < dizhi.length; i++) {
                if (dizhi[i].equals(tiandeGan)) {
                    positions.add(pillars[i] + "支" + tiandeGan);
                    hasTiande = true;
                }
            }

            if (hasTiande) {
                String posStr = String.join("、", positions);
                result.jixing.add("天德贵人(" + posStr + ")");
                result.meaning.put("天德贵人", "【五星级贵人★★★★★】福德之星，化险为夷，逢凶化吉，一生少灾厄");
            }
        }

        // 检查月德
        String yuedeGan = yuede.get(yuezhi);
        if (yuedeGan != null) {
            List<String> positions = new ArrayList<>();
            for (int i = 0; i < tiangan.length; i++) {
                if (tiangan[i].equals(yuedeGan)) {
                    positions.add(pillars[i] + "干" + yuedeGan);
                    hasYuede = true;
                }
            }

            if (hasYuede) {
                String posStr = String.join("、", positions);
                result.jixing.add("月德贵人(" + posStr + ")");
                result.meaning.put("月德贵人", "【四星级贵人★★★★】月中贵德，善良正直，福寿双全");
            }
        }

        // 天月德合（天德+月德同时出现，效果加倍）
        if (hasTiande && hasYuede) {
            result.jixing.add("天月德合");
            result.meaning.put("天月德合", "【特殊组合】天德月德同现，福禄倍增，大吉大利");
        }
    }

    /** 文昌贵人（优化版）*/
    private static void checkWenchangGuiren(String rizhu, String[] dizhi, ShenshaResult result) {
        // 文昌贵人查法：甲乙巳午报君知，丙戊申宫丁己鸡，庚猪辛鼠壬逢虎，癸人见卯入云梯
        Map<String, String> wenchang = new HashMap<>();
        wenchang.put("甲", "巳"); wenchang.put("乙", "午");
        wenchang.put("丙", "申"); wenchang.put("丁", "酉");
        wenchang.put("戊", "申"); wenchang.put("己", "酉");
        wenchang.put("庚", "亥"); wenchang.put("辛", "子");
        wenchang.put("壬", "寅"); wenchang.put("癸", "卯");

        String[] pillars = {"年", "月", "日", "时"};
        String target = wenchang.get(rizhu);
        List<String> positions = new ArrayList<>();

        for (int i = 0; i < dizhi.length; i++) {
            if (dizhi[i].equals(target)) {
                positions.add(pillars[i] + "支" + target);
            }
        }

        if (!positions.isEmpty()) {
            String posStr = String.join("、", positions);
            result.jixing.add("文昌贵人(" + posStr + ")");

            String meaning = "【四星级贵人★★★★】主聪明好学，利文途功名";
            if (positions.size() >= 2) {
                meaning += "，文昌双现，学业特优，考试运佳";
            } else {
                String pos = positions.get(0);
                if (pos.startsWith("年")) {
                    meaning += "，少年聪慧，学业基础好";
                } else if (pos.startsWith("月")) {
                    meaning += "，利求学考试，职场文书运佳";
                } else if (pos.startsWith("日")) {
                    meaning += "，配偶聪慧，家庭重视教育";
                } else {
                    meaning += "，晚年好学不倦，子女读书运好";
                }
            }
            result.meaning.put("文昌贵人", meaning);
        }
    }

    /** 桃花（咸池） */
    private static void checkTaohua(String nianzhi, String rizhi, String[] dizhi, ShenshaResult result) {
        // 寅午戌见卯，申子辰见酉，巳酉丑见午，亥卯未见子
        Map<String, String> taohua = new HashMap<>();
        taohua.put("寅", "卯"); taohua.put("午", "卯"); taohua.put("戌", "卯");
        taohua.put("申", "酉"); taohua.put("子", "酉"); taohua.put("辰", "酉");
        taohua.put("巳", "午"); taohua.put("酉", "午"); taohua.put("丑", "午");
        taohua.put("亥", "子"); taohua.put("卯", "子"); taohua.put("未", "子");

        String target = taohua.get(nianzhi);
        for (String zhi : dizhi) {
            if (zhi.equals(target)) {
                result.jixing.add("桃花");
                result.meaning.put("桃花", "主异性缘佳，魅力十足，但需防桃花劫");
                return;
            }
        }
    }

    /** 红艳 */
    private static void checkHongyan(String rizhu, String[] dizhi, ShenshaResult result) {
        Map<String, String> hongyan = new HashMap<>();
        hongyan.put("甲", "午"); hongyan.put("乙", "申");
        hongyan.put("丙", "寅"); hongyan.put("丁", "未");
        hongyan.put("戊", "辰"); hongyan.put("己", "辰");
        hongyan.put("庚", "戌"); hongyan.put("辛", "酉");
        hongyan.put("壬", "子"); hongyan.put("癸", "申");

        String target = hongyan.get(rizhu);
        for (String zhi : dizhi) {
            if (zhi.equals(target)) {
                result.jixing.add("红艳");
                result.meaning.put("红艳", "主容貌姣好，风流多情");
                return;
            }
        }
    }

    /** 羊刃 */
    private static void checkYangren(String rizhu, String[] dizhi, ShenshaResult result) {
        Map<String, String> yangren = new HashMap<>();
        yangren.put("甲", "卯"); yangren.put("乙", "寅");
        yangren.put("丙", "午"); yangren.put("丁", "巳");
        yangren.put("戊", "午"); yangren.put("己", "巳");
        yangren.put("庚", "酉"); yangren.put("辛", "申");
        yangren.put("壬", "子"); yangren.put("癸", "亥");

        String target = yangren.get(rizhu);
        for (String zhi : dizhi) {
            if (zhi.equals(target)) {
                result.xiongshen.add("羊刃");
                result.meaning.put("羊刃", "刚烈之神，主性格刚强，易有刑伤");
                return;
            }
        }
    }

    /** 驿马（优化版）*/
    private static void checkYima(String nianzhi, String rizhi, String[] dizhi, ShenshaResult result) {
        // 驿马查法：寅午戌见申，申子辰见寅，巳酉丑见亥，亥卯未见巳
        Map<String, String> yima = new HashMap<>();
        yima.put("寅", "申"); yima.put("午", "申"); yima.put("戌", "申");
        yima.put("申", "寅"); yima.put("子", "寅"); yima.put("辰", "寅");
        yima.put("巳", "亥"); yima.put("酉", "亥"); yima.put("丑", "亥");
        yima.put("亥", "巳"); yima.put("卯", "巳"); yima.put("未", "巳");

        String[] pillars = {"年", "月", "日", "时"};
        String target = yima.get(nianzhi);
        List<String> positions = new ArrayList<>();

        for (int i = 0; i < dizhi.length; i++) {
            if (dizhi[i].equals(target)) {
                positions.add(pillars[i] + "支" + target);
            }
        }

        if (!positions.isEmpty()) {
            String posStr = String.join("、", positions);
            result.jixing.add("驿马(" + posStr + ")");
            result.meaning.put("驿马", "【三星级贵人★★★】主奔走变动，利远行迁移，职业多变动，外出运佳，不宜安守");
        }
    }

    /** 华盖（优化版）*/
    private static void checkHuagai(String nianzhi, String rizhi, String[] dizhi, ShenshaResult result) {
        // 华盖查法：寅午戌见戌，申子辰见辰，巳酉丑见丑，亥卯未见未
        Map<String, String> huagai = new HashMap<>();
        huagai.put("寅", "戌"); huagai.put("午", "戌"); huagai.put("戌", "戌");
        huagai.put("申", "辰"); huagai.put("子", "辰"); huagai.put("辰", "辰");
        huagai.put("巳", "丑"); huagai.put("酉", "丑"); huagai.put("丑", "丑");
        huagai.put("亥", "未"); huagai.put("卯", "未"); huagai.put("未", "未");

        String[] pillars = {"年", "月", "日", "时"};
        String target = huagai.get(nianzhi);
        List<String> positions = new ArrayList<>();

        for (int i = 0; i < dizhi.length; i++) {
            if (dizhi[i].equals(target)) {
                positions.add(pillars[i] + "支" + target);
            }
        }

        if (!positions.isEmpty()) {
            String posStr = String.join("、", positions);
            result.jixing.add("华盖(" + posStr + ")");
            result.meaning.put("华盖", "【四星级贵人★★★★】艺术之星，聪明好学，有艺术天赋，善玄学研究，清高孤傲");
        }
    }

    /** 金舆（优化版）*/
    private static void checkJinyu(String rizhu, String[] dizhi, ShenshaResult result) {
        // 金舆查法：甲见辰，乙见巳，丙戊见未，丁己见申，庚见戌，辛见亥，壬见丑，癸见寅
        Map<String, String> jinyu = new HashMap<>();
        jinyu.put("甲", "辰"); jinyu.put("乙", "巳");
        jinyu.put("丙", "未"); jinyu.put("丁", "申");
        jinyu.put("戊", "未"); jinyu.put("己", "申");
        jinyu.put("庚", "戌"); jinyu.put("辛", "亥");
        jinyu.put("壬", "丑"); jinyu.put("癸", "寅");

        String[] pillars = {"年", "月", "日", "时"};
        String target = jinyu.get(rizhu);
        List<String> positions = new ArrayList<>();

        for (int i = 0; i < dizhi.length; i++) {
            if (dizhi[i].equals(target)) {
                positions.add(pillars[i] + "支" + target);
            }
        }

        if (!positions.isEmpty()) {
            String posStr = String.join("、", positions);
            result.jixing.add("金舆(" + posStr + ")");
            result.meaning.put("金舆", "【三星级贵人★★★】富贵之星，财富丰厚，喜购置产业，利积累财富");
        }
    }

    /** 禄神（优化版）*/
    private static void checkLushen(String rizhu, String[] dizhi, ShenshaResult result) {
        // 禄神查法：甲禄寅，乙禄卯，丙戊禄巳，丁己禄午，庚禄申，辛禄酉，壬禄亥，癸禄子
        Map<String, String> lushen = new HashMap<>();
        lushen.put("甲", "寅"); lushen.put("乙", "卯");
        lushen.put("丙", "巳"); lushen.put("丁", "午");
        lushen.put("戊", "巳"); lushen.put("己", "午");
        lushen.put("庚", "申"); lushen.put("辛", "酉");
        lushen.put("壬", "亥"); lushen.put("癸", "子");

        String[] pillars = {"年", "月", "日", "时"};
        String target = lushen.get(rizhu);
        List<String> positions = new ArrayList<>();

        for (int i = 0; i < dizhi.length; i++) {
            if (dizhi[i].equals(target)) {
                positions.add(pillars[i] + "支" + target);
            }
        }

        if (!positions.isEmpty()) {
            String posStr = String.join("、", positions);
            result.jixing.add("禄神(" + posStr + ")");

            String meaning = "【四星级贵人★★★★】福禄之星，衣食无忧";
            if (positions.size() >= 2) {
                meaning += "，双禄齐全，财禄丰厚";
            } else {
                String pos = positions.get(0);
                if (pos.startsWith("年")) {
                    meaning += "，祖上有福，早年无忧";
                } else if (pos.startsWith("月")) {
                    meaning += "，事业有成，中年发达";
                } else if (pos.startsWith("日")) {
                    meaning += "，婚姻美满，配偶得力";
                } else {
                    meaning += "，晚年福禄，子孙孝顺";
                }
            }
            result.meaning.put("禄神", meaning);
        }
    }


    /** 将星 */
    private static void checkJiangxing(String nianzhi, String rizhi, String[] dizhi, ShenshaResult result) {
        // 寅午戌见午，申子辰见子，巳酉丑见酉，亥卯未见卯
        Map<String, String> jiangxing = new HashMap<>();
        jiangxing.put("寅", "午"); jiangxing.put("午", "午"); jiangxing.put("戌", "午");
        jiangxing.put("申", "子"); jiangxing.put("子", "子"); jiangxing.put("辰", "子");
        jiangxing.put("巳", "酉"); jiangxing.put("酉", "酉"); jiangxing.put("丑", "酉");
        jiangxing.put("亥", "卯"); jiangxing.put("卯", "卯"); jiangxing.put("未", "卯");

        String target = jiangxing.get(nianzhi);
        for (String zhi : dizhi) {
            if (zhi.equals(target)) {
                result.jixing.add("将星");
                result.meaning.put("将星", "武职权威之星，主掌兵权，利武职功名");
                return;
            }
        }
    }

    /** 劫煞 */
    private static void checkJiesha(String nianzhi, String rizhi, String[] dizhi, ShenshaResult result) {
        // 寅午戌见亥，申子辰见巳，巳酉丑见申，亥卯未见寅
        Map<String, String> jiesha = new HashMap<>();
        jiesha.put("寅", "亥"); jiesha.put("午", "亥"); jiesha.put("戌", "亥");
        jiesha.put("申", "巳"); jiesha.put("子", "巳"); jiesha.put("辰", "巳");
        jiesha.put("巳", "申"); jiesha.put("酉", "申"); jiesha.put("丑", "申");
        jiesha.put("亥", "寅"); jiesha.put("卯", "寅"); jiesha.put("未", "寅");

        String target = jiesha.get(nianzhi);
        for (String zhi : dizhi) {
            if (zhi.equals(target)) {
                result.xiongshen.add("劫煞");
                result.meaning.put("劫煞", "劫财破耗之神，易遇意外，需防破财");
                return;
            }
        }
    }

    /** 空亡 */
    private static void checkKongwang(String[] tiangan, String[] dizhi, ShenshaResult result) {
        // 甲子旬空戌亥，甲戌旬空申酉，甲申旬空午未，甲午旬空辰巳，甲辰旬空寅卯，甲寅旬空子丑
        String niangan = tiangan[0];
        String nianzhi = dizhi[0];
        String xun = niangan + nianzhi;

        List<String> kongwangList = new ArrayList<>();

        // 判断旬空
        if (xun.startsWith("甲")) {
            if (nianzhi.equals("子") || nianzhi.equals("丑")) {
                kongwangList = Arrays.asList("戌", "亥");
            } else if (nianzhi.equals("寅") || nianzhi.equals("卯")) {
                kongwangList = Arrays.asList("子", "丑");
            } else if (nianzhi.equals("辰") || nianzhi.equals("巳")) {
                kongwangList = Arrays.asList("寅", "卯");
            } else if (nianzhi.equals("午") || nianzhi.equals("未")) {
                kongwangList = Arrays.asList("辰", "巳");
            } else if (nianzhi.equals("申") || nianzhi.equals("酉")) {
                kongwangList = Arrays.asList("午", "未");
            } else if (nianzhi.equals("戌") || nianzhi.equals("亥")) {
                kongwangList = Arrays.asList("申", "酉");
            }
        }

        // 检查空亡
        for (String zhi : dizhi) {
            if (kongwangList.contains(zhi)) {
                result.xiongshen.add("空亡(" + zhi + ")");
                result.meaning.put("空亡", "空虚失落之神，主事难成，易有虚耗");
                return;
            }
        }
    }

    /** 孤辰寡宿 */
    private static void checkGuchenGuasu(String nianzhi, String[] dizhi, ShenshaResult result) {
        // 寅卯辰人见巳为孤辰，丑为寡宿
        // 巳午未人见申为孤辰，辰为寡宿
        // 申酉戌人见亥为孤辰，未为寡宿
        // 亥子丑人见寅为孤辰，戌为寡宿
        Map<String, String[]> guchen = new HashMap<>();
        guchen.put("寅", new String[]{"巳", "丑"}); guchen.put("卯", new String[]{"巳", "丑"}); guchen.put("辰", new String[]{"巳", "丑"});
        guchen.put("巳", new String[]{"申", "辰"}); guchen.put("午", new String[]{"申", "辰"}); guchen.put("未", new String[]{"申", "辰"});
        guchen.put("申", new String[]{"亥", "未"}); guchen.put("酉", new String[]{"亥", "未"}); guchen.put("戌", new String[]{"亥", "未"});
        guchen.put("亥", new String[]{"寅", "戌"}); guchen.put("子", new String[]{"寅", "戌"}); guchen.put("丑", new String[]{"寅", "戌"});

        String[] targets = guchen.get(nianzhi);
        if (targets != null) {
            for (String zhi : dizhi) {
                if (zhi.equals(targets[0])) {
                    result.xiongshen.add("孤辰");
                    result.meaning.put("孤辰", "孤独之神，主六亲缘薄，性格孤僻");
                }
                if (zhi.equals(targets[1])) {
                    result.xiongshen.add("寡宿");
                    result.meaning.put("寡宿", "寡合之神，主婚姻不顺，易孤独");
                }
            }
        }
    }

    /** 天罗地网 */
    private static void checkTianluoDiwang(String rizhi, ShenshaResult result) {
        // 辰为天罗，戌为地网
        if (rizhi.equals("辰")) {
            result.xiongshen.add("天罗");
            result.meaning.put("天罗", "天罗之地，主困顿受制，难以施展");
        } else if (rizhi.equals("戌")) {
            result.xiongshen.add("地网");
            result.meaning.put("地网", "地网之地，主受束缚，事多阻滞");
        }
    }

    /** 阴阳差错 */
    private static void checkYingyangChacuo(String[] tiangan, String[] dizhi, ShenshaResult result) {
        // 阴阳差错日：丙子、丁丑、戊寅、辛卯、壬辰、癸巳、丙午、丁未、戊申、辛酉、壬戌、癸亥
        String rizhu = tiangan[2];
        String rizhi = dizhi[2];
        String rizhugu = rizhu + rizhi;

        List<String> chacuoList = Arrays.asList(
            "丙子", "丁丑", "戊寅", "辛卯", "壬辰", "癸巳",
            "丙午", "丁未", "戊申", "辛酉", "壬戌", "癸亥"
        );

        if (chacuoList.contains(rizhugu)) {
            result.xiongshen.add("阴阳差错");
            result.meaning.put("阴阳差错", "阴阳不调，主婚姻不顺，易有情感波折");
        }
    }

    /** 三奇 */
    private static void checkSanqi(String[] tiangan, ShenshaResult result) {
        // 天上三奇：甲戊庚
        // 地下三奇：乙丙丁
        // 人中三奇：壬癸辛
        List<String> tianganList = Arrays.asList(tiangan);

        if (tianganList.contains("甲") && tianganList.contains("戊") && tianganList.contains("庚")) {
            result.jixing.add("天上三奇");
            result.meaning.put("天上三奇", "天上三奇甲戊庚，贵人相助，事业有成");
        }
        if (tianganList.contains("乙") && tianganList.contains("丙") && tianganList.contains("丁")) {
            result.jixing.add("地下三奇");
            result.meaning.put("地下三奇", "地下三奇乙丙丁，聪明才智，文采斐然");
        }
        if (tianganList.contains("壬") && tianganList.contains("癸") && tianganList.contains("辛")) {
            result.jixing.add("人中三奇");
            result.meaning.put("人中三奇", "人中三奇壬癸辛，福禄双全，富贵绵长");
        }
    }

    /** 亡神 */
    private static void checkWangshen(String nianzhi, String rizhi, String[] dizhi, ShenshaResult result) {
        // 寅午戌见巳，申子辰见亥，巳酉丑见申，亥卯未见寅
        Map<String, String> wangshen = new HashMap<>();
        wangshen.put("寅", "巳"); wangshen.put("午", "巳"); wangshen.put("戌", "巳");
        wangshen.put("申", "亥"); wangshen.put("子", "亥"); wangshen.put("辰", "亥");
        wangshen.put("巳", "申"); wangshen.put("酉", "申"); wangshen.put("丑", "申");
        wangshen.put("亥", "寅"); wangshen.put("卯", "寅"); wangshen.put("未", "寅");

        String target = wangshen.get(nianzhi);
        for (String zhi : dizhi) {
            if (zhi.equals(target)) {
                result.xiongshen.add("亡神");
                result.meaning.put("亡神", "衰败之神，主事业衰退，需谨慎行事");
                return;
            }
        }
    }

    /** 天喜 */
    private static void checkTianxi(String nianzhi, String[] dizhi, ShenshaResult result) {
        // 子见酉，丑见申，寅见未，卯见午，辰见巳，巳见辰，午见卯，未见寅，申见丑，酉见子，戌见亥，亥见戌
        Map<String, String> tianxi = new HashMap<>();
        tianxi.put("子", "酉"); tianxi.put("丑", "申"); tianxi.put("寅", "未");
        tianxi.put("卯", "午"); tianxi.put("辰", "巳"); tianxi.put("巳", "辰");
        tianxi.put("午", "卯"); tianxi.put("未", "寅"); tianxi.put("申", "丑");
        tianxi.put("酉", "子"); tianxi.put("戌", "亥"); tianxi.put("亥", "戌");

        String target = tianxi.get(nianzhi);
        for (String zhi : dizhi) {
            if (zhi.equals(target)) {
                result.jixing.add("天喜");
                result.meaning.put("天喜", "喜庆之星，主喜事临门，吉祥如意");
                return;
            }
        }
    }

    /** 红鸾 */
    private static void checkHongluan(String nianzhi, String[] dizhi, ShenshaResult result) {
        // 子见卯，丑见寅，寅见丑，卯见子，辰见亥，巳见戌，午见酉，未见申，申见未，酉见午，戌见巳，亥见辰
        Map<String, String> hongluan = new HashMap<>();
        hongluan.put("子", "卯"); hongluan.put("丑", "寅"); hongluan.put("寅", "丑");
        hongluan.put("卯", "子"); hongluan.put("辰", "亥"); hongluan.put("巳", "戌");
        hongluan.put("午", "酉"); hongluan.put("未", "申"); hongluan.put("申", "未");
        hongluan.put("酉", "午"); hongluan.put("戌", "巳"); hongluan.put("亥", "辰");

        String target = hongluan.get(nianzhi);
        for (String zhi : dizhi) {
            if (zhi.equals(target)) {
                result.jixing.add("红鸾");
                result.meaning.put("红鸾", "婚姻桃花之星，主姻缘美满，喜结良缘");
                return;
            }
        }
    }

    // ==================== 五、十二长生运程 ====================

    /**
     * 十二长生 - 源自《三命通会》
     * 长生、沐浴、冠带、临官、帝旺、衰、病、死、墓、绝、胎、养
     *
     * 规律：阳干顺行，阴干逆行
     * 阳干：甲丙戊庚壬
     * 阴干：乙丁己辛癸
     */
    public static String getShiErChangsheng(String rizhu, String zhi) {
        // 十二长生表
        Map<String, Map<String, String>> changsheng = new HashMap<>();

        // 甲木（阳木）顺行，长生在亥
        Map<String, String> jia = new LinkedHashMap<>();
        jia.put("亥", "长生"); jia.put("子", "沐浴"); jia.put("丑", "冠带");
        jia.put("寅", "临官"); jia.put("卯", "帝旺"); jia.put("辰", "衰");
        jia.put("巳", "病"); jia.put("午", "死"); jia.put("未", "墓");
        jia.put("申", "绝"); jia.put("酉", "胎"); jia.put("戌", "养");
        changsheng.put("甲", jia);

        // 乙木（阴木）逆行，长生在午
        Map<String, String> yi = new LinkedHashMap<>();
        yi.put("午", "长生"); yi.put("巳", "沐浴"); yi.put("辰", "冠带");
        yi.put("卯", "临官"); yi.put("寅", "帝旺"); yi.put("丑", "衰");
        yi.put("子", "病"); yi.put("亥", "死"); yi.put("戌", "墓");
        yi.put("酉", "绝"); yi.put("申", "胎"); yi.put("未", "养");
        changsheng.put("乙", yi);

        // 丙火（阳火）顺行，长生在寅
        Map<String, String> bing = new LinkedHashMap<>();
        bing.put("寅", "长生"); bing.put("卯", "沐浴"); bing.put("辰", "冠带");
        bing.put("巳", "临官"); bing.put("午", "帝旺"); bing.put("未", "衰");
        bing.put("申", "病"); bing.put("酉", "死"); bing.put("戌", "墓");
        bing.put("亥", "绝"); bing.put("子", "胎"); bing.put("丑", "养");
        changsheng.put("丙", bing);

        // 丁火（阴火）逆行，长生在酉
        Map<String, String> ding = new LinkedHashMap<>();
        ding.put("酉", "长生"); ding.put("申", "沐浴"); ding.put("未", "冠带");
        ding.put("午", "临官"); ding.put("巳", "帝旺"); ding.put("辰", "衰");
        ding.put("卯", "病"); ding.put("寅", "死"); ding.put("丑", "墓");
        ding.put("子", "绝"); ding.put("亥", "胎"); ding.put("戌", "养");
        changsheng.put("丁", ding);

        // 戊土（阳土）顺行，长生在寅
        Map<String, String> wu = new LinkedHashMap<>();
        wu.put("寅", "长生"); wu.put("卯", "沐浴"); wu.put("辰", "冠带");
        wu.put("巳", "临官"); wu.put("午", "帝旺"); wu.put("未", "衰");
        wu.put("申", "病"); wu.put("酉", "死"); wu.put("戌", "墓");
        wu.put("亥", "绝"); wu.put("子", "胎"); wu.put("丑", "养");
        changsheng.put("戊", wu);

        // 己土（阴土）逆行，长生在酉
        Map<String, String> ji = new LinkedHashMap<>();
        ji.put("酉", "长生"); ji.put("申", "沐浴"); ji.put("未", "冠带");
        ji.put("午", "临官"); ji.put("巳", "帝旺"); ji.put("辰", "衰");
        ji.put("卯", "病"); ji.put("寅", "死"); ji.put("丑", "墓");
        ji.put("子", "绝"); ji.put("亥", "胎"); ji.put("戌", "养");
        changsheng.put("己", ji);

        // 庚金（阳金）顺行，长生在巳
        Map<String, String> geng = new LinkedHashMap<>();
        geng.put("巳", "长生"); geng.put("午", "沐浴"); geng.put("未", "冠带");
        geng.put("申", "临官"); geng.put("酉", "帝旺"); geng.put("戌", "衰");
        geng.put("亥", "病"); geng.put("子", "死"); geng.put("丑", "墓");
        geng.put("寅", "绝"); geng.put("卯", "胎"); geng.put("辰", "养");
        changsheng.put("庚", geng);

        // 辛金（阴金）逆行，长生在子
        Map<String, String> xin = new LinkedHashMap<>();
        xin.put("子", "长生"); xin.put("亥", "沐浴"); xin.put("戌", "冠带");
        xin.put("酉", "临官"); xin.put("申", "帝旺"); xin.put("未", "衰");
        xin.put("午", "病"); xin.put("巳", "死"); xin.put("辰", "墓");
        xin.put("卯", "绝"); xin.put("寅", "胎"); xin.put("丑", "养");
        changsheng.put("辛", xin);

        // 壬水（阳水）顺行，长生在申
        Map<String, String> ren = new LinkedHashMap<>();
        ren.put("申", "长生"); ren.put("酉", "沐浴"); ren.put("戌", "冠带");
        ren.put("亥", "临官"); ren.put("子", "帝旺"); ren.put("丑", "衰");
        ren.put("寅", "病"); ren.put("卯", "死"); ren.put("辰", "墓");
        ren.put("巳", "绝"); ren.put("午", "胎"); ren.put("未", "养");
        changsheng.put("壬", ren);

        // 癸水（阴水）逆行，长生在卯
        Map<String, String> gui = new LinkedHashMap<>();
        gui.put("卯", "长生"); gui.put("寅", "沐浴"); gui.put("丑", "冠带");
        gui.put("子", "临官"); gui.put("亥", "帝旺"); gui.put("戌", "衰");
        gui.put("酉", "病"); gui.put("申", "死"); gui.put("未", "墓");
        gui.put("午", "绝"); gui.put("巳", "胎"); gui.put("辰", "养");
        changsheng.put("癸", gui);

        return changsheng.getOrDefault(rizhu, new HashMap<>()).getOrDefault(zhi, "未知");
    }

    // ==================== 六、调候用神（《子平真诠》核心） ====================

    /**
     * 调候用神 - 根据寒暖燥湿调节阴阳平衡
     */
    public static class TiaohouResult {
        public String climate;        // 气候（寒、暖、燥、湿）
        public String tiaohou;        // 调候用神
        public String reason;         // 理由
        public List<String> analysis; // 分析

        public TiaohouResult() {
            this.analysis = new ArrayList<>();
        }
    }

    /**
     * 分析调候用神
     */
    public static TiaohouResult analyzeTiaohou(String[] tiangan, String[] dizhi) {
        TiaohouResult result = new TiaohouResult();
        result.analysis.add("========== 调候分析 ==========");

        String rizhu = tiangan[2];
        String yuezhi = dizhi[1];
        String rizhuWuxing = GAN_WUXING.get(rizhu);

        // 判断月令寒暖
        result.climate = getClimate(yuezhi);
        result.analysis.add("日主: " + rizhu + " (" + rizhuWuxing + ")");
        result.analysis.add("月令: " + yuezhi + " (" + result.climate + ")");

        // 根据《子平真诠》《穷通宝鉴》调候原则
        String[] tiaohouData = getTiaohouYongshen(rizhu, yuezhi, result.climate);
        result.tiaohou = tiaohouData[0];
        result.reason = tiaohouData[1];

        result.analysis.add("调候用神: " + result.tiaohou);
        result.analysis.add("理由: " + result.reason);

        return result;
    }

    /**
     * 获取气候
     */
    private static String getClimate(String yuezhi) {
        // 冬季寒水当令
        if (Arrays.asList("亥", "子", "丑").contains(yuezhi)) {
            return "寒";
        }
        // 春季木旺
        if (Arrays.asList("寅", "卯", "辰").contains(yuezhi)) {
            return "温";
        }
        // 夏季火旺
        if (Arrays.asList("巳", "午", "未").contains(yuezhi)) {
            return "热";
        }
        // 秋季金旺
        if (Arrays.asList("申", "酉", "戌").contains(yuezhi)) {
            return "燥";
        }
        return "平和";
    }

    /**
     * 获取调候用神
     * 返回数组：[用神, 理由]
     *
     * 基于《穷通宝鉴》理论，结合日主五行和月令季节
     */
    private static String[] getTiaohouYongshen(String rizhu, String yuezhi, String climate) {
        // 获取季节
        String season = getSeason(yuezhi);

        // 根据日主和季节定义调候用神
        Map<String, Map<String, String[]>> tiaohouMap = new HashMap<>();

        // 甲木调候
        Map<String, String[]> jia = new HashMap<>();
        jia.put("春", new String[]{"丙火、庚金", "春木向阳，喜丙火照暖，庚金修剪成材"});
        jia.put("夏", new String[]{"癸水、庚金", "夏木枯焦，喜癸水滋润，庚金修剪"});
        jia.put("秋", new String[]{"丁火、丙火", "秋金克木，喜丁火制金，丙火温暖"});
        jia.put("冬", new String[]{"丙火、癸水", "冬木寒冻，喜丙火解冻，癸水滋润"});
        tiaohouMap.put("甲", jia);

        // 乙木调候
        Map<String, String[]> yi = new HashMap<>();
        yi.put("春", new String[]{"丙火、癸水", "春木喜阳，丙火泄秀，癸水滋养"});
        yi.put("夏", new String[]{"癸水、丙火", "夏木枯焦，癸水为首，丙火次之"});
        yi.put("秋", new String[]{"丙火、癸水", "秋金伐木，丙火制金，癸水润木"});
        yi.put("冬", new String[]{"丙火、癸水", "冬木寒湿，丙火解冻为要"});
        tiaohouMap.put("乙", yi);

        // 丙火调候
        Map<String, String[]> bing = new HashMap<>();
        bing.put("春", new String[]{"壬水、甲木", "春火喜壬水济，甲木生火"});
        bing.put("夏", new String[]{"壬水、庚金", "夏火炎烈，壬水为急，庚金佐之"});
        bing.put("秋", new String[]{"甲木、壬水", "秋火渐弱，甲木生火，壬水调候"});
        bing.put("冬", new String[]{"甲木、壬水", "冬火寒弱，甲木生扶，壬水既济"});
        tiaohouMap.put("丙", bing);

        // 丁火调候
        Map<String, String[]> ding = new HashMap<>();
        ding.put("春", new String[]{"甲木、庚金", "春火喜甲木生扶，庚金劈甲"});
        ding.put("夏", new String[]{"壬水、甲木", "夏火太旺，壬水润泽为先"});
        ding.put("秋", new String[]{"甲木、庚金", "秋火渐衰，甲木生火，庚金劈甲"});
        ding.put("冬", new String[]{"甲木、庚金", "冬火微弱，甲木生扶最要"});
        tiaohouMap.put("丁", ding);

        // 戊土调候
        Map<String, String[]> wu = new HashMap<>();
        wu.put("春", new String[]{"丙火、甲木", "春土喜丙火暖土，甲木疏土"});
        wu.put("夏", new String[]{"癸水、甲木", "夏土燥烈，癸水润土，甲木疏土"});
        wu.put("秋", new String[]{"丙火、癸水", "秋土喜丙火暖土"});
        wu.put("冬", new String[]{"丙火、甲木", "冬土寒冻，丙火暖土为急"});
        tiaohouMap.put("戊", wu);

        // 己土调候
        Map<String, String[]> ji = new HashMap<>();
        ji.put("春", new String[]{"丙火、癸水", "春土喜丙火暖土，癸水润土"});
        ji.put("夏", new String[]{"癸水、丙火", "夏土燥烈，癸水润泽最要"});
        ji.put("秋", new String[]{"丙火、癸水", "秋土喜丙火暖土"});
        ji.put("冬", new String[]{"丙火、甲木", "冬土寒湿，丙火暖土，甲木疏土"});
        tiaohouMap.put("己", ji);

        // 庚金调候
        Map<String, String[]> geng = new HashMap<>();
        geng.put("春", new String[]{"丁火、甲木", "春金气嫩，丁火炼金，甲木引丁"});
        geng.put("夏", new String[]{"壬水、癸水", "夏金燥烈，壬水淬炼，癸水润泽"});
        geng.put("秋", new String[]{"丁火、甲木", "秋金锐利，丁火炼金成器"});
        geng.put("冬", new String[]{"丙火、丁火", "冬金寒冷，丙火温暖，丁火炼金"});
        tiaohouMap.put("庚", geng);

        // 辛金调候
        Map<String, String[]> xin = new HashMap<>();
        xin.put("春", new String[]{"壬水、甲木", "春金柔嫩，壬水洗涤，甲木生火炼金"});
        xin.put("夏", new String[]{"壬水、甲木", "夏金燥热，壬水淬炼最要"});
        xin.put("秋", new String[]{"壬水、甲木", "秋金锐利，壬水洗涤光洁"});
        xin.put("冬", new String[]{"丙火、壬水", "冬金寒冷，丙火温暖，壬水洗涤"});
        tiaohouMap.put("辛", xin);

        // 壬水调候
        Map<String, String[]> ren = new HashMap<>();
        ren.put("春", new String[]{"庚金、戊土", "春水泛滥，戊土堤防，庚金生水"});
        ren.put("夏", new String[]{"庚金、癸水", "夏水干涸，庚金生水为要"});
        ren.put("秋", new String[]{"丁火、甲木", "秋水旺盛，丁火制金为用"});
        ren.put("冬", new String[]{"丙火、戊土", "冬水寒冻，丙火暖水，戊土止水"});
        tiaohouMap.put("壬", ren);

        // 癸水调候
        Map<String, String[]> gui = new HashMap<>();
        gui.put("春", new String[]{"辛金、丙火", "春水喜辛金生水，丙火暖局"});
        gui.put("夏", new String[]{"庚金、辛金", "夏水干涸，庚辛金生水为要"});
        gui.put("秋", new String[]{"辛金、丙火", "秋水喜辛金生扶，丙火调候"});
        gui.put("冬", new String[]{"丙火、辛金", "冬水寒冻，丙火暖水最要"});
        tiaohouMap.put("癸", gui);

        // 获取调候用神
        Map<String, String[]> rizhuTiaohou = tiaohouMap.get(rizhu);
        if (rizhuTiaohou != null && season != null) {
            String[] result = rizhuTiaohou.get(season);
            if (result != null) {
                return result;
            }
        }

        // 默认返回
        if (climate.equals("寒")) {
            return new String[]{"丙火、丁火", "寒命宜暖，火为调候之要"};
        } else if (climate.equals("热")) {
            return new String[]{"壬水、癸水", "热命宜润，水为调候之要"};
        } else if (climate.equals("燥")) {
            return new String[]{"壬水、癸水", "燥命宜润，水为滋润之源"};
        }

        return new String[]{"随格局而定", "气候平和，以格局用神为主"};
    }

    /**
     * 获取季节
     */
    private static String getSeason(String yuezhi) {
        if (Arrays.asList("寅", "卯", "辰").contains(yuezhi)) {
            return "春";
        } else if (Arrays.asList("巳", "午", "未").contains(yuezhi)) {
            return "夏";
        } else if (Arrays.asList("申", "酉", "戌").contains(yuezhi)) {
            return "秋";
        } else if (Arrays.asList("亥", "子", "丑").contains(yuezhi)) {
            return "冬";
        }
        return null;
    }

    // ==================== 七、综合分析 ====================

    /**
     * 综合命理分析结果
     */
    public static class ComprehensiveResult {
        public GeJuResult geju;           // 格局
        public ShenshaResult shensha;     // 神煞
        public TiaohouResult tiaohou;     // 调候
        public Map<String, String> shishenMap; // 十神分布
        public String xingge;             // 性格总评
        public String shiye;              // 事业运
        public String caiyun;             // 财运
        public String hunyin;             // 婚姻
        public String jiankang;           // 健康
        public List<String> suggestions;  // 建议

        public ComprehensiveResult() {
            this.shishenMap = new HashMap<>();
            this.suggestions = new ArrayList<>();
        }
    }

    /**
     * 综合分析八字
     */
    public static ComprehensiveResult comprehensiveAnalysis(String[] tiangan, String[] dizhi, String gender) {
        ComprehensiveResult result = new ComprehensiveResult();

        // 1. 格局分析
        result.geju = analyzeGeju(tiangan, dizhi);

        // 2. 神煞分析
        result.shensha = analyzeShensha(tiangan, dizhi);

        // 3. 调候分析
        result.tiaohou = analyzeTiaohou(tiangan, dizhi);

        // 4. 十神分布
        String rizhu = tiangan[2];
        for (int i = 0; i < 4; i++) {
            if (i != 2) {
                String shishen = getShishen(rizhu, tiangan[i]);
                String position = new String[]{"年干", "月干", "时干"}[i < 2 ? i : i - 1];
                result.shishenMap.put(position, shishen);
            }
        }

        // 5. 性格分析
        result.xingge = analyzeXingge(tiangan, dizhi, result.geju, result.shensha);

        // 6. 事业分析
        result.shiye = analyzeShiye(tiangan, dizhi, result.geju);

        // 7. 财运分析
        result.caiyun = analyzeCaiyun(tiangan, dizhi, result.geju);

        // 8. 婚姻分析
        result.hunyin = analyzeHunyin(tiangan, dizhi, gender, result.shensha);

        // 9. 健康分析
        result.jiankang = analyzeJiankang(tiangan, dizhi);

        // 10. 综合建议
        result.suggestions = generateSuggestions(result);

        return result;
    }

    /**
     * 性格分析
     */
    private static String analyzeXingge(String[] tiangan, String[] dizhi, GeJuResult geju, ShenshaResult shensha) {
        StringBuilder sb = new StringBuilder();
        sb.append("性格特征：");

        // 根据日主五行判断基本性格
        String rizhu = tiangan[2];
        String wuxing = GAN_WUXING.get(rizhu);

        switch (wuxing) {
            case "木":
                sb.append("仁慈正直，富有同情心，积极进取，但有时过于理想化。");
                break;
            case "火":
                sb.append("热情开朗，富有激情，善于表达，但有时急躁冲动。");
                break;
            case "土":
                sb.append("忠厚老实，稳重踏实，重信守诺，但有时过于保守。");
                break;
            case "金":
                sb.append("果断刚毅，重义气，有原则性，但有时过于严肃。");
                break;
            case "水":
                sb.append("聪明灵活，善于思考，适应力强，但有时优柔寡断。");
                break;
        }

        // 根据格局补充
        if (geju.isCongge) {
            sb.append("从格之命，能屈能伸，善于顺势而为。");
        }

        // 根据神煞补充
        if (shensha.jixing.contains("文昌贵人")) {
            sb.append("文昌入命，聪明好学，利于学业功名。");
        }

        return sb.toString();
    }

    /**
     * 事业分析
     */
    private static String analyzeShiye(String[] tiangan, String[] dizhi, GeJuResult geju) {
        StringBuilder sb = new StringBuilder();
        sb.append("事业运势：");

        if (geju.mainGeju.contains("正官")) {
            sb.append("适合从事管理、公职、企业管理等稳定职业。");
        } else if (geju.mainGeju.contains("偏财")) {
            sb.append("适合经商创业，投资理财，从事商业活动。");
        } else if (geju.mainGeju.contains("食神")) {
            sb.append("适合技术、艺术、服务行业，展现才华。");
        } else {
            sb.append("事业运平稳，宜根据自身兴趣选择职业。");
        }

        return sb.toString();
    }

    /**
     * 财运分析
     */
    private static String analyzeCaiyun(String[] tiangan, String[] dizhi, GeJuResult geju) {
        StringBuilder sb = new StringBuilder();
        sb.append("财运状况：");

        if (geju.mainGeju.contains("财")) {
            sb.append("财运较好，有一定的财富积累能力。");
        } else if (geju.mainGeju.contains("从财")) {
            sb.append("大富之命，财源广进，但需谨慎理财。");
        } else {
            sb.append("财运中等，量入为出，稳健为主。");
        }

        return sb.toString();
    }

    /**
     * 婚姻分析
     */
    private static String analyzeHunyin(String[] tiangan, String[] dizhi, String gender, ShenshaResult shensha) {
        StringBuilder sb = new StringBuilder();
        sb.append("婚姻感情：");

        if (shensha.jixing.stream().anyMatch(s -> s.contains("桃花"))) {
            sb.append("桃花入命，异性缘佳，感情丰富。");
        }

        if (gender.equals("MALE")) {
            sb.append("看财星为妻，");
        } else {
            sb.append("看官星为夫，");
        }

        sb.append("宜在合适年龄结婚，婚姻需要经营维护。");

        return sb.toString();
    }

    /**
     * 健康分析
     */
    private static String analyzeJiankang(String[] tiangan, String[] dizhi) {
        StringBuilder sb = new StringBuilder();
        sb.append("健康状况：");

        // 简化分析
        sb.append("注意五行平衡，保持良好生活习惯。");
        sb.append("根据五行旺衰，注意相应脏器保养。");

        return sb.toString();
    }

    /**
     * 生成建议
     */
    private static List<String> generateSuggestions(ComprehensiveResult result) {
        List<String> suggestions = new ArrayList<>();

        suggestions.add("1. 根据用神方位，多往有利方向发展");
        suggestions.add("2. 选择与用神五行相关的颜色和行业");
        suggestions.add("3. 交往与自己八字互补的朋友和伴侣");
        suggestions.add("4. 在大运流年有利时期把握机遇");
        suggestions.add("5. 修身养性，提升德行，以德配命");

        return suggestions;
    }
}
