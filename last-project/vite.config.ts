import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://map.yahooapis.jp',
        changeOrigin: true, // Yahoo!のAPIはCORS対応していないので、このオプションをtrueにする
        rewrite: (path) => path.replace(/^\/api/, ''), // リクエストのパスから/apiを削除
      },
      '/tide': { // 新しく追加するエントリーポイント
        target: 'https://api.tide736.net',
        changeOrigin: true, // このオプションをtrueにすることで、CORSの問題を回避
        rewrite: (path) => path.replace(/^\/tide/, 'get_tide.php'), // リクエストのパスから/tideを削除
      },
    },
  },
});
