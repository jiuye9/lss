import { ThemeConfig } from 'antd';

// 主色调
export const colors = {
  // 主色 - 金色系
  primary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // 主色
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // 辅助色 - 红色系
  secondary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626', // 辅助色
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // 中性色
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // 功能色
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // 五行色彩
  wuxing: {
    wood: '#22c55e',  // 木 - 绿色
    fire: '#ef4444',  // 火 - 红色
    earth: '#f59e0b', // 土 - 黄色
    metal: '#6b7280', // 金 - 灰色
    water: '#3b82f6', // 水 - 蓝色
  },
  
  // 八卦色彩
  bagua: {
    qian: '#dc2626',  // 乾
    kun: '#92400e',   // 坤
    zhen: '#059669',  // 震
    xun: '#16a34a',  // 巽
    kan: '#1d4ed8',   // 坎
    li: '#dc2626',    // 离
    gen: '#a16207',   // 艮
    dui: '#7c3aed',   // 兑
  },
};

// 字体配置
export const typography = {
  fontFamily: {
    sans: ['Noto Sans SC', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    serif: ['Noto Serif SC', 'Source Han Serif SC', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

// 阴影配置
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// 边框圆角
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// 间距配置
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// 断点配置
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Ant Design 主题配置
export const antdTheme: ThemeConfig = {
  token: {
    // 主色
    colorPrimary: colors.primary[500],
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorInfo: colors.info,
    
    // 边框圆角
    borderRadius: 6,
    
    // 字体
    fontFamily: typography.fontFamily.sans.join(', '),
    fontSize: 14,
    
    // 间距
    controlHeight: 40,
    
    // 阴影
    boxShadow: shadows.base,
    boxShadowSecondary: shadows.sm,
  },
  
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f9fafb',
      siderBg: '#ffffff',
    },
    
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: colors.primary[100],
      itemSelectedColor: colors.primary[600],
      itemHoverBg: colors.primary[50],
    },
    
    Button: {
      borderRadius: 6,
      fontWeight: 500,
    },
    
    Input: {
      borderRadius: 6,
      fontSize: 14,
    },
    
    Card: {
      borderRadius: 8,
      boxShadow: shadows.sm,
    },
    
    Modal: {
      borderRadius: 8,
    },
    
    Drawer: {
      borderRadius: 8,
    },
    
    Table: {
      headerBg: colors.gray[50],
      borderColor: colors.gray[200],
    },
    
    Tabs: {
      itemSelectedColor: colors.primary[600],
      itemHoverColor: colors.primary[500],
      inkBarColor: colors.primary[500],
    },
  },
};

// 暗黑模式主题
export const antdDarkTheme: ThemeConfig = {
  ...antdTheme,
  algorithm: ['darkAlgorithm'] as any,
  token: {
    ...antdTheme.token,
    colorBgBase: colors.gray[900],
    colorTextBase: colors.gray[100],
  },
  components: {
    ...antdTheme.components,
    Layout: {
      headerBg: colors.gray[800],
      bodyBg: colors.gray[900],
      siderBg: colors.gray[800],
    },
    Table: {
      headerBg: colors.gray[800],
      borderColor: colors.gray[700],
    },
  },
};

// 中国传统文化主题
export const traditionalTheme = {
  colors: {
    imperial: '#d97706',    // 皇家金
    vermillion: '#dc2626',  // 朱砂红
    jade: '#059669',        // 翡翠绿
    ink: '#1f2937',         // 墨黑
    ivory: '#fffbeb',       // 象牙白
    bamboo: '#16a34a',      // 竹绿
    plum: '#7c3aed',        // 梅紫
  },
  
  gradients: {
    sunset: 'linear-gradient(135deg, #fbbf24 0%, #dc2626 100%)',
    dawn: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)',
    mountain: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)',
    water: 'linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)',
    forest: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
  },
  
  patterns: {
    cloud: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    waves: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%233b82f6" fill-opacity="0.1"%3E%3Cpath d="M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  },
};

export default {
  colors,
  typography,
  shadows,
  borderRadius,
  spacing,
  breakpoints,
  antdTheme,
  antdDarkTheme,
  traditionalTheme,
};