import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // テストファイルのディレクトリ
  timeout: 30 * 1000, // テストごとのタイムアウト
  expect: {
    timeout: 5000, // assertion のタイムアウト
  },
  fullyParallel: true, // テストを並列に実行する
  forbidOnly: !!process.env.CI, // CI環境では .only を禁止する
  retries: process.env.CI ? 2 : 0, // CI環境ではテストを再試行する回数
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // テストレポートをHTMLで出力する
  use: {
    actionTimeout: 0, // 各アクションのタイムアウト
    baseURL: 'http://localhost:5173/', // テストのベースURL
    trace: 'on-first-retry', // トレースを有効にする設定
  },
  projects: [
    {
      name: 'chromium', // Chromeテストプロジェクト
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox', // Firefoxテストプロジェクト
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit', // Safariテストプロジェクト
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
