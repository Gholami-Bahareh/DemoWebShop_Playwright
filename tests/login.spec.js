const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');

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

test('Login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');  

    await loginPage.login('','');
    await expect(loginPage.errorMessage).toBeVisible();
});

test.only('Login-Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await page.goto('/login');  

    await loginPage.login('validemail@hotmail.com','123456');
    await expect(homePage.logoutLink).toBeVisible();
    await homePage.logoutLink.click();
    await expect(page.locator('a[href="/login"]')).toBeVisible();

});

