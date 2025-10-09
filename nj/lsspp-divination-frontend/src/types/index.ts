// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  nickname?: string;
  phone?: string;
  gender?: 'male' | 'female';
  birthDate?: string;
  registerTime: string;
  lastLoginTime?: string;
  vipLevel: number;
  credits: number;
}

// 地理位置类型
export interface Location {
  province: string;
  city: string;
  district?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

// 农历日期类型
export interface LunarDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  isLeapMonth?: boolean;
  lunarYear: string;
  lunarMonth: string;
  lunarDay: string;
  lunarHour: string;
}

// 八字相关类型
export interface BaziInput {
  name?: string;
  gender: 'male' | 'female';
  birthDate: string; // ISO 8601 格式
  birthTime: string; // HH:mm 格式
  isLunar: boolean;
  location: Location;
  timezone?: string;
}

export interface BaziResult {
  id: string;
  input: BaziInput;
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  wuxingAnalysis: WuxingAnalysis;
  shishenAnalysis: ShishenAnalysis;
  yongshenAnalysis: YongshenAnalysis;
  dayunAnalysis: DayunAnalysis[];
  createTime: string;
}

export interface Pillar {
  heavenlyStem: string; // 天干
  earthlyBranch: string; // 地支
  nayin: string; // 纳音
  wuxing: string; // 五行
  shishen?: string; // 十神
}

// 五行分析
export interface WuxingAnalysis {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
  strongest: string;
  weakest: string;
  balance: 'balanced' | 'strong' | 'weak';
}

// 十神分析
export interface ShishenAnalysis {
  bijian: number; // 比肩
  jiecai: number; // 劫财
  shishan: number; // 食神
  shanguan: number; // 伤官
  pianCai: number; // 偏财
  zhengcai: number; // 正财
  qisha: number; // 七杀
  zhengguan: number; // 正官
  pianyin: number; // 偏印
  zhengyin: number; // 正印
}

// 用神分析
export interface YongshenAnalysis {
  yongshen: string; // 用神
  xishen: string; // 喜神
  jishen: string; // 忌神
  choushens: string; // 仇神
  recommendation: string; // 建议
}

// 大运分析
export interface DayunAnalysis {
  startAge: number;
  endAge: number;
  pillar: Pillar;
  luck: 'good' | 'average' | 'bad';
  description: string;
}

// 六爻相关类型
export interface LiuyaoInput {
  method: 'time' | 'number' | 'manual' | 'coin';
  question?: string;
  datetime?: string;
  numbers?: number[];
  yaoData?: YaoData[];
}

export interface YaoData {
  position: number; // 1-6
  value: 'yin' | 'yang';
  isChanging: boolean;
}

export interface Hexagram {
  id: string;
  name: string;
  symbol: string;
  description: string;
  judgement: string;
  image: string;
}

export interface LiuyaoResult {
  id: string;
  input: LiuyaoInput;
  originalHexagram: Hexagram;
  changedHexagram?: Hexagram;
  yaos: LiuyaoYao[];
  shiying: ShiyingPosition;
  najia: NajiaData;
  liuqin: LiuqinData;
  liushen: LiushenData;
  analysis: LiuyaoAnalysis;
  createTime: string;
}

export interface LiuyaoYao {
  position: number;
  value: 'yin' | 'yang';
  isChanging: boolean;
  earthlyBranch: string;
  wuxing: string;
  liuqin: string;
  liushen: string;
  shiying?: 'shi' | 'ying';
}

export interface ShiyingPosition {
  shi: number; // 世爻位置
  ying: number; // 应爻位置
}

export interface NajiaData {
  upperTrigram: string;
  lowerTrigram: string;
  yaos: string[]; // 各爻纳甲地支
}

export interface LiuqinData {
  yaos: string[]; // 各爻六亲
  yongshen: string; // 用神
}

export interface LiushenData {
  yaos: string[]; // 各爻六神
}

export interface LiuyaoAnalysis {
  yongshenAnalysis: string;
  shiying析: string;
  dongjingAnalysis: string;
  wuxingAnalysis: string;
  conclusion: string;
  suggestion: string;
}

// 占星相关类型
export interface AstrologyInput {
  name?: string;
  birthDate: string;
  birthTime: string;
  location: Location;
  chartType: 'natal' | 'transit' | 'progression' | 'composite';
}

export interface AstrologyResult {
  id: string;
  input: AstrologyInput;
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
  chart: ChartData;
  analysis: AstrologyAnalysis;
  createTime: string;
}

export interface Planet {
  name: string;
  sign: string;
  degree: number;
  house: number;
  retrograde: boolean;
  element: string;
  quality: string;
}

export interface House {
  number: number;
  sign: string;
  degree: number;
  ruler: string;
  meaning: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string; // conjunction, opposition, trine, square, sextile
  degree: number;
  orb: number;
  applying: boolean;
}

export interface ChartData {
  centerX: number;
  centerY: number;
  radius: number;
  houses: HousePosition[];
  planets: PlanetPosition[];
}

export interface HousePosition {
  house: number;
  startAngle: number;
  endAngle: number;
  cusp: number;
}

export interface PlanetPosition {
  planet: string;
  angle: number;
  x: number;
  y: number;
}

export interface AstrologyAnalysis {
  sunSignAnalysis: string;
  moonSignAnalysis: string;
  risingSignAnalysis: string;
  elementBalance: ElementBalance;
  qualityBalance: QualityBalance;
  planetaryStrengths: PlanetaryStrength[];
  majorAspects: AspectAnalysis[];
  houseEmphasis: HouseEmphasis[];
  summary: string;
}

export interface ElementBalance {
  fire: number;
  earth: number;
  air: number;
  water: number;
  dominant: string;
}

export interface QualityBalance {
  cardinal: number;
  fixed: number;
  mutable: number;
  dominant: string;
}

export interface PlanetaryStrength {
  planet: string;
  strength: number;
  dignity: string;
  description: string;
}

export interface AspectAnalysis {
  aspect: Aspect;
  interpretation: string;
  influence: 'positive' | 'negative' | 'neutral';
}

export interface HouseEmphasis {
  house: number;
  planets: string[];
  emphasis: number;
  meaning: string;
}

// API 响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 历史记录类型
export interface DivinationHistory {
  id: string;
  type: 'bazi' | 'liuyao' | 'astrology';
  title: string;
  result: BaziResult | LiuyaoResult | AstrologyResult;
  createTime: string;
  isFavorite: boolean;
  tags: string[];
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// 主题类型
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

// 应用状态类型
export interface AppState {
  user: User | null;
  theme: Theme;
  language: 'zh-CN' | 'en-US';
  loading: boolean;
  error: AppError | null;
}