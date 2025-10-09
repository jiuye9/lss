import React from 'react';
import { Typography, Space } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <LoginOutlined style={{ fontSize: '64px', color: '#f59e0b', marginBottom: '16px' }} />
          <Title level={2}>用户登录</Title>
          <Paragraph>
            登录功能正在开发中，即将上线。请耐心等待。
          </Paragraph>
        </div>
      </Space>
    </div>
  );
};

export default LoginPage;