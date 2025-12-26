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

    await expect(page).toHaveURL(/checkout/);
    await expect(checkoutPage.pageTitle).toContainText('Checkout');

    //checkout page
    await checkoutPage.billingAddress.selectOption("New Address")
    await checkoutPage.fillBillingNewAddressFields();
    await checkoutPage.shippingContibueButton.click();
    await page.waitForLoadState('networkidle');
    await checkoutPage.selectShippingMethod('Ground (0.00)');
    await checkoutPage.selectPaymentMethod('Check / Money Order (5.00)');
    await checkoutPage.paymentInformationContibueButton.click();
    await page.waitForLoadState('networkidle');
    await expect(checkoutPage.billingInfoSectionInConfirmOrder).toBeVisible();
    await expect(checkoutPage.shippingInfoSectionInConfirmOrder).toBeVisible();
    await expect(checkoutPage.checkoutTotalPriceSection).toBeVisible();
    await expect(checkoutPage.checkoutCartItemRows).toContainText(productName)
    await checkoutPage.confirmOrderContibueButton.click();
    await page.waitForLoadState('networkidle');
    await expect(checkoutPage.orderProcessedSuccessfullyMessage).toHaveText('Your order has been successfully processed!')
    await expect(page).toHaveURL('/checkout/completed/');
    await expect(cartPage.cartQuantity).toHaveText('(0)');

});
