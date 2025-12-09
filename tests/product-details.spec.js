const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../page-objects/ProductPage');
const { ProductDetailsPage } = require('../page-objects/ProductDetailsPage');


test.only('product details should be visible for each first product!', async ({ page }) => {
    test.setTimeout(60000);
    const productPage = new ProductPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    await productPage.goto();
    const categoryCount = await productPage.categoryItems.count();
    for(let i=0;i<categoryCount;i++){
    await productPage.clickOnFirstProductFromCategory(i);
    await productDetailsPage.validateProductDetails()
    await productPage.goto();
}
})