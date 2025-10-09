import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import App from './App';
import { antdTheme } from '@/styles/theme';
import '@/styles/globals.css';

// 配置 dayjs
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

// 设置默认时区
dayjs.tz.setDefault('Asia/Shanghai');

// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error);
  // 可以在这里添加错误上报逻辑
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 拒绝:', event.reason);
  // 可以在这里添加错误上报逻辑
});

// 渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider 
        locale={zhCN}
        theme={antdTheme}
        componentSize="middle"
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);