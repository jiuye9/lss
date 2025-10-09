import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  Tag,
  Alert,
  Spin,
  message
} from 'antd';
import { CalendarOutlined, FireOutlined, LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';

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
    background: linear-gradient(90deg, #ffd89b 0%, #19547b 100%);

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
    background: linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%);
    border-radius: 12px 12px 0 0;

    .ant-card-head-title {
      color: #333;
      font-weight: 600;
    }
  }
`;

const ResultCard = styled(Card)`
  border-radius: 12px;

  .ant-card-head {
    background: linear-gradient(90deg, #a8edea 0%, #fed6e3 100%);
    border-radius: 12px 12px 0 0;

    .ant-card-head-title {
      color: #333;
      font-weight: 600;
    }
  }
`;

const BaziGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 20px 0;
`;

const BaziColumn = styled.div`
  text-align: center;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: white;

  .column-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .gan-zhi {
    font-size: 20px;
    font-weight: bold;
    margin: 4px 0;
  }
`;

const WuXingTag = styled(Tag)`
  margin: 2px;
  padding: 4px 8px;
  font-weight: 500;
  border-radius: 16px;
`;

// 五行颜色映射
const wuxingColors: { [key: string]: string } = {
  '金': '#FFD700',
  '木': '#228B22',
  '水': '#0066CC',
  '火': '#FF4500',
  '土': '#CD853F'
};

// 接口定义
interface BaziInput {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  birthMinute: number;
  gender: string;
  isLunar: boolean;
  timezone: string;
}

interface BaziResult {
  yearColumn: { gan: string; zhi: string; wuxing: string };
  monthColumn: { gan: string; zhi: string; wuxing: string };
  dayColumn: { gan: string; zhi: string; wuxing: string };
  hourColumn: { gan: string; zhi: string; wuxing: string };
  dayMaster: string;
  dayMasterWuxing: string;
  wuxingAnalysis: {
    金: number;
    木: number;
    水: number;
    火: number;
    土: number;
  };
  yongshenAnalysis: {
    yongshen: string;
    xishen: string;
    jishen: string;
    chousen: string;
  };
  suggestion: {
    favorableColors: string[];
    favorableDirections: string[];
    favorableNumbers: number[];
    careerSuggestions: string[];
  };
}

const BaziPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BaziResult | null>(null);

  // 提交表单
  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const birthDate = values.birthDate;
      const birthTime = values.birthTime;

      const baziInput = {
        divinationType: 'BAZI',
        birthYear: birthDate.year(),
        birthMonth: birthDate.month() + 1,
        birthDay: birthDate.date(),
        birthHour: birthTime ? birthTime.hour() : 0,
        birthMinute: birthTime ? birthTime.minute() : 0,
        gender: values.gender,
        lunarCalendar: values.calendar === 'lunar',
        timezone: values.timezone || 'Asia/Shanghai'
      };

      console.log('提交八字计算请求:', baziInput);

      // 调用后端API
      const response = await fetch('http://localhost:8082/api/divination/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(baziInput)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('八字计算结果:', data);

      setResult(data);
      message.success('八字排盘计算完成！');

    } catch (error) {
      console.error('八字计算失败:', error);
      message.error('八字计算失败，请检查输入信息或稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 渲染八字结果
  const renderBaziResult = () => {
    if (!result) return null;

    return (
      <ResultCard title={
        <Space>
          <FireOutlined />
          八字排盘结果
        </Space>
      }>
        {/* 四柱展示 */}
        <BaziGrid>
          <BaziColumn>
            <div className="column-title">年柱</div>
            <div className="gan-zhi">{result.yearColumn.gan}{result.yearColumn.zhi}</div>
            <WuXingTag color={wuxingColors[result.yearColumn.wuxing]}>
              {result.yearColumn.wuxing}
            </WuXingTag>
          </BaziColumn>

          <BaziColumn>
            <div className="column-title">月柱</div>
            <div className="gan-zhi">{result.monthColumn.gan}{result.monthColumn.zhi}</div>
            <WuXingTag color={wuxingColors[result.monthColumn.wuxing]}>
              {result.monthColumn.wuxing}
            </WuXingTag>
          </BaziColumn>

          <BaziColumn>
            <div className="column-title">日柱</div>
            <div className="gan-zhi">{result.dayColumn.gan}{result.dayColumn.zhi}</div>
            <WuXingTag color={wuxingColors[result.dayColumn.wuxing]}>
              {result.dayColumn.wuxing}
            </WuXingTag>
          </BaziColumn>

          <BaziColumn>
            <div className="column-title">时柱</div>
            <div className="gan-zhi">{result.hourColumn.gan}{result.hourColumn.zhi}</div>
            <WuXingTag color={wuxingColors[result.hourColumn.wuxing]}>
              {result.hourColumn.wuxing}
            </WuXingTag>
          </BaziColumn>
        </BaziGrid>

        <Divider />

        {/* 日主分析 */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card size="small" title="日主分析">
              <Space direction="vertical">
                <Text strong>日主：<Tag color={wuxingColors[result.dayMasterWuxing]}>{result.dayMaster}</Tag></Text>
                <Text>五行属性：{result.dayMasterWuxing}</Text>
              </Space>
            </Card>
          </Col>

          <Col span={12}>
            <Card size="small" title="五行统计">
              <Space wrap>
                {Object.entries(result.wuxingAnalysis).map(([element, count]) => (
                  <WuXingTag key={element} color={wuxingColors[element]}>
                    {element}: {count}
                  </WuXingTag>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* 用神分析 */}
        <Card size="small" title="用神分析" style={{ marginBottom: 16 }}>
          <Row gutter={[16, 8]}>
            <Col span={6}>
              <Text strong>用神：</Text>
              <Tag color="green">{result.yongshenAnalysis.yongshen}</Tag>
            </Col>
            <Col span={6}>
              <Text strong>喜神：</Text>
              <Tag color="blue">{result.yongshenAnalysis.xishen}</Tag>
            </Col>
            <Col span={6}>
              <Text strong>忌神：</Text>
              <Tag color="red">{result.yongshenAnalysis.jishen}</Tag>
            </Col>
            <Col span={6}>
              <Text strong>仇神：</Text>
              <Tag color="orange">{result.yongshenAnalysis.chousen}</Tag>
            </Col>
          </Row>
        </Card>

        {/* 调理建议 */}
        <Card size="small" title="调理建议">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div>
                <Text strong>有利颜色：</Text>
                <div style={{ marginTop: 8 }}>
                  {result.suggestion.favorableColors.map(color => (
                    <Tag key={color} color={color.toLowerCase()}>{color}</Tag>
                  ))}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div>
                <Text strong>有利方位：</Text>
                <div style={{ marginTop: 8 }}>
                  {result.suggestion.favorableDirections.map(direction => (
                    <Tag key={direction}>{direction}</Tag>
                  ))}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div>
                <Text strong>有利数字：</Text>
                <div style={{ marginTop: 8 }}>
                  {result.suggestion.favorableNumbers.map(number => (
                    <Tag key={number}>{number}</Tag>
                  ))}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div>
                <Text strong>职业建议：</Text>
                <div style={{ marginTop: 8 }}>
                  {result.suggestion.careerSuggestions.map(career => (
                    <Tag key={career} color="purple">{career}</Tag>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </ResultCard>
    );
  };

  return (
    <PageContainer>
      <ContentCard
        title={
          <Space>
            <CalendarOutlined />
            八字排盘系统
          </Space>
        }
      >
        <FormCard title="基本信息">
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
                <Form.Item style={{ marginTop: 30 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    style={{ width: '100%' }}
                  >
                    {loading ? <LoadingOutlined /> : <CalendarOutlined />}
                    开始排盘
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </FormCard>

        {loading && (
          <Alert
            message="正在计算八字..."
            description="请稍等，系统正在进行精确的八字排盘计算。"
            type="info"
            showIcon
            icon={<Spin />}
            style={{ marginBottom: 24 }}
          />
        )}

        {renderBaziResult()}
      </ContentCard>
    </PageContainer>
  );
};

export default BaziPage;