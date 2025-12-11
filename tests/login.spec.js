const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');

test('UI element should be visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.registerButton).toBeVisible();
});


test.describe.only('test1DD_login with different email and password', () => {
    
    test('Data Driven Login Test', async ({ page }) => {
        const loginData = [{email: "validemail@hotmail.com", password: "wrongpass" , valid: false},
                           {email: "", password: "", valid: false},
                           {email: "notexicting@hotmail.com", password: "wrongpass" , valid: false},
                           {email: "validemail@hotmail.com", password: "123456",valid: true}] ;
        for (let i=0; i<loginData.length; i++){
            const item = loginData[i];
            const loginPage = new LoginPage(page);
            const homePage = new HomePage(page);
            await loginPage.goto();
            await loginPage.login(item.email, item.password);

            if(item.valid){
                await expect(homePage.logoutLink).toBeVisible();
                await homePage.logoutLink.click();
            }
            else{
                await expect(loginPage.errorMessage).toBeVisible();
            }
        
        }
});


    test('Login with invalid email format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('invalidemailformat','');
        await expect(loginPage.invalidEmailMessage).toBeVisible();
});
    
});

test('Login and logout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const validEmail = 'validemail@hotmail.com';

    await loginPage.goto();  

    await loginPage.login(validEmail,'123456');
    await expect(homePage.logoutLink).toBeVisible();
    await expect(homePage.accountLink).toHaveText(validEmail);
    await homePage.logoutLink.click();
    await expect(homePage.loginLink).toBeVisible();

});


test('Forgot Password flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const validEmail = 'validemail@hotmail.com';
    await loginPage.goto(); 

    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/.*passwordrecovery/);
    await expect(page.locator('[for="Email"]')).toBeVisible();
    await page.locator('#Email').fill(validEmail);
    await page.locator('input[value="Recover"]').click();
    await expect(page.locator('div[class="result"]')).toHaveText('Email with instructions has been sent to you.')

});

