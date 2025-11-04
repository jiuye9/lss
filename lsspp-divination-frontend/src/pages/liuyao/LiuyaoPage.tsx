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
import { ThunderboltOutlined, FireOutlined, ClockCircleOutlined, CalculatorOutlined, SelectOutlined, DollarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import './LiuyaoStyles.css';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

// 星空背景动画关键帧
const starKeyframes = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(126, 190, 171, 0.5); }
    50% { box-shadow: 0 0 40px rgba(126, 190, 171, 0.8), 0 0 60px rgba(165, 214, 199, 0.6); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
`;

// 样式化组件
const PageContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(ellipse at top, #182e28 0%, #0a1614 100%),
    radial-gradient(ellipse at bottom, #1a3430 0%, #0a1614 100%);
  position: relative;
  padding: 24px;
  overflow: hidden;

  /* 移动端响应式布局 */
  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }

  /* 注入动画关键帧 */
  ${starKeyframes}

  /* 星空背景 - 统一青绿色调 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      radial-gradient(2px 2px at 20px 30px, rgba(126, 190, 171, 0.6), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 60px 70px, rgba(165, 214, 199, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 50px 50px, rgba(126, 190, 171, 0.5), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 130px 80px, rgba(165, 214, 199, 0.4), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 90px 10px, rgba(126, 190, 171, 0.7), rgba(0,0,0,0));
    background-size: 200px 200px;
    animation: twinkle 4s ease-in-out infinite;
    opacity: 0.85;
  }

  /* 流星效果 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(126, 190, 171, 0.12) 0%, rgba(0,0,0,0) 70%);
    animation: float 6s ease-in-out infinite;
  }
`;

const ContentCard = styled(Card)`
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  background: rgba(26, 46, 42, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(126, 190, 171, 0.25);
  box-shadow:
    0 8px 32px 0 rgba(126, 190, 171, 0.2),
    inset 0 0 60px rgba(126, 190, 171, 0.05);
  position: relative;
  z-index: 1;

  /* 移动端全宽布局 */
  @media (max-width: 768px) {
    border-radius: 12px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    border-radius: 8px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg,
      transparent,
      rgba(126, 190, 171, 0.6),
      rgba(165, 214, 199, 0.6),
      transparent
    );
    animation: shimmer 3s infinite;
  }

  .ant-card-head {
    border-bottom: 1px solid rgba(126, 190, 171, 0.2);
    background: linear-gradient(135deg, rgba(126, 190, 171, 0.15) 0%, rgba(165, 214, 199, 0.1) 100%);
    border-radius: 20px 20px 0 0;

    .ant-card-head-title {
      color: rgba(200, 230, 220, 0.95);
      font-weight: bold;
      font-size: 24px;
      text-shadow: 0 0 8px rgba(126, 190, 171, 0.4);

      /* 移动端标题字体缩小 */
      @media (max-width: 768px) {
        font-size: 20px;
      }

      @media (max-width: 480px) {
        font-size: 18px;
      }
    }

    /* 移动端头部圆角调整 */
    @media (max-width: 768px) {
      border-radius: 12px 12px 0 0;
    }

    @media (max-width: 480px) {
      border-radius: 8px 8px 0 0;
    }
  }

  .ant-card-body {
    background: transparent;
  }
`;

const MethodCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 16px;
  height: 100%;
  background: rgba(30, 50, 46, 0.70);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(126, 190, 171, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(126, 190, 171, 0.4);
    box-shadow: 0 0 25px rgba(126, 190, 171, 0.3);
    transform: translateY(-2px);
  }

  .ant-card-head {
    background: linear-gradient(135deg, rgba(126, 190, 171, 0.18) 0%, rgba(165, 214, 199, 0.12) 100%);
    border-radius: 16px 16px 0 0;
    border-bottom: 1px solid rgba(126, 190, 171, 0.18);

    .ant-card-head-title {
      color: rgba(190, 220, 210, 0.95);
      font-weight: 600;
      text-shadow: 0 0 6px rgba(126, 190, 171, 0.3);
    }
  }

  .ant-card-body {
    background: transparent;
  }
`;

const ResultCard = styled(Card)`
  border-radius: 16px;
  background: rgba(34, 56, 50, 0.80);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(126, 190, 171, 0.3);
  box-shadow: 0 0 35px rgba(126, 190, 171, 0.25);
  animation: glow 3s ease-in-out infinite;

  .ant-card-head {
    background: linear-gradient(135deg, rgba(126, 190, 171, 0.22) 0%, rgba(165, 214, 199, 0.16) 100%);
    border-radius: 16px 16px 0 0;
    border-bottom: 1px solid rgba(126, 190, 171, 0.25);

    .ant-card-head-title {
      color: rgba(210, 235, 225, 0.98);
      font-weight: 600;
      text-shadow: 0 0 10px rgba(126, 190, 171, 0.5);
    }
  }

  .ant-card-body {
    background: transparent;
  }
`;

const HexagramDisplay = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;

  /* 移动端垂直排列卦象 */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const HexagramColumn = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(126, 190, 171, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(126, 190, 171, 0.25);
  border-radius: 16px;
  color: rgba(200, 230, 220, 0.92);
  min-width: 200px;
  box-shadow:
    0 0 18px rgba(126, 190, 171, 0.2),
    inset 0 0 20px rgba(126, 190, 171, 0.05);

  /* 移动端全宽显示 */
  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }

  .hexagram-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    color: rgba(210, 235, 225, 0.95);
    text-shadow: 0 0 8px rgba(126, 190, 171, 0.5);
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
      background: linear-gradient(90deg, #FFD700, #FFA500);
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
    }

    &.yin {
      &::before, &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 45%;
        height: 100%;
        background: linear-gradient(90deg, #87CEEB, #4682B4);
        box-shadow: 0 0 10px rgba(135, 206, 235, 0.6);
      }
      &::before { left: 0; border-radius: 4px 0 0 4px; }
      &::after { right: 0; border-radius: 0 4px 4px 0; }
      background: transparent;
    }

    &.changing {
      animation: glow 1.5s ease-in-out infinite;
      box-shadow: 0 0 15px #ff6b6b, 0 0 30px #ff6b6b;
    }
  }
`;

// 详细表格展示样式
const DetailedTableContainer = styled.div`
  margin: 24px 0;
  background: rgba(28, 48, 44, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(126, 190, 171, 0.22);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 0 18px rgba(126, 190, 171, 0.18);
`;

const HexagramTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;

  th, td {
    border: 1px solid rgba(126, 190, 171, 0.2);
    padding: 12px 8px;
    text-align: center;
    font-size: 14px;
    color: rgba(195, 225, 215, 0.92);

    /* 移动端减小padding和字号 */
    @media (max-width: 768px) {
      padding: 8px 4px;
      font-size: 12px;
    }

    @media (max-width: 480px) {
      padding: 6px 2px;
      font-size: 11px;
    }
  }

  th {
    background: linear-gradient(135deg, rgba(126, 190, 171, 0.25) 0%, rgba(165, 214, 199, 0.18) 100%);
    color: rgba(200, 230, 220, 0.95);
    font-weight: 600;
    text-shadow: 0 0 4px rgba(126, 190, 171, 0.4);
  }

  tbody tr:nth-child(even) {
    background: rgba(126, 190, 171, 0.08);
  }

  tbody tr:hover {
    background: rgba(126, 190, 171, 0.15);
  }

  .yao-marker {
    color: #ff9eb9;
    font-weight: bold;
    margin-left: 4px;
    text-shadow: 0 0 8px rgba(255, 158, 185, 0.8);
  }

  .line-symbol {
    font-size: 18px;
    font-weight: bold;
  }

  .yang-line {
    color: #ffd700;
    text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
  }

  .yin-line {
    color: #87ceeb;
    text-shadow: 0 0 8px rgba(135, 206, 235, 0.6);
  }

  .changing-row {
    background: rgba(255, 158, 185, 0.18) !important;
    font-weight: 600;
    box-shadow: inset 0 0 10px rgba(255, 158, 185, 0.3);
  }
`;

const GuaSelector = styled.div`
  .gua-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin: 16px 0;

    /* 移动端调整网格列数 */
    @media (max-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
    }
  }

  .gua-option {
    padding: 12px;
    border: 1px solid rgba(126, 190, 171, 0.25);
    background: rgba(30, 50, 46, 0.60);
    backdrop-filter: blur(8px);
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    color: rgba(190, 220, 210, 0.90);
    min-height: 44px;  /* iOS触摸目标最小尺寸 */

    /* 移动端减小padding */
    @media (max-width: 768px) {
      padding: 10px 6px;
      font-size: 14px;
    }

    @media (max-width: 480px) {
      padding: 8px 4px;
      font-size: 12px;
    }

    &:hover {
      border-color: rgba(126, 190, 171, 0.45);
      background: rgba(126, 190, 171, 0.22);
      box-shadow: 0 0 12px rgba(126, 190, 171, 0.35);
      transform: scale(1.05);
    }

    &.selected {
      border-color: rgba(126, 190, 171, 0.6);
      background: linear-gradient(135deg, rgba(126, 190, 171, 0.35) 0%, rgba(165, 214, 199, 0.28) 100%);
      color: rgba(220, 240, 235, 0.98);
      box-shadow: 0 0 18px rgba(126, 190, 171, 0.5);
      text-shadow: 0 0 8px rgba(126, 190, 171, 0.6);
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

// 占卜问题类别选项
const questionCategories = [
  { value: '财运', label: '💰 财运', description: '求财、投资、生意等' },
  { value: '事业', label: '💼 事业', description: '工作、职位、升迁等' },
  { value: '合作', label: '🤝 合作', description: '合伙、项目合作等' },
  { value: '姻缘', label: '💕 姻缘', description: '婚姻、感情、恋爱等' },
  { value: '疾病', label: '🏥 疾病', description: '健康、病情等' },
  { value: '父母', label: '👨‍👩‍👦 父母', description: '父母相关事宜' },
  { value: '子女', label: '👶 子女', description: '子女、怀孕、生育等' },
  { value: '家庭', label: '🏠 家庭', description: '家庭和睦、家宅等' },
  { value: '开店', label: '🏪 开店', description: '开业、选址等' }
];

// 接口定义
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
    // 主卦信息
    sixRelatives: string[];      // 主卦六亲
    sixAnimals: string[];         // 六神(主卦和变卦共用)
    elements: string[];           // 主卦五行
    najiaDizhi: string[];         // 主卦纳甲地支
    // 变卦信息
    changedSixRelatives: string[];  // 变卦六亲
    changedElements: string[];      // 变卦五行
    changedNajiaDizhi: string[];    // 变卦纳甲地支
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
      const response = await fetch('http://localhost:8082/api/divination/calculate', {
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

      <Form layout="vertical" form={form}>
        <Form.Item
          label="占卜问题类别"
          name="questionCategory"
          rules={[{ required: true, message: '请选择占卜问题类别' }]}
        >
          <Radio.Group style={{ width: '100%' }}>
            <Row gutter={[8, 8]}>
              {questionCategories.map(cat => (
                <Col span={8} key={cat.value}>
                  <Radio.Button
                    value={cat.value}
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      height: 'auto',
                      padding: '8px 4px'
                    }}
                  >
                    <div>{cat.label}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{cat.description}</div>
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </Form.Item>

        <Button
          type="primary"
          size="large"
          onClick={() => {
            const category = form.getFieldValue('questionCategory');
            if (!category) {
              message.warning('请选择占卜问题类别');
              return;
            }
            handleSubmit('time', { question: category });
          }}
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

      <Form layout="vertical" onFinish={(values) => {
        // 转换为后端期望的格式
        const payload = {
          numbers: [values.firstNumber, values.secondNumber],
          question: values.questionCategory
        };
        handleSubmit('number', payload);
      }}>
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

        <Form.Item
          label="占卜问题类别"
          name="questionCategory"
          rules={[{ required: true, message: '请选择占卜问题类别' }]}
        >
          <Radio.Group style={{ width: '100%' }}>
            <Row gutter={[8, 8]}>
              {questionCategories.map(cat => (
                <Col span={8} key={cat.value}>
                  <Radio.Button
                    value={cat.value}
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      height: 'auto',
                      padding: '8px 4px'
                    }}
                  >
                    <div>{cat.label}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{cat.description}</div>
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
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

      <Form layout="vertical" form={form}>
        <Form.Item
          label="占卜问题类别"
          name="questionCategoryCoin"
          rules={[{ required: true, message: '请选择占卜问题类别' }]}
        >
          <Radio.Group style={{ width: '100%' }}>
            <Row gutter={[8, 8]}>
              {questionCategories.map(cat => (
                <Col span={8} key={cat.value}>
                  <Radio.Button
                    value={cat.value}
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      height: 'auto',
                      padding: '8px 4px'
                    }}
                  >
                    <div>{cat.label}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{cat.description}</div>
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </Form.Item>

        <Button
          type="primary"
          size="large"
          onClick={() => {
            const category = form.getFieldValue('questionCategoryCoin');
            if (!category) {
              message.warning('请选择占卜问题类别');
              return;
            }
            handleSubmit('coin', { question: category });
          }}
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

      <Form layout="vertical" onFinish={(values) => {
        const payload = {
          ...values,
          question: values.questionCategory
        };
        handleSubmit('manual', payload);
      }}>
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

        <Form.Item
          label="占卜问题类别"
          name="questionCategory"
          rules={[{ required: true, message: '请选择占卜问题类别' }]}
        >
          <Radio.Group style={{ width: '100%' }}>
            <Row gutter={[8, 8]}>
              {questionCategories.map(cat => (
                <Col span={8} key={cat.value}>
                  <Radio.Button
                    value={cat.value}
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      height: 'auto',
                      padding: '8px 4px'
                    }}
                  >
                    <div>{cat.label}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{cat.description}</div>
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
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

  // 渲染详细卦象表格
  const renderDetailedTable = () => {
    if (!result) return null;

    return (
      <DetailedTableContainer>
        <HexagramTable>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>六神</th>
              <th colSpan={4} style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
                {result.originalHexagram.name}
              </th>
              <th colSpan={4} style={{ background: 'linear-gradient(90deg, #19547b 0%, #ffd89b 100%)' }}>
                {result.changedHexagram?.name || '-'}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 从上往下显示(上爻→初爻) */}
            {[5, 4, 3, 2, 1, 0].map((index) => {
              const isChanging = result.changingLine === index + 1;
              const isWorld = result.worldLine === index + 1;
              const isResponse = result.responseLine === index + 1;
              const isYang = result.originalHexagram.lines[index] === '——';
              const isChangedYang = result.changedHexagram?.lines[index] === '——';

              return (
                <tr key={index} className={isChanging ? 'changing-row' : ''}>
                  {/* 六神 */}
                  <td><strong>{result.analysis.sixAnimals[index]}</strong></td>

                  {/* 主卦 */}
                  <td>{result.analysis.sixRelatives[index]}</td>
                  <td>
                    {result.analysis.najiaDizhi ? result.analysis.najiaDizhi[index] : '-'}
                    {result.analysis.elements[index]}
                  </td>
                  <td>
                    <span className={`line-symbol ${isYang ? 'yang-line' : 'yin-line'}`}>
                      {isYang ? '━━━' : '━　━'}
                    </span>
                  </td>
                  <td>
                    {isWorld && <Tag color="blue">世</Tag>}
                    {isResponse && <Tag color="green">应</Tag>}
                    {isChanging && <Tag color="red">动</Tag>}
                  </td>

                  {/* 变卦 */}
                  <td>
                    {result.analysis.changedSixRelatives
                      ? result.analysis.changedSixRelatives[index]
                      : result.analysis.sixRelatives[index]}
                  </td>
                  <td>
                    {result.analysis.changedNajiaDizhi
                      ? result.analysis.changedNajiaDizhi[index]
                      : (result.analysis.najiaDizhi ? result.analysis.najiaDizhi[index] : '-')}
                    {result.analysis.changedElements
                      ? result.analysis.changedElements[index]
                      : result.analysis.elements[index]}
                  </td>
                  <td>
                    {result.changedHexagram && (
                      <span className={`line-symbol ${isChangedYang ? 'yang-line' : 'yin-line'}`}>
                        {isChangedYang ? '━━━' : '━　━'}
                      </span>
                    )}
                  </td>
                  <td>
                    {isWorld && <Tag color="blue">世</Tag>}
                    {isResponse && <Tag color="green">应</Tag>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </HexagramTable>
      </DetailedTableContainer>
    );
  };

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
        {/* 详细卦象表格 */}
        {renderDetailedTable()}

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