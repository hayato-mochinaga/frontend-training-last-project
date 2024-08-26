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
    await page.waitForTimeout(1000);
});
