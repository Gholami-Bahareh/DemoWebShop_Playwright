const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../page-objects/RegisterPage');
const { randomEmail , randomPassword  } = require('../utils/helpers');

test ('Successful Registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    const email = randomEmail(); 
    const password = randomPassword();
    await registerPage.goto();

    await registerPage.register('John', 'Doe', email  , password);
    await expect(page.locator('div[class=result]')).toHaveText('Your registration completed');
    await expect(page).toHaveURL(/.*registerresult/);

});


test ('UI element should be visible', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await expect(registerPage.genderMaleRadio).toBeVisible();
    await expect(registerPage.genderFemaleRadio).toBeVisible();
    await expect(registerPage.firstnameInput).toBeVisible();
    await expect(registerPage.lastnameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();

});
test ('Invalid Email', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = 'invalidemailformat';
    const password = randomPassword();
    const error = page.locator('span[for="Email"]');

    await registerPage.goto();
    await registerPage.register('John', 'Doe', email  , password);

    await expect(error).toBeVisible();
    await expect(error).toHaveText('Wrong email');

});

test ('Email already exists', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    const email = randomEmail(); 
    const password = randomPassword();
    const error = page.locator("div[class='validation-summary-errors'] ul li");

    await registerPage.goto();
    await registerPage.register('John', 'Doe', email  , password);
    await registerPage.goto();
    await registerPage.register('John', 'Doe', email  , password);
    await expect(error).toBeVisible();
    await expect(error).toHaveText('The specified email already exists');

});

test ('Required fields validation', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.registerButton.click();

    await expect(registerPage.firstNameError).toBeVisible();
    await expect(registerPage.firstNameError).toHaveText('First name is required.');
    await expect(registerPage.lastNameError).toBeVisible();
    await expect(registerPage.lastNameError).toHaveText('Last name is required.');
    await expect(registerPage.emailError).toBeVisible();
    await expect(registerPage.emailError).toHaveText('Email is required.');
    await expect(registerPage.passwordError).toBeVisible();
    await expect(registerPage.passwordError).toHaveText('Password is required.');
    await expect(registerPage.confirmPasswordError).toBeVisible();
    await expect(registerPage.confirmPasswordError).toHaveText('Password is required.');
});

test ('Password validation - too short', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = randomEmail(); 
    await registerPage.goto();

    await registerPage.register('John', 'Doe', email  , '543');
    await expect(registerPage.passwordError).toHaveText('The password should have at least 6 characters.');  
});

test ('Confirm Password mismatch', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await registerPage.passwordInput.fill('123456');
    await registerPage.confirmPasswordInput.fill('654321');
    await registerPage.registerButton.click();

    await expect(registerPage.confirmPasswordError).toHaveText('The password and confirmation password do not match.'); 
});

