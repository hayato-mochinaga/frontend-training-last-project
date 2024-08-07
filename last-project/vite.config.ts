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
    },
  },
});
