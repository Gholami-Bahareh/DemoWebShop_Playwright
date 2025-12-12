const { expect } = require("allure-playwright");
// const { ProductPage } = require('../page-objects/ProductPage');

class ProductDetailsPage {
    constructor(page) {
        this.page = page;

    //Locators
    this.productName = page.locator('.product-name');
    this.productPicture = page.locator('.gallery .picture');
    this.productReviewsOverview = page.locator('.product-reviews-overview');
    this.productPrices = page.locator('.overview .prices');
    this.productShortDescription = page.locator('.short-description');
    this.emailAFriend = page.locator('.email-a-friend');
    this.compareProducts = page.locator('.compare-products');
    this.fullDescription = page.locator('.full-description');
    this.cartQtyText = page.locator('.ico-cart .cart-qty');
    this.addToCartButton = page.locator('.overview input[value="Add to cart"]');
    this.notificationBar = page.locator('.bar-notification.success');
    this.productRealPrice = page.locator('span[itemprop="price"]');
    this.qntInput = page.locator('.qty-input');
    
    }
    
    //Methods / Functions
    async validateProductDetails() {
        await expect(this.productName).toBeVisible();
        await expect(this.productPicture).toBeVisible();
        await expect(this.productReviewsOverview).toBeVisible();
        await expect(this.productPrices).toBeVisible();
        await expect(this.emailAFriend).toBeVisible();
        await expect(this.compareProducts).toBeVisible();
        await expect(this.fullDescription).toBeVisible();
    }
     
    async getCartCount(){
        const cartText = await this.cartQtyText.innerText();
        const cartCount = parseInt(cartText.replace(/\D/g, ''));
        return cartCount;
    }
    
    async addToCartFromDetailsPage() {
        const cartCountBefore = await this.getCartCount();
        await expect(this.addToCartButton).toBeVisible();
        await this.addToCartButton.click();
        await expect(this.notificationBar).toBeVisible();
        await expect(this.cartQtyText).toHaveText(`(${cartCountBefore + 1})`);
    }

    async getProductPrice() {
        const priceText = await this.productRealPrice.innerText();
        return parseFloat(priceText.replace(/[^0-9.-]+/g,""));
    }

    async addNitemsToCart(N) {
        await this.qntInput.fill(String(N));
        await this.addToCartButton.click();
    }

    async hasAddToCart() {
    return await this.addToCartButton.isVisible();
   }

   async getProductName() {
    return await this.productName.innerText();
   }

   async addToCart(){
    await this.addToCartButton.click();
   }
}

module.exports = { ProductDetailsPage };