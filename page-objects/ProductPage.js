const { expect } = require("allure-playwright");
const { ProductDetailsPage } = require("./ProductDetailsPage");


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
    this.addToCartButton = page.locator('input[value="Add to cart"]');
    // this.productPicture = page.locator('.product-grid .picture');
    // this.productTile = page.locator('.product-grid .details .product-title a');
    // this.productRating = page.locator('.product-grid .product-rating-box');
    // this.productPrice = page.locator('.product-grid .prices');

    }
    
    //Methods / Functions
    async goto(){
        await this.page.goto('/');
    }

    async hasCategoryProducts() {
        return await this.productItems.count() > 0;
    }

    async getFirstProductTitleFromCategory(categoryIndex){
        await this.categoryItems.nth(categoryIndex).click();
        if (await this.hasCategoryProducts()){
            return await this.productItems.first().locator('.details .product-title a').innerText();
        }
        else{
            await this.subCategoryItems.first().click();
            return await this.productItems.first().locator('.details .product-title a').innerText();       
         }
    }

    async clickOnFirstProductFromCategory(categoryIndex){
        await this.categoryItems.nth(categoryIndex).click();
        if (await this.hasCategoryProducts()){
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

    async openRandomProductWithAddToCart(){
        let productsFound = false;

        while(!productsFound){
        const categoryCount = await this.categoryItems.count()
        const randomIndexCat = Math.floor(Math.random() * categoryCount);
        await this.categoryItems.nth(randomIndexCat).click();

        if(!(await this.hasCategoryProducts())){
            const subCategoryCount = await this.subCategoryItems.count()
            const randomIndexSubCat = Math.floor(Math.random() * subCategoryCount);
            await this.subCategoryItems.nth(randomIndexSubCat).click();
        }

        const productsCount = await this.productItems.count();
        const productsWithAddToCart = [];

        for (let i = 0; i < productsCount; i++) {
            if (await this.productItems.nth(i).locator('input[value="Add to cart"]').isVisible()) {
                productsWithAddToCart.push(i);
                }
            }

        if (productsWithAddToCart.length > 0) {
            const randomProductIndex = productsWithAddToCart[Math.floor(Math.random() * productsWithAddToCart.length)];
            await this.productItems.nth(randomProductIndex).locator('.picture').click();
            productsFound = true;
            }
            else {
                await this.goto();
            }
        }
        return new ProductDetailsPage(this.page);
    }
}

module.exports = { ProductPage };