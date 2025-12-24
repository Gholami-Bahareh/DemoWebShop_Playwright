const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');
const { CartPage } = require('../page-objects/CartPage');
const { CheckoutPage } = require('../page-objects/CheckoutPage');
const { ProductPage } = require('../page-objects/ProductPage');

test.only('logged_in_user_can_successfully_complete_checkout',async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);


    await loginPage.goto();
    await loginPage.login('validemail@hotmail.com','123456');
    await expect(homePage.logoutLink).toBeVisible();
    expect(homePage.cartIsEmpty()).toBeTruthy();

    const productDetails = await productPage.openRandomProductWithAddToCart();
    const productName = await productDetails.getProductName();

    console.log(productName);
    await productDetails.addToCart();
    await expect(productDetails.notificationBar).toBeVisible();

    await cartPage.goto();
    await expect(cartPage.cartQuantity).toHaveText('(1)');
    await expect(cartPage.productNames).toContainText(productName);

    await cartPage.seleacceptTermsOfService();
    await cartPage.clickOnCheckoutButton();

    const pageUrlAfterCheckout = page.url();
    console.log(pageUrlAfterCheckout);
    expect(pageUrlAfterCheckout).toContain('checkout');
    await expect(checkoutPage.pageTitle).toContainText('Checkout');

    //checkout page
    await checkoutPage.billingAddress.selectOption("New Address")
    await checkoutPage.fillBillingNewAddressFields();
    await checkoutPage.billingContibueButton.click();
    await page.waitForLoadState('networkidle');
    await checkoutPage.shippingContibueButton.click();
    await page.waitForLoadState('networkidle');
    await checkoutPage.selectShippingMethod('2nd Day Air (0.00)');
    await checkoutPage.selectPaymentMethod('Check / Money Order (5.00)');
    await checkoutPage.paymentInformationContibueButton.click();
    await page.waitForLoadState('networkidle');
    await checkoutPage.confirmOrderContibueButton.click();
    await page.waitForLoadState('networkidle');

    






    
    

});
