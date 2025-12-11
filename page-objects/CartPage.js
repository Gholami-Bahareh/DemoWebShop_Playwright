const { expect } = require("allure-playwright");
// const { ProductPage } = require('../page-objects/ProductPage');

class CartPage {
    constructor(page) {
        this.page = page;

    //Locators
    this.subTotal = page.locator('.cart-total tr:first-child .product-price');

    }
    
    //Methods / Functions
    async goto() {
        await this.page.goto('/cart');
    }

    async getCartSubTotal() {
        const priceText = await this.subTotal.textContent();
        return parseFloat(priceText.replace(/[^0-9.-]+/g,""));
    }

    }

module.exports = { CartPage };