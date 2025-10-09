import React from 'react';
import { Typography, Space } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HistoryPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <HistoryOutlined style={{ fontSize: '64px', color: '#8b5cf6', marginBottom: '16px' }} />
          <Title level={2}>历史记录</Title>
          <Paragraph>
            历史记录功能正在开发中，即将上线。请耐心等待。
          </Paragraph>
        </div>
      </Space>
    </div>
  );
};

export default HistoryPage;