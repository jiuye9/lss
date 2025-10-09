import { apiRequest, API_ENDPOINTS } from './config';
import { User } from '@/types';

// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// 登录响应
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

// 注册请求参数
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  nickname?: string;
  inviteCode?: string;
}

// 修改密码请求参数
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// 更新用户信息请求参数
export interface UpdateProfileRequest {
  nickname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  gender?: 'male' | 'female';
  birthDate?: string;
}

// 认证相关 API
export const authApi = {
  // 登录
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return apiRequest.post(API_ENDPOINTS.AUTH.LOGIN, data);
  },

  // 注册
  register: (data: RegisterRequest): Promise<User> => {
    return apiRequest.post(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  // 登出
  logout: (): Promise<void> => {
    return apiRequest.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  // 刷新 token
  refreshToken: (refreshToken: string): Promise<LoginResponse> => {
    return apiRequest.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
  },

  // 获取用户信息
  getProfile: (): Promise<User> => {
    return apiRequest.get(API_ENDPOINTS.AUTH.PROFILE);
  },

  // 更新用户信息
  updateProfile: (data: UpdateProfileRequest): Promise<User> => {
    return apiRequest.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data);
  },

  // 修改密码
  changePassword: (data: ChangePasswordRequest): Promise<void> => {
    return apiRequest.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },
};

// Token 管理工具
export const tokenManager = {
  // 获取 token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // 设置 token
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  // 获取刷新 token
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },

  // 设置刷新 token
  setRefreshToken: (refreshToken: string): void => {
    localStorage.setItem('refreshToken', refreshToken);
  },

  // 清除所有 token
  clearTokens: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  // 检查 token 是否存在
  hasToken: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // 检查 token 是否过期（简单判断）
  isTokenExpired: (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  },
};

// 用户信息管理
export const userManager = {
  // 获取用户信息
  getUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      return null;
    }
  },

  // 设置用户信息
  setUser: (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // 清除用户信息
  clearUser: (): void => {
    localStorage.removeItem('user');
  },

  // 检查是否已登录
  isLoggedIn: (): boolean => {
    return tokenManager.hasToken() && !tokenManager.isTokenExpired() && !!this.getUser();
  },
};

export default authApi;