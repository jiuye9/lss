import { useState, useEffect, useCallback } from 'react';
import { Theme } from '@/types';
import { colors } from '@/styles/theme';

// 默认主题配置
const defaultLightTheme: Theme = {
  mode: 'light',
  primaryColor: colors.primary[500],
  backgroundColor: colors.gray[50],
  textColor: colors.gray[900],
  borderColor: colors.gray[200],
};

const defaultDarkTheme: Theme = {
  mode: 'dark',
  primaryColor: colors.primary[400],
  backgroundColor: colors.gray[900],
  textColor: colors.gray[100],
  borderColor: colors.gray[700],
};

// 主题 Hook
export const useTheme = () => {
  // 从本地存储获取主题设置
  const getInitialTheme = (): Theme => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const parsed = JSON.parse(savedTheme);
        return parsed.mode === 'dark' ? defaultDarkTheme : defaultLightTheme;
      }
    } catch (error) {
      console.warn('读取主题设置失败:', error);
    }
    
    // 检查系统主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? defaultDarkTheme : defaultLightTheme;
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // 切换主题
  const toggleTheme = useCallback(() => {
    const newTheme = theme.mode === 'light' ? defaultDarkTheme : defaultLightTheme;
    setTheme(newTheme);
  }, [theme.mode]);

  // 设置主题模式
  const setThemeMode = useCallback((mode: 'light' | 'dark') => {
    const newTheme = mode === 'dark' ? defaultDarkTheme : defaultLightTheme;
    setTheme(newTheme);
  }, []);

  // 自定义主题颜色
  const updateThemeColors = useCallback((colors: Partial<Omit<Theme, 'mode'>>) => {
    setTheme(prev => ({
      ...prev,
      ...colors,
    }));
  }, []);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 只在没有手动设置主题时才自动跟随系统
      const hasManualTheme = localStorage.getItem('theme');
      if (!hasManualTheme) {
        setTheme(e.matches ? defaultDarkTheme : defaultLightTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 保存主题设置到本地存储
  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify({ mode: theme.mode }));
    } catch (error) {
      console.warn('保存主题设置失败:', error);
    }
  }, [theme.mode]);

  // 更新 CSS 变量
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-background', theme.backgroundColor);
    root.style.setProperty('--color-text', theme.textColor);
    root.style.setProperty('--color-border', theme.borderColor);
    
    // 更新 body 类名
    document.body.className = `theme-${theme.mode}`;
  }, [theme]);

  return {
    theme,
    toggleTheme,
    setThemeMode,
    updateThemeColors,
    isDark: theme.mode === 'dark',
    isLight: theme.mode === 'light',
  };
};

// 主题工具函数
export const themeUtils = {
  // 获取对比度适合的颜色
  getContrastColor: (backgroundColor: string): string => {
    // 简单的亮度计算
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? colors.gray[900] : colors.gray[100];
  },
  
  // 获取颜色的透明度版本
  getColorWithOpacity: (color: string, opacity: number): string => {
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  },
  
  // 获取颜色的亮/暗版本
  lightenColor: (color: string, amount: number): string => {
    // 简化实现，实际中可以使用更复杂的颜色处理库
    return color;
  },
  
  darkenColor: (color: string, amount: number): string => {
    // 简化实现，实际中可以使用更复杂的颜色处理库
    return color;
  },
};

export default useTheme;