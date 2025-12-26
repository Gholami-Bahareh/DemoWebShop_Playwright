const { expect } = require("allure-playwright");

const { randomEmail , randomPassword , randomString  } = require('../utils/helpers');

class CheckoutPage {
    constructor(page) {
        this.page = page;

    //Locators
    this.pageTitle = page.locator('.page-title h1');
    this.billingAddress  = page.locator('.section.select-billing-address #billing-address-select');
    this.billingNewAddressFirstName =page.locator('#BillingNewAddress_FirstName');
    this.billingNewAddressLastName = page.locator('#BillingNewAddress_LastName');
    this.billingNewAddressEmail = page.locator('#BillingNewAddress_Email');
    this.billingNewAddressCountryDropdown = page.locator('select#BillingNewAddress_CountryId');
    this.billingNewAddressStateProvinceDropdown = page.locator('select#BillingNewAddress_StateProvinceId');
    this.billingNewAddressCity = page.locator('#BillingNewAddress_City');
    this.billingNewAddressAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingNewAddressZipPostalCode = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingNewAddressPhoneNumber = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContibueButton = page.locator('#billing-buttons-container input');
    this.shippingContibueButton = page.locator('#shipping-buttons-container input');
    this.shippingMethodContibueButton = page.locator('.button-1.shipping-method-next-step-button');
    this.paymentMethodContibueButton = page.locator('.button-1.payment-method-next-step-button');
    this.paymentInformationContibueButton = page.locator('.button-1.payment-info-next-step-button');
    this.confirmOrderContibueButton = page.locator('.button-1.confirm-order-next-step-button');
    this.checkoutTotalPriceSection = page.locator('.cart-total');
    this.checkoutCartItemRows = page.locator('.cart-item-row a');
    this.billingInfoSectionInConfirmOrder = page.locator('.billing-info');
    this.shippingInfoSectionInConfirmOrder = page.locator('.shipping-info');
    this.orderProcessedSuccessfullyMessage = page.locator('div.title strong');
    this.checkoutAsGuestButton = page.locator('.button-1.checkout-as-guest-button');
    // this.
    this.billingNewAddressFirstNameError =page.locator('span[data-valmsg-for="BillingNewAddress.FirstName"]');
    this.billingNewAddressLastNameError = page.locator('span[data-valmsg-for="BillingNewAddress.LastName"]');
    this.billingNewAddressEmailError = page.locator('span[data-valmsg-for="BillingNewAddress.Email"]');
    this.billingNewAddressCountryDropdownError = page.locator('span[data-valmsg-for="BillingNewAddress.CountryId"]');
    this.billingNewAddressCityError = page.locator('span[data-valmsg-for="BillingNewAddress.City"]');
    this.billingNewAddressAddress1Error = page.locator('span[data-valmsg-for="BillingNewAddress.Address1"]');
    this.billingNewAddressZipPostalCodeError = page.locator('span[data-valmsg-for="BillingNewAddress.ZipPostalCode"]');
    this.billingNewAddressPhoneNumberError = page.locator('span[data-valmsg-for="BillingNewAddress.PhoneNumber"]');
    this.selectShippingAddressSection = page.locator('.section.select-shipping-address');
    this.registerButtonForGuestUser = page.locator('.button-1.register-button');
    this.emailFieldInCheckoutasguest = page.locator('#Email');
    this.passwordlFieldInCheckoutasguest = page.locator('#Password');





    }

     //Methods / Functions
    async fillBillingNewAddressFields() {
        await this.billingNewAddressFirstName.clear();
        await this.billingNewAddressFirstName.fill(randomString(6));
        await this.billingNewAddressLastName.clear();
        await this.billingNewAddressLastName.fill(randomString(6));
        await this.billingNewAddressEmail.clear();
        await this.billingNewAddressEmail.fill(randomEmail());
        await this.billingNewAddressCountryDropdown.selectOption('Sweden');
        await this.billingNewAddressCity.fill(randomString(6));
        await this.billingNewAddressAddress1.fill(randomString(6));
        await this.billingNewAddressZipPostalCode.fill(randomString(6));
        await this.billingNewAddressPhoneNumber.fill(randomString(6));
        await this.billingContibueButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectShippingMethod(option) {
        await this.page.getByLabel(option).check();
        await this.shippingMethodContibueButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectPaymentMethod(option) {
        await this.page.getByLabel(option).check();
        await this.paymentMethodContibueButton.click();
        await this.page.waitForLoadState('networkidle');
    }


    



}


module.exports = { CheckoutPage };


