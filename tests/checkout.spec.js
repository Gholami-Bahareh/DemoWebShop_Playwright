const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');
const { CartPage } = require('../page-objects/CartPage');
const { CheckoutPage } = require('../page-objects/CheckoutPage');
const { ProductDetailsPage } = require('../page-objects/ProductDetailsPage');

test('logged_in_user_can_successfully_complete_checkout_E2E',async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);


    await loginPage.goto();
    await loginPage.login('validemail@hotmail.com','123456');
    await expect(homePage.logoutLink).toBeVisible();
    await expect(homePage.cartQuantity).toHaveText('(0)');
    // await expect(homePage.cartIsEmpty()).toBeTruthy();

    // const productDetails = await productPage.openRandomProductWithAddToCart();
    
//for the happy path: instead of randomchoosing, since the purpose of test isnt is not this functionality, product is hardcoded
    await page.goto('/computing-and-internet');
    const productName = await productDetailsPage.getProductName();

    console.log(productName);
    await productDetailsPage.addToCart();
    await expect(productDetailsPage.notificationBar).toBeVisible();

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

test('guest_user_can_successfully_complete_checkout_E2E',async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.goto();
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.cartQuantity).toHaveText('(0)');


    await page.goto('/computing-and-internet');
    const productName = await productDetailsPage.getProductName();

     await productDetailsPage.addToCart();
    await expect(productDetailsPage.notificationBar).toBeVisible();

    await cartPage.goto();
    await expect(cartPage.cartQuantity).toHaveText('(1)');
    await expect(cartPage.productNames).toContainText(productName);

    await cartPage.seleacceptTermsOfService();
    await cartPage.clickOnCheckoutButton();
    await page.waitForLoadState('networkidle');
    await checkoutPage.checkoutAsGuestButton.click();
    await checkoutPage.fillBillingNewAddressFields();
    await checkoutPage.shippingContibueButton.click();
    await checkoutPage.selectShippingMethod('Ground (0.00)');
    await checkoutPage.selectPaymentMethod('Check / Money Order (5.00)');
    await checkoutPage.paymentInformationContibueButton.click();
    await expect(checkoutPage.billingInfoSectionInConfirmOrder).toBeVisible();
    await expect(checkoutPage.shippingInfoSectionInConfirmOrder).toBeVisible();
    await expect(checkoutPage.checkoutTotalPriceSection).toBeVisible();
    await expect(checkoutPage.checkoutCartItemRows).toContainText(productName)
    await checkoutPage.confirmOrderContibueButton.click();
    await expect(checkoutPage.orderProcessedSuccessfullyMessage).toHaveText('Your order has been successfully processed!')
    await expect(page).toHaveURL('/checkout/completed/');
    await expect(cartPage.cartQuantity).toHaveText('(0)');
});

test('billing_address_required_fields_validation',async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('validemail@hotmail.com','123456');
    await expect(homePage.logoutLink).toBeVisible();
    await expect(homePage.cartQuantity).toHaveText('(0)');
       
    await page.goto('/computing-and-internet');
    const productName = await productDetailsPage.getProductName();

    console.log(productName);
    await productDetailsPage.addToCart();
    await expect(productDetailsPage.notificationBar).toBeVisible();

    await cartPage.goto();
    await expect(cartPage.cartQuantity).toHaveText('(1)');
    await expect(cartPage.productNames).toContainText(productName);

    await cartPage.seleacceptTermsOfService();
    await cartPage.clickOnCheckoutButton();

    await expect(page).toHaveURL(/checkout/);
    await expect(checkoutPage.pageTitle).toContainText('Checkout');

    //checkout page
    await checkoutPage.billingAddress.selectOption("New Address")
    await checkoutPage.billingNewAddressFirstName.clear();
    await checkoutPage.billingNewAddressLastName.clear();
    await checkoutPage.billingNewAddressEmail.clear();
    await checkoutPage.billingContibueButton.click();
    await expect(checkoutPage.billingNewAddressFirstNameError).toContainText('First name is required.');
    await expect(checkoutPage.billingNewAddressLastNameError).toContainText('Last name is required.');
    await expect(checkoutPage.billingNewAddressEmailError).toContainText('Email is required.');
    await expect(checkoutPage.billingNewAddressCountryDropdownError).toContainText('Country is required.');
    await expect(checkoutPage.billingNewAddressCityError).toContainText('City is required');
    await expect(checkoutPage.billingNewAddressAddress1Error).toContainText('Street address is required');
    await expect(checkoutPage.billingNewAddressZipPostalCodeError).toContainText('Zip / postal code is required');
    await expect(checkoutPage.billingNewAddressPhoneNumberError).toContainText('Phone is required');
    await expect(checkoutPage.selectShippingAddressSection).not.toBeVisible();
});

test.only('guest_user_cannot_proceed_to_checkout',async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.goto();
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.cartQuantity).toHaveText('(0)');


    await page.goto('/computing-and-internet');
    const productName = await productDetailsPage.getProductName();

    await productDetailsPage.addToCart();
    await expect(productDetailsPage.notificationBar).toBeVisible();

    await cartPage.goto();
    await expect(cartPage.cartQuantity).toHaveText('(1)');
    await expect(cartPage.productNames).toContainText(productName);

    await cartPage.seleacceptTermsOfService();
    await cartPage.clickOnCheckoutButton();

    await expect(page).toHaveURL(/checkoutasguest/);
    await expect(checkoutPage.checkoutAsGuestButton).toBeVisible();
    await expect(checkoutPage.registerButtonForGuestUser).toBeVisible();
    // await expect(checkoutPage.pageTitle).not.toBeVisible();
    await expect(checkoutPage.emailFieldInCheckoutasguest).toBeVisible();
    await expect(checkoutPage.passwordlFieldInCheckoutasguest).toBeVisible();

});
