import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { colors } from '@/styles/theme';

// 扩展的按钮属性
interface ButtonProps extends AntButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  gradient?: boolean;
  traditional?: boolean;
}

// 样式化的按钮组件
const StyledButton = styled(AntButton)<ButtonProps>`
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  ${props => props.size === 'small' && `
    height: 32px;
    padding: 0 12px;
    font-size: 12px;
  `}
  
  ${props => props.size === 'medium' && `
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
  `}
  
  ${props => props.size === 'large' && `
    height: 48px;
    padding: 0 24px;
    font-size: 16px;
  `}
  
  ${props => props.variant === 'primary' && `
    background: ${props.gradient 
      ? `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[600]} 100%)`
      : colors.primary[500]};
    border-color: ${colors.primary[500]};
    color: white;
    
    &:hover {
      background: ${props.gradient 
        ? `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[700]} 100%)`
        : colors.primary[600]};
      border-color: ${colors.primary[600]};
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: ${colors.secondary[500]};
    border-color: ${colors.secondary[500]};
    color: white;
    
    &:hover {
      background: ${colors.secondary[600]};
      border-color: ${colors.secondary[600]};
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
    }
  `}
  
  ${props => props.variant === 'outline' && `
    background: transparent;
    border: 1px solid ${colors.primary[500]};
    color: ${colors.primary[600]};
    
    &:hover {
      background: ${colors.primary[50]};
      border-color: ${colors.primary[600]};
      color: ${colors.primary[700]};
    }
  `}
  
  ${props => props.variant === 'ghost' && `
    background: transparent;
    border: none;
    color: ${colors.primary[600]};
    
    &:hover {
      background: ${colors.primary[50]};
      color: ${colors.primary[700]};
    }
  `}
  
  ${props => props.variant === 'link' && `
    background: none;
    border: none;
    color: ${colors.primary[600]};
    text-decoration: underline;
    
    &:hover {
      color: ${colors.primary[700]};
    }
  `}
  
  ${props => props.traditional && `
    background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
    border: 2px solid #d97706;
    color: #92400e;
    font-family: 'Noto Serif SC', serif;
    font-weight: 600;
    letter-spacing: 0.05em;
    
    &:hover {
      background: linear-gradient(135deg, #f59e0b 0%, #b45309 100%);
      border-color: #b45309;
      color: #78350f;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(217, 119, 6, 0.4);
    }
  `}
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none !important;
    box-shadow: none !important;
  }
`;

// 加载状态组件
const LoadingIcon: React.FC = () => (
  <LoadingOutlined spin style={{ fontSize: '1em' }} />
);

// 主按钮组件
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  children,
  icon,
  fullWidth = false,
  gradient = false,
  traditional = false,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      gradient={gradient}
      traditional={traditional}
      loading={loading}
      icon={loading ? <LoadingIcon /> : icon}
    >
      {children}
    </StyledButton>
  );
};

// 中国传统按钮
export const TraditionalButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} traditional />
);

// 渐变按钮
export const GradientButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} gradient />
);

// 全宽按钮
export const FullWidthButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} fullWidth />
);

// 按钮组
interface ButtonGroupProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  spacing?: number;
  align?: 'left' | 'center' | 'right';
}

const ButtonGroupContainer = styled.div<ButtonGroupProps>`
  display: flex;
  flex-direction: ${props => props.direction === 'vertical' ? 'column' : 'row'};
  gap: ${props => props.spacing || 8}px;
  align-items: ${props => {
    if (props.align === 'left') return 'flex-start';
    if (props.align === 'right') return 'flex-end';
    return 'center';
  }};
  justify-content: ${props => {
    if (props.align === 'left') return 'flex-start';
    if (props.align === 'right') return 'flex-end';
    return 'center';
  }};
`;

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  direction = 'horizontal',
  spacing = 8,
  align = 'left',
}) => (
  <ButtonGroupContainer
    direction={direction}
    spacing={spacing}
    align={align}
  >
    {children}
  </ButtonGroupContainer>
);

// 按钮预设
export const PrimaryButton = (props: ButtonProps) => (
  <Button {...props} variant="primary" />
);

export const SecondaryButton = (props: ButtonProps) => (
  <Button {...props} variant="secondary" />
);

export const OutlineButton = (props: ButtonProps) => (
  <Button {...props} variant="outline" />
);

export const GhostButton = (props: ButtonProps) => (
  <Button {...props} variant="ghost" />
);

export const LinkButton = (props: ButtonProps) => (
  <Button {...props} variant="link" />
);

export default Button;