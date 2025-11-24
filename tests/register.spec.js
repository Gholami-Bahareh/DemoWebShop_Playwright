const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../page-objects/RegisterPage');
const { generateRandomEmail  } = require('../utils/helpers');

test('Successful Registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = generateRandomEmail();
    await page.goto('/register');

    await registerPage.register('John', 'Doe', email  , 'Password123');
    await expect(page.locator('.result')).toHaveText('Your registration completed');


});