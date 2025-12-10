const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../page-objects/ProductPage');


test('UI element should be visible', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();

    await productPage.openFirstCategory();
    if (await productPage.hasProducts()){

        await expect(productPage.productItems).not.toHaveCount(0);
        await productPage.validateFirstProduct();
    }
    else{
        await productPage.openFirstSubCategory();
        await expect(productPage.productItems).not.toHaveCount(0);
        await productPage.validateFirstProduct();

    }
});

test('products in different categories should not match', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    const firstProductTitle = await productPage.getFirstProductTitleFromCategory(0);
    const firstProductURL = page.url();

    const secondProductTitle = await productPage.getFirstProductTitleFromCategory(1);
    const secondProductURL = page.url();
    await expect(firstProductTitle).not.toBe(secondProductTitle);
    await expect(firstProductURL).not.toBe(secondProductURL);

});

test('should add first product from category to cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.openFirstCategory();
    if (await productPage.hasProducts()){
        await productPage.addFirstProductToCart();
    }
    else{
        await productPage.openFirstSubCategory();
        await productPage.addFirstProductToCart();
    } 
});

