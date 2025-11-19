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

test('Succesful Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');

    await loginPage.login('validemail@hotmail.com','123456');
    await expect(page.locator('a[href="/logout"]')).toBeVisible();
    
});

test('Unsuccesful Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');

    await loginPage.login('invalidemail@hotmail.com','123456');
    await expect(loginPage.errorMessage).toBeVisible();
});