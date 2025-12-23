const { expect } = require("allure-playwright");

class CartPage {
    constructor(page) {
        this.page = page;

    //Locators
    this.subTotal = page.locator('.cart-total tr:first-child .product-price');
    this.productNames = page.locator('.product-name');
    this.cartQuantity = page.locator('.ico-cart .cart-qty');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.removeCheckboxes = page.locator('input[name="removefromcart"]');
    this.shoppingCartLink = page.locator('.ico-cart .cart-label');
    this.minicartLink = page.locator('.mini-shopping-cart');
    this.termsofserviceCheckbox = page.locator('.terms-of-service #termsofservice')
    this.checkoutButton = page.locator('.checkout-buttons #checkout');


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

   async getAllProductNames() {
    const names = [];
    const count = await this.productNames.count();
    for (let i = 0; i < count; i++) {
        names.push(await this.productNames.nth(i).innerText());
    }
    return names;
    // returns an array of strings
    }

   async cartIsEmpty(){
    return await this.cartQuantity.innerText() === '(0)';
    //this returns true if cart is empty, false otherwise
    //this method can be used in tests to check if the cart is empty
   }


   async emptyCart() {
    if (!(await this.cartIsEmpty())) {
        const itemCount = await this.removeCheckboxes.count();
        for (let i = 0; i < itemCount; i++) {
            await this.removeCheckboxes.nth(i).check();
        }
    await this.updateCartButton.click();
   }}

   async seleacceptTermsOfService(){
    await this.termsofserviceCheckbox.click();
   }

   async clickOnCheckoutButton(){
    await this.checkoutButton.click();
   }

}

module.exports = { CartPage };