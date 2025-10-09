import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
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
  message,
  Tabs,
  Radio
} from 'antd';
import { ThunderboltOutlined, FireOutlined, LoadingOutlined, ClockCircleOutlined, CalculatorOutlined, SelectOutlined, DollarOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

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
    background: linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%);

    .ant-card-head-title {
      color: #333;
      font-weight: bold;
      font-size: 24px;
    }
  }
`;

const MethodCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  height: 100%;

  .ant-card-head {
    background: linear-gradient(90deg, #a8edea 0%, #fed6e3 100%);
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
    background: linear-gradient(90deg, #ffd89b 0%, #19547b 100%);
    border-radius: 12px 12px 0 0;

    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
  }
`;

const HexagramDisplay = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
`;

const HexagramColumn = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  min-width: 200px;

  .hexagram-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .hexagram-lines {
    margin: 16px 0;
  }

  .line {
    height: 8px;
    margin: 6px 0;
    border-radius: 4px;
    position: relative;

    &.yang {
      background: #FFD700;
    }

    &.yin {
      background: #87CEEB;
      &::before, &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 45%;
        height: 100%;
        background: #87CEEB;
      }
      &::before { left: 0; }
      &::after { right: 0; }
      background: transparent;
    }

    &.changing {
      box-shadow: 0 0 8px #ff6b6b;
    }
  }
`;

const GuaSelector = styled.div`
  .gua-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin: 16px 0;
  }

  .gua-option {
    padding: 12px;
    border: 2px solid #d9d9d9;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: #1890ff;
      background: #e6f7ff;
    }

    &.selected {
      border-color: #1890ff;
      background: #1890ff;
      color: white;
    }
  }
`;

// 八卦选项
const baguaOptions = [
  { value: 'qian', label: '乾', symbol: '☰' },
  { value: 'dui', label: '兑', symbol: '☱' },
  { value: 'li', label: '离', symbol: '☲' },
  { value: 'zhen', label: '震', symbol: '☳' },
  { value: 'xun', label: '巽', symbol: '☴' },
  { value: 'kan', label: '坎', symbol: '☵' },
  { value: 'gen', label: '艮', symbol: '☶' },
  { value: 'kun', label: '坤', symbol: '☷' }
];

// 接口定义
interface LiuyaoInput {
  method: 'time' | 'number' | 'coin' | 'manual';
  upperGua?: string;
  lowerGua?: string;
  changingLine?: number;
  firstNumber?: number;
  secondNumber?: number;
  question?: string;
}

interface LiuyaoResult {
  originalHexagram: {
    name: string;
    lines: string[];
    interpretation: string;
  };
  changedHexagram?: {
    name: string;
    lines: string[];
    interpretation: string;
  };
  changingLine: number;
  worldLine: number;
  responseLine: number;
  analysis: {
    sixRelatives: string[];
    sixAnimals: string[];
    elements: string[];
  };
  prediction: string;
}

const LiuyaoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('time');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LiuyaoResult | null>(null);
  const [upperGua, setUpperGua] = useState('');
  const [lowerGua, setLowerGua] = useState('');

  // 提交起卦
  const handleSubmit = async (method: string, values: any) => {
    setLoading(true);

    try {
      const liuyaoInput = {
        divinationType: 'LIUYAO',
        method: method,
        ...values
      };

      if (method === 'manual') {
        liuyaoInput.upperGua = upperGua;
        liuyaoInput.lowerGua = lowerGua;
      }

      console.log('提交六爻起卦请求:', liuyaoInput);

      // 调用后端API
      const response = await fetch('http://localhost:8080/api/divination/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(liuyaoInput)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('六爻起卦结果:', data);

      setResult(data);
      message.success('六爻起卦完成！');

    } catch (error) {
      console.error('六爻起卦失败:', error);
      message.error('六爻起卦失败，请检查输入信息或稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 时间起卦
  const TimeMethod = () => (
    <MethodCard title={<Space><ClockCircleOutlined />时间起卦法</Space>}>
      <Alert
        message="时间起卦法说明"
        description="根据当前农历时间自动计算卦象，适合即时占卜。系统将根据农历年月日时自动生成卦象。"
        type="info"
        style={{ marginBottom: 16 }}
      />

      <Form layout="vertical">
        <Form.Item label="占卜问题" name="question">
          <Input.TextArea
            placeholder="请输入您要占卜的问题..."
            rows={3}
            maxLength={200}
          />
        </Form.Item>

        <Button
          type="primary"
          size="large"
          onClick={() => handleSubmit('time', { question: form.getFieldValue('question') })}
          loading={loading}
          style={{ width: '100%' }}
        >
          <ClockCircleOutlined />
          时间起卦
        </Button>
      </Form>
    </MethodCard>
  );

  // 数字起卦
  const NumberMethod = () => (
    <MethodCard title={<Space><CalculatorOutlined />数字起卦法</Space>}>
      <Alert
        message="数字起卦法说明"
        description="输入两个数字，第一个数字除8余数作为上卦，第二个数除8余数为下卦，两数之和除6取余数为动爻。"
        type="info"
        style={{ marginBottom: 16 }}
      />

      <Form layout="vertical" onFinish={(values) => handleSubmit('number', values)}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="第一个数字"
              name="firstNumber"
              rules={[{ required: true, message: '请输入第一个数字' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={999}
                placeholder="1-999"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="第二个数字"
              name="secondNumber"
              rules={[{ required: true, message: '请输入第二个数字' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={999}
                placeholder="1-999"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="占卜问题" name="question">
          <Input.TextArea
            placeholder="请输入您要占卜的问题..."
            rows={3}
            maxLength={200}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          style={{ width: '100%' }}
        >
          <CalculatorOutlined />
          数字起卦
        </Button>
      </Form>
    </MethodCard>
  );

  // 铜钱起卦
  const CoinMethod = () => (
    <MethodCard title={<Space><DollarOutlined />铜钱起卦法</Space>}>
      <Alert
        message="铜钱起卦法说明"
        description="传统的铜钱起卦方法，系统将模拟投掷三枚铜钱六次，根据正反面组合确定每一爻的阴阳属性。"
        type="info"
        style={{ marginBottom: 16 }}
      />

      <Form layout="vertical">
        <Form.Item label="占卜问题" name="question">
          <Input.TextArea
            placeholder="请输入您要占卜的问题..."
            rows={3}
            maxLength={200}
          />
        </Form.Item>

        <Button
          type="primary"
          size="large"
          onClick={() => handleSubmit('coin', { question: form.getFieldValue('question') })}
          loading={loading}
          style={{ width: '100%' }}
        >
          <DollarOutlined />
          铜钱起卦
        </Button>
      </Form>
    </MethodCard>
  );

  // 指定卦
  const ManualMethod = () => (
    <MethodCard title={<Space><SelectOutlined />指定卦象</Space>}>
      <Alert
        message="指定卦象说明"
        description="手动选择上卦、下卦和动爻位置，适合有特定卦象需求的情况。"
        type="info"
        style={{ marginBottom: 16 }}
      />

      <Form layout="vertical" onFinish={(values) => handleSubmit('manual', values)}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="上卦">
              <GuaSelector>
                <div className="gua-grid">
                  {baguaOptions.map(gua => (
                    <div
                      key={gua.value}
                      className={`gua-option ${upperGua === gua.value ? 'selected' : ''}`}
                      onClick={() => setUpperGua(gua.value)}
                    >
                      <div>{gua.symbol}</div>
                      <div>{gua.label}</div>
                    </div>
                  ))}
                </div>
              </GuaSelector>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="下卦">
              <GuaSelector>
                <div className="gua-grid">
                  {baguaOptions.map(gua => (
                    <div
                      key={gua.value}
                      className={`gua-option ${lowerGua === gua.value ? 'selected' : ''}`}
                      onClick={() => setLowerGua(gua.value)}
                    >
                      <div>{gua.symbol}</div>
                      <div>{gua.label}</div>
                    </div>
                  ))}
                </div>
              </GuaSelector>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="动爻位置"
          name="changingLine"
          rules={[{ required: true, message: '请选择动爻位置' }]}
        >
          <Radio.Group>
            <Radio value={1}>初爻</Radio>
            <Radio value={2}>二爻</Radio>
            <Radio value={3}>三爻</Radio>
            <Radio value={4}>四爻</Radio>
            <Radio value={5}>五爻</Radio>
            <Radio value={6}>上爻</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="占卜问题" name="question">
          <Input.TextArea
            placeholder="请输入您要占卜的问题..."
            rows={3}
            maxLength={200}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          style={{ width: '100%' }}
          disabled={!upperGua || !lowerGua}
        >
          <SelectOutlined />
          指定起卦
        </Button>
      </Form>
    </MethodCard>
  );

  // 渲染卦象结果
  const renderResult = () => {
    if (!result) return null;

    return (
      <ResultCard title={
        <Space>
          <FireOutlined />
          六爻卦象结果
        </Space>
      }>
        <HexagramDisplay>
          <HexagramColumn>
            <div className="hexagram-name">本卦</div>
            <div className="hexagram-name">{result.originalHexagram.name}</div>
            <div className="hexagram-lines">
              {result.originalHexagram.lines.map((line, index) => (
                <div
                  key={index}
                  className={`line ${line === '——' ? 'yang' : 'yin'} ${index === result.changingLine - 1 ? 'changing' : ''}`}
                />
              ))}
            </div>
          </HexagramColumn>

          {result.changedHexagram && (
            <>
              <div style={{ fontSize: '24px', color: 'white' }}>→</div>
              <HexagramColumn>
                <div className="hexagram-name">变卦</div>
                <div className="hexagram-name">{result.changedHexagram.name}</div>
                <div className="hexagram-lines">
                  {result.changedHexagram.lines.map((line, index) => (
                    <div
                      key={index}
                      className={`line ${line === '——' ? 'yang' : 'yin'}`}
                    />
                  ))}
                </div>
              </HexagramColumn>
            </>
          )}
        </HexagramDisplay>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card size="small" title="世应分析">
              <Space direction="vertical">
                <Text><Tag color="blue">世爻</Tag>第{result.worldLine}爻</Text>
                <Text><Tag color="green">应爻</Tag>第{result.responseLine}爻</Text>
                <Text><Tag color="red">动爻</Tag>第{result.changingLine}爻</Text>
              </Space>
            </Card>
          </Col>

          <Col span={8}>
            <Card size="small" title="六亲配置">
              <Space direction="vertical" style={{ width: '100%' }}>
                {result.analysis.sixRelatives.map((relative, index) => (
                  <Text key={index}>第{index + 1}爻：{relative}</Text>
                ))}
              </Space>
            </Card>
          </Col>

          <Col span={8}>
            <Card size="small" title="六神配置">
              <Space direction="vertical" style={{ width: '100%' }}>
                {result.analysis.sixAnimals.map((animal, index) => (
                  <Text key={index}>第{index + 1}爻：{animal}</Text>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Card size="small" title="卦象解析">
          <Paragraph>{result.originalHexagram.interpretation}</Paragraph>
          {result.changedHexagram && (
            <Paragraph>变卦解析：{result.changedHexagram.interpretation}</Paragraph>
          )}
        </Card>

        <Card size="small" title="占卜结果" style={{ marginTop: 16 }}>
          <Paragraph style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {result.prediction}
          </Paragraph>
        </Card>
      </ResultCard>
    );
  };

  return (
    <PageContainer>
      <ContentCard
        title={
          <Space>
            <ThunderboltOutlined />
            六爻起卦系统
          </Space>
        }
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<Space><ClockCircleOutlined />时间起卦</Space>} key="time">
            <TimeMethod />
          </TabPane>

          <TabPane tab={<Space><CalculatorOutlined />数字起卦</Space>} key="number">
            <NumberMethod />
          </TabPane>

          <TabPane tab={<Space><DollarOutlined />铜钱起卦</Space>} key="coin">
            <CoinMethod />
          </TabPane>

          <TabPane tab={<Space><SelectOutlined />指定卦象</Space>} key="manual">
            <ManualMethod />
          </TabPane>
        </Tabs>

        {loading && (
          <Alert
            message="正在起卦中..."
            description="请稍等，系统正在进行六爻起卦分析。"
            type="info"
            showIcon
            icon={<Spin />}
            style={{ margin: '24px 0' }}
          />
        )}

        {renderResult()}
      </ContentCard>
    </PageContainer>
  );
};

export default LiuyaoPage;