import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// 以下のコードを追記
if (import.meta.env.MODE === 'development') {
  import('../src/mocks/browers').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass', // 未処理のリクエストはバイパス
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
