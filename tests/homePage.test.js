const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/HomePage');


test.only('Guest sees empty mini cart on hover', async ({ page }) => {
    const homePage = new HomePage(page);
      
    await homePage.goto();
    await homePage.hoverOverCart();
    await expect(homePage.minishoppingcartLink).toBeVisible();
    await expect(homePage.minishoppingcartcontent).toHaveText('You have no items in your shopping cart.');

    //نکته: برخی سایت‌ها نیاز دارن کمی delay قبل از assert اضافه بشه تا animation/tooltip کامل بشه
// می‌تونه بعداً با await this.page.waitForTimeout(200) یا locator.waitFor() حل بشه
// اگر mini cart بعد از hover render می‌شه و قبلاً موجود نیست، بهتره locator.waitFor({ state: 'visible' }) داشته باشی تا flaky نشه
});
