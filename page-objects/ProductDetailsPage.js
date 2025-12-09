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

    }

module.exports = { ProductDetailsPage };