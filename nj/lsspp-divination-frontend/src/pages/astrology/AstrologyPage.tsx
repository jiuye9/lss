import React, { useState } from 'react';
import {
  Card,
  Form,
  DatePicker,
  TimePicker,
  Select,
  Input,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  Tag,
  Alert,
  Spin,
  message,
  Table
} from 'antd';
import { StarOutlined, FireOutlined, LoadingOutlined, CompassOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// 样式化组件
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
`;

const ContentCard = styled(Card)`
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .ant-card-head {
    border-bottom: 2px solid #f0f0f0;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);

    .ant-card-head-title {
      color: white;
      font-weight: bold;
      font-size: 24px;
    }
  }
`;

const FormCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;

  .ant-card-head {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px 12px 0 0;

    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
  }
`;

const ResultCard = styled(Card)`
  border-radius: 12px;

  .ant-card-head {
    background: linear-gradient(90deg, #ffd89b 0%, #19547b 100%);
    border-radius: 12px 12px 0 0;

    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
  }
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 4px;
  width: 400px;
  height: 400px;
  margin: 20px auto;
  border: 3px solid #667eea;
  border-radius: 8px;
`;

const Palace = styled.div<{ position: string }>`
  border: 1px solid #d9d9d9;
  padding: 8px;
  text-align: center;
  font-size: 12px;
  background: ${props =>
    props.position === 'ming' ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
    props.position === 'shen' ? 'linear-gradient(135deg, #87CEEB, #4682B4)' :
    '#f5f5f5'
  };
  color: ${props => ['ming', 'shen'].includes(props.position) ? 'white' : '#333'};
  font-weight: ${props => ['ming', 'shen'].includes(props.position) ? 'bold' : 'normal'};

  .palace-name {
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 10px;
  }

  .main-stars {
    margin: 2px 0;
    font-size: 11px;
  }

  .sub-stars {
    font-size: 9px;
    color: #666;
  }
`;

// 接口定义
interface ZiWeiInput {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  birthMinute: number;
  gender: string;
  isLunar: boolean;
  timezone: string;
  birthPlace?: string;
}

interface PalaceData {
  name: string;
  position: number;
  mainStars: string[];
  subStars: string[];
  sihua: string[];
  isMainPalace?: boolean;
  isBodyPalace?: boolean;
}

interface ZiWeiResult {
  palaces: PalaceData[];
  mainPalacePosition: number;
  bodyPalacePosition: number;
  analysis: {
    personality: string;
    career: string;
    wealth: string;
    marriage: string;
    health: string;
  };
  majorStars: {
    ziwei: number;
    tianfu: number;
    taiyang: number;
    taiyin: number;
  };
  suggestions: string[];
}

const AstrologyPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ZiWeiResult | null>(null);

  // 十二宫位名称
  const palaceNames = [
    '命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄',
    '迁移', '奴仆', '官禄', '田宅', '福德', '父母'
  ];

  // 提交表单
  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const birthDate = values.birthDate;
      const birthTime = values.birthTime;

      const ziWeiInput = {
        divinationType: 'ZIWEI',
        birthYear: birthDate.year(),
        birthMonth: birthDate.month() + 1,
        birthDay: birthDate.date(),
        birthHour: birthTime ? birthTime.hour() : 0,
        birthMinute: birthTime ? birthTime.minute() : 0,
        gender: values.gender,
        lunarCalendar: values.calendar === 'lunar',
        timezone: values.timezone || 'Asia/Shanghai',
        birthPlace: values.birthPlace
      };

      console.log('提交紫微斗数计算请求:', ziWeiInput);

      // 调用后端API
      const response = await fetch('http://localhost:8080/api/divination/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ziWeiInput)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('紫微斗数计算结果:', data);

      setResult(data);
      message.success('紫微斗数排盘计算完成！');

    } catch (error) {
      console.error('紫微斗数计算失败:', error);
      message.error('紫微斗数计算失败，请检查输入信息或稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 渲染十二宫图
  const renderChart = () => {
    if (!result) return null;

    // 按照紫微斗数标准排列顺序
    const positions = [
      4, 3, 2,     // 巳宫(5) 辰宫(4) 卯宫(3)
      5, -1, 1,    // 午宫(6) 中心    寅宫(2)
      6, 7, 8,     // 未宫(7) 申宫(8) 酉宫(9)
      9, 10, 11    // 戌宫(10) 亥宫(11) 子宫(12/0)
    ];

    return (
      <ChartContainer>
        {positions.map((pos, index) => {
          if (pos === -1) {
            // 中心位置
            return (
              <div key={index} style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                <div>紫微斗数</div>
                <div>命盘</div>
              </div>
            );
          }

          const palace = result.palaces[pos];
          const isMainPalace = pos === result.mainPalacePosition;
          const isBodyPalace = pos === result.bodyPalacePosition;

          let position = '';
          if (isMainPalace && isBodyPalace) position = 'ming-shen';
          else if (isMainPalace) position = 'ming';
          else if (isBodyPalace) position = 'shen';

          return (
            <Palace key={index} position={position}>
              <div className="palace-name">
                {palace.name}
                {isMainPalace && <span style={{ color: '#FFD700' }}>命</span>}
                {isBodyPalace && <span style={{ color: '#87CEEB' }}>身</span>}
              </div>
              <div className="main-stars">
                {palace.mainStars.slice(0, 2).map(star => (
                  <Tag key={star} size="small" style={{ margin: '1px', fontSize: '9px' }}>
                    {star}
                  </Tag>
                ))}
              </div>
              <div className="sub-stars">
                {palace.subStars.slice(0, 3).join(' ')}
              </div>
            </Palace>
          );
        })}
      </ChartContainer>
    );
  };

  // 渲染分析结果
  const renderAnalysis = () => {
    if (!result) return null;

    const analysisData = [
      { key: '性格特质', value: result.analysis.personality },
      { key: '事业发展', value: result.analysis.career },
      { key: '财富状况', value: result.analysis.wealth },
      { key: '婚姻感情', value: result.analysis.marriage },
      { key: '健康状况', value: result.analysis.health },
    ];

    const columns = [
      {
        title: '分析项目',
        dataIndex: 'key',
        key: 'key',
        width: 100,
      },
      {
        title: '详细分析',
        dataIndex: 'value',
        key: 'value',
      },
    ];

    return (
      <ResultCard title={
        <Space>
          <FireOutlined />
          紫微斗数排盘结果
        </Space>
      }>
        {renderChart()}

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card size="small" title="主要星曜位置">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text><Tag color="purple">紫微星</Tag>第{result.majorStars.ziwei + 1}宫</Text>
                <Text><Tag color="blue">天府星</Tag>第{result.majorStars.tianfu + 1}宫</Text>
                <Text><Tag color="orange">太阳星</Tag>第{result.majorStars.taiyang + 1}宫</Text>
                <Text><Tag color="cyan">太阴星</Tag>第{result.majorStars.taiyin + 1}宫</Text>
              </Space>
            </Card>
          </Col>

          <Col span={12}>
            <Card size="small" title="宫位信息">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text><Tag color="gold">命宫</Tag>{palaceNames[result.mainPalacePosition]}</Text>
                <Text><Tag color="blue">身宫</Tag>{palaceNames[result.bodyPalacePosition]}</Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Card size="small" title="命理分析" style={{ marginBottom: 16 }}>
          <Table
            dataSource={analysisData}
            columns={columns}
            pagination={false}
            size="small"
            bordered
          />
        </Card>

        <Card size="small" title="人生建议">
          <Space direction="vertical" style={{ width: '100%' }}>
            {result.suggestions.map((suggestion, index) => (
              <Alert
                key={index}
                message={`建议 ${index + 1}`}
                description={suggestion}
                type="info"
                showIcon
              />
            ))}
          </Space>
        </Card>
      </ResultCard>
    );
  };

  return (
    <PageContainer>
      <ContentCard
        title={
          <Space>
            <StarOutlined />
            紫微斗数排盘系统
          </Space>
        }
      >
        <FormCard title={
          <Space>
            <CompassOutlined />
            基本信息
          </Space>
        }>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              gender: 'male',
              calendar: 'solar',
              timezone: 'Asia/Shanghai'
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="出生日期"
                  name="birthDate"
                  rules={[{ required: true, message: '请选择出生日期' }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder="选择出生日期"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="出生时间"
                  name="birthTime"
                  rules={[{ required: true, message: '请选择出生时间' }]}
                >
                  <TimePicker
                    style={{ width: '100%' }}
                    placeholder="选择出生时间"
                    format="HH:mm"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="性别"
                  name="gender"
                  rules={[{ required: true, message: '请选择性别' }]}
                >
                  <Select>
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="历法"
                  name="calendar"
                  rules={[{ required: true, message: '请选择历法' }]}
                >
                  <Select>
                    <Option value="solar">公历</Option>
                    <Option value="lunar">农历</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="时区"
                  name="timezone"
                >
                  <Select>
                    <Option value="Asia/Shanghai">北京时间 (UTC+8)</Option>
                    <Option value="Asia/Hong_Kong">香港时间 (UTC+8)</Option>
                    <Option value="Asia/Taipei">台北时间 (UTC+8)</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="出生地点（可选）"
                  name="birthPlace"
                >
                  <Input placeholder="如：北京市" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item style={{ marginTop: 16, textAlign: 'center' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    style={{ minWidth: '200px' }}
                  >
                    {loading ? <LoadingOutlined /> : <StarOutlined />}
                    开始排盘
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </FormCard>

        {loading && (
          <Alert
            message="正在计算紫微斗数..."
            description="请稍等，系统正在进行精确的紫微斗数排盘计算。"
            type="info"
            showIcon
            icon={<Spin />}
            style={{ marginBottom: 24 }}
          />
        )}

        {renderAnalysis()}
      </ContentCard>
    </PageContainer>
  );
};

export default AstrologyPage;