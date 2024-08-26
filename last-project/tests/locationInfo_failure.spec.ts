import { test, expect } from '@playwright/test';

test('Test to check visibility of "田原市伊川津町"', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('都道府県名を入力').click();
    await page.getByRole('option', { name: '愛知県' }).click();
    await page.getByLabel('漁港名を入力').click();
    await page.getByRole('option', { name: '伊川津' }).click();
    await page.getByRole('button').nth(3).click();

    // 要素が表示されるまで待つ
    const isVisible = await page.waitForSelector('text=田原市伊川津町', { state: 'visible' });
    expect(isVisible).toBeTruthy();

    // 最後に1秒待機
    await expect(page.getByText('都道府県名・漁港名で検索して下さい')).toBeVisible();
    await page.waitForTimeout(1000);
});
await page.getByLabel('都道府県名を入力').click();
await page.getByRole('combobox', { name: '都道府県名' }).fill('');
await page.getByLabel('都道府県名を入力').fill('ああ愛知県');
await page.getByLabel('漁港名を入力').click();
await page.getByRole('combobox', { name: '漁港名' }).fill('あああ');
await page.getByRole('combobox', { name: '漁港名' }).press('Enter');

await page.getByLabel('都道府県名を入力').click();
await page.getByRole('combobox', { name: '都道府県名' }).fill('っっw');
await page.getByRole('combobox', { name: '都道府県名' }).press('Enter');
await page.getByLabel('都道府県名').press('Enter');
await page.getByLabel('漁港名を入力').click();
await page.getByLabel('都道府県名を入力').click();
await page.getByRole('option', { name: '愛知県' }).click();
await page.getByLabel('漁港名を入力').click();
await page.getByRole('combobox', { name: '漁港名' }).fill('おおさk');
await page.getByRole('combobox', { name: '漁港名' }).press('Enter');
await page.getByLabel('漁港名').fill('大阪');
await page.getByLabel('漁港名').press('Enter');
await page.getByLabel('漁港名').press('Enter');
await page.getByLabel('漁港名').press('Enter');
await page.getByLabel('漁港名').click();
await page.getByLabel('漁港名').press('ArrowRight');
await page.getByLabel('漁港名').fill('おおさ');
await page.getByLabel('漁港名').press('Enter');
await page.getByLabel('漁港名').fill('');
await page.locator('.sc-eEPDDI').click();
await page.getByLabel('漁港名を入力').click();
await page.getByRole('combobox', { name: '漁港名' }).fill('大阪');
await page.getByRole('combobox', { name: '漁港名' }).press('Enter');
await page.getByRole('heading', { name: '愛知県大阪港の本日の潮汐グラフ' }).click();
await page.getByRole('heading', { name: '愛知県大阪港の本日の潮汐グラフ' }).click();