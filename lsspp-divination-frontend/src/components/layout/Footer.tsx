import React from 'react';
import { Layout, Typography, Space, Divider } from 'antd';
import { 
  GithubOutlined, 
  WechatOutlined, 
  MailOutlined,
  PhoneOutlined,
  CopyrightOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

import { colors } from '@/styles/theme';
import { useTheme } from '@/hooks/useTheme';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

// 样式化组件
const StyledFooter = styled(AntFooter)`
  background: #ffffff;
  border-top: 1px solid ${colors.gray[200]};
  padding: 32px 24px 16px;
  margin-top: auto;
  
  &[data-theme="dark"] {
    background: ${colors.gray[800]};
    border-top-color: ${colors.gray[700]};
  }
  
  @media (max-width: 768px) {
    padding: 24px 16px 12px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[900]};
  margin-bottom: 12px;
  display: block;
  
  &[data-theme="dark"] {
    color: ${colors.gray[100]};
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  .footer-link {
    color: ${colors.gray[600]};
    transition: color 0.2s ease;
    
    &:hover {
      color: ${colors.primary[500]};
    }
  }
  
  &[data-theme="dark"] .footer-link {
    color: ${colors.gray[400]};
    
    &:hover {
      color: ${colors.primary[400]};
    }
  }
`;

const ContactInfo = styled.div`
  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    color: ${colors.gray[600]};
    
    .anticon {
      color: ${colors.primary[500]};
    }
  }
  
  &[data-theme="dark"] .contact-item {
    color: ${colors.gray[400]};
    
    .anticon {
      color: ${colors.primary[400]};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: ${colors.gray[100]};
    color: ${colors.gray[600]};
    transition: all 0.2s ease;
    
    &:hover {
      background: ${colors.primary[500]};
      color: white;
      transform: translateY(-2px);
    }
  }
  
  &[data-theme="dark"] .social-link {
    background: ${colors.gray[700]};
    color: ${colors.gray[400]};
    
    &:hover {
      background: ${colors.primary[600]};
      color: white;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid ${colors.gray[200]};
  color: ${colors.gray[500]};
  font-size: 14px;
  
  &[data-theme="dark"] {
    border-top-color: ${colors.gray[700]};
    color: ${colors.gray[400]};
  }
  
  .copyright-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex-wrap: wrap;
  }
`;

// 底部组件
const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <StyledFooter data-theme={theme.mode}>
      <FooterContent>
        <FooterSection>
          {/* 产品介绍 */}
          <div>
            <SectionTitle data-theme={theme.mode}>产品介绍</SectionTitle>
            <LinkList data-theme={theme.mode}>
              <Link href="/bazi" className="footer-link">八字排盘</Link>
              <Link href="/liuyao" className="footer-link">六爻起卦</Link>
              <Link href="/astrology" className="footer-link">占星排盘</Link>
              <Link href="/features" className="footer-link">功能特色</Link>
            </LinkList>
          </div>
          
          {/* 帮助中心 */}
          <div>
            <SectionTitle data-theme={theme.mode}>帮助中心</SectionTitle>
            <LinkList data-theme={theme.mode}>
              <Link href="/docs" className="footer-link">使用指南</Link>
              <Link href="/faq" className="footer-link">常见问题</Link>
              <Link href="/tutorials" className="footer-link">教程说明</Link>
              <Link href="/support" className="footer-link">技术支持</Link>
            </LinkList>
          </div>
          
          {/* 关于我们 */}
          <div>
            <SectionTitle data-theme={theme.mode}>关于我们</SectionTitle>
            <LinkList data-theme={theme.mode}>
              <Link href="/about" className="footer-link">公司介绍</Link>
              <Link href="/team" className="footer-link">团队介绍</Link>
              <Link href="/privacy" className="footer-link">隐私政策</Link>
              <Link href="/terms" className="footer-link">服务条款</Link>
            </LinkList>
          </div>
          
          {/* 联系方式 */}
          <div>
            <SectionTitle data-theme={theme.mode}>联系方式</SectionTitle>
            <ContactInfo data-theme={theme.mode}>
              <div className="contact-item">
                <MailOutlined />
                <Text>contact@lsspp.com</Text>
              </div>
              <div className="contact-item">
                <PhoneOutlined />
                <Text>400-888-8888</Text>
              </div>
              <div className="contact-item">
                <WechatOutlined />
                <Text>微信客服：lsspp-service</Text>
              </div>
              
              {/* 社交媒体链接 */}
              <SocialLinks data-theme={theme.mode}>
                <Link href="https://github.com/lsspp" className="social-link">
                  <GithubOutlined />
                </Link>
                <Link href="#" className="social-link">
                  <WechatOutlined />
                </Link>
                <Link href="mailto:contact@lsspp.com" className="social-link">
                  <MailOutlined />
                </Link>
              </SocialLinks>
            </ContactInfo>
          </div>
        </FooterSection>
        
        {/* 版权信息 */}
        <Copyright data-theme={theme.mode}>
          <div className="copyright-text">
            <CopyrightOutlined />
            <Text>{currentYear} 六神算派科技有限公司。保留所有权利。</Text>
          </div>
          <div style={{ marginTop: '8px' }}>
            <Space split={<Divider type="vertical" />}>
              <Text type="secondary">京ICP备17001234号</Text>
              <Text type="secondary">京公网安备11010802012345号</Text>
              <Text type="secondary">版本 v1.0.0</Text>
            </Space>
          </div>
        </Copyright>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;