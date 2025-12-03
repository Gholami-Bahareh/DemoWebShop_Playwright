const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../page-objects/ProductPage');


test('UI element should be visible', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();

    
});