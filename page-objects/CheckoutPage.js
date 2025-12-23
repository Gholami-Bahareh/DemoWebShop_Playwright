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

    }



}


module.exports = { CheckoutPage };


