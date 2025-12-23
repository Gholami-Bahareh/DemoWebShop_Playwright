const { expect } = require("allure-playwright");

class CheckoutPage {
    constructor(page) {
        this.page = page;

    //Locators
    this.pageTitle = page.locator('.page-title h1');

    }

     //Methods / Functions
    // async goto() {
    //     await this.page.goto('/cart');
}


module.exports = { CheckoutPage };


