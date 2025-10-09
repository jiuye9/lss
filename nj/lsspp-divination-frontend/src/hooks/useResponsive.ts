import { useState, useEffect } from 'react';

// 响应式断点
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

type BreakpointKey = keyof typeof breakpoints;

interface ResponsiveInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isXxl: boolean;
  orientation: 'portrait' | 'landscape';
}

// 响应式 Hook
export const useResponsive = (): ResponsiveInfo => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // 初始化设置
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = windowSize;

  return {
    width,
    height,
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
    isXs: width < breakpoints.xs,
    isSm: width >= breakpoints.xs && width < breakpoints.sm,
    isMd: width >= breakpoints.sm && width < breakpoints.md,
    isLg: width >= breakpoints.md && width < breakpoints.lg,
    isXl: width >= breakpoints.lg && width < breakpoints.xl,
    isXxl: width >= breakpoints.xl,
    orientation: height > width ? 'portrait' : 'landscape',
  };
};

// 响应式尺寸 Hook
export const useBreakpoint = (breakpoint: BreakpointKey): boolean => {
  const { width } = useResponsive();
  return width >= breakpoints[breakpoint];
};

// 响应式值 Hook
export const useResponsiveValue = <T>(
  values: Partial<Record<BreakpointKey | 'base', T>>
): T => {
  const responsive = useResponsive();
  
  // 按从大到小的顺序检查
  if (responsive.isXxl && values.xxl !== undefined) return values.xxl;
  if (responsive.isXl && values.xl !== undefined) return values.xl;
  if (responsive.isLg && values.lg !== undefined) return values.lg;
  if (responsive.isMd && values.md !== undefined) return values.md;
  if (responsive.isSm && values.sm !== undefined) return values.sm;
  if (responsive.isXs && values.xs !== undefined) return values.xs;
  
  // 返回基础值或第一个可用值
  return values.base ?? Object.values(values)[0] as T;
};

// 响应式网格 Hook
export const useResponsiveGrid = () => {
  const responsive = useResponsive();
  
  const getColumnCount = (config: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  }): number => {
    if (responsive.isXxl && config.xxl) return config.xxl;
    if (responsive.isXl && config.xl) return config.xl;
    if (responsive.isLg && config.lg) return config.lg;
    if (responsive.isMd && config.md) return config.md;
    if (responsive.isSm && config.sm) return config.sm;
    if (responsive.isXs && config.xs) return config.xs;
    
    return config.xs || 1;
  };
  
  const getGutter = (config: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  }): number => {
    if (responsive.isXxl && config.xxl) return config.xxl;
    if (responsive.isXl && config.xl) return config.xl;
    if (responsive.isLg && config.lg) return config.lg;
    if (responsive.isMd && config.md) return config.md;
    if (responsive.isSm && config.sm) return config.sm;
    if (responsive.isXs && config.xs) return config.xs;
    
    return config.xs || 16;
  };
  
  return {
    getColumnCount,
    getGutter,
    responsive,
  };
};

// 响应式文本大小 Hook
export const useResponsiveFontSize = () => {
  const responsive = useResponsive();
  
  const getFontSize = (config: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  }): number => {
    if (responsive.isXxl && config.xxl) return config.xxl;
    if (responsive.isXl && config.xl) return config.xl;
    if (responsive.isLg && config.lg) return config.lg;
    if (responsive.isMd && config.md) return config.md;
    if (responsive.isSm && config.sm) return config.sm;
    if (responsive.isXs && config.xs) return config.xs;
    
    return config.md || 14;
  };
  
  return {
    getFontSize,
    responsive,
  };
};

// 设备类型检测 Hook
export const useDeviceType = () => {
  const responsive = useResponsive();
  
  const isMobileDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad|phone/i.test(userAgent);
  };
  
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };
  
  return {
    isMobile: responsive.isMobile,
    isTablet: responsive.isTablet,
    isDesktop: responsive.isDesktop,
    isMobileDevice: isMobileDevice(),
    isTouchDevice: isTouchDevice(),
    orientation: responsive.orientation,
  };
};

export default useResponsive;