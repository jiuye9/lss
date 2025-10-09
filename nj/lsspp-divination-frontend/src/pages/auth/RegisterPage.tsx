import React from 'react';
import { Typography, Space } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const RegisterPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <UserAddOutlined style={{ fontSize: '64px', color: '#ef4444', marginBottom: '16px' }} />
          <Title level={2}>用户注册</Title>
          <Paragraph>
            注册功能正在开发中，即将上线。请耐心等待。
          </Paragraph>
        </div>
      </Space>
    </div>
  );
};

export default RegisterPage;