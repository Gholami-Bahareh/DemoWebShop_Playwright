const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');

test('UI element should be visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.registerButton).toBeVisible();
});