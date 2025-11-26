const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../page-objects/RegisterPage');
const { randomEmail , randomPassword  } = require('../utils/helpers');

test.only ('Successful Registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    const email = randomEmail(); 
    const password = randomPassword();
    await page.goto('/register');

    await registerPage.register('John', 'Doe', email  , password);
    await expect(page.locator('div[class=result]')).toHaveText('Your registration completed');
    await expect(page).toHaveURL(/.*registerresult/);

});

test ('UI element should be visible', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await page.goto('/register');

    await expect(registerPage.genderMaleRadio).toBeVisible();
    await expect(registerPage.genderFemaleRadio).toBeVisible();
    await expect(registerPage.firstnameInput).toBeVisible();
    await expect(registerPage.lastnameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();

});