import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
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
import { CalendarOutlined, FireOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

const { Text, Paragraph } = Typography;
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
  // 大运分析
  dayunAnalysis?: {
    qiyunAge: number;
    qiyunMonth: number;
    qiyunDay: number;
    isForward: boolean;
    dayunList: Array<{
      step: number;
      ganZhi: string;
      startAge: number;
      endAge: number;
      startYear: number;
      endYear: number;
      isCurrent?: boolean;
    }>;
  };
  // 经典命理分析（《三命通会》《子平真诊》《渊海子平》）
  gejuAnalysis?: {
    mainGeju: string;
    analysis: string[];
    yongshen: string | null;
    jishen: string | null;
    strength: number;
  };
  shenshaAnalysis?: {
    jixing: string[];
    xiongshen: string[];
    meaning: { [key: string]: string };
  };
  tiaohouAnalysis?: {
    climate: string;
    tiaohou: string;
    analysis: string[];
  };
  shishenMap?: { [key: string]: string };
  classicalAnalysis?: {
    xingge: string | {
      basicCharacter: string;
      positiveTraits: string[];
      negativeTraits: string[];
      mainWuxing: string;
      wuxingDistribution: { [key: string]: number };
      strongestWuxing: string;
      weakestWuxing: string;
      analysis: string[];
      suggestions: string[];
    };
    shiye: string;
    caiyun: string | {
      wealthLevel: string;
      wealthCount: number;
      wealthPositions: string[];
      wealthWuxing: string;
      analysis: string[];
      suggestions: string[];
    };
    hunyin: string | {
      marriageLevel: string;
      spouseCount: number;
      spouseWuxing: string;
      spousePositions: string[];
      rizhiCharacter: string;
      hasTaohua: boolean;
      analysis: string[];
      suggestions: string[];
    };
    jiankang: string;
    suggestions: string[];
  };
}

const BaziPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<BaziResult | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [currentRecordId, setCurrentRecordId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // 加载已保存的记录
  useEffect(() => {
    const recordId = searchParams.get('recordId');
    if (recordId) {
      loadSavedRecord(recordId);
    }
  }, [searchParams]);

  // 加载已保存的记录
  const loadSavedRecord = async (recordId: string) => {
    setLoading(true);
    console.log('🔄 开始加载记录, ID:', recordId);

    try {
      const response = await fetch(`http://localhost:8080/api/bazi/record/${recordId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('📦 API响应:', result);

      if (!result.success || !result.data) {
        throw new Error('数据格式错误');
      }

      const record = result.data;
      console.log('📋 记录数据:', record);

      // 判断是农历还是公历
      const isLunar = !!record.birthDateLunar;
      const dateStr = isLunar ? record.birthDateLunar : record.birthDateSolar;

      // 解析出生日期
      const [birthYear, birthMonth, birthDay] = dateStr.split('-').map(Number);
      console.log('📅 解析日期:', {
        isLunar,
        dateStr,
        birthYear,
        birthMonth,
        birthDay
      });

      // 填充表单
      form.setFieldsValue({
        name: record.name, // 填充命主姓名
        birthYear: birthYear.toString(),
        birthMonth: birthMonth.toString(),
        birthDay: birthDay.toString(),
        birthHour: record.birthHour.toString(),
        gender: record.gender.toLowerCase(),
        calendar: isLunar ? 'lunar' : 'solar', // 根据记录判断农历/公历
        timezone: 'Asia/Shanghai'
      });
      console.log('✍️ 表单已填充，日历类型:', isLunar ? '农历' : '公历');

      // 重组八字结果数据
      const baziResult = {
        ...record.bazi,
        ...record.analysis,
        birthYear,
        birthMonth,
        birthDay,
        birthHour: record.birthHour,
        gender: record.gender
      };
      console.log('🎯 重组后的八字结果:', {
        yearColumn: baziResult.yearColumn,
        dayMaster: baziResult.dayMaster,
        yongshenAnalysis: baziResult.yongshenAnalysis
      });

      // 设置用户名和结果
      setUserName(record.name);
      setResult(baziResult);
      setCurrentRecordId(recordId); // 保存当前记录ID，用于更新操作
      console.log('✅ 数据设置完成');
      console.log('🎨 当前result状态:', baziResult);

      // 验证关键字段
      console.log('验证关键字段:', {
        hasYearColumn: !!baziResult.yearColumn,
        hasMonthColumn: !!baziResult.monthColumn,
        hasDayColumn: !!baziResult.dayColumn,
        hasHourColumn: !!baziResult.hourColumn,
        hasDayMaster: !!baziResult.dayMaster,
        hasDayMasterWuxing: !!baziResult.dayMasterWuxing,
        hasYongshenAnalysis: !!baziResult.yongshenAnalysis,
        yongshen: baziResult.yongshenAnalysis?.yongshen
      });

      message.success(`已加载 ${record.name} 的排盘记录`);
    } catch (error) {
      console.error('❌ 加载记录失败:', error);
      message.error('加载记录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 提交表单
  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const baziInput = {
        divinationType: 'BAZI',
        birthYear: parseInt(values.birthYear),
        birthMonth: parseInt(values.birthMonth),
        birthDay: parseInt(values.birthDay),
        birthHour: parseInt(values.birthHour),
        birthMinute: 0,
        gender: values.gender.toUpperCase(),
        lunarCalendar: values.calendar === 'lunar',
        timezone: values.timezone || 'Asia/Shanghai'
      };

      console.log('提交八字计算请求:', baziInput);

      // 调用后端API（Express网关，包含大运功能）
      const response = await fetch('http://localhost:8080/api/divination/calculate', {
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
      setUserName(values.name || '');
      message.success('八字排盘计算完成！');

    } catch (error) {
      console.error('八字计算失败:', error);
      message.error('八字计算失败，请检查输入信息或稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 保存排盘结果
  const handleSave = async () => {
    if (!result || !userName) {
      message.warning('请先填写命主姓名并完成排盘');
      return;
    }

    setSaving(true);
    try {
      const formValues = form.getFieldsValue();
      const saveData = {
        name: userName,
        birthYear: parseInt(formValues.birthYear),
        birthMonth: parseInt(formValues.birthMonth),
        birthDay: parseInt(formValues.birthDay),
        birthHour: parseInt(formValues.birthHour),
        gender: formValues.gender.toUpperCase(),
        lunarCalendar: formValues.calendar === 'lunar',
        timezone: formValues.timezone || 'Asia/Shanghai',
        baziResult: result
      };

      // 判断是新建还是更新
      const isUpdate = !!currentRecordId;
      const url = isUpdate
        ? `http://localhost:8080/api/bazi/update/${currentRecordId}`
        : 'http://localhost:8080/api/bazi/save';
      const method = isUpdate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      message.success(isUpdate ? '记录已更新' : '排盘已保存');
    } catch (error) {
      console.error('保存失败:', error);
      message.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  // 渲染八字结果
  const renderBaziResult = () => {
    console.log('🖼️ renderBaziResult被调用, result存在:', !!result);

    if (!result) {
      console.log('⚠️ result为空，不渲染');
      return null;
    }

    console.log('✅ 开始渲染八字结果');

    return (
      <ResultCard title={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <FireOutlined />
            八字排盘结果
          </Space>
          <Button
            type="primary"
            size="small"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
          >
            {currentRecordId ? '更新记录' : '保存排盘'}
          </Button>
        </Space>
      }>
        {/* 第1行：命主姓名、日主、用神 */}
        <Card size="small" style={{ marginBottom: 16, background: '#f0f5ff' }}>
          <Row gutter={16} align="middle">
            {userName && (
              <Col span={8}>
                <Space>
                  <Text strong style={{ fontSize: 16 }}>命主姓名：</Text>
                  <Tag color="#1890ff" style={{ fontSize: 16, padding: '4px 12px' }}>
                    {userName}
                  </Tag>
                </Space>
              </Col>
            )}
            <Col span={userName ? 8 : 12}>
              <Space>
                <Text strong style={{ fontSize: 16 }}>日主：</Text>
                <Tag color={wuxingColors[result.dayMasterWuxing]} style={{ fontSize: 16, padding: '4px 12px' }}>
                  {result.dayMaster} ({result.dayMasterWuxing})
                </Tag>
              </Space>
            </Col>
            <Col span={userName ? 8 : 12}>
              <Space>
                <Text strong style={{ fontSize: 16 }}>用神：</Text>
                <Tag color="green" style={{ fontSize: 16, padding: '4px 12px' }}>
                  {result.yongshenAnalysis.yongshen}
                </Tag>
              </Space>
            </Col>
          </Row>
        </Card>

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

        {/* 经典命理分析（《三命通会》《子平真诊》《渊海子平》） */}
        {result.gejuAnalysis && (
          <>
            <Divider orientation="left" style={{ marginTop: 24, fontWeight: 'bold', color: '#722ed1' }}>
              📖 经典命理分析
            </Divider>

            {/* 格局分析 */}
            <Card size="small" title="格局分析（源自《子平真诊》）" style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <Text strong>格局：</Text>
                <Tag color="purple" style={{ marginLeft: 8, fontSize: 14 }}>
                  {result.gejuAnalysis.mainGeju}
                </Tag>
                {result.gejuAnalysis.strength > 0 && (
                  <Text type="secondary" style={{ marginLeft: 12 }}>
                    强度: {result.gejuAnalysis.strength}/10
                  </Text>
                )}
              </div>
              {result.gejuAnalysis.yongshen && (
                <div>
                  <Text type="secondary">格局用神: {result.gejuAnalysis.yongshen}</Text>
                </div>
              )}
            </Card>

            {/* 神煞分析 */}
            {result.shenshaAnalysis && result.shenshaAnalysis.jixing && result.shenshaAnalysis.jixing.length > 0 && (
              <Card
                size="small"
                title={<Text strong style={{ fontSize: 15 }}>🌟 神煞分析（源自《三命通会》）</Text>}
                style={{ marginBottom: 16, background: 'linear-gradient(135deg, #f6ffed 0%, #fcffe6 100%)' }}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <Text strong style={{ color: '#52c41a', fontSize: 14 }}>✨ 吉星贵人：</Text>
                    <div style={{ marginTop: 12 }}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        {result.shenshaAnalysis.jixing.map((star: string, idx: number) => {
                          const starName = star.includes('(') ? star.substring(0, star.indexOf('(')) : star;
                          const starPosition = star.includes('(') ? star.substring(star.indexOf('(')) : '';
                          const meaning = result.shenshaAnalysis.meaning[starName] || '';

                          let starLevel = '';
                          let levelColor = 'success';
                          if (meaning.includes('五星级') || meaning.includes('★★★★★')) {
                            starLevel = '★★★★★';
                            levelColor = 'error';
                          } else if (meaning.includes('四星级') || meaning.includes('★★★★')) {
                            starLevel = '★★★★';
                            levelColor = 'warning';
                          } else if (meaning.includes('三星级') || meaning.includes('★★★')) {
                            starLevel = '★★★';
                            levelColor = 'success';
                          }

                          return (
                            <div key={idx} style={{ marginBottom: 8 }}>
                              <Space size={4} wrap>
                                <Tag color={levelColor} style={{ fontSize: 13, padding: '2px 8px' }}>
                                  {starName}
                                </Tag>
                                {starLevel && (
                                  <Tag color={levelColor === 'error' ? 'red' : levelColor === 'warning' ? 'gold' : 'green'} style={{ fontSize: 11 }}>
                                    {starLevel}
                                  </Tag>
                                )}
                                {starPosition && (
                                  <Text type="secondary" style={{ fontSize: 12 }}>
                                    {starPosition}
                                  </Text>
                                )}
                              </Space>
                              {meaning && (
                                <div style={{ marginTop: 4, paddingLeft: 8 }}>
                                  <Text type="secondary" style={{ fontSize: 12 }}>
                                    {meaning.replace(/【.*?】/g, '')}
                                  </Text>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </Space>
                    </div>
                  </div>

                  {/* 凶神部分（如果有） */}
                  {result.shenshaAnalysis.xiongshen && result.shenshaAnalysis.xiongshen.length > 0 && (
                    <div>
                      <Text strong style={{ color: '#ff4d4f', fontSize: 14 }}>⚠️ 凶神煞星：</Text>
                      <div style={{ marginTop: 12 }}>
                        <Space wrap>
                          {result.shenshaAnalysis.xiongshen.map((xiong: string) => (
                            <Tag key={xiong} color="error" style={{ fontSize: 13 }}>
                              {xiong}
                            </Tag>
                          ))}
                        </Space>
                      </div>
                    </div>
                  )}
                </Space>
              </Card>
            )}

            {/* 调候分析 */}
            {result.tiaohouAnalysis && (
              <Card size="small" title="调候分析（源自《子平真诊》）" style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>气候：</Text>
                    <Tag color={
                      result.tiaohouAnalysis.climate === '寒' ? 'blue' :
                      result.tiaohouAnalysis.climate === '热' ? 'red' :
                      result.tiaohouAnalysis.climate === '燥' ? 'orange' : 'cyan'
                    } style={{ marginLeft: 8 }}>
                      {result.tiaohouAnalysis.climate}
                    </Tag>
                  </Col>
                  <Col span={12}>
                    <Text strong>调候用神：</Text>
                    <Text style={{ marginLeft: 8, color: '#1890ff' }}>
                      {result.tiaohouAnalysis.tiaohou}
                    </Text>
                  </Col>
                </Row>
              </Card>
            )}
          </>
        )}

        {/* 大运分析 */}
        {result.dayunAnalysis && result.dayunAnalysis.dayunList && (
          <>
            <Divider orientation="left" style={{ fontWeight: 'bold', color: '#1890ff', fontSize: 16, marginTop: 24 }}>
              🌊 七步大运
            </Divider>

            {result.dayunAnalysis.dayunList
              .filter((dayun: any) => dayun.ganZhi !== '起运前')
              .slice(0, 7)
              .map((dayun: any, index: number) => {
                // 判断是否需要红色标注（大的吉凶）
                const isHighlight =
                  (dayun.jiXiong && (dayun.jiXiong.includes('大吉') || dayun.jiXiong.includes('大凶'))) ||
                  (dayun.score && (dayun.score >= 85 || dayun.score <= 30));

                const getJiXiongColor = (jiXiong: string) => {
                  if (jiXiong.includes('大吉')) return '#52c41a';
                  if (jiXiong.includes('吉')) return '#73d13d';
                  if (jiXiong.includes('平')) return '#faad14';
                  if (jiXiong.includes('大凶') || jiXiong.includes('凶')) return '#ff4d4f';
                  return '#8c8c8c';
                };

                return (
                  <Card
                    key={index}
                    size="small"
                    style={{
                      marginBottom: 12,
                      borderLeft: isHighlight ? '4px solid #ff4d4f' : dayun.isCurrent ? '4px solid #faad14' : 'none'
                    }}
                    bodyStyle={{ padding: '12px 16px' }}
                  >
                    <Row gutter={16} align="middle">
                      <Col span={6}>
                        <Space direction="vertical" size={0}>
                          <Text strong style={{ fontSize: 18, color: dayun.isCurrent ? '#faad14' : '#333' }}>
                            {dayun.ganZhi}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 14 }}>
                            {dayun.startAge}-{dayun.endAge}岁
                          </Text>
                          {dayun.isCurrent && (
                            <Tag color="gold" style={{ marginTop: 4 }}>当前大运</Tag>
                          )}
                        </Space>
                      </Col>
                      <Col span={18}>
                        <Space direction="vertical" size={4} style={{ width: '100%' }}>
                          {dayun.jiXiong && (
                            <div>
                              <Tag
                                color={getJiXiongColor(dayun.jiXiong)}
                                style={{
                                  fontSize: 14,
                                  fontWeight: isHighlight ? 'bold' : 'normal',
                                  color: isHighlight ? '#fff' : undefined
                                }}
                              >
                                {dayun.jiXiong}
                              </Tag>
                              {dayun.score && (
                                <Tag color={dayun.score >= 70 ? 'success' : dayun.score >= 45 ? 'warning' : 'error'}>
                                  评分：{dayun.score}/100
                                </Tag>
                              )}
                            </div>
                          )}
                          {dayun.analysis && (
                            <Text style={{ color: isHighlight ? '#ff4d4f' : '#666' }}>
                              {dayun.analysis}
                            </Text>
                          )}
                          {dayun.features && dayun.features.length > 0 && (
                            <div style={{ marginTop: 4 }}>
                              {dayun.features.slice(0, 2).map((feature: string, idx: number) => (
                                <Text key={idx} type="secondary" style={{ fontSize: 13, marginRight: 8 }}>
                                  • {feature}
                                </Text>
                              ))}
                            </div>
                          )}
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                );
              })}

            {/* 流年分析 */}
            <Divider orientation="left" style={{ fontWeight: 'bold', color: '#722ed1', fontSize: 16, marginTop: 24 }}>
              📅 流年运势分析
            </Divider>
            <Alert
              message="流年分析功能"
              description="当前大运及从大运起始年开始的每一年吉凶和细节分析功能正在开发中，敬请期待。该功能将提供每年的运势详解，重点年份标红提示。"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
          </>
        )}

        {/* 综合命理分析（事业、财运、婚姻等） */}
        {result.classicalAnalysis && (
          <>
            <Divider orientation="left" style={{ marginTop: 32, fontWeight: 'bold', color: '#722ed1', fontSize: 16 }}>
              📊 经典分析详解
            </Divider>

            <Card size="small" title="综合命理评述（《三命通会》《渊海子平》）" style={{ marginBottom: 16 }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {/* 性格分析 */}
                <div>
                  <Text strong style={{ color: '#722ed1', fontSize: 16 }}>性格分析：</Text>
                  {typeof result.classicalAnalysis.xingge === 'string' ? (
                    <Paragraph style={{ marginTop: 4, marginLeft: 16 }}>
                      {result.classicalAnalysis.xingge}
                    </Paragraph>
                  ) : (
                    <div style={{ marginTop: 8 }}>
                      <Paragraph style={{ marginLeft: 16, fontSize: 15, fontWeight: 500 }}>
                        {result.classicalAnalysis.xingge.basicCharacter}
                      </Paragraph>
                      <Row gutter={16} style={{ marginLeft: 16, marginTop: 12 }}>
                        <Col span={12}>
                          <Text strong style={{ color: '#52c41a' }}>优点：</Text>
                          <div style={{ marginTop: 4 }}>
                            {result.classicalAnalysis.xingge.positiveTraits.map((trait, idx) => (
                              <Tag key={idx} color="green" style={{ marginBottom: 4 }}>✓ {trait}</Tag>
                            ))}
                          </div>
                        </Col>
                        <Col span={12}>
                          <Text strong style={{ color: '#faad14' }}>待改进：</Text>
                          <div style={{ marginTop: 4 }}>
                            {result.classicalAnalysis.xingge.negativeTraits.map((trait, idx) => (
                              <Tag key={idx} color="orange" style={{ marginBottom: 4 }}>! {trait}</Tag>
                            ))}
                          </div>
                        </Col>
                      </Row>
                      {result.classicalAnalysis.xingge.analysis && result.classicalAnalysis.xingge.analysis.length > 0 && (
                        <div style={{ marginLeft: 16, marginTop: 12 }}>
                          {result.classicalAnalysis.xingge.analysis.map((item, idx) => (
                            <div key={idx} style={{ marginBottom: 4 }}>
                              <Text type="secondary">• {item}</Text>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 财运分析 */}
                <div>
                  <Text strong style={{ color: '#faad14', fontSize: 16 }}>财运分析：</Text>
                  {typeof result.classicalAnalysis.caiyun === 'string' ? (
                    <Paragraph style={{ marginTop: 4, marginLeft: 16 }}>
                      {result.classicalAnalysis.caiyun}
                    </Paragraph>
                  ) : (
                    <div style={{ marginTop: 8, marginLeft: 16 }}>
                      <div>
                        <Tag color={
                          result.classicalAnalysis.caiyun.wealthLevel.includes('过旺') ? 'red' :
                          result.classicalAnalysis.caiyun.wealthLevel.includes('适中') ? 'green' :
                          result.classicalAnalysis.caiyun.wealthLevel.includes('偏弱') ? 'orange' : 'default'
                        } style={{ fontSize: 14, padding: '4px 12px' }}>
                          {result.classicalAnalysis.caiyun.wealthLevel}
                        </Tag>
                        <Text style={{ marginLeft: 8 }}>财星{result.classicalAnalysis.caiyun.wealthCount}位</Text>
                        {result.classicalAnalysis.caiyun.wealthPositions.length > 0 && (
                          <Text type="secondary" style={{ marginLeft: 8 }}>
                            （{result.classicalAnalysis.caiyun.wealthPositions.join('、')}）
                          </Text>
                        )}
                      </div>
                      {result.classicalAnalysis.caiyun.analysis && result.classicalAnalysis.caiyun.analysis.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          {result.classicalAnalysis.caiyun.analysis.map((item, idx) => (
                            <div key={idx} style={{ marginBottom: 4 }}>
                              <Text type="secondary">• {item}</Text>
                            </div>
                          ))}
                        </div>
                      )}
                      {result.classicalAnalysis.caiyun.suggestions && result.classicalAnalysis.caiyun.suggestions.length > 0 && (
                        <div style={{ marginTop: 8, paddingLeft: 12, borderLeft: '3px solid #faad14' }}>
                          <Text strong style={{ fontSize: 13 }}>调理建议：</Text>
                          {result.classicalAnalysis.caiyun.suggestions.map((item, idx) => (
                            <div key={idx} style={{ marginTop: 4 }}>
                              <Text type="secondary">💡 {item}</Text>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 婚姻分析 */}
                <div>
                  <Text strong style={{ color: '#eb2f96', fontSize: 16 }}>婚姻桃花：</Text>
                  {typeof result.classicalAnalysis.hunyin === 'string' ? (
                    <Paragraph style={{ marginTop: 4, marginLeft: 16 }}>
                      {result.classicalAnalysis.hunyin}
                    </Paragraph>
                  ) : (
                    <div style={{ marginTop: 8, marginLeft: 16 }}>
                      <div>
                        <Tag color={
                          result.classicalAnalysis.hunyin.marriageLevel.includes('过旺') ? 'red' :
                          result.classicalAnalysis.hunyin.marriageLevel.includes('适中') ? 'green' :
                          result.classicalAnalysis.hunyin.marriageLevel.includes('偏弱') ? 'orange' : 'default'
                        } style={{ fontSize: 14, padding: '4px 12px' }}>
                          {result.classicalAnalysis.hunyin.marriageLevel}
                        </Tag>
                        {result.classicalAnalysis.hunyin.hasTaohua && (
                          <Tag color="pink" style={{ fontSize: 14, padding: '4px 12px', marginLeft: 8 }}>
                            🌸 命带桃花
                          </Tag>
                        )}
                      </div>
                      {result.classicalAnalysis.hunyin.rizhiCharacter && (
                        <div style={{ marginTop: 8 }}>
                          <Text strong>配偶宫：</Text>
                          <Text style={{ marginLeft: 8, color: '#eb2f96' }}>
                            {result.classicalAnalysis.hunyin.rizhiCharacter}
                          </Text>
                        </div>
                      )}
                      {result.classicalAnalysis.hunyin.analysis && result.classicalAnalysis.hunyin.analysis.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          {result.classicalAnalysis.hunyin.analysis.map((item, idx) => (
                            <div key={idx} style={{ marginBottom: 4 }}>
                              <Text type="secondary">• {item}</Text>
                            </div>
                          ))}
                        </div>
                      )}
                      {result.classicalAnalysis.hunyin.suggestions && result.classicalAnalysis.hunyin.suggestions.length > 0 && (
                        <div style={{ marginTop: 8, paddingLeft: 12, borderLeft: '3px solid #eb2f96' }}>
                          <Text strong style={{ fontSize: 13 }}>感情建议：</Text>
                          {result.classicalAnalysis.hunyin.suggestions.map((item, idx) => (
                            <div key={idx} style={{ marginTop: 4 }}>
                              <Text type="secondary">💡 {item}</Text>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 事业 */}
                <div>
                  <Text strong style={{ color: '#13c2c2', fontSize: 16 }}>事业方向：</Text>
                  <Paragraph style={{ marginTop: 4, marginLeft: 16 }}>
                    {result.classicalAnalysis.shiye}
                  </Paragraph>
                </div>

                {/* 健康 */}
                <div>
                  <Text strong style={{ color: '#52c41a', fontSize: 16 }}>健康养生：</Text>
                  <Paragraph style={{ marginTop: 4, marginLeft: 16 }}>
                    {result.classicalAnalysis.jiankang}
                  </Paragraph>
                </div>

                {/* 生活建议 */}
                {result.classicalAnalysis.suggestions && result.classicalAnalysis.suggestions.length > 0 && (
                  <div style={{ marginTop: 12, padding: 12, background: '#f6ffed', borderRadius: 8, border: '1px solid #b7eb8f' }}>
                    <Text strong style={{ fontSize: 15 }}>📋 综合生活建议：</Text>
                    <div style={{ marginTop: 8 }}>
                      {result.classicalAnalysis.suggestions.map((suggestion, index) => (
                        <div key={index} style={{ marginBottom: 6 }}>
                          <Text>✓ {suggestion}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Space>
            </Card>
          </>
        )}

        {/* 调理建议 */}
        {result.suggestion && (
          <Card size="small" title="调理建议" style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div>
                  <Text strong>有利颜色：</Text>
                  <div style={{ marginTop: 8 }}>
                    {result.suggestion.favorableColors && result.suggestion.favorableColors.map(color => (
                      <Tag key={color} color={color.toLowerCase()}>{color}</Tag>
                    ))}
                  </div>
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <Text strong>有利方位：</Text>
                  <div style={{ marginTop: 8 }}>
                    {result.suggestion.favorableDirections && result.suggestion.favorableDirections.map(direction => (
                      <Tag key={direction}>{direction}</Tag>
                    ))}
                  </div>
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <Text strong>有利数字：</Text>
                  <div style={{ marginTop: 8 }}>
                  {result.suggestion.favorableNumbers && result.suggestion.favorableNumbers.map(number => (
                    <Tag key={number}>{number}</Tag>
                  ))}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div>
                <Text strong>职业建议：</Text>
                <div style={{ marginTop: 8 }}>
                  {result.suggestion.careerSuggestions && result.suggestion.careerSuggestions.map(career => (
                    <Tag key={career} color="purple">{career}</Tag>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Card>
        )}

        {/* 最后部分：综合分析总结 */}
        <Divider orientation="left" style={{ marginTop: 32, fontWeight: 'bold', color: '#d4380d', fontSize: 16 }}>
          💡 综合分析与调理建议
        </Divider>

        <Card size="small" style={{ marginBottom: 16, background: '#fffbe6' }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {/* 贵人分析 */}
            {result.shenshaAnalysis && (
              <div>
                <Text strong style={{ fontSize: 16, color: '#d4380d' }}>八字贵人分析：</Text>
                <div style={{ marginTop: 8, paddingLeft: 16 }}>
                  {result.shenshaAnalysis.jixing && result.shenshaAnalysis.jixing.length > 0 ? (
                    <>
                      <Text>您的八字中拥有以下贵人星：</Text>
                      <div style={{ marginTop: 8 }}>
                        {result.shenshaAnalysis.jixing.map((star: string) => (
                          <Tag key={star} color="gold" style={{ marginBottom: 4 }}>
                            {star}
                          </Tag>
                        ))}
                      </div>
                      <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                        贵人星较多，命中多贵人相助，遇事易化险为夷。建议多结交正能量朋友，扩展人脉网络。
                      </Text>
                    </>
                  ) : (
                    <Text type="secondary">
                      八字中贵人星较少，需要更多依靠自己的努力。建议主动结交有能力的朋友，多参加社交活动，对他人多施恩惠，积累人情。选择技术专业领域，凭实力说话。
                    </Text>
                  )}
                </div>
              </div>
            )}

            <Divider style={{ margin: '12px 0' }} />

            {/* 当前大运运势 */}
            {result.dayunAnalysis && result.dayunAnalysis.dayunList && (
              <div>
                <Text strong style={{ fontSize: 16, color: '#d4380d' }}>当前大运运势：</Text>
                <div style={{ marginTop: 8, paddingLeft: 16 }}>
                  {result.dayunAnalysis.dayunList
                    .filter((dayun: any) => dayun.isCurrent)
                    .map((currentDayun: any, idx: number) => (
                      <div key={idx}>
                        <Space>
                          <Text strong>大运：</Text>
                          <Tag color="gold" style={{ fontSize: 14 }}>
                            {currentDayun.ganZhi}
                          </Tag>
                          <Text type="secondary">
                            ({currentDayun.startAge}-{currentDayun.endAge}岁)
                          </Text>
                        </Space>
                        {currentDayun.jiXiong && (
                          <div style={{ marginTop: 8 }}>
                            <Text strong>吉凶：</Text>
                            <Tag
                              color={
                                currentDayun.jiXiong.includes('大吉') ? 'success' :
                                currentDayun.jiXiong.includes('吉') ? 'success' :
                                currentDayun.jiXiong.includes('平') ? 'warning' : 'error'
                              }
                              style={{ marginLeft: 8 }}
                            >
                              {currentDayun.jiXiong}
                            </Tag>
                          </div>
                        )}
                        {currentDayun.analysis && (
                          <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
                            {currentDayun.analysis}
                          </Paragraph>
                        )}
                      </div>
                    ))}
                  {!result.dayunAnalysis.dayunList.some((d: any) => d.isCurrent) && (
                    <Text type="secondary">暂未起运或当前大运数据未加载。</Text>
                  )}
                </div>
              </div>
            )}

            <Divider style={{ margin: '12px 0' }} />

            {/* 调理建议 */}
            {result.suggestion && (
              <div>
                <Text strong style={{ fontSize: 16, color: '#d4380d' }}>调理建议：</Text>
                <div style={{ marginTop: 8, paddingLeft: 16 }}>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div>
                      <Text strong>1. 五行调理：</Text>
                      {result.suggestion.favorableColors && result.suggestion.favorableColors.length > 0 && (
                        <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                          多使用有利颜色：{result.suggestion.favorableColors.join('、')}，穿衣、家居装饰可选用这些颜色。
                        </Text>
                      )}
                      {result.suggestion.favorableDirections && result.suggestion.favorableDirections.length > 0 && (
                        <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                          有利方位：{result.suggestion.favorableDirections.join('、')}，办公桌朝向、出行方向可优先选择。
                        </Text>
                      )}
                    </div>
                    <div>
                      <Text strong>2. 事业发展：</Text>
                      {result.suggestion.careerSuggestions && result.suggestion.careerSuggestions.length > 0 && (
                        <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                          建议从事：{result.suggestion.careerSuggestions.join('、')}等行业。
                        </Text>
                      )}
                    </div>
                    <div>
                      <Text strong>3. 人际关系：</Text>
                      <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                        主动结交有能力的朋友，多参加社交活动，保持谦逊态度，对他人多施恩惠，积累人品，贵人自然来。
                      </Text>
                    </div>
                    <div>
                      <Text strong>4. 能力提升：</Text>
                      <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                        不断学习专业技能，培养多项能力，锻炼沟通表达，建立个人品牌和影响力，靠实力立身。
                      </Text>
                    </div>
                    <div>
                      <Text strong>5. 心态调整：</Text>
                      <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                        相信命由己造，福自己求。接受先天不足，通过后天努力改善命运。遇事靠己，培养独立能力。
                      </Text>
                    </div>
                  </Space>
                </div>
              </div>
            )}
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
            <CalendarOutlined />
            八字排盘系统
          </Space>
        }
      >
        <FormCard title="基本信息">
          <Form
            form={form}
            layout="inline"
            onFinish={handleSubmit}
            initialValues={{
              gender: 'male',
              calendar: 'solar',
              timezone: 'Asia/Shanghai',
              birthYear: dayjs().year(),
              birthMonth: dayjs().month() + 1,
              birthDay: dayjs().date(),
              birthHour: 12
            }}
            style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '8px' }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: '请输入姓名' }]}
              style={{ marginBottom: 0, width: '120px' }}
            >
              <Input placeholder="命主姓名" size="middle" />
            </Form.Item>

            <Form.Item
              name="calendar"
              rules={[{ required: true }]}
              style={{ marginBottom: 0, width: '90px' }}
            >
              <Select size="middle">
                <Option value="solar">公历</Option>
                <Option value="lunar">农历</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="birthYear"
              rules={[{ required: true, message: '年' }]}
              style={{ marginBottom: 0, width: '85px' }}
            >
              <Input placeholder="年" size="middle" type="number" />
            </Form.Item>

            <Form.Item
              name="birthMonth"
              rules={[{ required: true, message: '月' }]}
              style={{ marginBottom: 0, width: '70px' }}
            >
              <Input placeholder="月" size="middle" type="number" min={1} max={12} />
            </Form.Item>

            <Form.Item
              name="birthDay"
              rules={[{ required: true, message: '日' }]}
              style={{ marginBottom: 0, width: '70px' }}
            >
              <Input placeholder="日" size="middle" type="number" min={1} max={31} />
            </Form.Item>

            <Form.Item
              name="birthHour"
              rules={[{ required: true, message: '时' }]}
              style={{ marginBottom: 0, width: '70px' }}
            >
              <Input placeholder="时" size="middle" type="number" min={0} max={23} />
            </Form.Item>

            <Form.Item
              name="gender"
              rules={[{ required: true }]}
              style={{ marginBottom: 0, width: '80px' }}
            >
              <Select size="middle">
                <Option value="male">男</Option>
                <Option value="female">女</Option>
              </Select>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="middle"
                icon={loading ? <LoadingOutlined /> : <CalendarOutlined />}
              >
                排盘
              </Button>
            </Form.Item>
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
