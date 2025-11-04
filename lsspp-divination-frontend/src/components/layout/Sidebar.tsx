import React from 'react';
import { Menu, Typography } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  ThunderboltOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors } from '@/styles/theme';
import { useTheme } from '@/hooks/useTheme';

const { Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
  onItemClick?: () => void;
}

// 样式化组件
const SidebarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  
  &[data-theme="dark"] {
    background: ${colors.gray[800]};
  }
`;

const SidebarHeader = styled.div<{ collapsed: boolean }>`
  padding: ${props => props.collapsed ? '16px 12px' : '16px 20px'};
  border-bottom: 1px solid ${colors.gray[200]};
  text-align: ${props => props.collapsed ? 'center' : 'left'};
  
  &[data-theme="dark"] {
    border-bottom-color: ${colors.gray[700]};
  }
  
  .sidebar-title {
    font-family: 'Noto Serif SC', serif;
    font-weight: 600;
    color: ${colors.primary[600]};
    margin: 0;
    opacity: ${props => props.collapsed ? 0 : 1};
    transition: opacity 0.2s ease;
  }
  
  .sidebar-subtitle {
    font-size: 12px;
    color: ${colors.gray[500]};
    margin: 4px 0 0 0;
    opacity: ${props => props.collapsed ? 0 : 1};
    transition: opacity 0.2s ease;
  }
`;

const MenuContainer = styled.div`
  flex: 1;
  padding: 8px 0;
  
  .ant-menu {
    border: none;
    background: transparent;
    
    .ant-menu-item {
      margin: 4px 8px;
      border-radius: 6px;
      height: 40px;
      line-height: 40px;
      
      &:hover {
        background: ${colors.primary[50]};
      }
      
      &.ant-menu-item-selected {
        background: ${colors.primary[100]};
        color: ${colors.primary[600]};
        font-weight: 500;
        
        &::after {
          display: none;
        }
      }
    }
    
    .ant-menu-submenu {
      .ant-menu-submenu-title {
        margin: 4px 8px;
        border-radius: 6px;
        height: 40px;
        line-height: 40px;
        
        &:hover {
          background: ${colors.primary[50]};
        }
      }
      
      &.ant-menu-submenu-selected {
        .ant-menu-submenu-title {
          background: ${colors.primary[100]};
          color: ${colors.primary[600]};
        }
      }
    }
  }
  
  &[data-theme="dark"] .ant-menu {
    .ant-menu-item {
      color: ${colors.gray[300]};
      
      &:hover {
        background: ${colors.gray[700]};
        color: ${colors.gray[100]};
      }
      
      &.ant-menu-item-selected {
        background: ${colors.primary[800]};
        color: ${colors.primary[300]};
      }
    }
    
    .ant-menu-submenu {
      .ant-menu-submenu-title {
        color: ${colors.gray[300]};
        
        &:hover {
          background: ${colors.gray[700]};
          color: ${colors.gray[100]};
        }
      }
      
      &.ant-menu-submenu-selected {
        .ant-menu-submenu-title {
          background: ${colors.primary[800]};
          color: ${colors.primary[300]};
        }
      }
    }
  }
`;

const MenuSection = styled.div<{ collapsed: boolean }>`
  margin: 16px 0 8px 0;
  
  .section-title {
    font-size: 12px;
    color: ${colors.gray[500]};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 ${props => props.collapsed ? '20px' : '20px'};
    margin-bottom: 8px;
    opacity: ${props => props.collapsed ? 0 : 1};
    transition: opacity 0.2s ease;
    
    &[data-theme="dark"] {
      color: ${colors.gray[400]};
    }
  }
`;

// 菜单项配置
const menuItems = [
  {
    key: 'main',
    title: '核心功能',
    items: [
      {
        key: '/',
        icon: <HomeOutlined />,
        label: '首页',
        path: '/'
      },
      {
        key: '/bazi',
        icon: <CalendarOutlined />,
        label: '八字排盘',
        path: '/bazi'
      },
      {
        key: '/bazi/records',
        icon: <UnorderedListOutlined />,
        label: '排盘记录',
        path: '/bazi/records'
      },
      {
        key: '/liuyao',
        icon: <ThunderboltOutlined />,
        label: '六爻起卦',
        path: '/liuyao'
      },
    ]
  }
];

// 侧边栏组件
const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  onItemClick 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  
  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    onItemClick?.();
  };
  
  // 获取当前选中的菜单项
  const getSelectedKeys = () => {
    const path = location.pathname;

    // 收集所有匹配的路径
    const matches: { key: string; pathLength: number }[] = [];

    for (const section of menuItems) {
      for (const item of section.items) {
        // 精确匹配或前缀匹配
        if (item.path === path || (item.path !== '/' && path.startsWith(item.path))) {
          matches.push({
            key: item.key,
            pathLength: item.path.length
          });
        }
      }
    }

    // 如果有匹配，返回最长路径的那个（最具体的路径）
    if (matches.length > 0) {
      matches.sort((a, b) => b.pathLength - a.pathLength);
      return [matches[0].key];
    }

    return ['/'];
  };
  
  return (
    <SidebarContainer data-theme={theme.mode}>
      {/* 侧边栏头部 */}
      <SidebarHeader collapsed={collapsed} data-theme={theme.mode}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Text className="sidebar-title">六神算派</Text>
            <Text className="sidebar-subtitle">传统命理排盘</Text>
          </motion.div>
        )}
      </SidebarHeader>
      
      {/* 菜单内容 */}
      <MenuContainer data-theme={theme.mode}>
        {menuItems.map((section) => (
          <div key={section.key}>
            {/* 分组标题 */}
            <MenuSection collapsed={collapsed}>
              {!collapsed && (
                <div className="section-title" data-theme={theme.mode}>
                  {section.title}
                </div>
              )}
            </MenuSection>
            
            {/* 菜单项 */}
            <Menu
              mode="inline"
              selectedKeys={getSelectedKeys()}
              onClick={handleMenuClick}
              inlineCollapsed={collapsed}
              items={section.items.map(item => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
              }))}
            />
          </div>
        ))}
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;