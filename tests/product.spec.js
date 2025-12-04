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

test('product details should be visible', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.clickOnFirstProductFromCategory(0);

    await expect(page.locator('.product-name')).toBeVisible();
    await expect(page.locator('.gallery .picture')).toBeVisible();
    await expect(page.locator('.short-description')).toBeVisible();
    await expect(page.locator('.product-reviews-overview')).toBeVisible();
    await expect(page.locator('.overview .prices')).toBeVisible();
    await expect(page.locator('.qty-label')).toBeVisible();
    await expect(page.locator('.email-a-friend')).toBeVisible();
    await expect(page.locator('.compare-products')).toBeVisible();
    await expect(page.locator('.full-description')).toBeVisible();
})

test.only('product details should be visible for each first product!', async ({ page }) => {
    test.setTimeout(60000);
    const productPage = new ProductPage(page);
    await productPage.goto();
    const categoryCount = await productPage.categoryItems.count();
    for(let i=0;i<categoryCount;i++){
    await productPage.clickOnFirstProductFromCategory(i);

    await expect(page.locator('.product-name')).toBeVisible();
    await expect(page.locator('.gallery .picture')).toBeVisible();
    // await expect(page.locator('.short-description')).toBeVisible();
    await expect(page.locator('.product-reviews-overview')).toBeVisible();
    await expect(page.locator('.overview .prices')).toBeVisible();
    // await expect(page.locator('.qty-label')).toBeVisible();
    await expect(page.locator('.email-a-friend')).toBeVisible();
    await expect(page.locator('.compare-products')).toBeVisible();
    await expect(page.locator('.full-description')).toBeVisible();

    await productPage.goto();
}
})

