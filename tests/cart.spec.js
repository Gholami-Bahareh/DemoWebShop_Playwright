const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');
const {ProductPage} = require('../page-objects/ProductPage');
const { ProductDetailsPage } = require('../page-objects/ProductDetailsPage');
const { CartPage } = require('../page-objects/CartPage');

test('Product Existence After Logout Login', async ({ page }) => {
    test.setTimeout(60000);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('validemail@hotmail.com','123456');
    await expect(homePage.logoutLink).toBeVisible();
    await productPage.goto();
    
    const productDetails = await productPage.openRandomProductWithAddToCart();
    await productDetails.addToCart();
    const productNameBeforeLogout = await productDetails.getProductName();
    await expect(productDetails.notificationBar).toBeVisible();
    await cartPage.goto();
    await expect(await cartPage.getProductName()).toContain(productNameBeforeLogout);

    await homePage.logOut();
    await expect(homePage.loginLink).toBeVisible();
    
    await loginPage.goto();
    await loginPage.login('validemail@hotmail.com','123456');

    await cartPage.goto();
    const productNameAfterLogin = await cartPage.getProductName();
    console.log(productNameAfterLogin);
    await expect(productNameAfterLogin).toContain(productNameBeforeLogout);

});

// async cartIsEmpty(){
//     return await expect(this.cartQuantity).toHaveText(`0`);
//    }

test.only('is the cart empty?', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    const empty = await cartPage.cartIsEmpty();
    console.log("Is cart empty?: " + empty);

});