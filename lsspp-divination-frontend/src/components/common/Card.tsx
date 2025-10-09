import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import styled from 'styled-components';
import { colors, shadows } from '@/styles/theme';
import { motion } from 'framer-motion';

interface CardProps extends AntCardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'traditional';
  hover?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  animated?: boolean;
}

const StyledCard = styled(AntCard)<CardProps>`
  border-radius: 8px;
  transition: all 0.3s ease;
  
  ${props => props.padding === 'none' && `
    .ant-card-body {
      padding: 0;
    }
  `}
  
  ${props => props.padding === 'small' && `
    .ant-card-body {
      padding: 12px;
    }
  `}
  
  ${props => props.padding === 'medium' && `
    .ant-card-body {
      padding: 20px;
    }
  `}
  
  ${props => props.padding === 'large' && `
    .ant-card-body {
      padding: 32px;
    }
  `}
  
  ${props => props.variant === 'default' && `
    border: 1px solid ${colors.gray[200]};
    box-shadow: ${shadows.sm};
  `}
  
  ${props => props.variant === 'bordered' && `
    border: 2px solid ${colors.primary[200]};
    box-shadow: none;
  `}
  
  ${props => props.variant === 'elevated' && `
    border: none;
    box-shadow: ${shadows.lg};
  `}
  
  ${props => props.variant === 'traditional' && `
    border: 2px solid ${colors.primary[400]};
    background: linear-gradient(145deg, #fef3c7 0%, #fde68a 100%);
    box-shadow: ${shadows.md};
    
    .ant-card-head {
      background: linear-gradient(135deg, ${colors.primary[300]} 0%, ${colors.primary[400]} 100%);
      border-bottom: 1px solid ${colors.primary[500]};
      
      .ant-card-head-title {
        color: ${colors.primary[800]};
        font-family: 'Noto Serif SC', serif;
        font-weight: 600;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
      }
    }
    
    .ant-card-body {
      color: ${colors.primary[800]};
    }
  `}
  
  ${props => props.hover && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${shadows.xl};
      border-color: ${props.variant === 'traditional' ? colors.primary[500] : colors.primary[300]};
    }
  `}
`;

const AnimatedCard = motion(StyledCard);

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hover = false,
  padding = 'medium',
  animated = false,
  children,
  ...props
}) => {
  const cardProps = {
    ...props,
    variant,
    hover,
    padding,
  };

  if (animated) {
    return (
      <AnimatedCard
        {...cardProps}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -2 } : undefined}
      >
        {children}
      </AnimatedCard>
    );
  }

  return (
    <StyledCard {...cardProps}>
      {children}
    </StyledCard>
  );
};

// 中国传统卡片
export const TraditionalCard: React.FC<CardProps> = (props) => (
  <Card {...props} variant="traditional" />
);

// 悬浮卡片
export const ElevatedCard: React.FC<CardProps> = (props) => (
  <Card {...props} variant="elevated" />
);

// 可点击卡片
export const ClickableCard: React.FC<CardProps> = (props) => (
  <Card {...props} hover animated />
);

// 统计卡片
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}

const StatCardContainer = styled.div<{ color?: string }>`
  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.color ? `${props.color}20` : colors.primary[100]};
    color: ${props => props.color || colors.primary[600]};
    font-size: 24px;
  }
  
  .stat-content {
    flex: 1;
    margin-left: 16px;
  }
  
  .stat-title {
    font-size: 14px;
    color: ${colors.gray[600]};
    margin-bottom: 4px;
  }
  
  .stat-value {
    font-size: 32px;
    font-weight: 700;
    color: ${colors.gray[900]};
    line-height: 1;
  }
  
  .stat-subtitle {
    font-size: 12px;
    color: ${colors.gray[500]};
    margin-top: 4px;
  }
  
  .stat-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    
    &.up {
      color: ${colors.success};
    }
    
    &.down {
      color: ${colors.error};
    }
    
    &.neutral {
      color: ${colors.gray[500]};
    }
  }
`;

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color,
}) => (
  <Card variant="elevated" animated>
    <StatCardContainer color={color}>
      <div className="stat-header">
        <div className="stat-content">
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
          {subtitle && <div className="stat-subtitle">{subtitle}</div>}
        </div>
        {icon && <div className="stat-icon">{icon}</div>}
      </div>
      {trend && trendValue && (
        <div className={`stat-trend ${trend}`}>
          {trend === 'up' && '↑'}
          {trend === 'down' && '↓'}
          {trend === 'neutral' && '→'}
          {trendValue}
        </div>
      )}
    </StatCardContainer>
  </Card>
);

// 特性卡片
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

const FeatureCardContainer = styled.div`
  text-align: center;
  
  .feature-image {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 6px;
    margin-bottom: 16px;
  }
  
  .feature-icon {
    font-size: 48px;
    color: ${colors.primary[500]};
    margin-bottom: 16px;
  }
  
  .feature-title {
    font-size: 18px;
    font-weight: 600;
    color: ${colors.gray[900]};
    margin-bottom: 8px;
  }
  
  .feature-description {
    font-size: 14px;
    color: ${colors.gray[600]};
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  .feature-action {
    margin-top: auto;
  }
`;

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  image,
  action,
  onClick,
}) => (
  <Card hover animated onClick={onClick} style={{ height: '100%' }}>
    <FeatureCardContainer>
      {image && (
        <div 
          className="feature-image" 
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      {icon && <div className="feature-icon">{icon}</div>}
      <div className="feature-title">{title}</div>
      <div className="feature-description">{description}</div>
      {action && <div className="feature-action">{action}</div>}
    </FeatureCardContainer>
  </Card>
);

export default Card;