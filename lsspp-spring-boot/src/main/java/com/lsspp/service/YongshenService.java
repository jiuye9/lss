package com.lsspp.service;

import com.lsspp.api.dto.YongshenRequest;
import com.lsspp.api.dto.YongshenResponse;
import com.lsspp.util.YongshenCalculator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 用神分析服务
 */
@Slf4j
@Service
public class YongshenService {

    /**
     * 分析用神
     */
    public YongshenResponse analyzeYongshen(YongshenRequest request) {
        log.info("开始用神分析...");

        // 1. 获取或排盘八字
        String[] tiangan;
        String[] dizhi;

        if (request.getTiangan() != null && request.getDizhi() != null) {
            // 直接使用提供的八字
            tiangan = request.getTiangan();
            dizhi = request.getDizhi();
        } else if (request.getBirthYear() != null && request.getBirthMonth() != null
                && request.getBirthDay() != null && request.getBirthHour() != null) {
            // 根据出生信息排盘
            // TODO: 集成lunar-javascript进行八字排盘
            throw new IllegalArgumentException("暂不支持自动排盘,请直接提供八字");
        } else {
            throw new IllegalArgumentException("请提供八字或出生信息");
        }

        // 2. 调用用神计算器
        YongshenCalculator.BaziInput baziInput = new YongshenCalculator.BaziInput(tiangan, dizhi);
        YongshenCalculator.YongshenResult result = YongshenCalculator.calculateYongshen(baziInput);

        // 3. 构建响应
        YongshenResponse response = new YongshenResponse();

        // 八字信息
        YongshenResponse.BaziInfo baziInfo = new YongshenResponse.BaziInfo();
        baziInfo.setTiangan(tiangan);
        baziInfo.setDizhi(dizhi);
        baziInfo.setBazi(String.format("%s%s %s%s %s%s %s%s",
                tiangan[0], dizhi[0], tiangan[1], dizhi[1],
                tiangan[2], dizhi[2], tiangan[3], dizhi[3]));
        baziInfo.setYueling(dizhi[1]);
        baziInfo.setRizhu(tiangan[2]);
        baziInfo.setRizhuWuxing(getGanWuxing(tiangan[2]));
        response.setBaziInfo(baziInfo);

        // 五行得分
        response.setWuxingScores(result.wuxingScores);

        // 日主分析
        YongshenResponse.RizhuAnalysis rizhuAnalysis = new YongshenResponse.RizhuAnalysis();
        String rizhuWuxing = getGanWuxing(tiangan[2]);
        rizhuAnalysis.setBijieScore(result.wuxingScores.get(rizhuWuxing));
        rizhuAnalysis.setYinxingScore(result.wuxingScores.get(getShengWuxing(rizhuWuxing)));
        rizhuAnalysis.setRizhuScore(result.rizhuScore);
        rizhuAnalysis.setRizhuStatus(result.rizhuStatus);
        response.setRizhuAnalysis(rizhuAnalysis);

        // 用神结论
        YongshenResponse.YongshenConclusion yongshenConclusion = new YongshenResponse.YongshenConclusion();
        yongshenConclusion.setYongshen(result.yongshen);
        yongshenConclusion.setXishen(result.xishen);
        yongshenConclusion.setJishen(result.jishen);
        yongshenConclusion.setAnalysis(generateAnalysis(result));
        yongshenConclusion.setSuggestions(generateSuggestions(result));
        response.setYongshenConclusion(yongshenConclusion);

        // 详细计算过程
        response.setCalculationDetails(result.calculationDetails);

        log.info("用神分析完成: 日主状态={}, 用神={}", result.rizhuStatus, result.yongshen);
        return response;
    }

    /**
     * 生成分析说明
     */
    private String generateAnalysis(YongshenCalculator.YongshenResult result) {
        StringBuilder sb = new StringBuilder();

        sb.append("根据百分制五行权重算法分析,");
        sb.append("日主得分").append(String.format("%.2f", result.rizhuScore)).append("分,");
        sb.append("判定为").append(result.rizhuStatus).append("。");

        switch (result.rizhuStatus) {
            case "从强":
                sb.append("日主过旺,应顺其旺势,取泄耗为用。");
                break;
            case "身强":
                sb.append("日主偏旺,需要克泄耗来平衡五行。");
                break;
            case "中和":
                sb.append("日主中和,应随大运顺势而为,扶抑兼顾。");
                break;
            case "身弱":
                sb.append("日主偏弱,需要生扶来增强日主力量。");
                break;
            case "从弱":
                sb.append("日主过弱,应顺其弱势,取克泄耗为用。");
                break;
        }

        return sb.toString();
    }

    /**
     * 生成建议
     */
    private List<String> generateSuggestions(YongshenCalculator.YongshenResult result) {
        List<String> suggestions = new ArrayList<>();

        // 根据用神给出建议
        String[] yongshenArray = result.yongshen.split("、");
        for (String yongshen : yongshenArray) {
            suggestions.addAll(getWuxingSuggestions(yongshen.trim(), true));
        }

        // 根据忌神给出禁忌
        if (result.jishen != null) {
            String[] jishenArray = result.jishen.split("、");
            for (String jishen : jishenArray) {
                suggestions.addAll(getWuxingSuggestions(jishen.trim(), false));
            }
        }

        return suggestions;
    }

    /**
     * 获取五行建议
     */
    private List<String> getWuxingSuggestions(String wuxing, boolean favorable) {
        List<String> suggestions = new ArrayList<>();

        switch (wuxing) {
            case "木":
                if (favorable) {
                    suggestions.add("有利方位: 东方");
                    suggestions.add("有利行业: 教育、文化、出版、林业、环保");
                    suggestions.add("有利颜色: 绿色、青色");
                } else {
                    suggestions.add("不利方位: 东方");
                    suggestions.add("不利颜色: 绿色、青色");
                }
                break;
            case "火":
                if (favorable) {
                    suggestions.add("有利方位: 南方");
                    suggestions.add("有利行业: 电子、IT、娱乐、美容、能源");
                    suggestions.add("有利颜色: 红色、紫色");
                } else {
                    suggestions.add("不利方位: 南方");
                    suggestions.add("不利颜色: 红色、紫色");
                }
                break;
            case "土":
                if (favorable) {
                    suggestions.add("有利方位: 中央、本地");
                    suggestions.add("有利行业: 房地产、建筑、农业、陶瓷");
                    suggestions.add("有利颜色: 黄色、棕色");
                } else {
                    suggestions.add("不利方位: 中央、本地");
                    suggestions.add("不利颜色: 黄色、棕色");
                }
                break;
            case "金":
                if (favorable) {
                    suggestions.add("有利方位: 西方");
                    suggestions.add("有利行业: 金融、科技、五金、机械");
                    suggestions.add("有利颜色: 白色、金色");
                } else {
                    suggestions.add("不利方位: 西方");
                    suggestions.add("不利颜色: 白色、金色");
                }
                break;
            case "水":
                if (favorable) {
                    suggestions.add("有利方位: 北方");
                    suggestions.add("有利行业: 物流、水产、旅游、贸易");
                    suggestions.add("有利颜色: 黑色、蓝色");
                } else {
                    suggestions.add("不利方位: 北方");
                    suggestions.add("不利颜色: 黑色、蓝色");
                }
                break;
        }

        return suggestions;
    }

    /**
     * 获取天干五行
     */
    private String getGanWuxing(String gan) {
        switch (gan) {
            case "甲": case "乙": return "木";
            case "丙": case "丁": return "火";
            case "戊": case "己": return "土";
            case "庚": case "辛": return "金";
            case "壬": case "癸": return "水";
            default: return "未知";
        }
    }

    /**
     * 获取生我的五行(印)
     */
    private String getShengWuxing(String wuxing) {
        switch (wuxing) {
            case "木": return "水";
            case "火": return "木";
            case "土": return "火";
            case "金": return "土";
            case "水": return "金";
            default: return "未知";
        }
    }
}
