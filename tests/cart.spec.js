const { test, expect, mergeExpects } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');
const {ProductPage} = require('../page-objects/ProductPage');
const { ProductDetailsPage } = require('../page-objects/ProductDetailsPage');
const { CartPage } = require('../page-objects/CartPage');

test('Product (1product) Existence After Logout Login', async ({ page }) => {
    //due to the fact that the site is a demo site, and product have different behaviour regarding configuration
    //we will just add one random product that have "Add to cart" button directly on product details page  
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

    //empty the cart
    await cartPage.emptyCart();
    await expect(cartPage.cartIsEmpty()).toBeTruthy();
    
});


test('empty if it is not empty', async ({ page }) => {
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('validemail@hotmail.com','123456');
    await cartPage.goto();
    await cartPage.emptyCart();
    const empty =  await cartPage.cartIsEmpty();
    expect(cartPage.cartIsEmpty()).toBeTruthy();
    console.log("Is cart empty after emptying?: " + empty);

});

test('Products (2products) Existence After Logout Login', async ({ page }) => {
    //due to the fact that the site is a demo site, and product have different behaviour regarding configuration
    //we will just add two random products that have "Add to cart" button directly on product details page  

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
    const productNamesBeforeLogout = []
    await productDetails.getProductName();
    await expect(productDetails.notificationBar).toBeVisible();
    productNamesBeforeLogout.push(await productDetails.getProductName());
    await cartPage.goto();
    await expect(await cartPage.getProductName()).toContain(productNamesBeforeLogout[0]);

    await productPage.goto();

    const productDetails2 = await productPage.openRandomProductWithAddToCart(); 
    await productDetails2.addToCart();
    await expect(productDetails.notificationBar).toBeVisible();
    productNamesBeforeLogout.push(await productDetails2.getProductName());
    await cartPage.goto();
    await expect(cartPage.cartQuantity).toHaveText('(2)');
    await expect(await cartPage.getAllProductNames()).toContain(productNamesBeforeLogout[0]);
    await expect(await cartPage.getAllProductNames()).toContain(productNamesBeforeLogout[1]);
    // await expect(await cartPage.getProductName()).toContain(productNamesBeforeLogout[1]); ///??

    await homePage.logOut();
    await expect(homePage.loginLink).toBeVisible();
    
    await loginPage.goto();
    await loginPage.login('validemail@hotmail.com','123456');

    await cartPage.goto();
    const productNameAfterLogin = await cartPage.getAllProductNames(); 
    console.log(productNameAfterLogin); 
    await expect(productNameAfterLogin).toContain(productNamesBeforeLogout[0]);
    await expect(productNameAfterLogin).toContain(productNamesBeforeLogout[1]);

    //empty the cart
    await cartPage.emptyCart();
    await expect(cartPage.cartIsEmpty()).toBeTruthy();
    
});