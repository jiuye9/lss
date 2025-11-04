import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

// API 基础配置
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080';
const API_TIMEOUT = 30000; // 30秒超时

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // 添加认证 token
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 添加请求时间戳
    if (config.headers) {
      config.headers['X-Timestamp'] = Date.now().toString();
    }
    
    console.log(`🚀 API 请求: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('🚫 请求配置错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    const { data } = response;
    
    console.log(`✅ API 响应: ${response.config.url}`, data);
    
    // 检查业务错误码
    if (data.code !== 200) {
      const error = new Error(data.message || '请求失败');
      (error as any).code = data.code;
      (error as any).data = data.data;
      throw error;
    }
    
    return response;
  },
  (error) => {
    console.error('🚨 API 错误:', error);
    
    // 处理网络错误
    if (!error.response) {
      error.message = '网络连接失败，请检查网络连接';
      return Promise.reject(error);
    }
    
    // 处理 HTTP 状态码错误
    const { status, data } = error.response;

    switch (status) {
      case 404:
        error.message = '请求的资源不存在';
        break;
      case 422:
        error.message = data?.message || '请求参数错误';
        break;
      case 500:
        error.message = '服务器内部错误，请稍后再试';
        break;
      case 502:
      case 503:
      case 504:
        error.message = '服务暂时不可用，请稍后再试';
        break;
      default:
        error.message = data?.message || `请求失败 (状态码: ${status})`;
    }
    
    return Promise.reject(error);
  }
);

// 封装的 API 请求方法
export const apiRequest = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    api.get<ApiResponse<T>>(url, config).then(res => res.data.data),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    api.post<ApiResponse<T>>(url, data, config).then(res => res.data.data),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    api.put<ApiResponse<T>>(url, data, config).then(res => res.data.data),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    api.delete<ApiResponse<T>>(url, config).then(res => res.data.data),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    api.patch<ApiResponse<T>>(url, data, config).then(res => res.data.data),
};

// 原始 axios 实例（用于特殊情况）
export default api;

// API 端点常量
export const API_ENDPOINTS = {
  // 八字排盘
  BAZI: {
    CALCULATE: '/api/divination/calculate',
  },

  // 六爻起卦
  LIUYAO: {
    CALCULATE: '/api/divination/calculate',
  },

  // 其他
  CALENDAR: {
    LUNAR_CONVERT: '/calendar/lunar',
    SOLAR_CONVERT: '/calendar/solar',
  },
};

// 环境变量类型
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_VERSION: string;
  }
}