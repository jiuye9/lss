import React from 'react';
import { Row, Col, Typography, Space, Statistic } from 'antd';
import { 
  CalendarOutlined, 
  ThunderboltOutlined, 
  StarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Card, FeatureCard, StatCard } from '@/components/common/Card';
import { Button, PrimaryButton } from '@/components/common/Button';
import { colors, traditionalTheme } from '@/styles/theme';

const { Title, Paragraph, Text } = Typography;

// 样式化组件
const HomeContainer = styled.div`
  min-height: calc(100vh - 200px);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[600]} 50%, ${colors.secondary[500]} 100%);
  background-image: ${traditionalTheme.patterns.cloud};
  border-radius: 16px;
  padding: 80px 40px;
  text-align: center;
  color: white;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
    pointer-events: none;
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 60px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const HeroTitle = styled(Title)`
  &.ant-typography {
    color: white !important;
    font-family: 'Noto Serif SC', serif;
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 16px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    
    @media (max-width: 768px) {
      font-size: 36px;
    }
    
    @media (max-width: 480px) {
      font-size: 28px;
    }
  }
`;

const HeroSubtitle = styled(Paragraph)`
  &.ant-typography {
    color: rgba(255,255,255,0.9) !important;
    font-size: 18px;
    margin-bottom: 32px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const FeaturesSection = styled.section`
  margin: 60px 0;
  
  .section-title {
    text-align: center;
    margin-bottom: 40px;
    
    h2 {
      font-family: 'Noto Serif SC', serif;
      color: ${colors.gray[900]};
      margin-bottom: 16px;
    }
    
    p {
      color: ${colors.gray[600]};
      font-size: 16px;
      max-width: 600px;
      margin: 0 auto;
    }
  }
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, ${colors.gray[50]} 0%, white 100%);
  border-radius: 16px;
  padding: 40px;
  margin: 60px 0;
  
  .stats-title {
    text-align: center;
    margin-bottom: 32px;
    
    h3 {
      font-family: 'Noto Serif SC', serif;
      color: ${colors.gray[900]};
      margin-bottom: 8px;
    }
    
    p {
      color: ${colors.gray[600]};
    }
  }
`;

const QuickActions = styled.section`
  background: ${traditionalTheme.gradients.dawn};
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  margin: 60px 0;
  
  .actions-title {
    color: ${colors.primary[800]};
    font-family: 'Noto Serif SC', serif;
    margin-bottom: 24px;
  }
  
  .actions-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
`;

// 功能特色数据
const features = [
  {
    title: '八字排盘',
    description: '基于传统八字理论，精准排出四柱八字，分析五行生克、十神关系、用神喜忌等，提供全面的命理分析。',
    icon: <CalendarOutlined />,
    path: '/bazi'
  },
  {
    title: '六爻起卦',
    description: '采用正宗的六爻理论，支持时间起卦、数字起卦、铜钱起卦等多种方式，提供专业的断卦指导。',
    icon: <ThunderboltOutlined />,
    path: '/liuyao'
  },
  {
    title: '占星排盘',
    description: '结合西方占星学精华，精准计算星盘位置，分析行星相位、宫位含义，提供深入的性格和运势分析。',
    icon: <StarOutlined />,
    path: '/astrology'
  }
];

// 统计数据
const stats = [
  {
    title: '用户总数',
    value: '50,000+',
    icon: <UserOutlined />,
    color: colors.primary[500]
  },
  {
    title: '日测算次数',
    value: '10,000+',
    icon: <ClockCircleOutlined />,
    color: colors.secondary[500]
  },
  {
    title: '准确率',
    value: '95%+',
    icon: <TrophyOutlined />,
    color: colors.success
  },
  {
    title: '服务天数',
    value: '1,500+',
    icon: <CalendarOutlined />,
    color: colors.info
  }
];

// 主页组件
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleFeatureClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <HomeContainer>
      {/* 英雄区域 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection>
          <div className="hero-content">
            <HeroTitle level={1}>六神算派</HeroTitle>
            <HeroSubtitle>
              融合中华传统数术智慧与现代科技，为您提供专业的命理占卜服务。
              无论是八字排盘、六爻起卦还是占星排盘，都能帮助您洞察命运走向。
            </HeroSubtitle>
            <Space size="large">
              <PrimaryButton 
                size="large" 
                onClick={() => navigate('/bazi')}
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                立即体验
              </PrimaryButton>
              <Button 
                size="large" 
                variant="ghost"
                onClick={() => navigate('/docs')}
                style={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                了解更多
              </Button>
            </Space>
          </div>
        </HeroSection>
      </motion.div>
      
      {/* 功能特色 */}
      <FeaturesSection>
        <div className="section-title">
          <Title level={2}>主要功能</Title>
          <Paragraph>
            三大核心功能模块，满足您对命理占卜的全方位需求
          </Paragraph>
        </div>
        
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} md={8} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  action={
                    <PrimaryButton onClick={() => handleFeatureClick(feature.path)}>
                      立即使用
                    </PrimaryButton>
                  }
                  onClick={() => handleFeatureClick(feature.path)}
                />
              </motion.div>
            </Col>
          ))}
        </Row>
      </FeaturesSection>
      
      {/* 统计数据 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <StatsSection>
          <div className="stats-title">
            <Title level={3}>平台数据</Title>
            <Paragraph>用数据证明我们的专业与可靠</Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={stat.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <StatCard
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </StatsSection>
      </motion.div>
      
      {/* 快速操作 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <QuickActions>
          <Title level={3} className="actions-title">
            选择您的占卜方式
          </Title>
          <div className="actions-buttons">
            <Button 
              size="large" 
              variant="outline"
              icon={<CalendarOutlined />}
              onClick={() => navigate('/bazi')}
            >
              八字排盘
            </Button>
            <Button 
              size="large" 
              variant="outline"
              icon={<ThunderboltOutlined />}
              onClick={() => navigate('/liuyao')}
            >
              六爻起卦
            </Button>
            <Button 
              size="large" 
              variant="outline"
              icon={<StarOutlined />}
              onClick={() => navigate('/astrology')}
            >
              占星排盘
            </Button>
          </div>
        </QuickActions>
      </motion.div>
    </HomeContainer>
  );
};

export default HomePage;