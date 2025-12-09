const { expect } = require("allure-playwright");

class ProductPage {
    constructor(page) {
        this.page = page;

    //Locators
    this.categoryMenu = page.locator('.block.block-category-navigation');
    this.categoryItems = page.locator('.block.block-category-navigation li a');
    this.subCategoryItems = page.locator('.block.block-category-navigation li.active li a');
    this.productItems = page.locator('.product-grid .item-box');
    this.cartQtyText = page.locator('.ico-cart .cart-qty')
    this.notificationBar = page.locator('.bar-notification.success')
    // this.productPicture = page.locator('.product-grid .picture');
    // this.productTile = page.locator('.product-grid .details .product-title a');
    // this.productRating = page.locator('.product-grid .product-rating-box');
    // this.productPrice = page.locator('.product-grid .prices');

    }
    
    //Methods / Functions
    async goto(){
        await this.page.goto('/');
    }

    async hasProducts() {
        return await this.productItems.count() > 0;
    }

    async getFirstProductTitleFromCategory(categoryIndex){
        await this.categoryItems.nth(categoryIndex).click();
        if (await this.hasProducts()){
            return await this.productItems.first().locator('.details .product-title a').innerText();
        }
        else{
            await this.subCategoryItems.first().click();
            return await this.productItems.first().locator('.details .product-title a').innerText();       
         }
    }

    async clickOnFirstProductFromCategory(categoryIndex){
        await this.categoryItems.nth(categoryIndex).click();
        if (await this.hasProducts()){
            await this.productItems.first().locator('.picture').click();
        }
        else{
            await this.subCategoryItems.first().click();
            await this.productItems.first().locator('.picture').click();      
         }
    }

    async openFirstCategory() {
        await this.categoryItems.first().click();
    }

    async openFirstSubCategory() {
        await this.subCategoryItems.first().click();
    }

    async validateFirstProduct() {
        const first = this.productItems.first();
        await expect(first).toBeVisible();
        await expect(first.locator('.picture')).toBeVisible();
        await expect(first.locator('.details .product-title a')).toBeVisible();
        await expect(first.locator('.product-rating-box')).toBeVisible();
        await expect(first.locator('.prices')).toBeVisible();  
    }

    async addFirstProductToCart() {
        const cartText = await this.cartQtyText.innerText();
        const cartCountBefore = parseInt(cartText.replace(/\D/g, ''));
        const first = this.productItems.first();
        await expect(first.locator('input[value="Add to cart"]')).toBeVisible();
        await first.locator('input[value="Add to cart"]').click();
        await expect(this.notificationBar).toBeVisible();
        await expect(this.cartQtyText).toHaveText(`(${cartCountBefore + 1})`);
    }
}

module.exports = { ProductPage };