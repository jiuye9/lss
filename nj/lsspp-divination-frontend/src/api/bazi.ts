import { apiRequest, API_ENDPOINTS } from './config';
import { BaziInput, BaziResult, PaginatedResponse } from '@/types';

// 八字排盘 API
export const baziApi = {
  // 计算八字
  calculate: (data: BaziInput): Promise<BaziResult> => {
    return apiRequest.post(API_ENDPOINTS.BAZI.CALCULATE, data);
  },

  // 获取八字历史记录
  getHistory: (params: {
    page?: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
    keyword?: string;
  } = {}): Promise<PaginatedResponse<BaziResult>> => {
    const { page = 1, pageSize = 10, ...rest } = params;
    return apiRequest.get(API_ENDPOINTS.BAZI.HISTORY, {
      params: { page, pageSize, ...rest }
    });
  },

  // 保存八字结果
  save: (data: {
    result: BaziResult;
    title?: string;
    tags?: string[];
    notes?: string;
  }): Promise<{ id: string }> => {
    return apiRequest.post(API_ENDPOINTS.BAZI.SAVE, data);
  },

  // 删除八字记录
  delete: (id: string): Promise<void> => {
    return apiRequest.delete(`${API_ENDPOINTS.BAZI.DELETE}/${id}`);
  },

  // 获取八字详情
  getDetail: (id: string): Promise<BaziResult> => {
    return apiRequest.get(`${API_ENDPOINTS.BAZI.DETAIL}/${id}`);
  },

  // 批量删除
  batchDelete: (ids: string[]): Promise<void> => {
    return apiRequest.delete(API_ENDPOINTS.BAZI.DELETE, {
      data: { ids }
    });
  },

  // 更新标签
  updateTags: (id: string, tags: string[]): Promise<void> => {
    return apiRequest.patch(`${API_ENDPOINTS.BAZI.DETAIL}/${id}/tags`, { tags });
  },

  // 更新备注
  updateNotes: (id: string, notes: string): Promise<void> => {
    return apiRequest.patch(`${API_ENDPOINTS.BAZI.DETAIL}/${id}/notes`, { notes });
  },

  // 导出报告
  exportReport: (id: string, format: 'pdf' | 'image' | 'json' = 'pdf'): Promise<Blob> => {
    return apiRequest.get(`${API_ENDPOINTS.BAZI.DETAIL}/${id}/export`, {
      params: { format },
      responseType: 'blob'
    });
  },

  // 分享报告
  shareReport: (id: string, options: {
    platform?: 'wechat' | 'weibo' | 'qq' | 'link';
    title?: string;
    description?: string;
  }): Promise<{ shareUrl: string; qrCode?: string }> => {
    return apiRequest.post(`${API_ENDPOINTS.BAZI.DETAIL}/${id}/share`, options);
  },
};

// 八字算法相关工具
export const baziUtils = {
  // 验证输入数据
  validateInput: (input: BaziInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!input.gender) {
      errors.push('请选择性别');
    }
    
    if (!input.birthDate) {
      errors.push('请选择出生日期');
    }
    
    if (!input.birthTime) {
      errors.push('请选择出生时间');
    }
    
    if (!input.location?.province) {
      errors.push('请选择出生地点');
    }
    
    // 日期格式验证
    if (input.birthDate) {
      const date = new Date(input.birthDate);
      if (isNaN(date.getTime())) {
        errors.push('日期格式不正确');
      }
    }
    
    // 时间格式验证
    if (input.birthTime) {
      const timeRegex = /^([01]?\d|2[0-3]):[0-5]\d$/;
      if (!timeRegex.test(input.birthTime)) {
        errors.push('时间格式不正确，请使用 HH:mm 格式');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },

  // 格式化出生时间
  formatBirthDateTime: (date: string, time: string): string => {
    return `${date} ${time}:00`;
  },

  // 获取时辰名称
  getHourName: (hour: number): string => {
    const hours = [
      '子时', '丑时', '寅时', '卯时', '辰时', '巳时',
      '午时', '未时', '申时', '酉时', '戌时', '亥时'
    ];
    
    let hourIndex;
    if (hour === 23 || hour === 0) hourIndex = 0; // 子时
    else if (hour >= 1 && hour <= 2) hourIndex = 1; // 丑时
    else if (hour >= 3 && hour <= 4) hourIndex = 2; // 寅时
    else if (hour >= 5 && hour <= 6) hourIndex = 3; // 卯时
    else if (hour >= 7 && hour <= 8) hourIndex = 4; // 辰时
    else if (hour >= 9 && hour <= 10) hourIndex = 5; // 巳时
    else if (hour >= 11 && hour <= 12) hourIndex = 6; // 午时
    else if (hour >= 13 && hour <= 14) hourIndex = 7; // 未时
    else if (hour >= 15 && hour <= 16) hourIndex = 8; // 申时
    else if (hour >= 17 && hour <= 18) hourIndex = 9; // 酉时
    else if (hour >= 19 && hour <= 20) hourIndex = 10; // 戌时
    else hourIndex = 11; // 亥时
    
    return hours[hourIndex];
  },

  // 获取五行颜色
  getWuxingColor: (wuxing: string): string => {
    const colors = {
      '木': '#22c55e', // 绿色
      '火': '#ef4444', // 红色
      '土': '#f59e0b', // 黄色
      '金': '#6b7280', // 灰色
      '水': '#3b82f6', // 蓝色
    };
    return colors[wuxing as keyof typeof colors] || '#6b7280';
  },

  // 获取十神颜色
  getShishenColor: (shishen: string): string => {
    const colors = {
      '比肩': '#3b82f6',
      '劫财': '#6366f1',
      '食神': '#10b981',
      '伤官': '#06b6d4',
      '偏财': '#f59e0b',
      '正财': '#eab308',
      '七杀': '#ef4444',
      '正官': '#dc2626',
      '偏印': '#8b5cf6',
      '正印': '#7c3aed',
    };
    return colors[shishen as keyof typeof colors] || '#6b7280';
  },
};

export default baziApi;