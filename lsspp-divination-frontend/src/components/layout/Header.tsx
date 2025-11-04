import React from 'react';
import { Layout, Button, Typography } from 'antd';
import {
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { useTheme } from '@/hooks/useTheme';
import { colors } from '@/styles/theme';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton?: boolean;
}

// 样式化组件
const StyledHeader = styled(AntHeader)`
  background: #ffffff;
  border-bottom: 1px solid ${colors.gray[200]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  
  &[data-theme="dark"] {
    background: ${colors.gray[800]};
    border-bottom-color: ${colors.gray[700]};
  }
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  
  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[600]} 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 16px;
  }
  
  .logo-text {
    font-family: 'Noto Serif SC', serif;
    font-size: 20px;
    font-weight: 600;
    background: linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[700]} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .header-btn {
    border: none;
    box-shadow: none;
    
    &:hover {
      background: ${colors.gray[100]};
    }
  }
  
  &[data-theme="dark"] .header-btn:hover {
    background: ${colors.gray[700]};
  }
`;

// 头部组件
const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  showMenuButton = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // 获取页面标题
  const getPageTitle = () => {
    const path = location.pathname;
    const titles: Record<string, string> = {
      '/': '首页',
      '/bazi': '八字排盘',
      '/liuyao': '六爻起卦',
    };

    // 处理动态路由
    for (const [route, title] of Object.entries(titles)) {
      if (path.startsWith(route)) {
        return title;
      }
    }

    return '六神算派';
  };
  
  return (
    <StyledHeader data-theme={theme.mode}>
      <LeftSection>
        {/* 菜单按钮 */}
        {showMenuButton && (
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={onMenuClick}
            className="header-btn"
            size="large"
          />
        )}
        
        {/* Logo */}
        <Logo
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logo-icon">六神</div>
          <div className="logo-text">六神算派</div>
        </Logo>
        
        {/* 页面标题 */}
        <Text strong style={{ fontSize: 16, marginLeft: 16 }}>
          {getPageTitle()}
        </Text>
      </LeftSection>
      
      <RightSection data-theme={theme.mode}>
        {/* 主题切换 */}
        <Button
          type="text"
          icon={theme.mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          className="header-btn"
          title={theme.mode === 'dark' ? '切换到亮色模式' : '切换到暗黑模式'}
        />
      </RightSection>
    </StyledHeader>
  );
};

export default Header;