const { expect } = require("allure-playwright");

class CartPage {
    constructor(page) {
        this.page = page;

    //Locators
    this.subTotal = page.locator('.cart-total tr:first-child .product-price');
    this.productNames = page.locator('.product-name');
    this.cartQuantity = page.locator('.ico-cart .cart-qty');

    }
    
    //Methods / Functions
    async goto() {
        await this.page.goto('/cart');
    }

    async getCartSubTotal() {
        const priceText = await this.subTotal.textContent();
        return parseFloat(priceText.replace(/[^0-9.-]+/g,""));
    }

    async getProductName() {
    return await this.productNames.innerText();
   }

   async cartIsEmpty(){
    return await expect(this.cartQuantity).toHaveText(`0`);
   }

   async emptyCart() {

   }


    }

module.exports = { CartPage };