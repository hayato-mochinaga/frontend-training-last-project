import { test, expect } from '@playwright/test';

test('都道府県と漁港名の選択テスト', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // 都道府県名の選択
  const prefectureCombobox = page.getByRole('combobox', { name: '都道府県名を選択' });
  await prefectureCombobox.click();
  await prefectureCombobox.fill('ほ');
  await prefectureCombobox.press('ArrowDown');
  await prefectureCombobox.press('Enter');

  // 漁港名の選択
  const portCombobox = page.getByRole('combobox', { name: '漁港名を選択' });
  await portCombobox.click();
  await portCombobox.fill('え');
  await portCombobox.press('ArrowDown');
  await portCombobox.press('Enter');

  // 検索実行のためのエンター
  await portCombobox.press('Enter');

  // 結果の検証 - 見出しが表示されているかを確認
  const tideGraphHeading = page.getByRole('heading', { name: /北海道.*の本日の潮汐グラフ/ });
  await expect(tideGraphHeading).toBeVisible();

  // 「潮汐種別：」の見出しが表示されているかを確認
  const tideTypeHeading = page.getByRole('heading', { name: '潮汐種別：' });
  await expect(tideTypeHeading).toBeVisible();

  // 1.5秒待機
  await page.waitForTimeout(1500);
});
