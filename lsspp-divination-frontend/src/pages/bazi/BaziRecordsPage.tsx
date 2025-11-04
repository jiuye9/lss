import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Typography,
  Space,
  Tag,
  Modal,
  message,
  Spin
} from 'antd';
import { CalendarOutlined, EyeOutlined, HistoryOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

// 样式化组件
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
`;

const ContentCard = styled(Card)`
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .ant-card-head {
    border-bottom: 2px solid #f0f0f0;
    background: linear-gradient(90deg, #ffd89b 0%, #19547b 100%);

    .ant-card-head-title {
      color: white;
      font-weight: bold;
      font-size: 24px;
    }
  }
`;

// 接口定义
interface BaziRecord {
  id: string;
  name: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  gender: string;
  lunarCalendar: boolean;
  yearColumn: string;
  monthColumn: string;
  dayColumn: string;
  hourColumn: string;
  createdAt: string;
}

interface PaginationData {
  current: number;
  pageSize: number;
  total: number;
}

const BaziRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<BaziRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    pageSize: 20,
    total: 0
  });

  // 加载记录列表
  const loadRecords = async (page: number = 1, pageSize: number = 20) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/bazi/records?page=${page}&pageSize=${pageSize}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        // 转换后端数据格式到前端期望的格式
        const formattedRecords = result.data.map((item: any) => {
          // 判断是农历还是公历
          const isLunar = !!item.birthDateLunar;
          const dateStr = isLunar ? item.birthDateLunar : item.birthDateSolar;
          const [birthYear, birthMonth, birthDay] = dateStr.split('-').map(Number);

          return {
            id: item.id,
            name: item.name,
            birthYear,
            birthMonth,
            birthDay,
            birthHour: item.birthHour,
            gender: item.gender,
            lunarCalendar: isLunar,
            yearColumn: `${item.bazi.yearColumn.gan}${item.bazi.yearColumn.zhi}`,
            monthColumn: `${item.bazi.monthColumn.gan}${item.bazi.monthColumn.zhi}`,
            dayColumn: `${item.bazi.dayColumn.gan}${item.bazi.dayColumn.zhi}`,
            hourColumn: `${item.bazi.hourColumn.gan}${item.bazi.hourColumn.zhi}`,
            createdAt: item.createdAt
          };
        });

        setRecords(formattedRecords);
        setPagination({
          current: result.pagination?.page || page,
          pageSize: result.pagination?.pageSize || pageSize,
          total: result.pagination?.total || 0
        });
      } else {
        setRecords([]);
        message.warning('暂无记录');
      }
    } catch (error) {
      console.error('加载记录失败:', error);
      message.error('加载记录失败');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadRecords();
  }, []);

  // 处理分页变化
  const handleTableChange = (newPagination: any) => {
    loadRecords(newPagination.current, newPagination.pageSize);
  };

  // 查看排盘详情
  const handleView = (recordId: string) => {
    navigate(`/bazi?recordId=${recordId}`);
  };

  // 删除记录
  const handleDelete = (recordId: string, recordName: string) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除 "${recordName}" 的排盘记录吗？此操作不可恢复。`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/bazi/record/${recordId}`, {
            method: 'DELETE'
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          if (result.success) {
            message.success('记录已删除');
            // 重新加载当前页数据
            loadRecords(pagination.current, pagination.pageSize);
          } else {
            message.error(result.message || '删除失败');
          }
        } catch (error) {
          console.error('删除记录失败:', error);
          message.error('删除记录失败');
        }
      }
    });
  };

  // 表格列定义
  const columns: ColumnsType<BaziRecord> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (name: string) => (
        <Text strong style={{ fontSize: 14 }}>{name}</Text>
      )
    },
    {
      title: '出生日期',
      key: 'birthDate',
      width: 200,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text>
            {record.birthYear}年{record.birthMonth}月{record.birthDay}日 {record.birthHour}时
          </Text>
          <Tag color={record.lunarCalendar ? 'orange' : 'blue'} style={{ fontSize: 11 }}>
            {record.lunarCalendar ? '农历' : '公历'}
          </Tag>
        </Space>
      )
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender: string) => (
        <Tag color={gender === 'MALE' ? 'blue' : 'pink'}>
          {gender === 'MALE' ? '男' : '女'}
        </Tag>
      )
    },
    {
      title: '八字四柱',
      key: 'bazi',
      width: 280,
      render: (_, record) => (
        <Space size="small">
          <Tag color="purple" style={{ fontSize: 13, padding: '2px 8px' }}>
            {record.yearColumn}
          </Tag>
          <Tag color="blue" style={{ fontSize: 13, padding: '2px 8px' }}>
            {record.monthColumn}
          </Tag>
          <Tag color="green" style={{ fontSize: 13, padding: '2px 8px' }}>
            {record.dayColumn}
          </Tag>
          <Tag color="orange" style={{ fontSize: 13, padding: '2px 8px' }}>
            {record.hourColumn}
          </Tag>
        </Space>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (createdAt: string) => (
        <Text type="secondary">
          {new Date(createdAt).toLocaleString('zh-CN')}
        </Text>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record.id)}
          >
            查看
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id, record.name)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  return (
    <PageContainer>
      <ContentCard
        title={
          <Space>
            <HistoryOutlined />
            八字排盘记录
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<CalendarOutlined />}
            onClick={() => navigate('/bazi')}
          >
            新建排盘
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={records}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
        />
      </ContentCard>
    </PageContainer>
  );
};

export default BaziRecordsPage;
