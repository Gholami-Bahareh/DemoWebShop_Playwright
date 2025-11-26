const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../page-objects/RegisterPage');
const { randomEmail , randomPassword  } = require('../utils/helpers');

test.only('Successful Registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    const email = randomEmail(); 
    const password = randomPassword();
    await page.goto('/register');

    await registerPage.register('John', 'Doe', email  , password);
    await expect(page.locator('div[class=result]')).toHaveText('Your registration completed');


});