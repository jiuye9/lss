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
const LiuyaoPage = React.lazy(() => import('@/pages/liuyao/LiuyaoPage'));
const AstrologyPage = React.lazy(() => import('@/pages/astrology/AstrologyPage'));
const UserProfilePage = React.lazy(() => import('@/pages/user/ProfilePage'));
const HistoryPage = React.lazy(() => import('@/pages/user/HistoryPage'));
const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/auth/RegisterPage'));

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
  { path: '/bazi', element: BaziPage, title: '八字排盘' },
  { path: '/liuyao', element: LiuyaoPage, title: '六爻起卦' },
  { path: '/astrology', element: AstrologyPage, title: '占星排盘' },
  { path: '/profile', element: UserProfilePage, title: '个人中心' },
  { path: '/history', element: HistoryPage, title: '历史记录' },
  { path: '/login', element: LoginPage, title: '用户登录' },
  { path: '/register', element: RegisterPage, title: '用户注册' },
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
                  
                  {/* 八字排盘 */}
                  <Route 
                    path="/bazi/*" 
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
                  
                  {/* 占星排盘 */}
                  <Route 
                    path="/astrology/*" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AstrologyPage />
                      </motion.div>
                    } 
                  />
                  
                  {/* 用户相关 */}
                  <Route 
                    path="/profile" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <UserProfilePage />
                      </motion.div>
                    } 
                  />
                  
                  <Route 
                    path="/history" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HistoryPage />
                      </motion.div>
                    } 
                  />
                  
                  {/* 认证页面 */}
                  <Route 
                    path="/login" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LoginPage />
                      </motion.div>
                    } 
                  />
                  
                  <Route 
                    path="/register" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RegisterPage />
                      </motion.div>
                    } 
                  />
                  
                  {/* 404 页面 */}
                  <Route 
                    path="*" 
                    element={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          height: '60vh',
                          flexDirection: 'column',
                          gap: '16px'
                        }}
                      >
                        <h2>页面不存在</h2>
                        <p>您访问的页面不存在，请检查地址是否正确</p>
                        <Navigate to="/" replace />
                      </motion.div>
                    } 
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