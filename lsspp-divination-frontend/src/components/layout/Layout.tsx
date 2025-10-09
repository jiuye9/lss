import React, { useState } from 'react';
import { Layout as AntLayout, Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { colors } from '@/styles/theme';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

// 样式化组件
const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
  background: ${colors.gray[50]};
  
  &[data-theme="dark"] {
    background: ${colors.gray[900]};
  }
`;

const StyledSider = styled(AntLayout.Sider)`
  background: #ffffff;
  border-right: 1px solid ${colors.gray[200]};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
  
  &[data-theme="dark"] {
    background: ${colors.gray[800]};
    border-right-color: ${colors.gray[700]};
  }
  
  .ant-layout-sider-trigger {
    background: ${colors.primary[500]};
    color: white;
    
    &:hover {
      background: ${colors.primary[600]};
    }
  }
`;

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  
  .content-wrapper {
    flex: 1;
    padding: 24px;
    background: ${colors.gray[50]};
    
    &[data-theme="dark"] {
      background: ${colors.gray[900]};
    }
  }
  
  @media (max-width: 768px) {
    .content-wrapper {
      padding: 16px;
    }
  }
  
  @media (max-width: 480px) {
    .content-wrapper {
      padding: 12px;
    }
  }
`;

const MobileDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
`;

// 主布局组件
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  
  // 响应式断点
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  
  // 处理侧边栏切换
  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileDrawerVisible(!mobileDrawerVisible);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };
  
  // 处理移动端抽屉关闭
  const handleMobileDrawerClose = () => {
    setMobileDrawerVisible(false);
  };
  
  return (
    <StyledLayout>
      {/* 顶部导航 */}
      <Header 
        onMenuClick={handleSidebarToggle}
        showMenuButton={true}
      />
      
      <AntLayout>
        {/* 桌面端侧边栏 */}
        {!isMobile && (
          <StyledSider
            collapsible
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
            trigger={null}
            width={280}
            collapsedWidth={80}
            breakpoint="lg"
            onBreakpoint={(broken) => {
              if (broken && !isMobile) {
                setSidebarCollapsed(true);
              }
            }}
          >
            <Sidebar collapsed={sidebarCollapsed} />
          </StyledSider>
        )}
        
        {/* 移动端侧边栏抽屉 */}
        {isMobile && (
          <MobileDrawer
            title="菜单"
            placement="left"
            onClose={handleMobileDrawerClose}
            open={mobileDrawerVisible}
            width={280}
            bodyStyle={{ padding: 0 }}
          >
            <Sidebar 
              collapsed={false} 
              onItemClick={handleMobileDrawerClose}
            />
          </MobileDrawer>
        )}
        
        {/* 主内容区域 */}
        <StyledContent>
          <motion.div 
            className="content-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
          
          {/* 底部 */}
          <Footer />
        </StyledContent>
      </AntLayout>
    </StyledLayout>
  );
};

export default Layout;