import React from 'react';
import { Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ProfilePage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <UserOutlined style={{ fontSize: '64px', color: '#10b981', marginBottom: '16px' }} />
          <Title level={2}>个人中心</Title>
          <Paragraph>
            个人中心功能正在开发中，即将上线。请耐心等待。
          </Paragraph>
        </div>
      </Space>
    </div>
  );
};

export default ProfilePage;