import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Spin, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { ThemeProvider } from 'styled-components';

import Layout from '@/components/layout/Layout';
import { antdTheme, colors } from '@/styles/theme';
import { useTheme } from '@/hooks/useTheme';

// 懒加载页面组件
const HomePage = React.lazy(() => import('@/pages/home/HomePage'));
const BaziPage = React.lazy(() => import('@/pages/bazi/BaziPage'));
const BaziRecordsPage = React.lazy(() => import('@/pages/bazi/BaziRecordsPage'));
const LiuyaoPage = React.lazy(() => import('@/pages/liuyao/LiuyaoPage'));

// 样式化容器
const AppContainer = styled.div`
  min-height: 100vh;
  background: ${colors.gray[50]};
  transition: all 0.3s ease;
  
  &[data-theme="dark"] {
    background: ${colors.gray[900]};
  }
`;

// 加载组件
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  
  .ant-spin {
    .ant-spin-dot {
      font-size: 32px;
    }
  }
`;

const Loading: React.FC = () => (
  <LoadingSpinner>
    <Spin size="large" tip="加载中..." />
  </LoadingSpinner>
);

// 页面路由配置
const pageRoutes = [
  { path: '/', element: HomePage, title: '六神算派 - 专业占卜系统' },
  { path: '/bazi/records', element: BaziRecordsPage, title: '排盘记录 - 八字排盘' },
  { path: '/bazi', element: BaziPage, title: '八字排盘' },
  { path: '/liuyao', element: LiuyaoPage, title: '六爻起卦' },
];

// 主应用组件
const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // 设置页面标题
  useEffect(() => {
    const updateTitle = () => {
      const currentRoute = pageRoutes.find(route => 
        window.location.pathname === route.path
      );
      document.title = currentRoute?.title || '六神算派 - 专业占卜系统';
    };

    updateTitle();
    
    // 监听路由变化
    const handlePopState = () => updateTitle();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 设置主题模式
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.mode);
  }, [theme.mode]);

  // 错误提示配置
  message.config({
    top: 80,
    duration: 3,
    maxCount: 3,
  });

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider 
        theme={theme.mode === 'dark' ? { algorithm: ['darkAlgorithm' as any] } : antdTheme}
        locale={{
          locale: 'zh_CN',
        }}
      >
        <AppContainer data-theme={theme.mode}>
          <Layout>
            <AnimatePresence mode="wait">
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/* 主页 */}
                  <Route
                    path="/"
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HomePage />
                      </motion.div>
                    }
                  />

                  {/* 八字排盘记录列表 */}
                  <Route
                    path="/bazi/records"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BaziRecordsPage />
                      </motion.div>
                    }
                  />

                  {/* 八字排盘 */}
                  <Route
                    path="/bazi"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BaziPage />
                      </motion.div>
                    }
                  />

                  {/* 六爻起卦 */}
                  <Route
                    path="/liuyao/*"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LiuyaoPage />
                      </motion.div>
                    }
                  />

                  {/* 404 页面 - 重定向到首页 */}
                  <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                  />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </Layout>
        </AppContainer>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;